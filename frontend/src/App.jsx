import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import GamePage from './pages/GamePage';
import { SubmitScore } from './components/leaderboard/SubmitScore';
import './styles/App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/submit-score" element={<SubmitScore />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;