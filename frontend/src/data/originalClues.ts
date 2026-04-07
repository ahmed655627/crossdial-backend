// Original Clues System - Copyright Free
// Generic word clues that work in any language

export interface ClueSet {
  levelId: number;
  category: string;
  clues: {
    en: string[];
    it: string[];
  };
}

// Generic clues for first 20 levels
export const LEVEL_CLUES: ClueSet[] = [
  {
    levelId: 1,
    category: 'BASICS',
    clues: {
      en: ['Light from the sky', 'Period of 24 hours', 'Rest day of the week'],
      it: ['Luce dal cielo', 'Periodo di 24 ore', 'Giorno di riposo'],
    },
  },
  {
    levelId: 2,
    category: 'BASICS',
    clues: {
      en: ['Written pages bound together', 'Horizontal arrangement', 'Put seeds in soil'],
      it: ['Pagine scritte rilegate', 'Disposizione orizzontale', 'Metti semi nel terreno'],
    },
  },
  {
    levelId: 3,
    category: 'BASICS',
    clues: {
      en: ['Border around property', 'Everything combined', 'Guidelines to follow'],
      it: ['Confine della proprietà', 'Tutto combinato', 'Linee guida da seguire'],
    },
  },
  {
    levelId: 4,
    category: 'NATURE',
    clues: {
      en: ['Musical pitch', 'Hard natural material', 'Number after nine'],
      it: ['Tono musicale', 'Materiale naturale duro', 'Numero dopo nove'],
    },
  },
  {
    levelId: 5,
    category: 'FEELINGS',
    clues: {
      en: ['Deep affection', 'Unable to find', 'Bottom of footwear'],
      it: ['Affetto profondo', 'Impossibile trovare', 'Fondo della calzatura'],
    },
  },
  {
    levelId: 6,
    category: 'NATURE',
    clues: {
      en: ['Bright in night sky', 'Large water body', 'Not late'],
      it: ['Luminoso nel cielo notturno', 'Grande corpo d\'acqua', 'Non in ritardo'],
    },
  },
  {
    levelId: 7,
    category: 'NATURE',
    clues: {
      en: ['Tall woody plant', 'Buzzing insect', 'Consume food'],
      it: ['Pianta alta e legnosa', 'Insetto ronzante', 'Consumare cibo'],
    },
  },
  {
    levelId: 8,
    category: 'WEATHER',
    clues: {
      en: ['Frozen water', 'Very pleasant', 'Competition event'],
      it: ['Acqua ghiacciata', 'Molto piacevole', 'Evento competitivo'],
    },
  },
  {
    levelId: 9,
    category: 'NATURE',
    clues: {
      en: ['Colorful plant part', 'Moving air', 'Small flying creature'],
      it: ['Parte colorata della pianta', 'Aria in movimento', 'Piccola creatura volante'],
    },
  },
  {
    levelId: 10,
    category: 'WEATHER',
    clues: {
      en: ['Sandy shore', 'Very warm', 'Relax in water'],
      it: ['Riva sabbiosa', 'Molto caldo', 'Rilassarsi in acqua'],
    },
  },
];

// Get clues for a level
export const getCluesForLevel = (levelId: number, language: 'en' | 'it' = 'en'): string[] => {
  const clueSet = LEVEL_CLUES.find(c => c.levelId === levelId);
  if (clueSet) {
    return clueSet.clues[language];
  }
  // Generic fallback clues
  return language === 'en'
    ? ['Find the hidden words', 'Connect the letters', 'Complete the puzzle']
    : ['Trova le parole nascoste', 'Collega le lettere', 'Completa il puzzle'];
};

// Get category name for a level
export const getCategoryForLevel = (levelId: number): string => {
  const clueSet = LEVEL_CLUES.find(c => c.levelId === levelId);
  return clueSet?.category || 'PUZZLE';
};

// Feedback texts - original and copyright free
export const FEEDBACK_TEXTS = {
  en: {
    excellent: ['Excellent!', 'Amazing!', 'Brilliant!', 'Fantastic!', 'Superb!', 'Outstanding!', 'Perfect!'],
    good: ['Good!', 'Nice!', 'Great!', 'Well done!', 'Correct!', 'Right!'],
    bonus: ['Bonus!', 'Extra Points!', 'Hidden Word!', 'Secret Find!'],
    streak: ['On Fire!', 'Unstoppable!', 'Word Master!', 'Genius!'],
  },
  it: {
    excellent: ['Eccellente!', 'Fantastico!', 'Brillante!', 'Magnifico!', 'Superbo!', 'Perfetto!'],
    good: ['Bene!', 'Ottimo!', 'Bravo!', 'Ben fatto!', 'Corretto!', 'Giusto!'],
    bonus: ['Bonus!', 'Punti Extra!', 'Parola Nascosta!', 'Scoperta Segreta!'],
    streak: ['In Fiamme!', 'Inarrestabile!', 'Maestro!', 'Genio!'],
  },
};

export const getRandomFeedback = (
  language: 'en' | 'it',
  type: 'excellent' | 'good' | 'bonus' | 'streak' = 'excellent'
): string => {
  const texts = FEEDBACK_TEXTS[language][type];
  return texts[Math.floor(Math.random() * texts.length)];
};
