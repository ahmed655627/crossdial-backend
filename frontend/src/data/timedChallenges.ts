// Timed Challenge System
// Beat the clock puzzles with star ratings

export interface TimedChallenge {
  id: number;
  name: string;
  description: string;
  letters: string[];
  targetWords: string[];
  grid: { word: string; row: number; col: number; direction: string }[];
  timeLimit: number; // in seconds
  starThresholds: {
    three: number; // time in seconds to get 3 stars
    two: number;   // time in seconds to get 2 stars
    one: number;   // time in seconds to get 1 star (same as timeLimit usually)
  };
  rewards: {
    threeStars: { coins: number; xp: number };
    twoStars: { coins: number; xp: number };
    oneStar: { coins: number; xp: number };
  };
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  unlockLevel: number;
}

export const TIMED_CHALLENGES: TimedChallenge[] = [
  {
    id: 1,
    name: 'Quick Start',
    description: 'A simple warm-up challenge',
    letters: ['C', 'A', 'T', 'S'],
    targetWords: ['CAT', 'SAT', 'ACT', 'CATS'],
    grid: [
      { word: 'CAT', row: 0, col: 0, direction: 'horizontal' },
      { word: 'SAT', row: 1, col: 0, direction: 'horizontal' },
      { word: 'ACT', row: 2, col: 0, direction: 'horizontal' },
      { word: 'CATS', row: 3, col: 0, direction: 'horizontal' },
    ],
    timeLimit: 60,
    starThresholds: { three: 20, two: 40, one: 60 },
    rewards: {
      threeStars: { coins: 100, xp: 150 },
      twoStars: { coins: 60, xp: 100 },
      oneStar: { coins: 30, xp: 50 },
    },
    difficulty: 'easy',
    unlockLevel: 1,
  },
  {
    id: 2,
    name: 'Word Sprint',
    description: 'Find words before time runs out!',
    letters: ['S', 'T', 'A', 'R', 'S'],
    targetWords: ['STAR', 'ARTS', 'RATS', 'TARS', 'STARS'],
    grid: [
      { word: 'STAR', row: 0, col: 0, direction: 'horizontal' },
      { word: 'ARTS', row: 1, col: 0, direction: 'horizontal' },
      { word: 'RATS', row: 2, col: 0, direction: 'horizontal' },
      { word: 'STARS', row: 4, col: 0, direction: 'horizontal' },
    ],
    timeLimit: 90,
    starThresholds: { three: 30, two: 60, one: 90 },
    rewards: {
      threeStars: { coins: 150, xp: 200 },
      twoStars: { coins: 90, xp: 130 },
      oneStar: { coins: 45, xp: 65 },
    },
    difficulty: 'easy',
    unlockLevel: 5,
  },
  {
    id: 3,
    name: 'Speed Demon',
    description: 'Only the fastest will prevail',
    letters: ['T', 'R', 'A', 'I', 'N', 'S'],
    targetWords: ['TRAIN', 'RAIN', 'RANT', 'STAIR', 'TRAINS'],
    grid: [
      { word: 'TRAIN', row: 0, col: 0, direction: 'horizontal' },
      { word: 'RAIN', row: 1, col: 0, direction: 'horizontal' },
      { word: 'RANT', row: 2, col: 0, direction: 'horizontal' },
      { word: 'TRAINS', row: 4, col: 0, direction: 'horizontal' },
    ],
    timeLimit: 75,
    starThresholds: { three: 25, two: 50, one: 75 },
    rewards: {
      threeStars: { coins: 200, xp: 250 },
      twoStars: { coins: 120, xp: 160 },
      oneStar: { coins: 60, xp: 80 },
    },
    difficulty: 'medium',
    unlockLevel: 10,
  },
  {
    id: 4,
    name: 'Lightning Round',
    description: 'Think fast, type faster!',
    letters: ['P', 'O', 'W', 'E', 'R', 'S'],
    targetWords: ['POWER', 'PORE', 'ROPE', 'WORE', 'POWERS'],
    grid: [
      { word: 'POWER', row: 0, col: 0, direction: 'horizontal' },
      { word: 'PORE', row: 1, col: 0, direction: 'horizontal' },
      { word: 'ROPE', row: 2, col: 0, direction: 'horizontal' },
      { word: 'POWERS', row: 4, col: 0, direction: 'horizontal' },
    ],
    timeLimit: 60,
    starThresholds: { three: 20, two: 40, one: 60 },
    rewards: {
      threeStars: { coins: 250, xp: 300 },
      twoStars: { coins: 150, xp: 200 },
      oneStar: { coins: 75, xp: 100 },
    },
    difficulty: 'medium',
    unlockLevel: 15,
  },
  {
    id: 5,
    name: 'Extreme Rush',
    description: 'The ultimate test of speed',
    letters: ['B', 'R', 'I', 'G', 'H', 'T', 'S'],
    targetWords: ['BRIGHT', 'GRIT', 'BITS', 'RIBS', 'RIGHTS'],
    grid: [
      { word: 'BRIGHT', row: 0, col: 0, direction: 'horizontal' },
      { word: 'GRIT', row: 1, col: 0, direction: 'horizontal' },
      { word: 'BITS', row: 2, col: 0, direction: 'horizontal' },
      { word: 'RIGHTS', row: 4, col: 0, direction: 'horizontal' },
    ],
    timeLimit: 45,
    starThresholds: { three: 15, two: 30, one: 45 },
    rewards: {
      threeStars: { coins: 400, xp: 500 },
      twoStars: { coins: 240, xp: 300 },
      oneStar: { coins: 120, xp: 150 },
    },
    difficulty: 'hard',
    unlockLevel: 25,
  },
  {
    id: 6,
    name: 'Insane Mode',
    description: 'Only word masters can conquer this',
    letters: ['S', 'T', 'A', 'R', 'L', 'I', 'G', 'H', 'T'],
    targetWords: ['STARLIGHT', 'LIGHTS', 'TRAILS', 'SLIGHT', 'RIGHTS'],
    grid: [
      { word: 'STARLIGHT', row: 0, col: 0, direction: 'horizontal' },
      { word: 'LIGHTS', row: 1, col: 0, direction: 'horizontal' },
      { word: 'TRAILS', row: 2, col: 0, direction: 'horizontal' },
      { word: 'RIGHTS', row: 4, col: 0, direction: 'horizontal' },
    ],
    timeLimit: 30,
    starThresholds: { three: 10, two: 20, one: 30 },
    rewards: {
      threeStars: { coins: 600, xp: 750 },
      twoStars: { coins: 360, xp: 450 },
      oneStar: { coins: 180, xp: 225 },
    },
    difficulty: 'extreme',
    unlockLevel: 50,
  },
];

export const DIFFICULTY_COLORS = {
  easy: '#27ae60',
  medium: '#f39c12',
  hard: '#e74c3c',
  extreme: '#8e44ad',
};

export const calculateStars = (completionTime: number, thresholds: TimedChallenge['starThresholds']): number => {
  if (completionTime <= thresholds.three) return 3;
  if (completionTime <= thresholds.two) return 2;
  if (completionTime <= thresholds.one) return 1;
  return 0;
};

export const getTimedChallengesByDifficulty = (difficulty: string): TimedChallenge[] => {
  return TIMED_CHALLENGES.filter(c => c.difficulty === difficulty);
};

export const getUnlockedTimedChallenges = (currentLevel: number): TimedChallenge[] => {
  return TIMED_CHALLENGES.filter(c => c.unlockLevel <= currentLevel);
};
