import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';
import topics from '../data/topics';
import GameModeSelection from './GameModeSelection';

const LandingPage = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  // If a topic is selected, show the game mode selection
  if (selectedTopic) {
    return <GameModeSelection topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
  }

  return (
    <div className="landing-container animate-fade-in">
      <div className="landing-header">
        <h1 className="landing-title">The Outsider</h1>
        <p className="landing-subtitle">
          A social deduction game where one player doesn't know the topic and must blend in
        </p>
      </div>
      
      <div className="topics-grid">
        {topics.map((topic) => (
          <div 
            key={topic.id} 
            className="topic-card" 
            onClick={() => handleTopicSelect(topic)}
          >
            <img 
              src={topic.image} 
              alt={topic.name} 
              className="topic-card-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x200?text=' + topic.name;
              }}
            />
            <div className="topic-card-content">
              <h3 className="topic-card-title">{topic.name}</h3>
              <p className="topic-card-description">{topic.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="how-to-play">
        <h2>How to Play</h2>
        <div className="how-to-play-steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Choose a Topic</h3>
            <p className="step-description">Select a topic category that your group is familiar with</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Setup Players</h3>
            <p className="step-description">One player will secretly be assigned as "The Outsider"</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Ask Questions</h3>
            <p className="step-description">Players take turns asking each other about the topic</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">4</div>
            <h3 className="step-title">Vote & Guess</h3>
            <p className="step-description">Vote on who's The Outsider, then they'll try to guess the topic</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;