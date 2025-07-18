package com.example.vrrdle.leaderboard.controller;

import com.example.vrrdle.leaderboard.model.LeaderboardEntry;
import com.example.vrrdle.leaderboard.service.LeaderboardService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/leaderboard")
@Validated
public class LeaderboardController {
    
    private static final Logger logger = LoggerFactory.getLogger(LeaderboardController.class);
    private final LeaderboardService service;

    public LeaderboardController(LeaderboardService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboard() {
        logger.info("API request for leaderboard");
        List<LeaderboardEntry> entries = service.getTopEntries();
        return ResponseEntity.ok(entries);
    }

    @PostMapping
    public ResponseEntity<LeaderboardEntry> submitScore(@Valid @RequestBody LeaderboardEntry entry) {
        logger.info("API request to submit score for user: {}", entry.getUsername());
        try {
            LeaderboardEntry result = service.submitScore(entry.getUsername(), entry.getScore());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Error submitting score for user: {}", entry.getUsername(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Keep the old endpoint for backward compatibility
    @GetMapping("/api/leaderboard")
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboardLegacy() {
        return getLeaderboard();
    }
    
    @PostMapping("/api/leaderboard")
    public ResponseEntity<LeaderboardEntry> submitScoreLegacy(@Valid @RequestBody LeaderboardEntry entry) {
        return submitScore(entry);
    }
}