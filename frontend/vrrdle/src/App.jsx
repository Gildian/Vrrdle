import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import SubmitScore from './components/SubmitScore';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/submit-score" element={<SubmitScore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;