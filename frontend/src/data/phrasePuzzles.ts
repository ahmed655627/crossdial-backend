// Sentence/Phrase Puzzle System
// Famous quotes, sayings, and phrases to solve

export interface PhrasePuzzle {
  id: number;
  category: string;
  phrase: string;
  words: string[];
  clue: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rewards: {
    coins: number;
    xp: number;
  };
  author?: string;
}

export const PHRASE_CATEGORIES = [
  { id: 'proverbs', name: 'Proverbs', icon: '📜', color: '#8B4513' },
  { id: 'quotes', name: 'Famous Quotes', icon: '💬', color: '#4A90D9' },
  { id: 'sayings', name: 'Common Sayings', icon: '🗣️', color: '#2ECC71' },
  { id: 'riddles', name: 'Riddles', icon: '🧩', color: '#9B59B6' },
  { id: 'tongue_twisters', name: 'Tongue Twisters', icon: '👅', color: '#E74C3C' },
];

export const PHRASE_PUZZLES: PhrasePuzzle[] = [
  // Proverbs
  {
    id: 1,
    category: 'proverbs',
    phrase: 'ACTIONS SPEAK LOUDER THAN WORDS',
    words: ['ACTIONS', 'SPEAK', 'LOUDER', 'THAN', 'WORDS'],
    clue: 'What you do matters more than what you say',
    difficulty: 'easy',
    rewards: { coins: 50, xp: 100 },
  },
  {
    id: 2,
    category: 'proverbs',
    phrase: 'A PENNY SAVED IS A PENNY EARNED',
    words: ['A', 'PENNY', 'SAVED', 'IS', 'A', 'PENNY', 'EARNED'],
    clue: 'About the value of saving money',
    difficulty: 'medium',
    rewards: { coins: 75, xp: 150 },
  },
  {
    id: 3,
    category: 'proverbs',
    phrase: 'THE EARLY BIRD CATCHES THE WORM',
    words: ['THE', 'EARLY', 'BIRD', 'CATCHES', 'THE', 'WORM'],
    clue: 'Being first has its advantages',
    difficulty: 'easy',
    rewards: { coins: 50, xp: 100 },
  },
  {
    id: 4,
    category: 'proverbs',
    phrase: 'PRACTICE MAKES PERFECT',
    words: ['PRACTICE', 'MAKES', 'PERFECT'],
    clue: 'Repetition leads to mastery',
    difficulty: 'easy',
    rewards: { coins: 40, xp: 80 },
  },
  {
    id: 5,
    category: 'proverbs',
    phrase: 'BETTER LATE THAN NEVER',
    words: ['BETTER', 'LATE', 'THAN', 'NEVER'],
    clue: 'Arriving eventually is preferable to not at all',
    difficulty: 'easy',
    rewards: { coins: 40, xp: 80 },
  },
  
  // Famous Quotes
  {
    id: 6,
    category: 'quotes',
    phrase: 'TO BE OR NOT TO BE',
    words: ['TO', 'BE', 'OR', 'NOT', 'TO', 'BE'],
    clue: 'Shakespeare\'s famous question',
    difficulty: 'easy',
    rewards: { coins: 60, xp: 120 },
    author: 'William Shakespeare',
  },
  {
    id: 7,
    category: 'quotes',
    phrase: 'I THINK THEREFORE I AM',
    words: ['I', 'THINK', 'THEREFORE', 'I', 'AM'],
    clue: 'A philosopher\'s proof of existence',
    difficulty: 'medium',
    rewards: { coins: 80, xp: 160 },
    author: 'René Descartes',
  },
  {
    id: 8,
    category: 'quotes',
    phrase: 'KNOWLEDGE IS POWER',
    words: ['KNOWLEDGE', 'IS', 'POWER'],
    clue: 'Learning gives you strength',
    difficulty: 'easy',
    rewards: { coins: 50, xp: 100 },
    author: 'Francis Bacon',
  },
  
  // Common Sayings
  {
    id: 9,
    category: 'sayings',
    phrase: 'BREAK A LEG',
    words: ['BREAK', 'A', 'LEG'],
    clue: 'Wishing someone good luck in theater',
    difficulty: 'easy',
    rewards: { coins: 30, xp: 60 },
  },
  {
    id: 10,
    category: 'sayings',
    phrase: 'PIECE OF CAKE',
    words: ['PIECE', 'OF', 'CAKE'],
    clue: 'Something very easy to do',
    difficulty: 'easy',
    rewards: { coins: 30, xp: 60 },
  },
  {
    id: 11,
    category: 'sayings',
    phrase: 'ONCE IN A BLUE MOON',
    words: ['ONCE', 'IN', 'A', 'BLUE', 'MOON'],
    clue: 'Something that happens very rarely',
    difficulty: 'medium',
    rewards: { coins: 60, xp: 120 },
  },
  {
    id: 12,
    category: 'sayings',
    phrase: 'WHEN PIGS FLY',
    words: ['WHEN', 'PIGS', 'FLY'],
    clue: 'Something that will never happen',
    difficulty: 'easy',
    rewards: { coins: 35, xp: 70 },
  },
  
  // Riddles
  {
    id: 13,
    category: 'riddles',
    phrase: 'TIME FLIES LIKE AN ARROW',
    words: ['TIME', 'FLIES', 'LIKE', 'AN', 'ARROW'],
    clue: 'About how quickly moments pass',
    difficulty: 'medium',
    rewards: { coins: 70, xp: 140 },
  },
  {
    id: 14,
    category: 'riddles',
    phrase: 'THE SKY IS THE LIMIT',
    words: ['THE', 'SKY', 'IS', 'THE', 'LIMIT'],
    clue: 'There are no boundaries to what you can achieve',
    difficulty: 'easy',
    rewards: { coins: 45, xp: 90 },
  },
  
  // Tongue Twisters
  {
    id: 15,
    category: 'tongue_twisters',
    phrase: 'SHE SELLS SEA SHELLS',
    words: ['SHE', 'SELLS', 'SEA', 'SHELLS'],
    clue: 'A classic tongue twister about ocean treasures',
    difficulty: 'medium',
    rewards: { coins: 65, xp: 130 },
  },
  {
    id: 16,
    category: 'tongue_twisters',
    phrase: 'HOW MUCH WOOD WOULD A WOODCHUCK CHUCK',
    words: ['HOW', 'MUCH', 'WOOD', 'WOULD', 'A', 'WOODCHUCK', 'CHUCK'],
    clue: 'A question about a burrowing rodent',
    difficulty: 'hard',
    rewards: { coins: 100, xp: 200 },
  },
];

export const getPhrasePuzzlesByCategory = (category: string): PhrasePuzzle[] => {
  return PHRASE_PUZZLES.filter(p => p.category === category);
};

export const getPhrasePuzzleById = (id: number): PhrasePuzzle | undefined => {
  return PHRASE_PUZZLES.find(p => p.id === id);
};
