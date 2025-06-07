package com.example.vrrdle.leaderboard;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class LeaderboardEntry {
    @Id
    private String username;
    private int score;

    public LeaderboardEntry() {}

    public LeaderboardEntry(String username, int score) {
        this.username = username;
        this.score = score;
    }

    public String getUsername() { return username; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
}