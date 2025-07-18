import { useState, useEffect, useCallback } from 'react';
import { gameService } from '../services/gameService';
import { calculateScore, isGuessCorrect } from '../utils/validation';
import { handleApiError, logError } from '../utils/errorHandling';
import { GAME_CONFIG } from '../constants/config';

/**
 * Custom hook for managing game state and logic
 * @returns {Object} Game state and methods
 */
export const useGame = () => {
  const [gameState, setGameState] = useState({
    currentCar: null,
    guesses: [],
    currentGuess: 0,
    isGameOver: false,
    isWon: false,
    isLoading: false,
    error: null,
    score: 0,
  });

  const [audioElement, setAudioElement] = useState(null);
  const [audioRevealTime, setAudioRevealTime] = useState(1000); // Start with 1 second

  /**
   * Initializes a new game
   */
  const initializeGame = useCallback(async () => {
    setGameState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const car = await gameService.getCarOfTheDay();
      
      setGameState(prev => ({
        ...prev,
        currentCar: car,
        guesses: [],
        currentGuess: 0,
        isGameOver: false,
        isWon: false,
        isLoading: false,
        error: null,
        score: 0,
      }));
      
      setAudioRevealTime(1000); // Reset audio reveal time
    } catch (error) {
      logError('Game Initialization', error);
      setGameState(prev => ({
        ...prev,
        isLoading: false,
        error: handleApiError(error),
      }));
    }
  }, []);

  /**
   * Submits a guess
   * @param {string} guess - The player's guess
   */
  const submitGuess = useCallback((guess) => {
    if (gameState.isGameOver || !gameState.currentCar) {
      return;
    }

    const newGuesses = [...gameState.guesses, guess];
    const newGuessNumber = gameState.currentGuess + 1;
    const isCorrect = isGuessCorrect(guess, gameState.currentCar.name);
    const isLastGuess = newGuessNumber >= GAME_CONFIG.MAX_GUESSES;
    const gameOver = isCorrect || isLastGuess;
    
    let score = 0;
    if (isCorrect) {
      score = calculateScore(newGuessNumber, GAME_CONFIG.MAX_GUESSES);
    }

    setGameState(prev => ({
      ...prev,
      guesses: newGuesses,
      currentGuess: newGuessNumber,
      isGameOver: gameOver,
      isWon: isCorrect,
      score,
    }));

    // Increase audio reveal time for next guess
    if (!gameOver) {
      setAudioRevealTime(prev => Math.min(prev + GAME_CONFIG.REVEAL_INCREMENT, GAME_CONFIG.AUDIO_DURATION));
    }
  }, [gameState.currentCar, gameState.guesses, gameState.currentGuess, gameState.isGameOver]);

  /**
   * Plays audio for the current reveal time
   */
  const playAudio = useCallback(() => {
    if (!gameState.currentCar || !audioElement) {
      return;
    }

    audioElement.currentTime = 0;
    audioElement.play();
    
    setTimeout(() => {
      audioElement.pause();
    }, audioRevealTime);
  }, [gameState.currentCar, audioElement, audioRevealTime]);

  /**
   * Sets up audio element when car is loaded
   */
  useEffect(() => {
    if (gameState.currentCar) {
      const audio = new Audio(gameState.currentCar.mp3FileName);
      audio.preload = 'auto';
      setAudioElement(audio);
      
      return () => {
        audio.pause();
        audio.src = '';
      };
    }
  }, [gameState.currentCar]);

  /**
   * Initialize game on component mount
   */
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    gameState,
    audioRevealTime,
    initializeGame,
    submitGuess,
    playAudio,
  };
};
