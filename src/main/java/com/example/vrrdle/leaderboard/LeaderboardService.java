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
        .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore())) // Descending order
        .limit(10)
        .toList();
}
public LeaderboardEntry submitScore(String username, int score) {
    if (repository.existsByUsername(username)) {
        LeaderboardEntry entry = repository.findById(username).get();
        if (score > entry.getScore()) {
            entry.setScore(score);
            repository.save(entry);
        }
        return entry;
    } else {
        LeaderboardEntry entry = new LeaderboardEntry(username, score);
        repository.save(entry);
        return entry;
    }
}
}