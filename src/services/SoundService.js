import { Howl } from 'howler';

// Sound files paths - place these in the /public/sounds directory
const SOUNDS = {
  click: '/sounds/click.mp3',
  reveal: '/sounds/reveal.mp3',
  success: '/sounds/success.mp3',
  failure: '/sounds/failure.mp3',
  transition: '/sounds/transition.mp3',
  vote: '/sounds/vote.mp3',
  question: '/sounds/question.mp3',
  gameStart: '/sounds/game-start.mp3',
  countdown: '/sounds/countdown.mp3',
  victory: '/sounds/victory.mp3'
};

// Flag to enable/disable sounds globally
let soundEnabled = true;

// Preload sounds to prevent delays
const soundEffects = {};

// Initialize and preload all sounds
const initSounds = () => {
  Object.entries(SOUNDS).forEach(([key, path]) => {
    soundEffects[key] = new Howl({
      src: [path],
      volume: 0.5,
      preload: true,
    });
  });
};

// Play a sound if sound is enabled
const playSound = (soundName) => {
  if (soundEnabled && soundEffects[soundName]) {
    soundEffects[soundName].play();
  }
};

// Toggle sounds on/off
const toggleSound = () => {
  soundEnabled = !soundEnabled;
  return soundEnabled;
};

// Check if sound is enabled
const isSoundEnabled = () => {
  return soundEnabled;
};

// Set volume level (0.0 to 1.0)
const setVolume = (level) => {
  Object.values(soundEffects).forEach(sound => {
    sound.volume(level);
  });
};

// IMPORTANT: Call this function when your app initializes
// The sound paths need to be added to your public/sounds directory
const SoundService = {
  init: initSounds,
  play: playSound,
  toggle: toggleSound,
  isEnabled: isSoundEnabled,
  setVolume: setVolume
};

export default SoundService;