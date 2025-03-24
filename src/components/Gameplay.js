import React, { useState } from 'react';
import { useGameContext } from '../contexts/GameContext';

const Gameplay = () => {
  const { 
    players, 
    questionPairs, 
    currentQuestionIndex, 
    nextQuestion,
    selectedTopic,
    setGamePhase,
    GAME_PHASES,
    isHost,
    addAdditionalQuestion
  } = useGameContext();
  
  const [readyForNextQuestion, setReadyForNextQuestion] = useState(false);
  const [recessMode, setRecessMode] = useState(false);
  const [askerIndex, setAskerIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(1);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  
  // Only show in main questions phase (not recess)
  const currentQuestion = !recessMode && questionPairs[currentQuestionIndex];
  const askerName = !recessMode && players[currentQuestion.asker];
  const targetName = !recessMode && players[currentQuestion.target];

  const handleRevealQuestion = () => {
    setReadyForNextQuestion(true);
  };

  const handleNextQuestion = () => {
    setReadyForNextQuestion(false);
    nextQuestion();
  };

  const handleFinishQuestions = () => {
    // Move to recess time
    setRecessMode(true);
  };

  const isLastQuestion = currentQuestionIndex === questionPairs.length - 1;

  const handleAddAdditionalQuestion = () => {
    if (askerIndex === targetIndex) {
      alert("A player can't ask themselves a question. Please select different players.");
      return;
    }

    // Add to local state for UI
    setAdditionalQuestions([
      ...additionalQuestions,
      { asker: askerIndex, target: targetIndex }
    ]);
    
    // Add to game context
    addAdditionalQuestion(askerIndex, targetIndex);
  };

  const handleFinishRecess = () => {
    setGamePhase(GAME_PHASES.VOTING);
  };

  if (!isHost) {
    return (
      <div className="gameplay section animate-fade-in">
        <h2 className="section-title">Game in Progress</h2>
        <p className="gameplay-instruction">
          The host is controlling the game. Please discuss with your group.
        </p>
        <div className="waiting-for-host">
          <p>Waiting for the host to advance the game...</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // Recess mode
  if (recessMode) {
    return (
      <div className="gameplay section animate-fade-in">
        <h2 className="section-title">Recess Time</h2>
        
        <p className="gameplay-instruction">
          Now is the time for any player to ask additional questions. Add as many as you'd like!
        </p>
        
        <div className="recess-container">
          <h3 className="recess-title">Add Additional Question</h3>
          <p className="recess-description">
            Select who should ask a question and who they should ask:
          </p>
          
          <div className="recess-form">
            <div className="recess-selects">
              <select 
                value={askerIndex}
                onChange={(e) => setAskerIndex(parseInt(e.target.value))}
              >
                {players.map((player, index) => (
                  <option key={`asker-${index}`} value={index}>
                    {player}
                  </option>
                ))}
              </select>
              
              <select 
                value={targetIndex}
                onChange={(e) => setTargetIndex(parseInt(e.target.value))}
              >
                {players.map((player, index) => (
                  <option key={`target-${index}`} value={index}>
                    {player}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              className="btn"
              onClick={handleAddAdditionalQuestion}
            >
              Add Question
            </button>
          </div>
          
          {additionalQuestions.length > 0 && (
            <div className="additional-questions">
              <h4>Additional Questions:</h4>
              <ul>
                {additionalQuestions.map((q, index) => (
                  <li key={index}>
                    <strong>{players[q.asker]}</strong> asked <strong>{players[q.target]}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <button 
          className="btn btn-lg btn-success"
          onClick={handleFinishRecess}
          style={{ marginTop: '30px' }}
        >
          Proceed to Voting
        </button>
      </div>
    );
  }

  // Main questions phase
  return (
    <div className="gameplay section animate-fade-in">
      <h2 className="section-title">Game in Progress</h2>
      
      {!readyForNextQuestion ? (
        <>
          <p className="pass-instruction">Pass the phone to the next person</p>
          <button 
            className="btn btn-lg"
            onClick={handleRevealQuestion}
          >
            Ready
          </button>
        </>
      ) : (
        <>
          <div className="gameplay-question">
            <strong>{askerName}</strong>, please ask <strong>{targetName}</strong> a 
            question about <strong>{selectedTopic.name}</strong>
          </div>
          
          <p className="gameplay-instruction">
            Remember not to directly reveal the specific item. Ask questions that someone
            familiar with the topic would be able to answer.
          </p>
          
          {isLastQuestion ? (
            <button 
              className="btn btn-lg btn-success"
              onClick={handleFinishQuestions}
            >
              Finish Main Questions
            </button>
          ) : (
            <button 
              className="btn btn-lg"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </>
      )}
      
      <div className="progress-indicator">
        <p>Question {currentQuestionIndex + 1} of {questionPairs.length}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / questionPairs.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Gameplay;