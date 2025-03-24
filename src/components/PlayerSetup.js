import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';

const PlayerSetup = () => {
  const { players, addPlayer, removePlayer, startGame, selectedTopic, resetGame } = useGameContext();
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName);
      setNewPlayerName('');
    }
  };

  // Handle possible null selectedTopic (which happens when coming back from Lobby)
  const topicName = selectedTopic ? selectedTopic.name : 'Selected Topic';
  
  return (
    <div className="section animate-fade-in">
      <h2 className="section-title">Add Players</h2>
      <p className="section-description">
        Add all players who will be participating in the game. You need at least 3 players.
        Topic selected: <strong>{topicName}</strong>
      </p>

      <form className="player-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player name"
          maxLength={20}
          className="form-control"
        />
        <button type="submit" className="btn">Add Player</button>
      </form>

      {players.length > 0 && (
        <div className="players-container">
          <h3>Players:</h3>
          <ul className="players-list">
            {players.map((player, index) => (
              <li key={index} className="player-item">
                <div className="player-avatar">
                  {player.charAt(0).toUpperCase()}
                </div>
                <span className="player-name">{player}</span>
                <button 
                  className="btn btn-danger"
                  onClick={() => removePlayer(index)}
                  aria-label="Remove player"
                  style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="player-setup-actions">
        <button 
          className="btn btn-success btn-lg btn-block"
          onClick={startGame}
          disabled={players.length < 3}
          style={{ marginBottom: '15px' }}
        >
          Start Game
        </button>
        <button 
          className="btn btn-secondary btn-block"
          onClick={resetGame}
        >
          Back to Topics
        </button>
      </div>

      {players.length < 3 && (
        <p style={{ marginTop: '15px', color: 'var(--error)', textAlign: 'center' }}>
          Please add at least 3 players to start the game.
        </p>
      )}
    </div>
  );
};

export default PlayerSetup;