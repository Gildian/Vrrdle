// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  ENDPOINTS: {
    CARS: '/api/v1/cars',
    LEADERBOARD: '/api/v1/leaderboard',
    // Legacy endpoints for backward compatibility
    CARS_LEGACY: '/api/cars',
    LEADERBOARD_LEGACY: '/api/leaderboard',
  },
  TIMEOUT: 10000,
};

// Game Configuration
export const GAME_CONFIG = {
  MAX_GUESSES: 5,
  AUDIO_DURATION: 5000, // 5 seconds
  REVEAL_INCREMENT: 1000, // 1 second
};

// UI Configuration
export const UI_CONFIG = {
  LOADING_DELAY: 500,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  REDIRECT_DELAY: {
    SUCCESS: 1500,
    FAILURE: 2000
  }
};

// Validation Rules
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
  SCORE: {
    MIN: 0,
    MAX: 100,
  },
};

// Legacy export for backward compatibility
const config = {
  API_BASE_URL: API_CONFIG.BASE_URL,
  MAX_GUESSES: GAME_CONFIG.MAX_GUESSES,
  USERNAME_MAX_LENGTH: VALIDATION_RULES.USERNAME.MAX_LENGTH,
  LEADERBOARD_MAX_ENTRIES: 10,
  REDIRECT_DELAY: UI_CONFIG.REDIRECT_DELAY
};

export default config;
