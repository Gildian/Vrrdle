import { apiClient } from './apiClient';
import { API_CONFIG } from '../constants/config';

/**
 * Service for game-related API calls
 */
export const gameService = {
  /**
   * Fetches the car of the day
   * @returns {Promise<Object>} The car object
   */
  async getCarOfTheDay() {
    try {
      const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.CARS}/today`);
      return response.data;
    } catch (error) {
      // Fallback to legacy endpoint
      try {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.CARS_LEGACY);
        return response.data;
      } catch {
        throw error; // Throw original error
      }
    }
  },

  /**
   * Fetches a random car (for testing)
   * @returns {Promise<Object>} The car object
   */
  async getRandomCar() {
    return this.getCarOfTheDay();
  },
};