/**
 * @typedef {Object} Car
 * @property {string} name - The car's name
 * @property {string} make - The car's make
 * @property {string} model - The car's model
 * @property {string} mp3FileName - The audio file name
 */

/**
 * @typedef {Object} LeaderboardEntry
 * @property {string} username - The player's username
 * @property {number} score - The player's score
 * @property {string} [timestamp] - When the score was submitted
 */

/**
 * @typedef {Object} GameState
 * @property {Car|null} currentCar - The current car being guessed
 * @property {string[]} guesses - Array of guesses made
 * @property {number} currentGuess - Current guess number (0-based)
 * @property {boolean} isGameOver - Whether the game is finished
 * @property {boolean} isWon - Whether the player won
 * @property {boolean} isLoading - Whether the game is loading
 * @property {string|null} error - Any error message
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {any} data - The response data
 * @property {string} [message] - Optional message
 * @property {string} [error] - Optional error message
 */

export {}; // This file is used for JSDoc type definitions
