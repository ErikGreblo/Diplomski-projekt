package com.projekt.diplomski_projekt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service("ollama")
public class OllamaChatServiceImpl implements ChatService{

    private final RestTemplate restTemplate = new RestTemplate();

    private StringBuilder history = new StringBuilder();

    @Override
    public String chat(String systemPrompt, String userPrompt, String context) {
        String fullPrompt = systemPrompt
                + "\n\nContext from uploaded files:\n" + context
                + "\n\nConversation history:" + history.toString()
                + "\n\nUser: " + userPrompt;

        Map<String, Object> request = Map.of(
                "model", "qwen3:0.6b",
                "prompt", fullPrompt,
                "stream", false
        );

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "http://localhost:11434/api/generate",
                request,
                Map.class
        );

        String reply = response.getBody().get("response").toString();
        history.append("User: ").append(userPrompt).append("\n");
        history.append("AI: ").append(reply).append("\n");

        return reply;
    }
    @Override
    public void clearHistory(){
        history.setLength(0);
    }
}
