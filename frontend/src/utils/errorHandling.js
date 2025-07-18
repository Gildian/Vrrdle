/**
 * Handles API errors and formats them for user display
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error;
    
    switch (status) {
      case 400:
        return message || 'Invalid request. Please check your input.';
      case 401:
        return 'You are not authorized to perform this action.';
      case 403:
        return 'Access denied.';
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return message || `An error occurred (${status}). Please try again.`;
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection and try again.';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred.';
  }
};

/**
 * Logs errors to console in development mode
 * @param {string} context - The context where the error occurred
 * @param {Error} error - The error object
 */
export const logError = (context, error) => {
  if (import.meta.env.DEV) {
    console.error(`[${context}] Error:`, error);
  }
};

/**
 * Creates a standardized error object
 * @param {string} message - The error message
 * @param {string} code - The error code
 * @param {any} details - Additional error details
 * @returns {Object} Standardized error object
 */
export const createError = (message, code = 'GENERIC_ERROR', details = null) => {
  return {
    message,
    code,
    details,
    timestamp: new Date().toISOString(),
  };
};
