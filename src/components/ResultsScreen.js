import React, { useState, useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';

const ResultsScreen = () => {
  const { 
    players, 
    outsiderIndex, 
    getMostVotedPlayer, 
    secretItem, 
    selectedTopic, 
    resetGame,
    votes
  } = useGameContext();
  
  const [showOutsider, setShowOutsider] = useState(false);
  const [showVotes, setShowVotes] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const outsiderName = players[outsiderIndex];
  const mostVotedPlayerIndex = getMostVotedPlayer();
  const mostVotedPlayerName = players[mostVotedPlayerIndex];
  const outsiderWasIdentified = mostVotedPlayerIndex === outsiderIndex;
  
  // Format votes for display
  const formattedVotes = Object.entries(votes).map(([voterIndex, targetIndex]) => ({
    voter: players[parseInt(voterIndex)],
    target: players[parseInt(targetIndex)],
    isCorrect: parseInt(targetIndex) === outsiderIndex
  }));

  // Staged reveal animations
  useEffect(() => {
    // Reveal outsider after delay
    const outsiderTimer = setTimeout(() => {
      setShowOutsider(true);
    }, 1000);
    
    // Reveal votes after delay
    const votesTimer = setTimeout(() => {
      setShowVotes(true);
    }, 3000);
    
    // Reveal secret item after delay
    const secretTimer = setTimeout(() => {
      setShowSecret(true);
    }, 5000);
    
    // Show actions after all reveals
    const actionsTimer = setTimeout(() => {
      setShowActions(true);
    }, 6000);
    
    return () => {
      clearTimeout(outsiderTimer);
      clearTimeout(votesTimer);
      clearTimeout(secretTimer);
      clearTimeout(actionsTimer);
    };
  }, []);

  return (
    <div className="results-screen animate-fade-in">
      <h2 className="results-title">Game Results</h2>
      
      {showOutsider ? (
        <div className="results-outsider">
          <p>The Outsider was: <strong>{outsiderName}</strong></p>
          
          {outsiderWasIdentified ? (
            <div className="result-correct">
              <p>The group successfully identified the Outsider!</p>
            </div>
          ) : (
            <div className="result-incorrect">
              <p>The Outsider managed to blend in and avoid detection!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="waiting-reveal">
          <p>Revealing the Outsider...</p>
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {showVotes && (
        <div className="results-votes">
          <h3>How Everyone Voted:</h3>
          {formattedVotes.map((vote, index) => (
            <div 
              key={index} 
              className={`vote-item ${vote.isCorrect ? 'correct-vote' : ''}`}
            >
              <span className="voter-name">{vote.voter} voted for:</span>
              <span className="vote-result">
                {vote.target} {vote.isCorrect ? '✓' : ''}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {showSecret && (
        <div className="results-secret">
          <p>The secret {selectedTopic.name.toLowerCase()} was: <strong>{secretItem}</strong></p>
        </div>
      )}
      
      {showActions && (
        <div className="results-actions">
          <button 
            className="btn btn-lg btn-success"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsScreen;