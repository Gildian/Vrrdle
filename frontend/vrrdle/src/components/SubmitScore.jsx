import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitScore, fetchLeaderboard } from '../api/ApiService';
import './SubmitScore.css';

function SubmitScore() {
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get game data from navigation state
  const { score, guessCount, carName, wasCorrect } = location.state || {};
  
  useEffect(() => {
    // If no game data, redirect to main game
    if (score === undefined) {
      navigate('/');
      return;
    }
    
    // Fetch current leaderboard
    fetchLeaderboard()
      .then(res => setLeaderboard(res.data))
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [score, navigate]);

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
    try {
      await submitScore(username, score);
      setMessage('Score submitted successfully!');
      setScoreSubmitted(true);
      
      // Refresh leaderboard
      const updatedLeaderboard = await fetchLeaderboard();
      setLeaderboard(updatedLeaderboard.data);
    } catch (err) {
      console.error('Error submitting score:', err);
      setMessage('Failed to submit score. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlayAgain = () => {
    navigate('/');
  };

  if (score === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="submit-score-container">
      <div className="submit-score-card">
        <h1>🎉 Congratulations!</h1>
        
        <div className="game-result">
          {wasCorrect ? (
            <>
              <h2>You guessed correctly!</h2>
              <p className="car-name">The car was: <strong>{carName}</strong></p>
              <p className="score-info">You solved it in <strong>{guessCount}</strong> guess{guessCount !== 1 ? 'es' : ''}!</p>
              <div className="score-display">
                <span className="score-label">Your Score:</span>
                <span className="score-value">{score}</span>
              </div>
            </>
          ) : (
            <>
              <h2>Game Over</h2>
              <p className="car-name">The car was: <strong>{carName}</strong></p>
              <p className="score-info">Better luck next time!</p>
              <div className="score-display">
                <span className="score-label">Your Score:</span>
                <span className="score-value">{score}</span>
              </div>
            </>
          )}
        </div>

        <div className="submit-section">
          <h3>Submit Your Score</h3>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={scoreSubmitted || isSubmitting}
              maxLength={20}
            />
            <button
              onClick={handleSubmitScore}
              disabled={!username.trim() || scoreSubmitted || isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? 'Submitting...' : scoreSubmitted ? 'Submitted!' : 'Submit Score'}
            </button>
          </div>
          {message && <p className={`message ${scoreSubmitted ? 'success' : 'error'}`}>{message}</p>}
        </div>

        <div className="leaderboard-section">
          <h3>🏆 Leaderboard</h3>
          <div className="leaderboard">
            {leaderboard.length > 0 ? (
              <ul>
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <li key={entry.username} className={`leaderboard-entry ${entry.username === username && scoreSubmitted ? 'highlight' : ''}`}>
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

export default SubmitScore;
