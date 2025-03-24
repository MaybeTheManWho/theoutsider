import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';

const RoleReveal = () => {
  const { 
    players, 
    currentPlayerIndex, 
    outsiderIndex, 
    nextPlayer,
    selectedTopic,
    secretItem
  } = useGameContext();
  const [showRole, setShowRole] = useState(false);
  
  const isOutsider = currentPlayerIndex === outsiderIndex;
  const currentPlayer = players[currentPlayerIndex];

  const handleRevealRole = () => {
    setShowRole(true);
  };

  const handleNextPlayer = () => {
    setShowRole(false);
    nextPlayer();
  };

  return (
    <div className="role-reveal animate-fade-in">
      <h2 className="role-reveal-title">Role Reveal</h2>
      
      {!showRole ? (
        <>
          <p className="role-reveal-player">{currentPlayer}</p>
          <p>Please make sure only you can see the screen</p>
          <button 
            className="btn btn-lg"
            onClick={handleRevealRole}
          >
            Reveal My Role
          </button>
        </>
      ) : (
        <div className="role-reveal-content">
          <p className="role-reveal-player">{currentPlayer}</p>
          
          {isOutsider ? (
            <>
              <p className="role-reveal-role role-outsider">
                You are THE OUTSIDER
              </p>
              <p>
                You don't know the chosen {selectedTopic.name.toLowerCase()} and need to blend in.
                Listen carefully to other players and try not to get caught!
              </p>
            </>
          ) : (
            <>
              <p className="role-reveal-role role-insider">
                You are an INSIDER
              </p>
              <p>
                The chosen {selectedTopic.name.toLowerCase()} is:
              </p>
              <div className="role-reveal-item">
                {secretItem}
              </div>
              <p>
                Don't reveal this directly! Ask questions that only someone 
                familiar with the topic would know how to answer.
              </p>
            </>
          )}
          
          <button 
            className="btn btn-lg"
            onClick={handleNextPlayer}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleReveal;