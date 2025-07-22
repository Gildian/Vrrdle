import axios from 'axios';
import { API_CONFIG } from '../constants/config';

export const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle network errors
        if (!error.response) {
            error.message = 'Network error. Please check your connection and try again.';
        }
        
        return Promise.reject(error);
    }
);