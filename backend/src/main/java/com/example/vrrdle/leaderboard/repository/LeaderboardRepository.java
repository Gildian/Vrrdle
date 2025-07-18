package com.example.vrrdle.leaderboard.repository;

import com.example.vrrdle.leaderboard.model.LeaderboardEntry;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaderboardRepository extends JpaRepository<LeaderboardEntry, String> {
    boolean existsByUsername(String username);
}