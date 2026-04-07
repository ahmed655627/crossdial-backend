// Word Definitions System
// Educational definitions for found words

export interface WordDefinition {
  word: string;
  definition: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'interjection';
  example?: string;
  synonyms?: string[];
  funFact?: string;
}

// Common words dictionary
export const WORD_DEFINITIONS: Record<string, WordDefinition> = {
  // Basic words
  SUN: {
    word: 'SUN',
    definition: 'The star at the center of our solar system',
    partOfSpeech: 'noun',
    example: 'The sun rises in the east.',
    synonyms: ['star', 'daylight'],
    funFact: 'The Sun is about 4.6 billion years old!',
  },
  DAY: {
    word: 'DAY',
    definition: 'A period of 24 hours',
    partOfSpeech: 'noun',
    example: 'What a beautiful day!',
    synonyms: ['daytime', 'daylight'],
  },
  LOVE: {
    word: 'LOVE',
    definition: 'A strong feeling of deep affection',
    partOfSpeech: 'noun',
    example: 'She felt love for her family.',
    synonyms: ['affection', 'adoration', 'fondness'],
    funFact: 'The heart symbol ❤️ has been used to represent love since the Middle Ages.',
  },
  STAR: {
    word: 'STAR',
    definition: 'A luminous ball of gas in outer space',
    partOfSpeech: 'noun',
    example: 'The stars twinkle at night.',
    synonyms: ['celestial body', 'sun'],
    funFact: 'There are more stars in the universe than grains of sand on Earth!',
  },
  TREE: {
    word: 'TREE',
    definition: 'A tall plant with a trunk and branches',
    partOfSpeech: 'noun',
    example: 'Birds nest in the tree.',
    synonyms: ['plant', 'sapling'],
    funFact: 'The oldest tree is over 5,000 years old!',
  },
  WATER: {
    word: 'WATER',
    definition: 'A clear liquid essential for life',
    partOfSpeech: 'noun',
    example: 'Drink plenty of water.',
    synonyms: ['H2O', 'aqua'],
    funFact: 'About 71% of Earth\'s surface is covered by water.',
  },
  BOOK: {
    word: 'BOOK',
    definition: 'Written or printed pages bound together',
    partOfSpeech: 'noun',
    example: 'I love reading a good book.',
    synonyms: ['volume', 'publication', 'tome'],
  },
  WAVE: {
    word: 'WAVE',
    definition: 'A moving ridge on the surface of water',
    partOfSpeech: 'noun',
    example: 'The waves crashed on the shore.',
    synonyms: ['swell', 'ripple', 'surge'],
  },
  SMILE: {
    word: 'SMILE',
    definition: 'A facial expression showing happiness',
    partOfSpeech: 'noun',
    example: 'Her smile lit up the room.',
    synonyms: ['grin', 'beam'],
    funFact: 'Smiling releases endorphins and makes you feel happier!',
  },
  TRAIN: {
    word: 'TRAIN',
    definition: 'A series of connected vehicles on rails',
    partOfSpeech: 'noun',
    example: 'The train arrived on time.',
    synonyms: ['locomotive', 'railway'],
  },
  HORSE: {
    word: 'HORSE',
    definition: 'A large four-legged animal used for riding',
    partOfSpeech: 'noun',
    example: 'She rode the horse through the field.',
    synonyms: ['stallion', 'mare', 'steed'],
    funFact: 'Horses can sleep both lying down and standing up!',
  },
  CLOUD: {
    word: 'CLOUD',
    definition: 'A visible mass of water droplets in the sky',
    partOfSpeech: 'noun',
    example: 'The cloud looks like a bunny.',
    synonyms: ['cumulus', 'vapor'],
  },
  LIGHT: {
    word: 'LIGHT',
    definition: 'The natural agent that makes things visible',
    partOfSpeech: 'noun',
    example: 'Turn on the light please.',
    synonyms: ['brightness', 'illumination'],
    funFact: 'Light travels at about 299,792 km per second!',
  },
  POWER: {
    word: 'POWER',
    definition: 'The ability to do something or act in a particular way',
    partOfSpeech: 'noun',
    example: 'Knowledge is power.',
    synonyms: ['strength', 'force', 'might'],
  },
  LEARN: {
    word: 'LEARN',
    definition: 'To gain knowledge or skill through study',
    partOfSpeech: 'verb',
    example: 'I want to learn a new language.',
    synonyms: ['study', 'master', 'acquire'],
  },
  HAPPY: {
    word: 'HAPPY',
    definition: 'Feeling or showing pleasure or contentment',
    partOfSpeech: 'adjective',
    example: 'She felt happy on her birthday.',
    synonyms: ['joyful', 'cheerful', 'delighted'],
  },
  SLEEP: {
    word: 'SLEEP',
    definition: 'A natural state of rest',
    partOfSpeech: 'noun',
    example: 'I need eight hours of sleep.',
    synonyms: ['rest', 'slumber', 'nap'],
    funFact: 'Humans spend about 1/3 of their lives sleeping!',
  },
  MUSIC: {
    word: 'MUSIC',
    definition: 'Vocal or instrumental sounds combined harmoniously',
    partOfSpeech: 'noun',
    example: 'I listen to music every day.',
    synonyms: ['melody', 'tune', 'harmony'],
  },
  DREAM: {
    word: 'DREAM',
    definition: 'Images or thoughts during sleep',
    partOfSpeech: 'noun',
    example: 'I had a wonderful dream last night.',
    synonyms: ['vision', 'fantasy', 'reverie'],
  },
  FRIEND: {
    word: 'FRIEND',
    definition: 'A person you know and like',
    partOfSpeech: 'noun',
    example: 'She is my best friend.',
    synonyms: ['companion', 'pal', 'buddy'],
  },
  FRESH: {
    word: 'FRESH',
    definition: 'New and not stale or spoiled',
    partOfSpeech: 'adjective',
    example: 'I love the smell of fresh bread.',
    synonyms: ['new', 'clean', 'crisp'],
  },
  SWEET: {
    word: 'SWEET',
    definition: 'Having the taste of sugar',
    partOfSpeech: 'adjective',
    example: 'The cake was very sweet.',
    synonyms: ['sugary', 'honeyed'],
  },
  GREAT: {
    word: 'GREAT',
    definition: 'Of large size or extent',
    partOfSpeech: 'adjective',
    example: 'It was a great achievement.',
    synonyms: ['large', 'big', 'excellent'],
  },
  SMART: {
    word: 'SMART',
    definition: 'Having quick intelligence',
    partOfSpeech: 'adjective',
    example: 'She is a smart student.',
    synonyms: ['clever', 'intelligent', 'bright'],
  },
  BRAVE: {
    word: 'BRAVE',
    definition: 'Ready to face danger',
    partOfSpeech: 'adjective',
    example: 'The brave firefighter saved the cat.',
    synonyms: ['courageous', 'bold', 'fearless'],
  },
  FUNNY: {
    word: 'FUNNY',
    definition: 'Causing laughter or amusement',
    partOfSpeech: 'adjective',
    example: 'That joke was really funny.',
    synonyms: ['amusing', 'humorous', 'comic'],
  },
  LUCKY: {
    word: 'LUCKY',
    definition: 'Having good fortune',
    partOfSpeech: 'adjective',
    example: 'I feel so lucky today.',
    synonyms: ['fortunate', 'blessed'],
  },
  SHINE: {
    word: 'SHINE',
    definition: 'To give out bright light',
    partOfSpeech: 'verb',
    example: 'The sun will shine tomorrow.',
    synonyms: ['glow', 'gleam', 'sparkle'],
  },
  CLEAN: {
    word: 'CLEAN',
    definition: 'Free from dirt or marks',
    partOfSpeech: 'adjective',
    example: 'The room is very clean.',
    synonyms: ['spotless', 'pure', 'tidy'],
  },
  BRIGHT: {
    word: 'BRIGHT',
    definition: 'Giving out much light',
    partOfSpeech: 'adjective',
    example: 'The bright sun warmed the earth.',
    synonyms: ['luminous', 'radiant', 'shining'],
  },
};

// Get definition for a word
export const getWordDefinition = (word: string): WordDefinition | null => {
  return WORD_DEFINITIONS[word.toUpperCase()] || null;
};

// Check if we have a definition
export const hasDefinition = (word: string): boolean => {
  return word.toUpperCase() in WORD_DEFINITIONS;
};

// Get random fun fact
export const getRandomFunFact = (): { word: string; fact: string } | null => {
  const wordsWithFacts = Object.values(WORD_DEFINITIONS).filter(w => w.funFact);
  if (wordsWithFacts.length === 0) return null;
  const random = wordsWithFacts[Math.floor(Math.random() * wordsWithFacts.length)];
  return { word: random.word, fact: random.funFact! };
};
