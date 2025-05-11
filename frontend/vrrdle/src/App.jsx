import { useState } from 'react';
import './App.css';

function App() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const correctAnswer = 'Ferrari'; // Example correct answer
  const carSound = '/sounds/ferrari.mp3'; // Path to the car sound file

  const handleGuess = () => {
    if (guess.toLowerCase() === correctAnswer.toLowerCase()) {
      setMessage('Correct! You guessed the car!');
    } else {
      setMessage('Incorrect. Try again!');
    }
  };

  return (
    <div className="vrrdle">
      <h1>Vrrdle</h1>
      <p>Guess the car based on its sound!</p>
      <audio controls>
        <source src={carSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="guess-section">
        <input
          type="text"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={handleGuess}>Submit Guess</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
