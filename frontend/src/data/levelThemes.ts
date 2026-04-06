/**
 * Theme Configuration for Different Level Backgrounds
 * Each theme has background images, colors for tiles, wheel, and border
 */

export interface LevelTheme {
  id: string;
  name: string;
  backgroundImage: string;
  primaryColor: string;
  secondaryColor: string;
  tileColors: string[];
  wheelBackground: string;
  letterColor: string;
  borderColor: string;
  feedbackText: string;
}

// Nature background images (using placeholder gradients - replace with real images)
export const LEVEL_THEMES: LevelTheme[] = [
  {
    id: 'ocean',
    name: 'OCEAN',
    backgroundImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    primaryColor: '#00bcd4',
    secondaryColor: '#0097a7',
    tileColors: ['#00bcd4', '#00acc1', '#0097a7'],
    wheelBackground: 'rgba(0, 30, 50, 0.85)',
    letterColor: '#00bcd4',
    borderColor: '#00bcd4',
    feedbackText: 'Excellent!',
  },
  {
    id: 'winter',
    name: 'WINTER',
    backgroundImage: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800',
    primaryColor: '#42a5f5',
    secondaryColor: '#1e88e5',
    tileColors: ['#42a5f5', '#2196f3', '#1e88e5'],
    wheelBackground: 'rgba(20, 40, 60, 0.85)',
    letterColor: '#42a5f5',
    borderColor: '#42a5f5',
    feedbackText: 'Brilliant!',
  },
  {
    id: 'forest',
    name: 'FOREST',
    backgroundImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    primaryColor: '#4caf50',
    secondaryColor: '#388e3c',
    tileColors: ['#4caf50', '#43a047', '#388e3c'],
    wheelBackground: 'rgba(20, 40, 20, 0.85)',
    letterColor: '#4caf50',
    borderColor: '#66bb6a',
    feedbackText: 'Super!',
  },
  {
    id: 'mountain',
    name: 'MOUNTAIN',
    backgroundImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    primaryColor: '#ef5350',
    secondaryColor: '#e53935',
    tileColors: ['#ef5350', '#f44336', '#e53935'],
    wheelBackground: 'rgba(40, 20, 30, 0.85)',
    letterColor: '#ef5350',
    borderColor: '#ef5350',
    feedbackText: 'Amazing!',
  },
  {
    id: 'sunset',
    name: 'SUNSET',
    backgroundImage: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800',
    primaryColor: '#ff9800',
    secondaryColor: '#f57c00',
    tileColors: ['#ff9800', '#fb8c00', '#f57c00'],
    wheelBackground: 'rgba(50, 30, 20, 0.85)',
    letterColor: '#ff9800',
    borderColor: '#ffa726',
    feedbackText: 'Fantastic!',
  },
  {
    id: 'lavender',
    name: 'LAVENDER',
    backgroundImage: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800',
    primaryColor: '#ab47bc',
    secondaryColor: '#8e24aa',
    tileColors: ['#ab47bc', '#9c27b0', '#8e24aa'],
    wheelBackground: 'rgba(40, 20, 50, 0.85)',
    letterColor: '#ab47bc',
    borderColor: '#ba68c8',
    feedbackText: 'Wonderful!',
  },
  {
    id: 'desert',
    name: 'DESERT',
    backgroundImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
    primaryColor: '#ffb74d',
    secondaryColor: '#ffa726',
    tileColors: ['#ffb74d', '#ffa726', '#ff9800'],
    wheelBackground: 'rgba(60, 40, 20, 0.85)',
    letterColor: '#ffb74d',
    borderColor: '#ffcc80',
    feedbackText: 'Great!',
  },
  {
    id: 'tropical',
    name: 'TROPICAL',
    backgroundImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800',
    primaryColor: '#26c6da',
    secondaryColor: '#00bcd4',
    tileColors: ['#26c6da', '#00bcd4', '#00acc1'],
    wheelBackground: 'rgba(10, 40, 50, 0.85)',
    letterColor: '#26c6da',
    borderColor: '#4dd0e1',
    feedbackText: 'Perfect!',
  },
];

// Get theme based on level number
export const getThemeForLevelNumber = (levelNumber: number): LevelTheme => {
  const themeIndex = (levelNumber - 1) % LEVEL_THEMES.length;
  return LEVEL_THEMES[themeIndex];
};

// Feedback texts for different situations
export const FEEDBACK_TEXTS = [
  'Excellent!',
  'Super!',
  'Brilliant!',
  'Amazing!',
  'Fantastic!',
  'Wonderful!',
  'Perfect!',
  'Great!',
  'Awesome!',
  'Superb!',
];

export const getRandomFeedback = (): string => {
  return FEEDBACK_TEXTS[Math.floor(Math.random() * FEEDBACK_TEXTS.length)];
};
