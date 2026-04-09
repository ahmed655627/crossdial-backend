// Original, non-copyrighted puzzle content for all game modes

export interface MirrorWordPuzzle {
  id: number;
  word: string;
  clue: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LayerPuzzle {
  id: number;
  layers: string[];
  clues: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface EmotionChainPuzzle {
  id: number;
  startWord: string;
  chainWords: string[];
  clues: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MissingHeartsPuzzle {
  id: number;
  word: string;
  pattern: string; // e.g., "L_V_" for "LOVE"
  clue: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface WordPairPuzzle {
  id: number;
  words: [string, string];
  clue: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FlipSolvePuzzle {
  id: number;
  word: string;
  scrambled: string;
  clue: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CrossedEmotionsPuzzle {
  id: number;
  grid: { word: string; row: number; col: number; direction: 'across' | 'down' }[];
  clues: { direction: 'across' | 'down'; number: number; clue: string }[];
  difficulty: 'easy' | 'medium' | 'hard';
}

// MIRROR WORDS - Original content
export const mirrorWordPuzzles: MirrorWordPuzzle[] = [
  { id: 1, word: 'HEART', clue: 'The organ of emotions', difficulty: 'easy' },
  { id: 2, word: 'SMILE', clue: 'Expression of happiness', difficulty: 'easy' },
  { id: 3, word: 'PEACE', clue: 'Calm and tranquility', difficulty: 'easy' },
  { id: 4, word: 'DREAM', clue: 'Night visions', difficulty: 'easy' },
  { id: 5, word: 'TRUST', clue: 'Foundation of relationships', difficulty: 'easy' },
  { id: 6, word: 'KINDNESS', clue: 'Being gentle and caring', difficulty: 'medium' },
  { id: 7, word: 'HARMONY', clue: 'Perfect balance', difficulty: 'medium' },
  { id: 8, word: 'PASSION', clue: 'Intense feeling', difficulty: 'medium' },
  { id: 9, word: 'DEVOTION', clue: 'Deep commitment', difficulty: 'medium' },
  { id: 10, word: 'CHERISH', clue: 'To hold dear', difficulty: 'medium' },
  { id: 11, word: 'AFFECTION', clue: 'Warm feelings', difficulty: 'hard' },
  { id: 12, word: 'GRATITUDE', clue: 'Thankfulness', difficulty: 'hard' },
  { id: 13, word: 'COMPASSION', clue: 'Empathy for others', difficulty: 'hard' },
  { id: 14, word: 'SERENITY', clue: 'Inner calmness', difficulty: 'hard' },
  { id: 15, word: 'TENDERNESS', clue: 'Gentle affection', difficulty: 'hard' },
];

// LOVE IN LAYERS - Original content
export const layerPuzzles: LayerPuzzle[] = [
  { id: 1, layers: ['CARE', 'RACE'], clues: ['Attention and concern', 'A competition'], difficulty: 'easy' },
  { id: 2, layers: ['LOVE', 'VOLE'], clues: ['Deep affection', 'Small rodent'], difficulty: 'easy' },
  { id: 3, layers: ['HEART', 'EARTH'], clues: ['Symbol of love', 'Our planet'], difficulty: 'easy' },
  { id: 4, layers: ['SMILE', 'LIMES', 'SLIME'], clues: ['Happy expression', 'Green fruits', 'Sticky substance'], difficulty: 'medium' },
  { id: 5, layers: ['DEAR', 'DARE', 'READ'], clues: ['Beloved', 'Challenge', 'Interpret text'], difficulty: 'medium' },
  { id: 6, layers: ['FRIEND', 'FINDER', 'REFIND'], clues: ['Companion', 'One who discovers', 'Find again'], difficulty: 'hard' },
  { id: 7, layers: ['LISTEN', 'SILENT', 'ENLIST'], clues: ['Pay attention', 'No sound', 'Join up'], difficulty: 'hard' },
  { id: 8, layers: ['UNITED', 'UNTIED', 'DUNITE'], clues: ['Together', 'Loosened', 'A rock type'], difficulty: 'hard' },
];

// EMOTION CHAIN - Original content
export const emotionChainPuzzles: EmotionChainPuzzle[] = [
  { id: 1, startWord: 'LOVE', chainWords: ['EVER', 'REEL', 'LEAN'], clues: ['Always', 'Film holder', 'Tilt'], difficulty: 'easy' },
  { id: 2, startWord: 'HOPE', chainWords: ['OPEN', 'PENS', 'NEST'], clues: ['Not closed', 'Writing tools', 'Bird home'], difficulty: 'easy' },
  { id: 3, startWord: 'CARE', chainWords: ['AREA', 'EARS', 'RISE'], clues: ['Region', 'Hearing organs', 'Go up'], difficulty: 'easy' },
  { id: 4, startWord: 'TRUST', chainWords: ['STRUT', 'TURFS', 'FIRST'], clues: ['Proud walk', 'Grass areas', 'Number one'], difficulty: 'medium' },
  { id: 5, startWord: 'PEACE', chainWords: ['SPACE', 'CAPES', 'PACES'], clues: ['Outer area', 'Superhero wear', 'Steps'], difficulty: 'medium' },
  { id: 6, startWord: 'KINDNESS', chainWords: ['SKINNED', 'DINNERS', 'INDERS'], clues: ['Peeled', 'Evening meals', 'Blocks'], difficulty: 'hard' },
];

// MISSING HEARTS - Original content
export const missingHeartsPuzzles: MissingHeartsPuzzle[] = [
  { id: 1, word: 'LOVE', pattern: 'L_V_', clue: 'Deep affection', difficulty: 'easy' },
  { id: 2, word: 'HOPE', pattern: 'H_P_', clue: 'Optimistic feeling', difficulty: 'easy' },
  { id: 3, word: 'CARE', pattern: 'C_R_', clue: 'Show concern', difficulty: 'easy' },
  { id: 4, word: 'DREAM', pattern: 'D_E_M', clue: 'Night vision', difficulty: 'easy' },
  { id: 5, word: 'PEACE', pattern: 'P__CE', clue: 'Tranquility', difficulty: 'easy' },
  { id: 6, word: 'KINDNESS', pattern: 'K_ND__SS', clue: 'Being gentle', difficulty: 'medium' },
  { id: 7, word: 'HARMONY', pattern: 'H_R__NY', clue: 'Perfect balance', difficulty: 'medium' },
  { id: 8, word: 'PASSION', pattern: 'P_SS__N', clue: 'Strong emotion', difficulty: 'medium' },
  { id: 9, word: 'GRATITUDE', pattern: 'GR_T_T_DE', clue: 'Thankfulness', difficulty: 'hard' },
  { id: 10, word: 'COMPASSION', pattern: 'C_MP_SS__N', clue: 'Empathy', difficulty: 'hard' },
  { id: 11, word: 'SERENITY', pattern: 'S_R_N_TY', clue: 'Calmness', difficulty: 'hard' },
  { id: 12, word: 'TENDERNESS', pattern: 'T_ND_RN_SS', clue: 'Gentle affection', difficulty: 'hard' },
];

// WORD PAIR - Original content
export const wordPairPuzzles: WordPairPuzzle[] = [
  { id: 1, words: ['LOVE', 'CARE'], clue: 'Deep affection and attention', difficulty: 'easy' },
  { id: 2, words: ['HOPE', 'WISH'], clue: 'Desire for something good', difficulty: 'easy' },
  { id: 3, words: ['PEACE', 'CALM'], clue: 'Tranquil states', difficulty: 'easy' },
  { id: 4, words: ['TRUST', 'FAITH'], clue: 'Belief in someone', difficulty: 'easy' },
  { id: 5, words: ['JOY', 'BLISS'], clue: 'Extreme happiness', difficulty: 'medium' },
  { id: 6, words: ['FRIEND', 'ALLY'], clue: 'Someone on your side', difficulty: 'medium' },
  { id: 7, words: ['BRAVE', 'BOLD'], clue: 'Showing courage', difficulty: 'medium' },
  { id: 8, words: ['GENTLE', 'TENDER'], clue: 'Soft and caring', difficulty: 'hard' },
  { id: 9, words: ['PASSION', 'FERVOR'], clue: 'Intense enthusiasm', difficulty: 'hard' },
  { id: 10, words: ['WISDOM', 'INSIGHT'], clue: 'Deep understanding', difficulty: 'hard' },
];

// FLIP & SOLVE - Original content
export const flipSolvePuzzles: FlipSolvePuzzle[] = [
  { id: 1, word: 'HEART', scrambled: 'RATHE', clue: 'Symbol of love', difficulty: 'easy' },
  { id: 2, word: 'SMILE', scrambled: 'MILES', clue: 'Happy expression', difficulty: 'easy' },
  { id: 3, word: 'DREAM', scrambled: 'ARMED', clue: 'Sleep vision', difficulty: 'easy' },
  { id: 4, word: 'TRUST', scrambled: 'STRUT', clue: 'Confidence in someone', difficulty: 'easy' },
  { id: 5, word: 'GRACE', scrambled: 'CAGER', clue: 'Elegance', difficulty: 'medium' },
  { id: 6, word: 'LISTEN', scrambled: 'SILENT', clue: 'Pay attention', difficulty: 'medium' },
  { id: 7, word: 'CARING', scrambled: 'RACING', clue: 'Showing concern', difficulty: 'medium' },
  { id: 8, word: 'HONEST', scrambled: 'ETHNOS', clue: 'Truthful', difficulty: 'hard' },
  { id: 9, word: 'PATIENT', scrambled: 'PATINE', clue: 'Willing to wait', difficulty: 'hard' },
  { id: 10, word: 'DEVOTED', scrambled: 'DOVETED', clue: 'Loyal and loving', difficulty: 'hard' },
];

// CROSSED EMOTIONS - Mini crosswords - Original content
export const crossedEmotionsPuzzles: CrossedEmotionsPuzzle[] = [
  {
    id: 1,
    grid: [
      { word: 'LOVE', row: 0, col: 0, direction: 'across' },
      { word: 'HOPE', row: 0, col: 0, direction: 'down' },
      { word: 'EVER', row: 0, col: 3, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Deep affection' },
      { direction: 'down', number: 1, clue: 'Optimism' },
      { direction: 'down', number: 2, clue: 'Always' },
    ],
    difficulty: 'easy',
  },
  {
    id: 2,
    grid: [
      { word: 'CARE', row: 0, col: 0, direction: 'across' },
      { word: 'CALM', row: 0, col: 0, direction: 'down' },
      { word: 'REST', row: 0, col: 2, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Show concern' },
      { direction: 'down', number: 1, clue: 'Peaceful state' },
      { direction: 'down', number: 2, clue: 'Relaxation' },
    ],
    difficulty: 'easy',
  },
  {
    id: 3,
    grid: [
      { word: 'PEACE', row: 0, col: 0, direction: 'across' },
      { word: 'PURE', row: 0, col: 0, direction: 'down' },
      { word: 'EASE', row: 0, col: 4, direction: 'down' },
      { word: 'CALM', row: 2, col: 0, direction: 'across' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Tranquility' },
      { direction: 'down', number: 1, clue: 'Clean and innocent' },
      { direction: 'down', number: 2, clue: 'Comfort' },
      { direction: 'across', number: 3, clue: 'Serene' },
    ],
    difficulty: 'medium',
  },
  {
    id: 4,
    grid: [
      { word: 'TRUST', row: 0, col: 0, direction: 'across' },
      { word: 'TRUE', row: 0, col: 0, direction: 'down' },
      { word: 'SWEET', row: 0, col: 4, direction: 'down' },
      { word: 'UNITY', row: 2, col: 0, direction: 'across' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Belief in someone' },
      { direction: 'down', number: 1, clue: 'Genuine' },
      { direction: 'down', number: 2, clue: 'Pleasant taste' },
      { direction: 'across', number: 3, clue: 'Togetherness' },
    ],
    difficulty: 'medium',
  },
  {
    id: 5,
    grid: [
      { word: 'KINDNESS', row: 0, col: 0, direction: 'across' },
      { word: 'KEEN', row: 0, col: 0, direction: 'down' },
      { word: 'SOFT', row: 0, col: 7, direction: 'down' },
      { word: 'EMPATHY', row: 2, col: 0, direction: 'across' },
      { word: 'HARMONY', row: 4, col: 1, direction: 'across' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Being gentle and caring' },
      { direction: 'down', number: 1, clue: 'Eager' },
      { direction: 'down', number: 2, clue: 'Not hard' },
      { direction: 'across', number: 3, clue: 'Understanding others' },
      { direction: 'across', number: 4, clue: 'Perfect balance' },
    ],
    difficulty: 'hard',
  },
];

// Helper function to mirror a word
export const mirrorWord = (word: string): string => {
  return word.split('').reverse().join('');
};

// Helper function to scramble letters
export const scrambleWord = (word: string): string => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};
