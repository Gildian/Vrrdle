import React from 'react';
import { Game } from '../components/game/Game';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

const GamePage = () => {
  return (
    <ErrorBoundary>
      <div className="game-page">
        <Game />
      </div>
    </ErrorBoundary>
  );
};

export default GamePage;
