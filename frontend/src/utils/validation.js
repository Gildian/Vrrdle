/**
 * Validates a username according to game rules
 * @param {string} username - The username to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateUsername = (username) => {
  if (!username || username.trim().length === 0) {
    return { isValid: false, message: 'Username is required' };
  }
  
  if (username.length < 2) {
    return { isValid: false, message: 'Username must be at least 2 characters long' };
  }
  
  if (username.length > 20) {
    return { isValid: false, message: 'Username must be less than 20 characters' };
  }
  
  const pattern = /^[a-zA-Z0-9_-]+$/;
  if (!pattern.test(username)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, underscores, and hyphens' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validates a score
 * @param {number} score - The score to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateScore = (score) => {
  if (typeof score !== 'number' || isNaN(score)) {
    return { isValid: false, message: 'Score must be a number' };
  }
  
  if (score < 0) {
    return { isValid: false, message: 'Score cannot be negative' };
  }
  
  if (score > 100) {
    return { isValid: false, message: 'Score cannot exceed 100' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} The debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Formats a timestamp to a readable string
 * @param {string|Date} timestamp - The timestamp to format
 * @returns {string} Formatted timestamp
 */
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

/**
 * Calculates score based on guess number
 * @param {number} guessNumber - The guess number (1-based)
 * @param {number} maxGuesses - Maximum number of guesses allowed
 * @returns {number} The calculated score
 */
export const calculateScore = (guessNumber, maxGuesses = 5) => {
  if (guessNumber < 1 || guessNumber > maxGuesses) {
    return 0;
  }
  
  // Score decreases as guess number increases
  const baseScore = 100;
  const penalty = Math.floor((guessNumber - 1) * (baseScore / maxGuesses));
  return Math.max(0, baseScore - penalty);
};

/**
 * Normalizes a string for comparison (removes spaces, converts to lowercase)
 * @param {string} str - The string to normalize
 * @returns {string} Normalized string
 */
export const normalizeString = (str) => {
  return str.toLowerCase().replace(/\s+/g, '').trim();
};

/**
 * Checks if two car names are similar (for guess validation)
 * @param {string} guess - The player's guess
 * @param {string} correct - The correct answer
 * @returns {boolean} Whether the guess is close enough
 */
export const isGuessCorrect = (guess, correct) => {
  const normalizedGuess = normalizeString(guess);
  const normalizedCorrect = normalizeString(correct);
  
  // Exact match
  if (normalizedGuess === normalizedCorrect) {
    return true;
  }
  
  // Check if guess contains the correct answer or vice versa
  return normalizedGuess.includes(normalizedCorrect) || 
         normalizedCorrect.includes(normalizedGuess);
};
