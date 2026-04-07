// Achievements & Badges System
// Track player accomplishments and award badges

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'words' | 'levels' | 'streaks' | 'speed' | 'special';
  requirement: {
    type: 'words_found' | 'levels_completed' | 'streak_days' | 'speed_complete' | 'bonus_words' | 'hints_unused' | 'perfect_level' | 'daily_complete' | 'coins_earned';
    value: number;
  };
  rewards: {
    coins: number;
    hints: number;
    badge?: string;
    themeUnlock?: string;
  };
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  secret?: boolean;
}

export const ACHIEVEMENT_CATEGORIES = [
  { id: 'words', name: 'Word Master', icon: '📝', color: '#3498db' },
  { id: 'levels', name: 'Level Champion', icon: '🏆', color: '#f1c40f' },
  { id: 'streaks', name: 'Dedicated Player', icon: '🔥', color: '#e74c3c' },
  { id: 'speed', name: 'Speed Demon', icon: '⚡', color: '#9b59b6' },
  { id: 'special', name: 'Special', icon: '⭐', color: '#1abc9c' },
];

export const ACHIEVEMENTS: Achievement[] = [
  // Words Category
  {
    id: 'word_finder_1',
    name: 'First Words',
    description: 'Find your first 10 words',
    icon: '📖',
    category: 'words',
    requirement: { type: 'words_found', value: 10 },
    rewards: { coins: 50, hints: 1 },
    rarity: 'common',
  },
  {
    id: 'word_finder_2',
    name: 'Word Explorer',
    description: 'Find 100 words',
    icon: '🔍',
    category: 'words',
    requirement: { type: 'words_found', value: 100 },
    rewards: { coins: 200, hints: 3 },
    rarity: 'uncommon',
  },
  {
    id: 'word_finder_3',
    name: 'Word Hunter',
    description: 'Find 500 words',
    icon: '🎯',
    category: 'words',
    requirement: { type: 'words_found', value: 500 },
    rewards: { coins: 500, hints: 5 },
    rarity: 'rare',
  },
  {
    id: 'word_master',
    name: 'Word Master',
    description: 'Find 1000 words',
    icon: '👑',
    category: 'words',
    requirement: { type: 'words_found', value: 1000 },
    rewards: { coins: 1000, hints: 10, themeUnlock: 'neon' },
    rarity: 'epic',
  },
  {
    id: 'word_legend',
    name: 'Word Legend',
    description: 'Find 5000 words',
    icon: '🌟',
    category: 'words',
    requirement: { type: 'words_found', value: 5000 },
    rewards: { coins: 5000, hints: 25 },
    rarity: 'legendary',
  },
  {
    id: 'bonus_hunter',
    name: 'Bonus Hunter',
    description: 'Find 50 bonus words',
    icon: '💎',
    category: 'words',
    requirement: { type: 'bonus_words', value: 50 },
    rewards: { coins: 300, hints: 5 },
    rarity: 'rare',
  },

  // Levels Category
  {
    id: 'level_starter',
    name: 'Getting Started',
    description: 'Complete 5 levels',
    icon: '🎮',
    category: 'levels',
    requirement: { type: 'levels_completed', value: 5 },
    rewards: { coins: 100, hints: 2 },
    rarity: 'common',
  },
  {
    id: 'level_pro',
    name: 'Level Pro',
    description: 'Complete 25 levels',
    icon: '🎖️',
    category: 'levels',
    requirement: { type: 'levels_completed', value: 25 },
    rewards: { coins: 400, hints: 5 },
    rarity: 'uncommon',
  },
  {
    id: 'level_champion',
    name: 'Champion',
    description: 'Complete 50 levels',
    icon: '🏆',
    category: 'levels',
    requirement: { type: 'levels_completed', value: 50 },
    rewards: { coins: 750, hints: 8 },
    rarity: 'rare',
  },
  {
    id: 'level_master',
    name: 'Level Master',
    description: 'Complete 100 levels',
    icon: '👑',
    category: 'levels',
    requirement: { type: 'levels_completed', value: 100 },
    rewards: { coins: 1500, hints: 15 },
    rarity: 'epic',
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete 10 levels without hints',
    icon: '💯',
    category: 'levels',
    requirement: { type: 'hints_unused', value: 10 },
    rewards: { coins: 500, hints: 10 },
    rarity: 'rare',
  },
  {
    id: 'perfect_10',
    name: 'Perfect 10',
    description: 'Get 3 stars on 10 levels',
    icon: '⭐',
    category: 'levels',
    requirement: { type: 'perfect_level', value: 10 },
    rewards: { coins: 600, hints: 8 },
    rarity: 'rare',
  },

  // Streaks Category
  {
    id: 'streak_3',
    name: 'On Fire',
    description: 'Play 3 days in a row',
    icon: '🔥',
    category: 'streaks',
    requirement: { type: 'streak_days', value: 3 },
    rewards: { coins: 150, hints: 2 },
    rarity: 'common',
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Play 7 days in a row',
    icon: '📅',
    category: 'streaks',
    requirement: { type: 'streak_days', value: 7 },
    rewards: { coins: 400, hints: 5 },
    rarity: 'uncommon',
  },
  {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Play 30 days in a row',
    icon: '🗓️',
    category: 'streaks',
    requirement: { type: 'streak_days', value: 30 },
    rewards: { coins: 1500, hints: 20 },
    rarity: 'epic',
  },
  {
    id: 'daily_devotee',
    name: 'Daily Devotee',
    description: 'Complete 30 daily challenges',
    icon: '☀️',
    category: 'streaks',
    requirement: { type: 'daily_complete', value: 30 },
    rewards: { coins: 1000, hints: 15 },
    rarity: 'rare',
  },

  // Speed Category
  {
    id: 'speed_demon_1',
    name: 'Quick Thinker',
    description: 'Complete a level in under 60 seconds',
    icon: '⏱️',
    category: 'speed',
    requirement: { type: 'speed_complete', value: 60 },
    rewards: { coins: 200, hints: 3 },
    rarity: 'uncommon',
  },
  {
    id: 'speed_demon_2',
    name: 'Speed Demon',
    description: 'Complete a level in under 30 seconds',
    icon: '⚡',
    category: 'speed',
    requirement: { type: 'speed_complete', value: 30 },
    rewards: { coins: 500, hints: 5 },
    rarity: 'rare',
  },
  {
    id: 'lightning',
    name: 'Lightning Fast',
    description: 'Complete a level in under 15 seconds',
    icon: '🌩️',
    category: 'speed',
    requirement: { type: 'speed_complete', value: 15 },
    rewards: { coins: 1000, hints: 10 },
    rarity: 'epic',
  },

  // Special Category
  {
    id: 'rich',
    name: 'Getting Rich',
    description: 'Earn 5000 coins total',
    icon: '💰',
    category: 'special',
    requirement: { type: 'coins_earned', value: 5000 },
    rewards: { coins: 500, hints: 5 },
    rarity: 'rare',
  },
  {
    id: 'millionaire',
    name: 'Millionaire',
    description: 'Earn 50000 coins total',
    icon: '🤑',
    category: 'special',
    requirement: { type: 'coins_earned', value: 50000 },
    rewards: { coins: 5000, hints: 25 },
    rarity: 'legendary',
  },
];

