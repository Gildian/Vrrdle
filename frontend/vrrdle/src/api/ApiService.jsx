import { apiClient } from './ApiClient'

export const getRandomCar = async () => {
    try {
        const response = await apiClient.get('/api/cars');
        return response.data;
    } catch (error) {
        console.error('Error fetching random car:', error);
        throw error;
    }
}