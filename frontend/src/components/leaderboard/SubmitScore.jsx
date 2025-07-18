import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { leaderboardService } from '../../services/leaderboardService';
import { Loading } from '../ui/Loading';
import { VALIDATION_RULES, UI_CONFIG } from '../../constants/config';
import '../../styles/SubmitScore.css';

function SubmitScore() {
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get game data from navigation state
  const { score, guessCount, carName, wasCorrect } = location.state || {};

  const fetchLeaderboardData = useCallback(async () => {
    try {
      const leaderboardData = await leaderboardService.getLeaderboard();
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError('Failed to load leaderboard. You can still submit your score.');
    }
  }, []);

  useEffect(() => {
    // If no game data, redirect to main game
    if (score === undefined) {
      navigate('/');
      return;
    }
    
    // Fetch current leaderboard
    const loadData = async () => {
      setIsLoading(true);
      await fetchLeaderboardData();
      setIsLoading(false);
    };
    
    loadData();
  }, [score, navigate, fetchLeaderboardData]);

  const handleSubmitScore = async () => {
    if (!username.trim()) {
      setMessage('Please enter your name before submitting.');
      return;
    }
    
    if (scoreSubmitted) {
      setMessage('You have already submitted your score!');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      await leaderboardService.submitScore(username.trim(), score);
      setMessage('Score submitted successfully!');
      setScoreSubmitted(true);
      
      // Refresh leaderboard
      await fetchLeaderboardData();
    } catch (error) {
      console.error('Error submitting score:', error);
      setError(error.message || 'Failed to submit score. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    // Only allow alphanumeric characters and spaces, limit to configured max length
    if (value.length <= VALIDATION_RULES.USERNAME.MAX_LENGTH) {
      setUsername(value);
    }
  };

  const handlePlayAgain = () => {
    navigate('/');
  };

  if (score === undefined) {
    return (
      <div className="submit-score-container">
        <div className="submit-score-card">
          <Loading message="Redirecting..." />
        </div>
      </div>
    );
  }

  return (
    <div className="submit-score-container">
      <div className="submit-score-card">
        <h1>🎉 Game Complete!</h1>
        
        <div className="game-result">
          {wasCorrect ? (
            <>
              <h2>🎯 Congratulations!</h2>
              <p className="car-name">The car was: <strong>{carName}</strong></p>
              <p className="score-info">You solved it in <strong>{guessCount}</strong> guess{guessCount !== 1 ? 'es' : ''}!</p>
              <div className="score-display">
                <span className="score-label">Your Score:</span>
                <span className="score-value">{score}</span>
              </div>
            </>
          ) : (
            <>
              <h2>💪 Nice Try!</h2>
              <p className="car-name">The car was: <strong>{carName}</strong></p>
              <p className="score-info">Better luck next time!</p>
              <div className="score-display">
                <span className="score-label">Your Score:</span>
                <span className="score-value">{score}</span>
              </div>
            </>
          )}
        </div>

        {score > 0 && (
          <div className="submit-section">
            <h3>Submit Your Score</h3>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={handleUsernameChange}
                disabled={scoreSubmitted || isSubmitting}
                maxLength={VALIDATION_RULES.USERNAME.MAX_LENGTH}
              />
              <button
                onClick={handleSubmitScore}
                disabled={!username.trim() || scoreSubmitted || isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? 'Submitting...' : scoreSubmitted ? 'Submitted!' : 'Submit Score'}
              </button>
            </div>
            {message && <p className={`message ${scoreSubmitted ? 'success' : 'info'}`}>{message}</p>}
            {error && <p className="message error">{error}</p>}
          </div>
        )}

        <div className="leaderboard-section">
          <h3>🏆 Leaderboard</h3>
          {isLoading ? (
            <Loading message="Loading leaderboard..." />
          ) : (
            <div className="leaderboard">
              {leaderboard.length > 0 ? (
                <ul>
                  {leaderboard.slice(0, 10).map((entry, index) => (
                    <li key={entry.username} className={`leaderboard-entry ${entry.username === username.trim() && scoreSubmitted ? 'highlight' : ''}`}>
                      <span className="rank">#{index + 1}</span>
                      <span className="username">{entry.username}</span>
                      <span className="score">{entry.score}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No scores yet. Be the first!</p>
              )}
            </div>
          )}
        </div>

        <div className="actions">
          <button onClick={handlePlayAgain} className="play-again-btn">
            🎮 Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

export { SubmitScore };
export default SubmitScore;
