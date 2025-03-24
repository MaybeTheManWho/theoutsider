import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';

const VotingScreen = () => {
  const { 
    players, 
    castVote, 
    completeVoting, 
    votes, 
    outsiderIndex, 
    setGamePhase, 
    GAME_PHASES,
    isHost
  } = useGameContext();
  
  const [currentVoter, setCurrentVoter] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showVote, setShowVote] = useState(false);
  const [isVoting, setIsVoting] = useState(true);
  const [votingComplete, setVotingComplete] = useState(false);
  
  const handlePlayerSelect = (index) => {
    setSelectedPlayer(index);
  };

  const handleVote = () => {
    if (selectedPlayer !== null) {
      castVote(currentVoter, selectedPlayer);
      setShowVote(true);
      
      // Add animation state
      setIsVoting(false);
      
      // Wait for animation to complete
      setTimeout(() => {
        setShowVote(false);
        setIsVoting(true);
        setSelectedPlayer(null);
        
        if (currentVoter < players.length - 1) {
          setCurrentVoter(currentVoter + 1);
        } else {
          // All players have voted
          setVotingComplete(true);
        }
      }, 2000);
    }
  };

  const handleRevealResults = () => {
    completeVoting();
  };

  // If not the host, show waiting screen
  if (!isHost && !votingComplete) {
    return (
      <div className="voting-screen section animate-fade-in">
        <h2 className="section-title">Time to Vote</h2>
        <p className="gameplay-instruction">
          The host is controlling the voting process. Please discuss with your group.
        </p>
        <div className="waiting-for-host">
          <p>Waiting for everyone to cast their votes...</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // Voting complete, waiting for host to reveal results
  if (votingComplete) {
    return (
      <div className="voting-screen section animate-fade-in">
        <h2 className="section-title">Voting Complete</h2>
        <p className="gameplay-instruction">
          Everyone has cast their vote. Ready to reveal the results?
        </p>
        
        {isHost ? (
          <button 
            className="btn btn-lg btn-success"
            onClick={handleRevealResults}
          >
            Reveal The Outsider
          </button>
        ) : (
          <div className="waiting-for-host">
            <p>Waiting for the host to reveal the results...</p>
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="voting-screen section animate-fade-in">
      <h2 className="section-title">Time to Vote</h2>
      
      {isVoting ? (
        <>
          <p className="voting-player">
            {players[currentVoter]}, who do you think is the outsider?
          </p>
          
          <div className="voting-options">
            {players.map((player, index) => (
              index !== currentVoter && (
                <div 
                  key={index}
                  className={`voting-option ${selectedPlayer === index ? 'selected' : ''}`}
                  onClick={() => handlePlayerSelect(index)}
                >
                  {player}
                </div>
              )
            ))}
          </div>
          
          <button 
            className="btn btn-lg"
            onClick={handleVote}
            disabled={selectedPlayer === null}
          >
            Cast Vote
          </button>
        </>
      ) : (
        <div className="vote-animation">
          <p className="voting-player">
            {players[currentVoter]} voted for {players[selectedPlayer]}
          </p>
          
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <div className="progress-indicator">
        <p>Vote {currentVoter + 1} of {players.length}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentVoter + 1) / players.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VotingScreen;