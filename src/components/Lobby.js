import React from 'react';
import { useGameContext } from '../contexts/GameContext';

const Lobby = () => {
  const { 
    gameCode, 
    connectedPlayers, 
    isHost, 
    playerName, 
    startGameFromLobby,
    resetGame,
    selectedTopic
  } = useGameContext();

  // Function to copy game code to clipboard
  const copyGameCode = () => {
    navigator.clipboard.writeText(gameCode);
    alert('Game code copied to clipboard!');
  };

  // Function to get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Generate random colors for player avatars
  const getAvatarColor = (name) => {
    const colors = [
      '#BB86FC', // Primary
      '#03DAC6', // Secondary
      '#CF6679', // Error
      '#3700B3', // Primary Variant
      '#018786', // Secondary Variant
      '#6200EE', // Purple
      '#3700B3', // Deep Purple
      '#03DAC6', // Teal
      '#018786', // Cyan
    ];
    
    // Simple hash function to get consistent color for the same name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="section animate-fade-in">
      <h2 className="section-title">Game Lobby</h2>
      
      {selectedTopic && (
        <div className="selected-topic">
          <img
            src={selectedTopic.image}
            alt={selectedTopic.name}
            className="selected-topic-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/80x80?text=' + selectedTopic.name;
            }}
          />
          <div className="selected-topic-info">
            <h3>{selectedTopic.name}</h3>
            <p>{selectedTopic.description}</p>
          </div>
        </div>
      )}
      
      <div className="game-code-container">
        <p>Share this code with your friends:</p>
        <div className="game-code">
          <span>{gameCode}</span>
          <button 
            className="copy-button"
            onClick={copyGameCode}
            aria-label="Copy game code"
          >
            📋
          </button>
        </div>
      </div>
      
      <div className="players-container">
        <h3>Players ({connectedPlayers.length}):</h3>
        
        <div className="players-grid">
          {connectedPlayers.map((player, index) => (
            <div key={index} className="player-card">
              <div 
                className="player-avatar" 
                style={{ backgroundColor: getAvatarColor(player.name) }}
              >
                {getInitials(player.name)}
              </div>
              <div className="player-card-info">
                <span className="player-card-name">{player.name}</span>
                <div className="player-card-badges">
                  {player.isHost && (
                    <span className="player-badge host-badge">Host</span>
                  )}
                  {player.name === playerName && !player.isHost && (
                    <span className="player-badge you-badge">You</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Add empty slots if less than 8 players */}
          {Array.from({ length: Math.max(0, 8 - connectedPlayers.length) }).map((_, index) => (
            <div key={`empty-${index}`} className="player-card empty-slot">
              <div className="empty-avatar">
                <span>+</span>
              </div>
              <div className="player-card-info">
                <span className="empty-slot-text">Waiting for player...</span>
              </div>
            </div>
          ))}
        </div>
        
        <p className="min-players-note">
          {connectedPlayers.length < 3 
            ? `Need at least 3 players to start (${3 - connectedPlayers.length} more needed)`
            : 'Ready to start the game!'}
        </p>
      </div>
      
      <div className="lobby-actions">
        {isHost ? (
          <button 
            className="btn btn-success btn-lg btn-block"
            onClick={startGameFromLobby}
            disabled={connectedPlayers.length < 3}
            style={{ marginBottom: '15px' }}
          >
            Start Game
          </button>
        ) : (
          <div className="waiting-host-message">
            <p>Waiting for the host to start the game...</p>
            <div className="loading-spinner"></div>
          </div>
        )}
        
        <button 
          className="btn btn-secondary btn-block"
          onClick={resetGame}
        >
          Leave Game
        </button>
      </div>
    </div>
  );
};

export default Lobby;