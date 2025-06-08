package com.example.vrrdle.leaderboard;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaderboardRepository extends JpaRepository<LeaderboardEntry, String> {
    boolean existsByUsername(String username);
}