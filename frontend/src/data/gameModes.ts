// Game Modes for CrossDial Puzzles
// Classic, Zen, Speed, Endless, Match modes

export type GameModeType = 'classic' | 'zen' | 'speed' | 'endless' | 'match';

export interface GameMode {
  id: GameModeType;
  name: string;
  icon: string;
  description: string;
  color: string;
  unlockLevel: number;
  hasTimer: boolean;
  timerType: 'countdown' | 'countup' | 'none';
  defaultTime: number; // in seconds
  showProgress: boolean;
  showCombo: boolean;
  bonusMultiplier: number;
  backgroundColor: string[];
}

// Game modes as array for easier iteration
export const GAME_MODES: GameMode[] = [
  {
    id: 'classic',
    name: 'Classic',
    icon: '🎯',
    description: 'Complete levels at your own pace',
    color: '#667eea',
    unlockLevel: 1,
    hasTimer: false,
    timerType: 'none',
    defaultTime: 0,
    showProgress: true,
    showCombo: true,
    bonusMultiplier: 1,
    backgroundColor: ['#0f0c29', '#302b63', '#24243e'],
  },
  {
    id: 'zen',
    name: 'Zen Mode',
    icon: '🧘',
    description: 'Relax and play without pressure',
    color: '#2ecc71',
    unlockLevel: 5,
    hasTimer: false,
    timerType: 'none',
    defaultTime: 0,
    showProgress: false,
    showCombo: false,
    bonusMultiplier: 0.5,
    backgroundColor: ['#134e5e', '#1a5d4d', '#71b280'],
  },
  {
    id: 'speed',
    name: 'Speed Mode',
    icon: '⚡',
    description: 'Find words before time runs out!',
    color: '#e74c3c',
    unlockLevel: 10,
    hasTimer: true,
    timerType: 'countdown',
    defaultTime: 60,
    showProgress: true,
    showCombo: true,
    bonusMultiplier: 2,
    backgroundColor: ['#ff6b6b', '#ee5a5a', '#c44569'],
  },
  {
    id: 'endless',
    name: 'Endless',
    icon: '♾️',
    description: 'Play forever, random puzzles',
    color: '#9b59b6',
    unlockLevel: 20,
    hasTimer: false,
    timerType: 'countup',
    defaultTime: 0,
    showProgress: true,
    showCombo: true,
    bonusMultiplier: 1.5,
    backgroundColor: ['#667eea', '#764ba2', '#f093fb'],
  },
  {
    id: 'match',
    name: 'Word Match',
    icon: '🎴',
    description: 'Match words with meanings',
    color: '#f39c12',
    unlockLevel: 15,
    hasTimer: true,
    timerType: 'countdown',
    defaultTime: 90,
    showProgress: true,
    showCombo: true,
    bonusMultiplier: 1.5,
    backgroundColor: ['#f39c12', '#e67e22', '#d35400'],
  },
];

// Game mode configs as a Record for quick lookup
export const GAME_MODES_MAP: Record<GameModeType, GameMode> = GAME_MODES.reduce(
  (acc, mode) => ({ ...acc, [mode.id]: mode }),
  {} as Record<GameModeType, GameMode>
);

export const getGameModeConfig = (mode: GameModeType): GameMode => {
  return GAME_MODES_MAP[mode] || GAME_MODES_MAP.classic;
};

export const ALL_GAME_MODES: GameMode[] = GAME_MODES;

// Match Mode Puzzles
export interface MatchPuzzle {
  id: number;
  theme: string;
  pairs: { word: string; meaning: string }[];
  difficulty: 'easy' | 'medium' | 'hard';
  reward: number;
}

export const MATCH_PUZZLES: MatchPuzzle[] = [
  {
    id: 1,
    theme: 'Everyday Objects',
    difficulty: 'easy',
    reward: 30,
    pairs: [
      { word: 'CHAIR', meaning: 'Sit on it' },
      { word: 'LAMP', meaning: 'Gives light' },
      { word: 'BOOK', meaning: 'Read it' },
      { word: 'CLOCK', meaning: 'Shows time' },
    ],
  },
  {
    id: 2,
    theme: 'Nature',
    difficulty: 'easy',
    reward: 35,
    pairs: [
      { word: 'TREE', meaning: 'Has leaves' },
      { word: 'RAIN', meaning: 'Falls from clouds' },
      { word: 'BIRD', meaning: 'Can fly' },
      { word: 'FLOWER', meaning: 'Has petals' },
    ],
  },
  {
    id: 3,
    theme: 'Animals',
    difficulty: 'medium',
    reward: 50,
    pairs: [
      { word: 'LION', meaning: 'King of jungle' },
      { word: 'FISH', meaning: 'Lives in water' },
      { word: 'EAGLE', meaning: 'Bird of prey' },
      { word: 'SNAKE', meaning: 'No legs' },
      { word: 'BEAR', meaning: 'Hibernates' },
    ],
  },
  {
    id: 4,
    theme: 'Food',
    difficulty: 'medium',
    reward: 55,
    pairs: [
      { word: 'BREAD', meaning: 'Made from wheat' },
      { word: 'CHEESE', meaning: 'Made from milk' },
      { word: 'APPLE', meaning: 'Red fruit' },
      { word: 'RICE', meaning: 'Asian staple' },
      { word: 'HONEY', meaning: 'Made by bees' },
    ],
  },
  {
    id: 5,
    theme: 'Science',
    difficulty: 'hard',
    reward: 75,
    pairs: [
      { word: 'ATOM', meaning: 'Smallest unit' },
      { word: 'PLANET', meaning: 'Orbits a star' },
      { word: 'GRAVITY', meaning: 'Pulls things down' },
      { word: 'OXYGEN', meaning: 'We breathe it' },
      { word: 'ENERGY', meaning: 'Powers things' },
      { word: 'CARBON', meaning: 'In all life' },
    ],
  },
  {
    id: 6,
    theme: 'Sports',
    difficulty: 'medium',
    reward: 50,
    pairs: [
      { word: 'SOCCER', meaning: 'Kick the ball' },
      { word: 'TENNIS', meaning: 'Use a racket' },
      { word: 'SWIM', meaning: 'In the pool' },
      { word: 'GOLF', meaning: 'Hole in one' },
      { word: 'BOXING', meaning: 'Wear gloves' },
    ],
  },
  {
    id: 7,
    theme: 'Colors & Art',
    difficulty: 'easy',
    reward: 30,
    pairs: [
      { word: 'RED', meaning: 'Color of fire' },
      { word: 'BLUE', meaning: 'Color of sky' },
      { word: 'GREEN', meaning: 'Color of grass' },
      { word: 'PAINT', meaning: 'Art medium' },
    ],
  },
  {
    id: 8,
    theme: 'Weather',
    difficulty: 'medium',
    reward: 45,
    pairs: [
      { word: 'SUNNY', meaning: 'Clear sky' },
      { word: 'STORM', meaning: 'Thunder & lightning' },
      { word: 'SNOW', meaning: 'White & cold' },
      { word: 'WIND', meaning: 'Moving air' },
      { word: 'FOG', meaning: 'Low visibility' },
    ],
  },
];
