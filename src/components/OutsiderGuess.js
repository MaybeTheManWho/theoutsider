import React, { useState, useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';

const OutsiderGuess = () => {
  const { 
    players, 
    outsiderIndex, 
    guessOptions, 
    secretItem, 
    selectedTopic, 
    setGamePhase, 
    GAME_PHASES,
    handleOutsiderGuess,
    isHost
  } = useGameContext();
  
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [guessResult, setGuessResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [points, setPoints] = useState(0);
  const [showingAnimation, setShowingAnimation] = useState(false);
  
  const outsiderName = players[outsiderIndex];

  const handleGuessSelect = (guess) => {
    setSelectedGuess(guess);
  };

  const handleSubmitGuess = () => {
    if (selectedGuess) {
      setShowingAnimation(true);
      
      setTimeout(() => {
        const isCorrect = selectedGuess === secretItem;
        setGuessResult(isCorrect);
        setPoints(isCorrect ? 3 : 0);
        setShowResult(true);
        setShowingAnimation(false);
      }, 2000);
    }
  };

  const handleFinish = () => {
    // Register the guess in the game context
    handleOutsiderGuess(selectedGuess);
    
    // Move to results screen
    setGamePhase(GAME_PHASES.RESULTS);
  };

  // If not the outsider and not the host, show waiting screen
  if (!isHost && players[outsiderIndex] !== players.find(p => p === window.localStorage.getItem('playerName'))) {
    return (
      <div className="outsider-guess section animate-fade-in">
        <h2 className="section-title">The Outsider's Chance</h2>
        <p className="gameplay-instruction">
          {outsiderName} is now trying to guess the specific topic...
        </p>
        <div className="waiting-for-host">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="outsider-guess section animate-fade-in">
      {showingAnimation ? (
        <div className="guessing-animation">
          <h2 className="guess-title">Checking guess...</h2>
          <div className="loading-spinner"></div>
        </div>
      ) : showResult ? (
        <>
          <h2 className="guess-title">Guess Result</h2>
          
          {guessResult ? (
            <div className="result-correct">
              <p>Correct! The {selectedTopic.name.toLowerCase()} was indeed <strong>{secretItem}</strong>.</p>
              <p>You've earned <strong>{points} bonus points</strong> for guessing correctly!</p>
            </div>
          ) : (
            <div className="result-incorrect">
              <p>Incorrect! The {selectedTopic.name.toLowerCase()} was actually <strong>{secretItem}</strong>.</p>
              <p>No bonus points this time!</p>
            </div>
          )}
          
          <button 
            className="btn btn-lg"
            onClick={handleFinish}
            style={{ marginTop: '30px' }}
          >
            Continue to Results
          </button>
        </>
      ) : (
        <>
          <h2 className="guess-title">You've Been Caught!</h2>
          
          <p className="guess-instruction">
            <strong>{outsiderName}</strong>, you were identified as the outsider.
            Now you have one chance to guess what the specific {selectedTopic.name.toLowerCase()} item was
            to earn 3 bonus points!
          </p>
          
          <div className="guess-options">
            {guessOptions.map((guess, index) => (
              <div 
                key={index}
                className={`guess-option ${selectedGuess === guess ? 'selected' : ''}`}
                onClick={() => handleGuessSelect(guess)}
              >
                {guess}
              </div>
            ))}
          </div>
          
          <button 
            className="btn btn-lg"
            onClick={handleSubmitGuess}
            disabled={!selectedGuess}
          >
            Submit Guess
          </button>
        </>
      )}
    </div>
  );
};

export default OutsiderGuess;