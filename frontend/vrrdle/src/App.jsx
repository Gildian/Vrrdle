import { useState, useEffect } from 'react';
import './App.css';
import { getRandomCar, fetchLeaderboard, submitScore } from './api/ApiService';

const MAX_GUESSES = 5;

function App() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [carSound, setCarSound] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [username, setUsername] = useState('');
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const isGameOver = message.startsWith('Correct') || message.startsWith('Out of guesses');

  useEffect(() => {
    fetchRandomCar();
    fetchLeaderboard().then(res => setLeaderboard(res.data));
  }, []);

  function fetchRandomCar() {
    getRandomCar()
      .then(response => {
        setCorrectAnswer(response.data.name);
        setCarSound(response.data.mp3FileName);
        setGuessCount(0);
        setMessage('');
        setScoreSubmitted(false);
        setGuess('');
      })
      .catch(error => {
        console.error('Error fetching car:', error);
      });
  }

  const handleGuess = () => {
    if (guessCount >= MAX_GUESSES || isGameOver) return;
    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);

    if (guess.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage('Correct! You guessed the car!');
    } else if (newGuessCount >= MAX_GUESSES) {
      setMessage(`Out of guesses! The correct answer was: ${correctAnswer}`);
    } else {
      setMessage('Incorrect. Try again!');
    }
  };

  const handleSubmitScore = () => {
    if (!username.trim()) {
      setMessage('Please enter your name before submitting.');
      return;
    }
    if (scoreSubmitted) {
      setMessage('You have already submitted your score for this round.');
      return;
    }
    if (!isGameOver) {
      setMessage('Finish the round before submitting your score.');
      return;
    }

    const score = message.startsWith('Correct') ? (MAX_GUESSES + 1 - guessCount) : 0;

    submitScore(username, score)
      .then(() => {
        setMessage('Score submitted successfully!');
        setScoreSubmitted(true);
        fetchLeaderboard().then(res => setLeaderboard(res.data));
      })
      .catch(err => {
        console.error('Error submitting score:', err);
        setMessage('Failed to submit score.');
      });
  };

  return (
    <div className="vrrdle">
      <h1>Vrrdle</h1>
      <p>Guess the car based on its sound!</p>
      {carSound && (
        <audio controls key={carSound}>
          <source src={`http://localhost:8080${carSound}`} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
      <div className="guess-section">
        <input
          type="text"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={isGameOver}
        />
        <button
          onClick={handleGuess}
          disabled={isGameOver}
        >
          Submit Guess
        </button>
        <p>Guesses left: {MAX_GUESSES - guessCount}</p>
      </div>
      {message && <p className="message">{message}</p>}
      <div className="leaderboard-section">
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.map(entry => (
            <li key={entry.username}>
              <span>{entry.username}</span>
              <span>{entry.score}</span>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button
            onClick={handleSubmitScore}
            disabled={
              !username.trim() ||
              scoreSubmitted ||
              !isGameOver
            }
          >
            Submit Score
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;