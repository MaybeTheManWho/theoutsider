import React, { useState } from 'react';
import { useGameContext, GAME_PHASES } from '../contexts/GameContext';

const JoinGame = () => {
  const { joinGame, setGamePhase } = useGameContext();
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (playerName.trim() === '') {
      setError('Please enter your name');
      return;
    }
    
    if (gameCode.trim() === '') {
      setError('Please enter a game code');
      return;
    }
    
    // In a real app, this would validate with the backend
    const success = joinGame(gameCode.toUpperCase(), playerName);
    
    if (!success) {
      setError('Invalid game code or game is full');
    }
  };

  return (
    <div className="section animate-fade-in">
      <h2 className="section-title">Join a Game</h2>
      <p className="section-description">
        Enter a game code to join your friends.
      </p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerName">Your Name:</label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="form-control"
            maxLength={20}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="gameCode">Game Code:</label>
          <input
            type="text"
            id="gameCode"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
            placeholder="Enter 6-character code"
            className="form-control"
            maxLength={6}
            style={{ textTransform: 'uppercase' }}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-lg btn-block">
            Join Game
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary btn-block"
            onClick={() => setGamePhase(GAME_PHASES.LANDING)}
            style={{ marginTop: '15px' }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinGame;