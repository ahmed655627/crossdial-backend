/**
 * Game Theme System
 * Background themes and wheel designs for each level range
 */

// Background theme types
export type BackgroundTheme = 
  | 'mountains' | 'desert' | 'tropical' | 'ocean' | 'asian'
  | 'european' | 'volcanic' | 'arctic' | 'jungle' | 'space';

// Wheel design types
export type WheelDesign = 
  | 'wood' | 'silver' | 'golden' | 'crystal' | 'nature'
  | 'fire' | 'ice' | 'night' | 'rainbow' | 'electric';

// Theme configuration for each level range
export interface LevelTheme {
  background: BackgroundTheme;
  wheel: WheelDesign;
  levelRange: [number, number];
  name: string;
  description: string;
}

// Background configurations with colors and gradients
export interface BackgroundConfig {
  id: BackgroundTheme;
  name: string;
  gradientColors: string[];
  overlayOpacity: number;
  particleColor: string;
  imageUrl?: string;
}

// Wheel design configurations
export interface WheelConfig {
  id: WheelDesign;
  name: string;
  outerRingColor: string;
  outerRingGradient: string[];
  innerColor: string;
  innerGradient: string[];
  letterButtonColor: string;
  letterTextColor: string;
  glowColor: string;
  shadowColor: string;
  texture?: 'wood' | 'metal' | 'glass' | 'stone' | 'glow';
}

// Level themes mapping
export const levelThemes: LevelTheme[] = [
  { levelRange: [1, 15], background: 'mountains', wheel: 'wood', name: 'Mountain Peaks', description: 'Snowy mountains and forests' },
  { levelRange: [16, 30], background: 'desert', wheel: 'golden', name: 'Desert Sands', description: 'Golden dunes and pyramids' },
  { levelRange: [31, 45], background: 'tropical', wheel: 'nature', name: 'Tropical Paradise', description: 'Beaches and palm trees' },
  { levelRange: [46, 60], background: 'ocean', wheel: 'crystal', name: 'Ocean Depths', description: 'Underwater coral reefs' },
  { levelRange: [61, 75], background: 'asian', wheel: 'silver', name: 'Eastern Wonder', description: 'Cherry blossoms and temples' },
  { levelRange: [76, 90], background: 'european', wheel: 'wood', name: 'European Charm', description: 'Castles and villages' },
  { levelRange: [91, 105], background: 'volcanic', wheel: 'fire', name: 'Volcanic Fury', description: 'Lava and dark mountains' },
  { levelRange: [106, 120], background: 'arctic', wheel: 'ice', name: 'Arctic Frost', description: 'Ice and northern lights' },
  { levelRange: [121, 135], background: 'jungle', wheel: 'nature', name: 'Wild Jungle', description: 'Rainforest and waterfalls' },
  { levelRange: [136, 150], background: 'space', wheel: 'electric', name: 'Cosmic Quest', description: 'Stars and nebulas' },
];

// Background configurations
export const backgroundConfigs: Record<BackgroundTheme, BackgroundConfig> = {
  mountains: {
    id: 'mountains',
    name: 'Mountain Peaks',
    gradientColors: ['#2C3E50', '#4CA1AF', '#C9D6FF'],
    overlayOpacity: 0.3,
    particleColor: '#FFFFFF',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
  },
  desert: {
    id: 'desert',
    name: 'Desert Sands',
    gradientColors: ['#F2994A', '#F2C94C', '#FFE5B4'],
    overlayOpacity: 0.25,
    particleColor: '#FFD700',
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35',
  },
  tropical: {
    id: 'tropical',
    name: 'Tropical Paradise',
    gradientColors: ['#11998E', '#38EF7D', '#A8E6CF'],
    overlayOpacity: 0.3,
    particleColor: '#FFFFFF',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Depths',
    gradientColors: ['#1A2980', '#26D0CE', '#00D2FF'],
    overlayOpacity: 0.4,
    particleColor: '#00FFFF',
    imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000',
  },
  asian: {
    id: 'asian',
    name: 'Eastern Wonder',
    gradientColors: ['#FF758C', '#FF7EB3', '#FFB6C1'],
    overlayOpacity: 0.3,
    particleColor: '#FFB7C5',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
  },
  european: {
    id: 'european',
    name: 'European Charm',
    gradientColors: ['#4B6CB7', '#182848', '#6B8DD6'],
    overlayOpacity: 0.35,
    particleColor: '#FFFFFF',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
  },
  volcanic: {
    id: 'volcanic',
    name: 'Volcanic Fury',
    gradientColors: ['#200122', '#6F0000', '#FF4500'],
    overlayOpacity: 0.4,
    particleColor: '#FF6B35',
    imageUrl: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413',
  },
  arctic: {
    id: 'arctic',
    name: 'Arctic Frost',
    gradientColors: ['#E0EAFC', '#CFDEF3', '#A8DADC'],
    overlayOpacity: 0.2,
    particleColor: '#FFFFFF',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7',
  },
  jungle: {
    id: 'jungle',
    name: 'Wild Jungle',
    gradientColors: ['#134E5E', '#71B280', '#2D5016'],
    overlayOpacity: 0.35,
    particleColor: '#90EE90',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
  },
  space: {
    id: 'space',
    name: 'Cosmic Quest',
    gradientColors: ['#0F0C29', '#302B63', '#24243E'],
    overlayOpacity: 0.2,
    particleColor: '#FFFFFF',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
  },
};

