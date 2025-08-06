import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameService } from '../../services/gameService';
import { leaderboardService } from '../../services/leaderboardService';
import { Loading } from '../ui/Loading';
import AudioPlayer from '../ui/AudioPlayer';
import { GAME_CONFIG, API_CONFIG, UI_CONFIG } from '../../constants/config';
import '../../styles/Game.css';

const MAX_GUESSES = GAME_CONFIG.MAX_GUESSES;

function Game() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [carSound, setCarSound] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const fetchRandomCar = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const carData = await gameService.getCarOfTheDay();
      setCorrectAnswer(carData.name);
      setCarSound(carData.mp3FileName);
      setGuessCount(0);
      setMessage('');
      setIsGameOver(false);
      setWasCorrect(false);
      setGuess('');
    } catch (error) {
      setError(error.message || 'Failed to load car. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchLeaderboardData = useCallback(async () => {
    try {
      const leaderboardData = await leaderboardService.getLeaderboard();
      setLeaderboard(leaderboardData);
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    const initializeGame = async () => {
      await Promise.all([
        fetchRandomCar(),
        fetchLeaderboardData()
      ]);
    };
    
    initializeGame();
  }, [fetchRandomCar, fetchLeaderboardData]);

  const handleGuess = async () => {
    if (guessCount >= MAX_GUESSES || isGameOver || isSubmitting) return;
    
    setIsSubmitting(true);
    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);

    try {
      if (guess.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        setMessage('Correct! You guessed the car!');
        setIsGameOver(true);
        setWasCorrect(true);
        
        // Calculate score and redirect to submit score page
        const score = MAX_GUESSES + 1 - newGuessCount;
        setTimeout(() => {
          navigate('/submit-score', {
            state: {
              score,
              guessCount: newGuessCount,
              carName: correctAnswer,
              wasCorrect: true
            }
          });
        }, UI_CONFIG.REDIRECT_DELAY.SUCCESS);
        
      } else if (newGuessCount >= MAX_GUESSES) {
        setMessage(`Out of guesses! The correct answer was: ${correctAnswer}`);
        setIsGameOver(true);
        setWasCorrect(false);
        
        // Redirect to submit score page with 0 score
        setTimeout(() => {
          navigate('/submit-score', {
            state: {
              score: 0,
              guessCount: newGuessCount,
              carName: correctAnswer,
              wasCorrect: false
            }
          });
        }, UI_CONFIG.REDIRECT_DELAY.FAILURE);
        
      } else {
        setMessage(`Incorrect. Try again! (${MAX_GUESSES - newGuessCount} guesses left)`);
      }
    } catch (error) {
      setError('An error occurred while processing your guess. Please try again.');
    } finally {
      setIsSubmitting(false);
      setGuess('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isGameOver && guess.trim() && !isSubmitting) {
      handleGuess();
    }
  };

  const handleRetry = () => {
    setError('');
    fetchRandomCar();
  };

  if (isLoading) {
    return (
      <div className="game-container">
        <div className="game-card">
          <Loading message="Loading car..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-container">
        <div className="game-card">
          <div className="error-message">
            <h2>🚨 Error</h2>
            <p>{error}</p>
            <button onClick={handleRetry} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-card">
        <h1>🚗 Vrrdle</h1>
        <p className="game-description">Guess the car based on its engine sound!</p>
        
        {carSound && (
          <AudioPlayer 
            src={`${API_CONFIG.BASE_URL}${carSound}`}
            className="game-audio-player"
          />
        )}
        
        <div className="guess-section">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your guess..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isGameOver || isSubmitting}
              maxLength={50}
            />
            <button
              onClick={handleGuess}
              disabled={isGameOver || !guess.trim() || isSubmitting}
              className="guess-btn"
            >
              {isSubmitting ? 'Processing...' : isGameOver ? '✓' : 'Guess'}
            </button>
          </div>
          
          <div className="game-info">
            <p className="guesses-left">
              Guesses: {guessCount}/{MAX_GUESSES}
            </p>
          </div>
        </div>

        {message && (
          <div className={`message ${wasCorrect ? 'success' : isGameOver ? 'game-over' : 'info'}`}>
            {message}
            {isGameOver && (
              <div className="game-over-actions">
                {wasCorrect ? (
                  <p className="redirect-info">Redirecting to score submission...</p>
                ) : (
                  <p className="redirect-info">Redirecting to results...</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="current-leaderboard">
          <h3>🏆 Current Leaders</h3>
          <div className="mini-leaderboard">
            {leaderboard.slice(0, 5).map((entry, index) => (
              <div key={entry.username} className="mini-leaderboard-entry">
                <span className="rank">#{index + 1}</span>
                <span className="username">{entry.username}</span>
                <span className="score">{entry.score}</span>
              </div>
            ))}
            {leaderboard.length === 0 && (
              <p className="no-scores">No scores yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Game };
export default Game;
