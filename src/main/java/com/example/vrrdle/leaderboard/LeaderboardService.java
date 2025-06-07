package com.example.vrrdle.leaderboard;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LeaderboardService {
    private final LeaderboardRepository repository;

    public LeaderboardService(LeaderboardRepository repository) {
        this.repository = repository;
    }

    public List<LeaderboardEntry> getTopEntries() {
        return repository.findAll()
            .stream()
            .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore()))
            .limit(10)
            .toList();
    }

    public LeaderboardEntry submitScore(String username, int score) {
        LeaderboardEntry entry = repository.findById(username)
            .orElse(new LeaderboardEntry(username, 0));
        if (score > entry.getScore()) {
            entry.setScore(score);
            repository.save(entry);
        }
        return entry;
    }
}