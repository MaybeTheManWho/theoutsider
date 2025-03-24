import React from 'react';
import { useGameContext, GAME_PHASES } from '../contexts/GameContext';
import topics from '../data/topics';

const TopicSelection = () => {
  const { selectTopic, resetGame, isHost, gameCode } = useGameContext();

  const handleSelectTopic = (topic) => {
    // In a real implementation with backend, the host's selection
    // would be broadcasted to all connected players
    selectTopic(topic);
  };

  return (
    <div className="section animate-fade-in">
      <h2 className="section-title">Choose a Topic</h2>
      <p className="section-description">
        {gameCode ? (
          isHost ? 
            "As the host, select a topic for your game." :
            "Waiting for the host to select a topic..."
        ) : (
          "Select a topic for your game. Each player will be asked questions about this topic, except for 'The Outsider' who will need to blend in without knowing it."
        )}
      </p>
      
      {(!gameCode || isHost) && (
        <div className="topics-grid">
          {topics.map((topic) => (
            <div 
              key={topic.id} 
              className="topic-card" 
              onClick={() => handleSelectTopic(topic)}
            >
              <img 
                src={topic.image} 
                alt={topic.name} 
                className="topic-card-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150x120?text=Topic';
                }}
              />
              <div className="topic-card-title">{topic.name}</div>
            </div>
          ))}
        </div>
      )}
      
      {gameCode && !isHost && (
        <div className="waiting-for-host">
          <p>The host is selecting a topic...</p>
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <button 
        className="btn btn-secondary"
        onClick={resetGame}
        style={{ marginTop: '20px' }}
      >
        {gameCode ? 'Leave Game' : 'Back'}
      </button>
    </div>
  );
};

export default TopicSelection;