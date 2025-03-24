import React, { useState } from 'react';
import { useGameContext, GAME_PHASES } from '../contexts/GameContext';
import PlayerNameForm from './PlayerNameForm';

const GameModeSelection = ({ topic, onBack }) => {
  const { selectTopic } = useGameContext();
  const [mode, setMode] = useState(null);

  const handlePlayLocally = () => {
    // Skip the name input for local play and go directly to player setup
    selectTopic(topic);
  };

  const handleMode = (selectedMode) => {
    setMode(selectedMode);
  };

  // If a mode is selected, show the name input form
  if (mode) {
    return <PlayerNameForm mode={mode} topic={topic} onBack={() => setMode(null)} />;
  }

  return (
    <div className="game-mode-container animate-fade-in">
      <div className="selected-topic">
        <img
          src={topic.image}
          alt={topic.name}
          className="selected-topic-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/80x80?text=' + topic.name;
          }}
        />
        <div className="selected-topic-info">
          <h3>{topic.name}</h3>
          <p>{topic.description}</p>
        </div>
      </div>

      <h2 className="section-title">Choose Game Mode</h2>
      
      <div className="game-modes">
        <div className="game-mode-card" onClick={() => handlePlayLocally()}>
          <div className="game-mode-icon">🎮</div>
          <h3 className="game-mode-title">Play Locally</h3>
          <p className="game-mode-description">
            Play with friends by passing the device around. No account required.
          </p>
          <button className="btn">Start Local Game</button>
        </div>
        
        <div className="game-mode-card" onClick={() => handleMode('host')}>
          <div className="game-mode-icon">👑</div>
          <h3 className="game-mode-title">Host Online Game</h3>
          <p className="game-mode-description">
            Create a game and invite friends to join with a game code.
          </p>
          <button className="btn">Host Game</button>
        </div>
        
        <div className="game-mode-card" onClick={() => handleMode('join')}>
          <div className="game-mode-icon">🔗</div>
          <h3 className="game-mode-title">Join Online Game</h3>
          <p className="game-mode-description">
            Join a friend's game with their game code.
          </p>
          <button className="btn">Join Game</button>
        </div>
      </div>
      
      <button 
        className="btn btn-secondary"
        onClick={onBack}
        style={{ marginTop: '30px' }}
      >
        Back to Topics
      </button>
    </div>
  );
};

export default GameModeSelection;