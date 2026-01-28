package com.projekt.diplomski_projekt.service;

public interface ChatService {
    String chat(String systemPrompt, String userPrompt, String context);
    void clearHistory();
}