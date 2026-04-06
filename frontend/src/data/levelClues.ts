// Level clues in multiple languages
// Each level can have clues/questions that hint at words

export interface LevelClue {
  levelId: number;
  theme: string;
  clues: {
    en: string[];  // English clues
    it: string[];  // Italian clues
  };
  background: string; // Background type
}

export const LEVEL_CLUES: LevelClue[] = [
  // Level 1 - Great Pyramid of Giza
  {
    levelId: 1,
    theme: 'DESERT',
    clues: {
      en: ['The star in our sky', 'A period of 24 hours', 'Weekend begins on ____'],
      it: ['La stella nel nostro cielo', 'Un periodo di 24 ore', 'Il fine settimana inizia ____'],
    },
    background: 'desert',
  },
  // Level 2 - Colosseum
  {
    levelId: 2,
    theme: 'HISTORY',
    clues: {
      en: ['What you read in books', 'A line of items', 'To plant seeds'],
      it: ['Ciò che leggi nei libri', 'Una fila di oggetti', 'Seminare semi'],
    },
    background: 'rome',
  },
  // Level 3 - Great Wall
  {
    levelId: 3,
    theme: 'NATURE',
    clues: {
      en: ['Barrier around a garden', 'Everything together', 'Rules to follow'],
      it: ['Barriera intorno al giardino', 'Tutto insieme', 'Regole da seguire'],
    },
    background: 'mountains',
  },
  // Level 4 - Machu Picchu
  {
    levelId: 4,
    theme: 'MOUNTAINS',
    clues: {
      en: ['A musical sound', 'Hard rock material', 'Number after nine'],
      it: ['Un suono musicale', 'Materiale roccioso', 'Il numero dopo nove'],
    },
    background: 'snow',
  },
  // Level 5 - Taj Mahal
  {
    levelId: 5,
    theme: 'ROMANCE',
    clues: {
      en: ['Deep affection', 'To misplace something', 'Bottom of a shoe'],
      it: ["L'amore è ____", 'Perdere qualcosa', 'La suola della scarpa'],
    },
    background: 'sunset',
  },
  // Level 6
  {
    levelId: 6,
    theme: 'OCEAN',
    clues: {
      en: ['Shines in the night sky', 'Large body of water', 'Opposite of late'],
      it: ['Brilla nel cielo notturno', "Grande distesa d'acqua", 'Contrario di tardi'],
    },
    background: 'ocean',
  },
  // Level 7
  {
    levelId: 7,
    theme: 'FOREST',
    clues: {
      en: ['Woody plant', 'A flying insect', 'To consume food'],
      it: ['Pianta legnosa', 'Un insetto volante', 'Consumare cibo'],
    },
    background: 'forest',
  },
  // Level 8
  {
    levelId: 8,
    theme: 'WINTER',
    clues: {
      en: ['Frozen water', 'Very pleasant', 'A competition'],
      it: ['Acqua ghiacciata', 'Molto piacevole', 'Una competizione'],
    },
    background: 'snow',
  },
  // Level 9
  {
    levelId: 9,
    theme: 'SPRING',
    clues: {
      en: ['Colorful plant part', 'Air movement', 'A small flying insect'],
      it: ['Parte colorata della pianta', 'Movimento d\'aria', 'Un piccolo insetto'],
    },
    background: 'flowers',
  },
  // Level 10
  {
    levelId: 10,
    theme: 'SUMMER',
    clues: {
      en: ['Sandy shore', 'Very hot', 'To relax in water'],
      it: ['Riva sabbiosa', 'Molto caldo', 'Rilassarsi in acqua'],
    },
    background: 'beach',
  },
];

// Default clues for levels without specific clues
export const getCluesForLevel = (levelId: number, language: 'en' | 'it' = 'en'): string[] => {
  const levelClue = LEVEL_CLUES.find(c => c.levelId === levelId);
  if (levelClue) {
    return levelClue.clues[language];
  }
  // Return generic clues for levels without specific clues
  return language === 'en' 
    ? ['Find the hidden words', 'Connect the letters', 'Complete the puzzle']
    : ['Trova le parole nascoste', 'Collega le lettere', 'Completa il puzzle'];
};

export const getThemeForLevel = (levelId: number): string => {
  const levelClue = LEVEL_CLUES.find(c => c.levelId === levelId);
  return levelClue?.theme || 'ADVENTURE';
};

export const getBackgroundTypeForLevel = (levelId: number): string => {
  const levelClue = LEVEL_CLUES.find(c => c.levelId === levelId);
  if (levelClue) return levelClue.background;
  
  // Cycle through backgrounds for levels without specific ones
  const backgrounds = ['mountains', 'ocean', 'forest', 'desert', 'snow', 'sunset', 'beach', 'flowers'];
  return backgrounds[(levelId - 1) % backgrounds.length];
};

// Feedback texts in multiple languages
export const FEEDBACK_TEXTS = {
  en: {
    excellent: ['Excellent!', 'Amazing!', 'Brilliant!', 'Fantastic!', 'Superb!', 'Wonderful!'],
    good: ['Good!', 'Nice!', 'Great!', 'Well done!', 'Perfect!'],
    bonus: ['Bonus Word!', 'Extra Points!', 'Hidden Word!'],
  },
  it: {
    excellent: ['Eccellente!', 'Fantastico!', 'Brillante!', 'Magnifico!', 'Superbo!', 'Meraviglioso!'],
    good: ['Bene!', 'Ottimo!', 'Perfetto!', 'Ben fatto!', 'Bravo!'],
    bonus: ['Parola Bonus!', 'Punti Extra!', 'Parola Nascosta!'],
  },
};

export const getRandomFeedback = (language: 'en' | 'it', type: 'excellent' | 'good' | 'bonus' = 'excellent'): string => {
  const texts = FEEDBACK_TEXTS[language][type];
  return texts[Math.floor(Math.random() * texts.length)];
};
