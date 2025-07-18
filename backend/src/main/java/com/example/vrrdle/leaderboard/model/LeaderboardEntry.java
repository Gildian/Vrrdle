package com.example.vrrdle.leaderboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "leaderboard_entries")
public class LeaderboardEntry {
    @Id
    @NotBlank(message = "Username cannot be blank")
    @Size(min = 1, max = 20, message = "Username must be between 1 and 20 characters")
    private String username;
    
    @Min(value = 0, message = "Score must be non-negative")
    private int score;

    public LeaderboardEntry() {}

    public LeaderboardEntry(String username, int score) {
        this.username = username;
        this.score = score;
    }

    public String getUsername() { 
        return username; 
    }
    
    public void setUsername(String username) { 
        this.username = username; 
    }
    
    public int getScore() { 
        return score; 
    }
    
    public void setScore(int score) { 
        this.score = score; 
    }
}