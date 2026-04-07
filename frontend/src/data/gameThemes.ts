// Original Theme Categories - Copyright Free
// Unique themes that don't reference any copyrighted content

export interface GameTheme {
  id: string;
  name: string;
  nameIt: string; // Italian
  icon: string;
  colors: string[];
  tileColors: string[];
  description: string;
  descriptionIt: string;
}

export const GAME_THEMES: GameTheme[] = [
  {
    id: 'nature',
    name: 'Nature',
    nameIt: 'Natura',
    icon: '🌿',
    colors: ['#134e5e', '#1a5d4d', '#71b280'],
    tileColors: ['#22c55e', '#16a34a', '#15803d'],
    description: 'Explore the wonders of nature',
    descriptionIt: 'Esplora le meraviglie della natura',
  },
  {
    id: 'ocean',
    name: 'Ocean Deep',
    nameIt: 'Oceano Profondo',
    icon: '🌊',
    colors: ['#0f2027', '#203a43', '#2c5364'],
    tileColors: ['#06b6d4', '#0891b2', '#0e7490'],
    description: 'Dive into ocean mysteries',
    descriptionIt: 'Immergiti nei misteri oceanici',
  },
  {
    id: 'space',
    name: 'Galaxy',
    nameIt: 'Galassia',
    icon: '🌌',
    colors: ['#0f0c29', '#302b63', '#24243e'],
    tileColors: ['#a855f7', '#9333ea', '#7e22ce'],
    description: 'Journey through the stars',
    descriptionIt: 'Viaggio tra le stelle',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    nameIt: 'Tramonto',
    icon: '🌅',
    colors: ['#ff6b6b', '#ee5a5a', '#c44569'],
    tileColors: ['#f97316', '#ea580c', '#c2410c'],
    description: 'Chase the golden hour',
    descriptionIt: 'Insegui l\'ora dorata',
  },
  {
    id: 'forest',
    name: 'Forest',
    nameIt: 'Foresta',
    icon: '🌲',
    colors: ['#2d5016', '#3f6212', '#4d7c0f'],
    tileColors: ['#84cc16', '#65a30d', '#4d7c0f'],
    description: 'Wander through ancient trees',
    descriptionIt: 'Passeggia tra alberi antichi',
  },
  {
    id: 'desert',
    name: 'Desert',
    nameIt: 'Deserto',
    icon: '🏜️',
    colors: ['#92400e', '#b45309', '#d97706'],
    tileColors: ['#fbbf24', '#f59e0b', '#d97706'],
    description: 'Cross the golden dunes',
    descriptionIt: 'Attraversa le dune dorate',
  },
  {
    id: 'arctic',
    name: 'Arctic',
    nameIt: 'Artico',
    icon: '❄️',
    colors: ['#0c4a6e', '#075985', '#0369a1'],
    tileColors: ['#38bdf8', '#0ea5e9', '#0284c7'],
    description: 'Explore frozen landscapes',
    descriptionIt: 'Esplora paesaggi ghiacciati',
  },
  {
    id: 'garden',
    name: 'Garden',
    nameIt: 'Giardino',
    icon: '🌸',
    colors: ['#831843', '#9d174d', '#be185d'],
    tileColors: ['#ec4899', '#db2777', '#be185d'],
    description: 'Bloom with colorful words',
    descriptionIt: 'Fiorisci con parole colorate',
  },
  {
    id: 'volcano',
    name: 'Volcano',
    nameIt: 'Vulcano',
    icon: '🌋',
    colors: ['#7f1d1d', '#991b1b', '#b91c1c'],
    tileColors: ['#ef4444', '#dc2626', '#b91c1c'],
    description: 'Feel the heat of words',
    descriptionIt: 'Senti il calore delle parole',
  },
  {
    id: 'mountain',
    name: 'Mountain',
    nameIt: 'Montagna',
    icon: '⛰️',
    colors: ['#1e3a5f', '#2563eb', '#3b82f6'],
    tileColors: ['#60a5fa', '#3b82f6', '#2563eb'],
    description: 'Climb to new heights',
    descriptionIt: 'Scala nuove vette',
  },
];

// Get theme for a level (cycles through themes)
export const getThemeForLevel = (levelId: number): GameTheme => {
  const index = (levelId - 1) % GAME_THEMES.length;
  return GAME_THEMES[index];
};

// Level categories with original clues
export interface LevelCategory {
  id: string;
  name: string;
  nameIt: string;
  levels: number[]; // Level range start
}

export const LEVEL_CATEGORIES: LevelCategory[] = [
  { id: 'basics', name: 'Basics', nameIt: 'Base', levels: [1, 20] },
  { id: 'everyday', name: 'Everyday Life', nameIt: 'Vita Quotidiana', levels: [21, 40] },
  { id: 'nature', name: 'Nature & Animals', nameIt: 'Natura e Animali', levels: [41, 60] },
  { id: 'food', name: 'Food & Kitchen', nameIt: 'Cibo e Cucina', levels: [61, 80] },
  { id: 'travel', name: 'Travel & Places', nameIt: 'Viaggi e Luoghi', levels: [81, 100] },
  { id: 'sports', name: 'Sports & Games', nameIt: 'Sport e Giochi', levels: [101, 120] },
  { id: 'science', name: 'Science & Tech', nameIt: 'Scienza e Tecnologia', levels: [121, 140] },
  { id: 'expert', name: 'Expert', nameIt: 'Esperto', levels: [141, 150] },
];

export const getCategoryForLevel = (levelId: number): LevelCategory => {
  for (const category of LEVEL_CATEGORIES) {
    if (levelId >= category.levels[0] && levelId <= category.levels[1]) {
      return category;
    }
  }
  return LEVEL_CATEGORIES[0];
};
