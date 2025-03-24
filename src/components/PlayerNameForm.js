import React, { useState } from 'react';
import { useGameContext, GAME_PHASES } from '../contexts/GameContext';

const PlayerNameForm = ({ mode, topic, onBack }) => {
  const { createGame, joinGame, selectTopic, setGamePhase } = useGameContext();
  const [name, setName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim() === '') {
      setError('Please enter your name');
      return;
    }
    
    if (mode === 'host') {
      // Create a new game
      const code = createGame(name);
      
      // Display the code first
      setGeneratedCode(code);
      setShowCode(true);
      
      // Select the topic for this game
      selectTopic(topic);
      
      // Navigation will happen after the user sees the code
    } else if (mode === 'join') {
      if (gameCode.trim() === '') {
        setError('Please enter a game code');
        return;
      }
      
      // Try to join the game
      const success = joinGame(gameCode.toUpperCase(), name);
      
      if (!success) {
        setError('Invalid game code or game is full');
      }
      
      // No need to navigate, the context will update the game phase
    }
  };

  // Copy game code to clipboard
  const copyGameCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Game code copied to clipboard!');
  };

  // For host mode after code is generated
  if (mode === 'host' && showCode) {
    return (
      <div className="form-container animate-fade-in">
        <h2 className="section-title">Your Game Code</h2>
        
        <div className="game-code-container">
          <p>Share this code with your friends:</p>
          <div className="game-code">
            <span>{generatedCode}</span>
            <button 
              className="copy-button"
              onClick={copyGameCode}
              aria-label="Copy game code"
            >
              📋
            </button>
          </div>
          <p className="code-instructions">
            Friends can join with this code while you're in the lobby
          </p>
        </div>
        
        <button 
          className="btn btn-success btn-lg btn-block"
          onClick={() => setGamePhase(GAME_PHASES.LOBBY)}
        >
          Continue to Lobby
        </button>
      </div>
    );
  }

  return (
    <div className="form-container animate-fade-in">
      <h2 className="section-title">
        {mode === 'host' ? 'Host New Game' : 'Join Game'}
      </h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerName">Your Name:</label>
          <input
            type="text"
            id="playerName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="form-control"
            maxLength={20}
          />
        </div>
        
        {mode === 'join' && (
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
        )}
        
        <div className="form-actions">
          <button type="submit" className="btn btn-lg btn-block">
            {mode === 'host' ? 'Create Game' : 'Join Game'}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary btn-block"
            onClick={onBack}
            style={{ marginTop: '15px' }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayerNameForm;