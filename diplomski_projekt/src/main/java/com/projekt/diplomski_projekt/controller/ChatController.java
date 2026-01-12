package com.projekt.diplomski_projekt.controller;

import com.projekt.diplomski_projekt.model.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;


@RestController
@RequestMapping("/chat")
@CrossOrigin
public class ChatController {

    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private FileService fileService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {

        String systemPrompt = """
                            You are a helpful assistant.
                            Use Markdown for structure.
                            Do NOT wrap the entire response in code blocks.
                            Respond in Croatian.
                            """;

        String prompt = request.get("message");

        String uploadsContext = fileService.readAllUploads();

        String fullPrompt = systemPrompt
                + "\n\nContext from uploaded files:\n" + uploadsContext
                + "\n\nUser: " + prompt;


        //System.out.println("=== Prompt sent to LLM ===");
        //System.out.println(fullPrompt);
        //System.out.println("==========================");

        Map<String, Object> ollamaRequest = Map.of(
                "model", "qwen3:0.6b",
                "prompt", fullPrompt,
                "stream", false
        );

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "http://localhost:11434/api/generate",
                ollamaRequest,
                Map.class
        );

        String reply = response.getBody().get("response").toString();

        return Map.of("reply", reply);
    }

    @PostMapping("/upload")
    public Map<String, String> upload(@RequestParam("file") MultipartFile file) throws Exception {

        Path uploadPath  = Paths.get(uploadDir);
        if (!Files.exists(uploadPath )) {
            Files.createDirectories(uploadPath );
        }

        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        Files.write(filePath, file.getBytes());

        return Map.of("status", "ok", "filename", file.getOriginalFilename());
    }
}
