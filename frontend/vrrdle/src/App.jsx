// ...existing code...
import { useState, useEffect } from 'react';
import './App.css';
import { getRandomCar } from './api/ApiService';

function App() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [carSound, setCarSound] = useState('');
  const [guessCount, setGuessCount] = useState(0); // Add guess count state

  useEffect(() => {
    fetchRandomCar();
  }, []);

  function fetchRandomCar() {
    getRandomCar()
      .then(response => {
          setCorrectAnswer(response.data.name);
          setCarSound(response.data.mp3FileName);
          setGuessCount(0); // Reset guess count on new car
          setMessage('');
      })
      .catch(error => {
          console.error('Error fetching car:', error);
      });
  }

  const handleGuess = () => {
    if (guessCount >= 5) return; // Prevent guessing after 5 attempts
    setGuessCount(guessCount + 1);
    if (guess.toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage('Correct! You guessed the car!');
    } else if (guessCount + 1 >= 5) {
      setMessage(`Out of guesses! The correct answer was: ${correctAnswer}`);
    } else {
      setMessage('Incorrect. Try again!');
    }
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
    </div>
  );
}

export default App;