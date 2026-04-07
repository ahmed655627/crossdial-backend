// Daily Challenge System
// Unique puzzle every day with streak bonuses

export interface DailyChallenge {
  id: string;
  date: string; // YYYY-MM-DD format
  theme: string;
  letters: string[];
  targetWords: string[];
  bonusWords: string[];
  grid: { word: string; row: number; col: number; direction: string }[];
  rewards: {
    coins: number;
    hints: number;
    bonusMultiplier: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string;
  totalDaysPlayed: number;
}

export const STREAK_BONUSES = [
  { days: 1, bonus: 1.0, label: 'Day 1' },
  { days: 2, bonus: 1.1, label: '2 Day Streak' },
  { days: 3, bonus: 1.2, label: '3 Day Streak' },
  { days: 5, bonus: 1.5, label: '5 Day Streak!' },
  { days: 7, bonus: 2.0, label: 'Week Streak!' },
  { days: 14, bonus: 2.5, label: '2 Week Streak!' },
  { days: 30, bonus: 3.0, label: 'Month Streak!' },
];

export const getStreakBonus = (streak: number): number => {
  for (let i = STREAK_BONUSES.length - 1; i >= 0; i--) {
    if (streak >= STREAK_BONUSES[i].days) {
      return STREAK_BONUSES[i].bonus;
    }
  }
  return 1.0;
};

// Sample daily challenges (in production, generate server-side based on date)
export const DAILY_CHALLENGE_TEMPLATES: Omit<DailyChallenge, 'id' | 'date'>[] = [
  {
    theme: 'Morning Vibes',
    letters: ['S', 'U', 'N', 'R', 'I', 'S', 'E'],
    targetWords: ['SUN', 'RISE', 'RUN', 'SIR', 'RUIN', 'SUNRISE'],
    bonusWords: ['SIREN', 'NURSE', 'RUINS'],
    grid: [
      { word: 'SUN', row: 0, col: 0, direction: 'horizontal' },
      { word: 'RISE', row: 1, col: 0, direction: 'horizontal' },
      { word: 'RUN', row: 2, col: 0, direction: 'horizontal' },
      { word: 'SUNRISE', row: 4, col: 0, direction: 'horizontal' },
    ],
    rewards: { coins: 100, hints: 2, bonusMultiplier: 1.5 },
    difficulty: 'medium',
  },
  {
    theme: 'Ocean Dreams',
    letters: ['W', 'A', 'V', 'E', 'S'],
    targetWords: ['WAVE', 'SAVE', 'VASE', 'WAVES', 'AWE'],
    bonusWords: ['AVES', 'EAVE'],
    grid: [
      { word: 'WAVE', row: 0, col: 0, direction: 'horizontal' },
      { word: 'SAVE', row: 1, col: 0, direction: 'horizontal' },
      { word: 'WAVES', row: 3, col: 0, direction: 'horizontal' },
    ],
    rewards: { coins: 80, hints: 1, bonusMultiplier: 1.2 },
    difficulty: 'easy',
  },
  {
    theme: 'Night Sky',
    letters: ['S', 'T', 'A', 'R', 'L', 'I', 'G', 'H', 'T'],
    targetWords: ['STAR', 'LIGHT', 'ARTS', 'TAIL', 'RATS', 'STARLIGHT'],
    bonusWords: ['GAIT', 'HALT', 'TRAILS'],
    grid: [
      { word: 'STAR', row: 0, col: 0, direction: 'horizontal' },
      { word: 'LIGHT', row: 1, col: 0, direction: 'horizontal' },
      { word: 'ARTS', row: 2, col: 0, direction: 'horizontal' },
      { word: 'STARLIGHT', row: 4, col: 0, direction: 'horizontal' },
    ],
    rewards: { coins: 150, hints: 3, bonusMultiplier: 2.0 },
    difficulty: 'hard',
  },
];

export const generateDailyChallenge = (date: Date): DailyChallenge => {
  const dateStr = date.toISOString().split('T')[0];
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const templateIndex = dayOfYear % DAILY_CHALLENGE_TEMPLATES.length;
  const template = DAILY_CHALLENGE_TEMPLATES[templateIndex];
  
  return {
    ...template,
    id: `daily_${dateStr}`,
    date: dateStr,
  };
};