// Wheel design configurations
export const wheelConfigs: Record<WheelDesign, WheelConfig> = {
  wood: {
    id: 'wood',
    name: 'Classic Wood',
    outerRingColor: '#8B7355',
    outerRingGradient: ['#A0522D', '#8B4513', '#CD853F'],
    innerColor: '#DEB887',
    innerGradient: ['#D2B48C', '#C4A67C', '#8B7355'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#4A3728',
    glowColor: '#FFD700',
    shadowColor: '#3E2723',
    texture: 'wood',
  },
  silver: {
    id: 'silver',
    name: 'Silver Metal',
    outerRingColor: '#C0C0C0',
    outerRingGradient: ['#E8E8E8', '#B8B8B8', '#A0A0A0'],
    innerColor: '#D3D3D3',
    innerGradient: ['#F5F5F5', '#E0E0E0', '#BDBDBD'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#424242',
    glowColor: '#87CEEB',
    shadowColor: '#616161',
    texture: 'metal',
  },
  golden: {
    id: 'golden',
    name: 'Royal Gold',
    outerRingColor: '#FFD700',
    outerRingGradient: ['#FFF8DC', '#FFD700', '#DAA520'],
    innerColor: '#F4C430',
    innerGradient: ['#FFE55C', '#FFD700', '#CC9900'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#8B6914',
    glowColor: '#FFFF00',
    shadowColor: '#996515',
    texture: 'metal',
  },
  crystal: {
    id: 'crystal',
    name: 'Crystal Glass',
    outerRingColor: '#87CEEB',
    outerRingGradient: ['#E0FFFF', '#87CEEB', '#4682B4'],
    innerColor: 'rgba(135, 206, 250, 0.5)',
    innerGradient: ['rgba(224, 255, 255, 0.6)', 'rgba(135, 206, 235, 0.4)', 'rgba(70, 130, 180, 0.5)'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#1E3A5F',
    glowColor: '#00FFFF',
    shadowColor: '#1E3A5F',
    texture: 'glass',
  },
  nature: {
    id: 'nature',
    name: 'Forest Nature',
    outerRingColor: '#228B22',
    outerRingGradient: ['#90EE90', '#32CD32', '#228B22'],
    innerColor: '#8FBC8F',
    innerGradient: ['#98FB98', '#90EE90', '#3CB371'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#1B4D3E',
    glowColor: '#7CFC00',
    shadowColor: '#0B3B0B',
    texture: 'wood',
  },
  fire: {
    id: 'fire',
    name: 'Burning Fire',
    outerRingColor: '#FF4500',
    outerRingGradient: ['#FFD700', '#FF6347', '#DC143C'],
    innerColor: '#FF6B35',
    innerGradient: ['#FFD700', '#FF8C00', '#FF4500'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#8B0000',
    glowColor: '#FF6600',
    shadowColor: '#4A0000',
    texture: 'glow',
  },
  ice: {
    id: 'ice',
    name: 'Frozen Ice',
    outerRingColor: '#B0E0E6',
    outerRingGradient: ['#FFFFFF', '#E0FFFF', '#AFEEEE'],
    innerColor: '#F0FFFF',
    innerGradient: ['#FFFFFF', '#E6F3FF', '#B0E0E6'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#4682B4',
    glowColor: '#00CED1',
    shadowColor: '#5F9EA0',
    texture: 'glass',
  },
  night: {
    id: 'night',
    name: 'Starry Night',
    outerRingColor: '#191970',
    outerRingGradient: ['#4B0082', '#191970', '#000033'],
    innerColor: '#2E1A47',
    innerGradient: ['#483D8B', '#2E1A47', '#1A0033'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#E6E6FA',
    glowColor: '#9370DB',
    shadowColor: '#0D0015',
    texture: 'glow',
  },
  rainbow: {
    id: 'rainbow',
    name: 'Rainbow Magic',
    outerRingColor: '#FF69B4',
    outerRingGradient: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF'],
    innerColor: '#FFB6C1',
    innerGradient: ['#FFE4E1', '#FFB6C1', '#FFC0CB'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#8B008B',
    glowColor: '#FF69B4',
    shadowColor: '#4B0082',
    texture: 'glow',
  },
  electric: {
    id: 'electric',
    name: 'Electric Storm',
    outerRingColor: '#00BFFF',
    outerRingGradient: ['#FFFFFF', '#00BFFF', '#1E90FF'],
    innerColor: '#4169E1',
    innerGradient: ['#87CEEB', '#4169E1', '#0000CD'],
    letterButtonColor: '#FFFFFF',
    letterTextColor: '#000080',
    glowColor: '#00FFFF',
    shadowColor: '#00008B',
    texture: 'glow',
  },
};

/**
 * Get theme for a specific level
 */
export const getThemeForLevel = (level: number): LevelTheme => {
  const theme = levelThemes.find(
    t => level >= t.levelRange[0] && level <= t.levelRange[1]
  );
  return theme || levelThemes[0];
};

/**
 * Get background config for a level
 */
export const getBackgroundForLevel = (level: number): BackgroundConfig => {
  const theme = getThemeForLevel(level);
  return backgroundConfigs[theme.background];
};

/**
 * Get wheel config for a level
 */
export const getWheelForLevel = (level: number): WheelConfig => {
  const theme = getThemeForLevel(level);
  return wheelConfigs[theme.wheel];
};

/**
 * Get all available backgrounds
 */
export const getAllBackgrounds = (): BackgroundConfig[] => {
  return Object.values(backgroundConfigs);
};

/**
 * Get all available wheels
 */
export const getAllWheels = (): WheelConfig[] => {
  return Object.values(wheelConfigs);
};

export default {
  levelThemes,
  backgroundConfigs,
  wheelConfigs,
  getThemeForLevel,
  getBackgroundForLevel,
  getWheelForLevel,
};
