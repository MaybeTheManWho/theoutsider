import React, { useState } from 'react';
import { useGameContext, GAME_PHASES } from '../contexts/GameContext';

const CreateGame = () => {
  const { createGame, setGamePhase } = useGameContext();
  const [hostName, setHostName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hostName.trim() === '') {
      alert('Please enter your name');
      return;
    }
    
    createGame(hostName);
  };

  return (
    <div className="section animate-fade-in">
      <h2 className="section-title">Create a Game</h2>
      <p className="section-description">
        Set up a new game and invite your friends to join with a game code.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="hostName">Your Name:</label>
          <input
            type="text"
            id="hostName"
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
            placeholder="Enter your name"
            className="form-control"
            maxLength={20}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-lg btn-block">
            Create Game
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

export default CreateGame;