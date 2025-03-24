import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { GameProvider, useGameContext, GAME_PHASES } from './contexts/GameContext';
import TopicSelection from './components/TopicSelection';
import PlayerSetup from './components/PlayerSetup';
import RoleReveal from './components/RoleReveal';
import Gameplay from './components/Gameplay';
import VotingScreen from './components/VotingScreen';
import ResultsScreen from './components/ResultsScreen';
import OutsiderGuess from './components/OutsiderGuess';
import LandingPage from './components/LandingPage';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import Lobby from './components/Lobby';
import './styles/App.css';

const GameContent = () => {
  const { gamePhase } = useGameContext();

  // Render the appropriate component based on game phase
  const renderGamePhase = () => {
    switch (gamePhase) {
      case GAME_PHASES.LANDING:
        return <LandingPage key="landing" />;
      case GAME_PHASES.CREATE_GAME:
        return <CreateGame key="create" />;
      case GAME_PHASES.JOIN_GAME:
        return <JoinGame key="join" />;
      case GAME_PHASES.LOBBY:
        return <Lobby key="lobby" />;
      case GAME_PHASES.TOPIC_SELECTION:
        return <TopicSelection key="topics" />;
      case GAME_PHASES.PLAYER_SETUP:
        return <PlayerSetup key="setup" />;
      case GAME_PHASES.ROLE_REVEAL:
        return <RoleReveal key="role" />;
      case GAME_PHASES.GAMEPLAY:
        return <Gameplay key="gameplay" />;
      case GAME_PHASES.VOTING:
        return <VotingScreen key="voting" />;
      case GAME_PHASES.RESULTS:
        return <ResultsScreen key="results" />;
      case GAME_PHASES.OUTSIDER_GUESS:
        return <OutsiderGuess key="guess" />;
      default:
        return <LandingPage key="default" />;
    }
  };

  // Only show the header title on the landing page to avoid duplication
  const showHeaderTitle = gamePhase === GAME_PHASES.LANDING ? false : true;

  return (
    <div className="app-container">
      <header className="app-header">
        {showHeaderTitle && <h1>The Outsider</h1>}
      </header>
      <main className="app-content">
        <TransitionGroup component={null}>
          <CSSTransition
            key={gamePhase}
            timeout={300}
            classNames="fade"
          >
            {renderGamePhase()}
          </CSSTransition>
        </TransitionGroup>
      </main>
      <footer className="app-footer">
        <p>© 2025 The Outsider Game</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default App;