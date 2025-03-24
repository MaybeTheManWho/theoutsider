import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const GameContext = createContext();

// Custom hook to use the game context
export const useGameContext = () => useContext(GameContext);

// Game phases
export const GAME_PHASES = {
  LANDING: 'landing',
  CREATE_GAME: 'create-game',
  JOIN_GAME: 'join-game',
  LOBBY: 'lobby',
  TOPIC_SELECTION: 'topic-selection',
  PLAYER_SETUP: 'player-setup',
  ROLE_REVEAL: 'role-reveal',
  GAMEPLAY: 'gameplay',
  VOTING: 'voting',
  RESULTS: 'results',
  OUTSIDER_GUESS: 'outsider-guess'
};

// Provider component
export const GameProvider = ({ children }) => {
  // Game state
  const [gamePhase, setGamePhase] = useState(GAME_PHASES.LANDING);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [players, setPlayers] = useState([]);
  const [outsiderIndex, setOutsiderIndex] = useState(null);
  const [secretItem, setSecretItem] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [questionPairs, setQuestionPairs] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [votes, setVotes] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [guessOptions, setGuessOptions] = useState([]);
  
  // Online game properties
  const [gameCode, setGameCode] = useState('');
  const [hostName, setHostName] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [connectedPlayers, setConnectedPlayers] = useState([]);

  // Function to generate a random 6-character game code
  const generateGameCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Create a new game
  const createGame = (name) => {
    const code = generateGameCode();
    setGameCode(code);
    setHostName(name);
    setPlayerName(name);
    setIsHost(true);
    setConnectedPlayers([{ name, isHost: true }]);
    
    // In a real implementation, you'd connect to a backend here
    // For now we'll just simulate it with local state
    
    // Save player name in localStorage for persistence
    localStorage.setItem('playerName', name);
    
    // We don't change the game phase yet - the PlayerNameForm will show the code first
    
    return code;
  };

  // Join an existing game
  const joinGame = (code, name) => {
    setGameCode(code);
    setPlayerName(name);
    setIsHost(false);
    
    // In a real implementation, you'd verify the code with a backend
    // For demonstration purposes, we're simulating valid/invalid codes
    
    // Save player name in localStorage for persistence
    localStorage.setItem('playerName', name);
    
    // Simulate checking if code is valid - in real app this would check backend
    const isValidCode = code.length === 6;
    
    if (isValidCode) {
      // Add the new player to the game
      setConnectedPlayers(prev => [...prev, { name, isHost: false }]);
      
      // When deploying to a real server, you would:
      // 1. Connect to your backend via WebSocket (socket.io for example)
      // 2. Send a "join-room" message with the game code and player name
      // 3. The server would add the player to the room and notify all players
      
      setGamePhase(GAME_PHASES.LOBBY);
      return true;
    }
    
    return false;
  };

  // Start the game from the lobby
  const startGameFromLobby = () => {
    if (!isHost) return false;
    
    // In a real implementation, you'd notify all connected players
    setPlayers(connectedPlayers.map(player => player.name));
    setGamePhase(GAME_PHASES.TOPIC_SELECTION);
    
    return true;
  };

  // Reset game to initial state
  const resetGame = () => {
    setGamePhase(GAME_PHASES.LANDING);
    setSelectedTopic(null);
    setPlayers([]);
    setOutsiderIndex(null);
    setSecretItem(null);
    setCurrentPlayerIndex(0);
    setQuestionPairs([]);
    setCurrentQuestionIndex(0);
    setVotes({});
    setAdditionalQuestions([]);
    setGuessOptions([]);
    setGameCode('');
    setHostName('');
    setIsHost(false);
    setPlayerName('');
    setConnectedPlayers([]);
  };

  // Select a topic and move to player setup
  const selectTopic = (topic) => {
    setSelectedTopic(topic);
    
    // If playing online, skip player setup (already done in lobby)
    if (gameCode) {
      startGame();
    } else {
      setGamePhase(GAME_PHASES.PLAYER_SETUP);
    }
  };

  // Add a player
  const addPlayer = (name) => {
    if (name.trim() !== '') {
      setPlayers([...players, name.trim()]);
    }
  };

  // Remove a player
  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  // Start the game after player setup
  const startGame = () => {
    if (players.length < 3) {
      alert('You need at least 3 players to start the game');
      return;
    }

    // Randomly select outsider
    const outsider = Math.floor(Math.random() * players.length);
    setOutsiderIndex(outsider);

    // Randomly select the secret item from the topic
    const item = selectedTopic.items[Math.floor(Math.random() * selectedTopic.items.length)];
    setSecretItem(item);

    // Generate question pairs - each player asks 2 others
    generateQuestionPairs();

    // Set up guess options for the outsider (including the secret item)
    generateGuessOptions();

    // Move to role reveal phase
    setGamePhase(GAME_PHASES.ROLE_REVEAL);
  };

  // Generate question pairs
  const generateQuestionPairs = () => {
    const pairs = [];
    
    // Each player asks 2 others
    for (let i = 0; i < players.length; i++) {
      const otherPlayers = [...Array(players.length).keys()].filter(idx => idx !== i);
      // Shuffle to randomize who asks whom
      const shuffled = otherPlayers.sort(() => 0.5 - Math.random());
      // Take first 2 for mandatory questions
      for (let j = 0; j < Math.min(2, shuffled.length); j++) {
        pairs.push({
          asker: i,
          target: shuffled[j]
        });
      }
    }
    
    setQuestionPairs(pairs);
  };

  // Generate guess options for the outsider
  const generateGuessOptions = () => {
    // Include the secret item
    let options = [secretItem];
    
    // Add random other items from the topic
    const otherItems = selectedTopic.items
      .filter(item => item !== secretItem)
      .sort(() => 0.5 - Math.random())
      .slice(0, 7); // Up to 7 more items (total of 8)
    
    options = [...options, ...otherItems];
    
    // Shuffle the options
    options = options.sort(() => 0.5 - Math.random());
    
    setGuessOptions(options);
  };

  // Move to next player during role reveal
  const nextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      // All players have seen their roles, start gameplay
      setCurrentPlayerIndex(0);
      setGamePhase(GAME_PHASES.GAMEPLAY);
    }
  };

  // Record a vote
  const castVote = (voterIndex, targetIndex) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [voterIndex]: targetIndex
    }));
  };

  // Move to next question in gameplay
  const nextQuestion = () => {
    if (currentQuestionIndex < questionPairs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All mandatory questions done, move to additional questions phase
      setGamePhase(GAME_PHASES.VOTING);
    }
  };

  // Add an additional question
  const addAdditionalQuestion = (askerIndex, targetIndex) => {
    setAdditionalQuestions([
      ...additionalQuestions,
      { asker: askerIndex, target: targetIndex }
    ]);
  };

  // Complete voting phase
  const completeVoting = () => {
    // Check if everyone has voted
    if (Object.keys(votes).length < players.length) {
      alert('Not everyone has voted yet!');
      return;
    }
    
    // Determine if outsider was caught
    const voteCounts = {};
    Object.values(votes).forEach(targetIndex => {
      voteCounts[targetIndex] = (voteCounts[targetIndex] || 0) + 1;
    });
    
    let mostVotes = 0;
    let mostVotedPlayer = null;
    
    Object.entries(voteCounts).forEach(([playerIndex, count]) => {
      if (count > mostVotes) {
        mostVotes = count;
        mostVotedPlayer = parseInt(playerIndex);
      }
    });
    
    if (mostVotedPlayer === outsiderIndex) {
      // Outsider was caught, give them a chance to guess
      setGamePhase(GAME_PHASES.OUTSIDER_GUESS);
    } else {
      // Outsider was not caught, go directly to results
      setGamePhase(GAME_PHASES.RESULTS);
    }
  };

  // Determine the most voted player
  const getMostVotedPlayer = () => {
    const voteCounts = {};
    Object.values(votes).forEach(targetIndex => {
      voteCounts[targetIndex] = (voteCounts[targetIndex] || 0) + 1;
    });
    
    let mostVotes = 0;
    let mostVotedPlayer = null;
    
    Object.entries(voteCounts).forEach(([playerIndex, count]) => {
      if (count > mostVotes) {
        mostVotes = count;
        mostVotedPlayer = parseInt(playerIndex);
      }
    });
    
    return mostVotedPlayer;
  };

  // Check if outsider was correctly identified
  const isOutsiderCaught = () => {
    return getMostVotedPlayer() === outsiderIndex;
  };

  // Handle outsider's guess
  const handleOutsiderGuess = (guessedItem) => {
    // Check if the outsider guessed correctly
    const isCorrect = guessedItem === secretItem;
    
    // Move to final result
    setGamePhase(GAME_PHASES.RESULTS);
    
    return isCorrect;
  };

  // Values to be provided to consuming components
  const value = {
    gamePhase,
    setGamePhase,
    selectedTopic,
    players,
    outsiderIndex,
    secretItem,
    currentPlayerIndex,
    questionPairs,
    currentQuestionIndex,
    votes,
    additionalQuestions,
    guessOptions,
    gameCode,
    hostName,
    isHost,
    playerName,
    connectedPlayers,
    resetGame,
    selectTopic,
    addPlayer,
    removePlayer,
    startGame,
    nextPlayer,
    castVote,
    nextQuestion,
    addAdditionalQuestion,
    completeVoting,
    getMostVotedPlayer,
    isOutsiderCaught,
    handleOutsiderGuess,
    createGame,
    joinGame,
    startGameFromLobby
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;