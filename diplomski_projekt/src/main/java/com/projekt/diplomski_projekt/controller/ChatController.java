package com.projekt.diplomski_projekt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/chat")
@CrossOrigin
public class ChatController {

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {

        String systemPrompt = """
                            You are a helpful assistant.
                            Format all mathematical expressions using LaTeX.
                            Use Markdown for structure.
                            Do NOT wrap the entire response in code blocks.
                            """;

        String prompt = request.get("message");
        String fullPrompt = systemPrompt + "\n\nUser: " + prompt;


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

}
