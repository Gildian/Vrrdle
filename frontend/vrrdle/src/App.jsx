import { useState, useEffect } from 'react';
import './App.css';
import { getRandomCar } from './api/ApiService';
import { fetchLeaderboard, submitScore } from './api/ApiService';

function App() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [carSound, setCarSound] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [username, setUsername] = useState('');
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  useEffect(() => {
    fetchRandomCar();
    fetchLeaderboard().then(res => setLeaderboard(res.data));
  }, []);

function fetchRandomCar() {
  getRandomCar()
    .then(response => {
        setCorrectAnswer(response.data.name);
        setCarSound(response.data.mp3FileName);
        setGuessCount(0); // Reset guess count on new car
        setMessage('');
        setScoreSubmitted(false); // Reset score submission state on new car
    })
    .catch(error => {
        console.error('Error fetching car:', error);
    });
}


  function Leaderboard() {
    fetchLeaderboard()
      .then(res => setLeaderboard(res.data))
      .catch(err => console.error('Error fetching leaderboard:', err));
  }
const handleGuess = () => {
  if (guessCount >= 5 || message.startsWith('Correct')) return; // Prevent guessing after 5 attempts or after correct guess
  const newGuessCount = guessCount + 1;
  setGuessCount(newGuessCount);

  if (guess.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    setMessage('Correct! You guessed the car!');
  } else if (newGuessCount >= 5) {
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
  if (!message.startsWith('Correct') && !message.startsWith('Out of guesses')) {
    setMessage('Finish the round before submitting your score.');
    return;
  }
  
    const score = message.startsWith('Correct') ? guessCount : 0;

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
        disabled={guessCount >= 5 || message.startsWith('Correct')}
      />
      <button
        onClick={handleGuess}
        disabled={guessCount >= 5 || message.startsWith('Correct')}
      >
        Submit Guess
      </button>
      <p>Guesses left: {5 - guessCount}</p>
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
    (!message.startsWith('Correct') && !message.startsWith('Out of guesses'))
  }
>
  Submit Score
</button>
      </div>
    </div>
  </div>
);
// ...existing code...
}
export default App;