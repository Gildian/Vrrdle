import { apiClient } from './ApiClient'

export const getRandomCar
= () => apiClient.get('/api/cars')

export const fetchLeaderboard
= () => apiClient.get('/api/leaderboard')

export const submitScore
= (username, score) => 
  apiClient.post('/api/leaderboard', { username, score })