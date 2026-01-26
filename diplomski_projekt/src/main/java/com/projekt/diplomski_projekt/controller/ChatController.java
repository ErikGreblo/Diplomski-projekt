package com.projekt.diplomski_projekt.controller;

import com.projekt.diplomski_projekt.model.FileService;
import com.projekt.diplomski_projekt.service.ChatService;
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

    private final Map<String, ChatService> chatServices;

    @Autowired
    private FileService fileService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public ChatController(Map<String, ChatService> chatServices) {
        this.chatServices = chatServices;
    }

    @PostMapping("")
    public Map<String, String> chat(
            @RequestBody Map<String, String> request,
            @RequestParam(defaultValue = "ollama") String provider
    ) {
        String systemPrompt = """
                            You are a helpful assistant.
                            Use Markdown for structure.
                            Do NOT wrap the entire response in code blocks.
                            Respond in Croatian.
                            """;


        String userPrompt = request.get("message");
        String context = fileService.readAllUploads();

        ChatService service = chatServices.get(provider);
        if (service == null) {
            throw new IllegalArgumentException("Unknown provider: " + provider);
        }

        String reply = service.chat(systemPrompt, userPrompt, context);

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
