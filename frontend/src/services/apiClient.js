import axios from 'axios';
import { API_CONFIG } from '../constants/config';

export const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for debugging
apiClient.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('Response error:', error.response?.status, error.response?.data || error.message);
        
        // Handle network errors
        if (!error.response) {
            error.message = 'Network error. Please check your connection and try again.';
        }
        
        return Promise.reject(error);
    }
);