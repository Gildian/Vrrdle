import { apiClient } from './ApiClient'

export const getRandomCar
= () => apiClient.get('/api/cars')