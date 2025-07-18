package com.example.vrrdle.leaderboard.service;

import com.example.vrrdle.leaderboard.model.LeaderboardEntry;
import com.example.vrrdle.leaderboard.repository.LeaderboardRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class LeaderboardService {
    
    private static final Logger logger = LoggerFactory.getLogger(LeaderboardService.class);
    
    private final LeaderboardRepository repository;
    
    @Value("${leaderboard.max-entries:10}")
    private int maxEntries;

    public LeaderboardService(LeaderboardRepository repository) {
        this.repository = repository;
    }

    public List<LeaderboardEntry> getTopEntries() {
        logger.info("Fetching top {} leaderboard entries", maxEntries);
        return repository.findAll()
            .stream()
            .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore())) // Descending order
            .limit(maxEntries)
            .toList();
    }

    public LeaderboardEntry submitScore(String username, int score) {
        logger.info("Submitting score for user: {}, score: {}", username, score);
        
        Optional<LeaderboardEntry> existingEntry = repository.findById(username);
        
        if (existingEntry.isPresent()) {
            LeaderboardEntry entry = existingEntry.get();
            if (score > entry.getScore()) {
                entry.setScore(score);
                repository.save(entry);
                logger.info("Updated score for user: {}, new score: {}", username, score);
            } else {
                logger.info("Score {} not better than existing score {} for user: {}", score, entry.getScore(), username);
            }
            return entry;
        } else {
            LeaderboardEntry newEntry = new LeaderboardEntry(username, score);
            repository.save(newEntry);
            logger.info("Created new leaderboard entry for user: {}, score: {}", username, score);
            return newEntry;
        }
    }
}