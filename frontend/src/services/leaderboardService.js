import { apiClient } from './apiClient';
import { API_CONFIG } from '../constants/config';

/**
 * Service for leaderboard-related API calls
 */
export const leaderboardService = {
  /**
   * Fetches the leaderboard
   * @returns {Promise<Array>} Array of leaderboard entries
   */
  async getLeaderboard() {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.LEADERBOARD);
      return response.data;
    } catch (error) {
      // Fallback to legacy endpoint
      try {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.LEADERBOARD_LEGACY);
        return response.data;
      } catch {
        throw error; // Throw original error
      }
    }
  },

  /**
   * Submits a score to the leaderboard
   * @param {string} username - The player's username
   * @param {number} score - The player's score
   * @returns {Promise<Object>} The submitted leaderboard entry
   */
  async submitScore(username, score) {
    const payload = { username, score };
    
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.LEADERBOARD, payload);
      return response.data;
    } catch (error) {
      // Fallback to legacy endpoint
      try {
        const response = await apiClient.post(API_CONFIG.ENDPOINTS.LEADERBOARD_LEGACY, payload);
        return response.data;
      } catch {
        throw error; // Throw original error
      }
    }
  },
};
