// Theme Packs System
// Unlock new visual themes with unique backgrounds, colors, and sounds

export interface ThemePack {
  id: string;
  name: string;
  description: string;
  icon: string;
  previewImage: string;
  unlockRequirement: {
    type: 'level' | 'coins' | 'achievement' | 'purchase';
    value: number | string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string[];
    text: string;
    gridCell: string;
    gridCellFound: string;
    letterWheel: string;
    letterWheelSelected: string;
  };
  sounds: {
    tap: string;
    wordFound: string;
    levelComplete: string;
    background?: string;
  };
  particles?: {
    type: 'stars' | 'bubbles' | 'leaves' | 'snow' | 'fire';
    color: string;
  };
}

export const THEME_PACKS: ThemePack[] = [
  {
    id: 'default',
    name: 'Classic',
    description: 'The original CrossDial experience',
    icon: '🎯',
    previewImage: 'classic_preview',
    unlockRequirement: { type: 'level', value: 1 },
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      background: ['#0f0c29', '#302b63', '#24243e'],
      text: '#ffffff',
      gridCell: '#1a1a2e',
      gridCellFound: '#4CAF50',
      letterWheel: '#2d2d44',
      letterWheelSelected: '#667eea',
    },
    sounds: {
      tap: 'tap_default',
      wordFound: 'word_found_default',
      levelComplete: 'level_complete_default',
    },
  },
  {
    id: 'ocean',
    name: 'Deep Ocean',
    description: 'Dive into the peaceful blue depths',
    icon: '🌊',
    previewImage: 'ocean_preview',
    unlockRequirement: { type: 'level', value: 10 },
    colors: {
      primary: '#0077b6',
      secondary: '#00b4d8',
      accent: '#90e0ef',
      background: ['#03045e', '#023e8a', '#0077b6'],
      text: '#caf0f8',
      gridCell: '#023e8a',
      gridCellFound: '#00b4d8',
      letterWheel: '#0077b6',
      letterWheelSelected: '#48cae4',
    },
    sounds: {
      tap: 'tap_bubble',
      wordFound: 'word_found_splash',
      levelComplete: 'level_complete_wave',
      background: 'ocean_ambience',
    },
    particles: { type: 'bubbles', color: '#90e0ef' },
  },
  {
    id: 'forest',
    name: 'Enchanted Forest',
    description: 'Find words among the magical trees',
    icon: '🌲',
    previewImage: 'forest_preview',
    unlockRequirement: { type: 'level', value: 25 },
    colors: {
      primary: '#2d6a4f',
      secondary: '#40916c',
      accent: '#95d5b2',
      background: ['#1b4332', '#2d6a4f', '#40916c'],
      text: '#d8f3dc',
      gridCell: '#1b4332',
      gridCellFound: '#52b788',
      letterWheel: '#2d6a4f',
      letterWheelSelected: '#74c69d',
    },
    sounds: {
      tap: 'tap_leaf',
      wordFound: 'word_found_chime',
      levelComplete: 'level_complete_birds',
      background: 'forest_ambience',
    },
    particles: { type: 'leaves', color: '#95d5b2' },
  },
  {
    id: 'space',
    name: 'Cosmic Galaxy',
    description: 'Explore words among the stars',
    icon: '🚀',
    previewImage: 'space_preview',
    unlockRequirement: { type: 'level', value: 50 },
    colors: {
      primary: '#7b2cbf',
      secondary: '#9d4edd',
      accent: '#e0aaff',
      background: ['#10002b', '#240046', '#3c096c'],
      text: '#e0aaff',
      gridCell: '#240046',
      gridCellFound: '#9d4edd',
      letterWheel: '#3c096c',
      letterWheelSelected: '#c77dff',
    },
    sounds: {
      tap: 'tap_cosmic',
      wordFound: 'word_found_whoosh',
      levelComplete: 'level_complete_epic',
      background: 'space_ambience',
    },
    particles: { type: 'stars', color: '#e0aaff' },
  },
  {
    id: 'sunset',
    name: 'Golden Sunset',
    description: 'Warm hues of a beautiful evening',
    icon: '🌅',
    previewImage: 'sunset_preview',
    unlockRequirement: { type: 'coins', value: 1000 },
    colors: {
      primary: '#f77f00',
      secondary: '#fcbf49',
      accent: '#eae2b7',
      background: ['#d62828', '#f77f00', '#fcbf49'],
      text: '#eae2b7',
      gridCell: '#d62828',
      gridCellFound: '#fcbf49',
      letterWheel: '#f77f00',
      letterWheelSelected: '#eae2b7',
    },
    sounds: {
      tap: 'tap_warm',
      wordFound: 'word_found_gentle',
      levelComplete: 'level_complete_peaceful',
    },
  },
  {
    id: 'winter',
    name: 'Winter Wonderland',
    description: 'Cool and crisp snowy vibes',
    icon: '❄️',
    previewImage: 'winter_preview',
    unlockRequirement: { type: 'coins', value: 2000 },
    colors: {
      primary: '#a2d2ff',
      secondary: '#bde0fe',
      accent: '#ffffff',
      background: ['#1d3557', '#457b9d', '#a8dadc'],
      text: '#f1faee',
      gridCell: '#1d3557',
      gridCellFound: '#a8dadc',
      letterWheel: '#457b9d',
      letterWheelSelected: '#f1faee',
    },
    sounds: {
      tap: 'tap_crystal',
      wordFound: 'word_found_sparkle',
      levelComplete: 'level_complete_bells',
      background: 'winter_ambience',
    },
    particles: { type: 'snow', color: '#ffffff' },
  },
  {
    id: 'neon',
    name: 'Neon City',
    description: 'Cyberpunk vibes in the city night',
    icon: '🌃',
    previewImage: 'neon_preview',
    unlockRequirement: { type: 'level', value: 75 },
    colors: {
      primary: '#ff006e',
      secondary: '#8338ec',
      accent: '#3a86ff',
      background: ['#000000', '#14213d', '#1a1a2e'],
      text: '#ffffff',
      gridCell: '#14213d',
      gridCellFound: '#ff006e',
      letterWheel: '#1a1a2e',
      letterWheelSelected: '#8338ec',
    },
    sounds: {
      tap: 'tap_synth',
      wordFound: 'word_found_electric',
      levelComplete: 'level_complete_synth',
    },
  },
  {
    id: 'candy',
    name: 'Candy Land',
    description: 'Sweet and colorful fun!',
    icon: '🍭',
    previewImage: 'candy_preview',
    unlockRequirement: { type: 'coins', value: 500 },
    colors: {
      primary: '#ff69b4',
      secondary: '#ffd700',
      accent: '#00ff00',
      background: ['#ff69b4', '#ffb6c1', '#ffc0cb'],
      text: '#4b0082',
      gridCell: '#ff1493',
      gridCellFound: '#00ff00',
      letterWheel: '#ff69b4',
      letterWheelSelected: '#ffd700',
    },
    sounds: {
      tap: 'tap_pop',
      wordFound: 'word_found_ding',
      levelComplete: 'level_complete_fanfare',
    },
  },
];

export const getUnlockedThemes = (level: number, coins: number, achievements: string[]): ThemePack[] => {
  return THEME_PACKS.filter(theme => {
    const req = theme.unlockRequirement;
    switch (req.type) {
      case 'level':
        return level >= (req.value as number);
      case 'coins':
        return coins >= (req.value as number);
      case 'achievement':
        return achievements.includes(req.value as string);
      case 'purchase':
        return false; // Handle separately for IAP
      default:
        return false;
    }
  });
};

export const getThemeById = (id: string): ThemePack | undefined => {
  return THEME_PACKS.find(t => t.id === id);
};
