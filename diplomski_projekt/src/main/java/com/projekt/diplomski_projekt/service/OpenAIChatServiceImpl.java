package com.projekt.diplomski_projekt.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("openai")
public class OpenAIChatServiceImpl implements ChatService{

    @Value("${openai.api-key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    private List<Map<String, String>> conversationHistory = new ArrayList<>();

    @Override
    public String chat(String systemPrompt, String userPrompt, String context) {

        List<Map<String, Object>> messagesToSend = new ArrayList<>();

        messagesToSend.add(Map.of("role", "system", "content", systemPrompt));
        messagesToSend.add(Map.of("role", "system", "content", "CONTEXT FROM FILES:\n" + context));
        messagesToSend.addAll((List) conversationHistory);
        messagesToSend.add(Map.of("role", "user", "content", userPrompt));

        Map<String, Object> request = Map.of(
                "model", model,
                "messages", messagesToSend
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://api.openai.com/v1/chat/completions",
                entity,
                Map.class
        );

        Map firstChoice = (Map) ((List) response.getBody()
                .get("choices")).get(0);


        Map message = (Map) firstChoice.get("message");


        String replyContent = message.get("content").toString();

        conversationHistory.add(Map.of("role", "user", "content", userPrompt));
        conversationHistory.add(Map.of("role", "assistant", "content", replyContent));

        return replyContent;
    }

    @Override
    public void clearHistory() {
        conversationHistory.clear();
    }
}
