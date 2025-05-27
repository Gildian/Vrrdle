import { useState, useEffect } from 'react';
import './App.css';
import { getRandomCar } from './api/ApiService';

function App() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(''); // Example correct answer
  const [carSound, setCarSound] = useState(''); // Example sound URL

    useEffect(() => {
    fetchRandomCar();
  }, []);

  function fetchRandomCar() {
    getRandomCar()
      .then(response => {
          setCorrectAnswer(response.data.name); // Assuming the API returns a car object with a name property
          setCarSound(response.data.mp3FileName); // Assuming the API returns a sound URL
          console.log('Fetched car:', response);
      })
      .catch(error => {
          console.error('Error fetching car:', error);
      });
  }

  const handleGuess = () => {
    if (guess.toLowerCase() === correctAnswer.toLowerCase()) {
      console.log(`Correct answer: ${correctAnswer}`);
      setMessage('Correct! You guessed the car!');
    } else {
      console.log(`Correct answer: ${correctAnswer}`);
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