export const RARITY_COLORS = {
  common: '#95a5a6',
  uncommon: '#27ae60',
  rare: '#3498db',
  epic: '#9b59b6',
  legendary: '#f39c12',
};

export const getAchievementsByCategory = (category: string): Achievement[] => {
  return ACHIEVEMENTS.filter(a => a.category === category);
};

export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find(a => a.id === id);
};

export const checkAchievementProgress = (
  achievement: Achievement,
  stats: {
    wordsFound: number;
    levelsCompleted: number;
    streakDays: number;
    fastestTime: number;
    bonusWords: number;
    hintsUnused: number;
    perfectLevels: number;
    dailyCompleted: number;
    coinsEarned: number;
  }
): { unlocked: boolean; progress: number; max: number } => {
  const req = achievement.requirement;
  let current = 0;

  switch (req.type) {
    case 'words_found':
      current = stats.wordsFound;
      break;
    case 'levels_completed':
      current = stats.levelsCompleted;
      break;
    case 'streak_days':
      current = stats.streakDays;
      break;
    case 'speed_complete':
      current = stats.fastestTime <= req.value ? req.value : 0;
      break;
    case 'bonus_words':
      current = stats.bonusWords;
      break;
    case 'hints_unused':
      current = stats.hintsUnused;
      break;
    case 'perfect_level':
      current = stats.perfectLevels;
      break;
    case 'daily_complete':
      current = stats.dailyCompleted;
      break;
    case 'coins_earned':
      current = stats.coinsEarned;
      break;
  }

  return {
    unlocked: current >= req.value,
    progress: Math.min(current, req.value),
    max: req.value,
  };
};
