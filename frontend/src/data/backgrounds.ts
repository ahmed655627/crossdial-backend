// Background configurations for different level themes

export interface BackgroundConfig {
  id: string;
  name: string;
  colors: string[];  // Gradient colors
  overlayOpacity: number;
  tileColor: string;  // Primary color for found tiles
  tileGradient: string[];  // Gradient for found tiles
  wheelColor: string;  // Color for selected letters
  accentColor: string;
}

export const BACKGROUNDS: Record<string, BackgroundConfig> = {
  mountains: {
    id: 'mountains',
    name: 'Mountains',
    colors: ['#1e3c72', '#2a5298', '#667eea'],
    overlayOpacity: 0.3,
    tileColor: '#4fc3f7',
    tileGradient: ['#4fc3f7', '#29b6f6', '#039be5'],
    wheelColor: '#4fc3f7',
    accentColor: '#81d4fa',
  },
  snow: {
    id: 'snow',
    name: 'Winter Snow',
    colors: ['#0f2027', '#203a43', '#2c5364'],
    overlayOpacity: 0.25,
    tileColor: '#4dd0e1',
    tileGradient: ['#4dd0e1', '#26c6da', '#00bcd4'],
    wheelColor: '#4dd0e1',
    accentColor: '#80deea',
  },
  ocean: {
    id: 'ocean',
    name: 'Deep Ocean',
    colors: ['#0f0c29', '#302b63', '#24243e'],
    overlayOpacity: 0.3,
    tileColor: '#7c4dff',
    tileGradient: ['#7c4dff', '#651fff', '#6200ea'],
    wheelColor: '#7c4dff',
    accentColor: '#b388ff',
  },
  forest: {
    id: 'forest',
    name: 'Green Forest',
    colors: ['#134e5e', '#1a5d4d', '#71b280'],
    overlayOpacity: 0.35,
    tileColor: '#66bb6a',
    tileGradient: ['#66bb6a', '#4caf50', '#43a047'],
    wheelColor: '#66bb6a',
    accentColor: '#a5d6a7',
  },
  desert: {
    id: 'desert',
    name: 'Golden Desert',
    colors: ['#f2994a', '#d35400', '#9c4302'],
    overlayOpacity: 0.35,
    tileColor: '#ffb74d',
    tileGradient: ['#ffb74d', '#ffa726', '#ff9800'],
    wheelColor: '#ffb74d',
    accentColor: '#ffcc80',
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    colors: ['#ee9ca7', '#ffdde1', '#f093fb'],
    overlayOpacity: 0.3,
    tileColor: '#f06292',
    tileGradient: ['#f06292', '#ec407a', '#e91e63'],
    wheelColor: '#f06292',
    accentColor: '#f48fb1',
  },
  beach: {
    id: 'beach',
    name: 'Tropical Beach',
    colors: ['#00b4db', '#0083b0', '#005c7a'],
    overlayOpacity: 0.25,
    tileColor: '#26c6da',
    tileGradient: ['#26c6da', '#00bcd4', '#00acc1'],
    wheelColor: '#26c6da',
    accentColor: '#80deea',
  },
  flowers: {
    id: 'flowers',
    name: 'Spring Flowers',
    colors: ['#a8edea', '#fed6e3', '#d299c2'],
    overlayOpacity: 0.35,
    tileColor: '#ba68c8',
    tileGradient: ['#ba68c8', '#ab47bc', '#9c27b0'],
    wheelColor: '#ba68c8',
    accentColor: '#ce93d8',
  },
  rome: {
    id: 'rome',
    name: 'Ancient Rome',
    colors: ['#3e2723', '#5d4037', '#795548'],
    overlayOpacity: 0.35,
    tileColor: '#ef5350',
    tileGradient: ['#ef5350', '#e53935', '#d32f2f'],
    wheelColor: '#ef5350',
    accentColor: '#ef9a9a',
  },
};

export const getBackgroundConfig = (backgroundId: string): BackgroundConfig => {
  return BACKGROUNDS[backgroundId] || BACKGROUNDS.mountains;
};
