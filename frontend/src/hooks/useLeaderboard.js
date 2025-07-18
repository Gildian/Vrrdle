import { useState, useCallback } from 'react';
import { leaderboardService } from '../services/leaderboardService';
import { handleApiError, logError } from '../utils/errorHandling';

/**
 * Custom hook for managing leaderboard operations
 * @returns {Object} Leaderboard state and methods
 */
export const useLeaderboard = () => {
  const [leaderboardState, setLeaderboardState] = useState({
    entries: [],
    isLoading: false,
    error: null,
    isSubmitting: false,
  });

  /**
   * Fetches leaderboard entries
   */
  const fetchLeaderboard = useCallback(async () => {
    setLeaderboardState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const entries = await leaderboardService.getLeaderboard();
      setLeaderboardState(prev => ({
        ...prev,
        entries,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      logError('Leaderboard Fetch', error);
      setLeaderboardState(prev => ({
        ...prev,
        isLoading: false,
        error: handleApiError(error),
      }));
    }
  }, []);

  /**
   * Submits a score to the leaderboard
   * @param {string} username - The player's username
   * @param {number} score - The player's score
   */
  const submitScore = useCallback(async (username, score) => {
    setLeaderboardState(prev => ({ ...prev, isSubmitting: true, error: null }));
    
    try {
      const entry = await leaderboardService.submitScore(username, score);
      
      // Update local state with new entry
      setLeaderboardState(prev => {
        const existingIndex = prev.entries.findIndex(e => e.username === username);
        let newEntries;
        
        if (existingIndex !== -1) {
          // Update existing entry
          newEntries = [...prev.entries];
          newEntries[existingIndex] = entry;
        } else {
          // Add new entry
          newEntries = [...prev.entries, entry];
        }
        
        // Sort by score (descending) and limit to top entries
        newEntries.sort((a, b) => b.score - a.score);
        newEntries = newEntries.slice(0, 10);
        
        return {
          ...prev,
          entries: newEntries,
          isSubmitting: false,
          error: null,
        };
      });
      
      return entry;
    } catch (error) {
      logError('Score Submission', error);
      setLeaderboardState(prev => ({
        ...prev,
        isSubmitting: false,
        error: handleApiError(error),
      }));
      throw error;
    }
  }, []);

  return {
    leaderboardState,
    fetchLeaderboard,
    submitScore,
  };
};
