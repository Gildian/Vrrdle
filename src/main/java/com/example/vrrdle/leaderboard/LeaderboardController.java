package com.example.vrrdle.leaderboard;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {
    private final LeaderboardService service;

    public LeaderboardController(LeaderboardService service) {
        this.service = service;
    }

    @GetMapping
    public List<LeaderboardEntry> getLeaderboard() {
        return service.getTopEntries();
    }

    @PostMapping
    public LeaderboardEntry submitScore(@RequestBody LeaderboardEntry entry) {
        return service.submitScore(entry.getUsername(), entry.getScore());
    }
}