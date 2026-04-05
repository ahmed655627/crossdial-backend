/**
 * Game Modes Configuration
 * Different puzzle types for variety:
 * 1. Classic - Find words in the wheel
 * 2. Match Mode - Swipe to match words with wonders/locations
 * 3. Scramble Mode - Unscramble the wonder name
 * 4. Quiz Mode - Answer trivia about wonders
 */

// Match Mode Data - Words to match with Wonders
export const MATCH_PUZZLES = [
  {
    id: 1,
    theme: "Ancient Wonders",
    pairs: [
      { word: "PYRAMID", match: "Egypt", hint: "🏛️ Giza" },
      { word: "COLOSSEUM", match: "Rome", hint: "🏟️ Italy" },
      { word: "WALL", match: "China", hint: "🧱 Great" },
      { word: "MAHAL", match: "India", hint: "💎 Taj" },
      { word: "PETRA", match: "Jordan", hint: "🏜️ Rose City" },
    ],
    reward: 50,
  },
  {
    id: 2,
    theme: "Natural Wonders",
    pairs: [
      { word: "CANYON", match: "Arizona", hint: "🏜️ Grand" },
      { word: "FALLS", match: "Niagara", hint: "💧 Water" },
      { word: "REEF", match: "Australia", hint: "🐠 Barrier" },
      { word: "AURORA", match: "Iceland", hint: "🌌 Northern" },
      { word: "EVEREST", match: "Nepal", hint: "⛰️ Mount" },
    ],
    reward: 50,
  },
  {
    id: 3,
    theme: "Famous Cities",
    pairs: [
      { word: "TOWER", match: "Paris", hint: "🗼 Eiffel" },
      { word: "LIBERTY", match: "New York", hint: "🗽 Statue" },
      { word: "OPERA", match: "Sydney", hint: "🎭 House" },
      { word: "BIG BEN", match: "London", hint: "🕐 Clock" },
      { word: "KREMLIN", match: "Moscow", hint: "🏰 Red Square" },
    ],
    reward: 50,
  },
  {
    id: 4,
    theme: "Asian Landmarks",
    pairs: [
      { word: "FUJI", match: "Japan", hint: "🗻 Mount" },
      { word: "ANGKOR", match: "Cambodia", hint: "🛕 Wat" },
      { word: "FORBIDDEN", match: "Beijing", hint: "🏯 City" },
      { word: "TEMPLE", match: "Bangkok", hint: "🙏 Golden" },
      { word: "TERRACOTTA", match: "Xian", hint: "🗿 Army" },
    ],
    reward: 50,
  },
  {
    id: 5,
    theme: "European Gems",
    pairs: [
      { word: "SAGRADA", match: "Barcelona", hint: "⛪ Familia" },
      { word: "GONDOLA", match: "Venice", hint: "🛶 Canal" },
      { word: "ACROPOLIS", match: "Athens", hint: "🏛️ Parthenon" },
      { word: "CASTLE", match: "Edinburgh", hint: "🏰 Scotland" },
      { word: "WINDMILL", match: "Amsterdam", hint: "🌷 Dutch" },
    ],
    reward: 50,
  },
  {
    id: 6,
    theme: "Island Paradise",
    pairs: [
      { word: "VOLCANO", match: "Hawaii", hint: "🌋 Kilauea" },
      { word: "BEACH", match: "Maldives", hint: "🏖️ White Sand" },
      { word: "LAGOON", match: "Bora Bora", hint: "💙 Blue" },
      { word: "TEMPLE", match: "Bali", hint: "🛕 Indonesia" },
      { word: "CLIFFS", match: "Santorini", hint: "🏘️ White" },
    ],
    reward: 50,
  },
  {
    id: 7,
    theme: "African Safari",
    pairs: [
      { word: "SAFARI", match: "Kenya", hint: "🦁 Masai Mara" },
      { word: "SPHINX", match: "Egypt", hint: "🐱 Lion" },
      { word: "VICTORIA", match: "Zimbabwe", hint: "💧 Falls" },
      { word: "KILIMANJARO", match: "Tanzania", hint: "⛰️ Mount" },
      { word: "SAHARA", match: "Morocco", hint: "🏜️ Desert" },
    ],
    reward: 50,
  },
  {
    id: 8,
    theme: "Americas Adventure",
    pairs: [
      { word: "MACHU", match: "Peru", hint: "🏔️ Picchu" },
      { word: "CHRIST", match: "Rio", hint: "✝️ Redeemer" },
      { word: "IGUAZU", match: "Argentina", hint: "💧 Falls" },
      { word: "CHICHEN", match: "Mexico", hint: "🏛️ Itza" },
      { word: "MOAI", match: "Easter Island", hint: "🗿 Statues" },
    ],
    reward: 50,
  },
];

// Scramble Mode Data - Unscramble wonder names
export const SCRAMBLE_PUZZLES = [
  { id: 1, scrambled: "DMARIYP", answer: "PYRAMID", hint: "Ancient Egyptian tomb", location: "Egypt", reward: 30 },
  { id: 2, scrambled: "LSOECUOM", answer: "COLOSSEUM", hint: "Roman arena", location: "Rome", reward: 30 },
  { id: 3, scrambled: "LLAW TEARAG", answer: "GREAT WALL", hint: "Chinese wonder", location: "China", reward: 40 },
  { id: 4, scrambled: "JAT LAHMA", answer: "TAJ MAHAL", hint: "Love monument", location: "India", reward: 40 },
  { id: 5, scrambled: "TREAP", answer: "PETRA", hint: "Rose city", location: "Jordan", reward: 30 },
  { id: 6, scrambled: "HCAM UCCIPH", answer: "MACHU PICCHU", hint: "Incan citadel", location: "Peru", reward: 50 },
  { id: 7, scrambled: "FEFILE REWOT", answer: "EIFFEL TOWER", hint: "Parisian landmark", location: "Paris", reward: 50 },
  { id: 8, scrambled: "TUGESTA FO YREBLIT", answer: "STATUE OF LIBERTY", hint: "NYC icon", location: "New York", reward: 60 },
  { id: 9, scrambled: "NAKOGR TAW", answer: "ANGKOR WAT", hint: "Temple complex", location: "Cambodia", reward: 40 },
  { id: 10, scrambled: "TNUOM IJUF", answer: "MOUNT FUJI", hint: "Sacred mountain", location: "Japan", reward: 40 },
  { id: 11, scrambled: "DRAANG YCANON", answer: "GRAND CANYON", hint: "Natural wonder", location: "Arizona", reward: 50 },
  { id: 12, scrambled: "AAAGRIN LASFL", answer: "NIAGARA FALLS", hint: "Famous waterfall", location: "USA/Canada", reward: 50 },
  { id: 13, scrambled: "NEHDROBFDI YITC", answer: "FORBIDDEN CITY", hint: "Imperial palace", location: "Beijing", reward: 60 },
  { id: 14, scrambled: "ISDENY AREPO SOUHE", answer: "SYDNEY OPERA HOUSE", hint: "Iconic building", location: "Australia", reward: 70 },
  { id: 15, scrambled: "OTCAATRRE YARM", answer: "TERRACOTTA ARMY", hint: "Clay soldiers", location: "China", reward: 60 },
];

// Quiz Mode Data - Trivia about wonders
export const QUIZ_PUZZLES = [
  {
    id: 1,
    question: "Which wonder is in Egypt?",
    options: ["Colosseum", "Pyramid of Giza", "Taj Mahal", "Petra"],
    answer: 1,
    wonder: "Great Pyramid",
    reward: 20,
  },
  {
    id: 2,
    question: "The Taj Mahal is made of?",
    options: ["Granite", "Marble", "Sandstone", "Limestone"],
    answer: 1,
    wonder: "Taj Mahal",
    reward: 20,
  },
  {
    id: 3,
    question: "Which city has the Eiffel Tower?",
    options: ["London", "Berlin", "Paris", "Rome"],
    answer: 2,
    wonder: "Eiffel Tower",
    reward: 20,
  },
  {
    id: 4,
    question: "Machu Picchu is in which country?",
    options: ["Brazil", "Peru", "Chile", "Argentina"],
    answer: 1,
    wonder: "Machu Picchu",
    reward: 20,
  },
  {
    id: 5,
    question: "The Great Wall was built to protect against?",
    options: ["Romans", "Mongols", "Japanese", "Indians"],
    answer: 1,
    wonder: "Great Wall",
    reward: 25,
  },
  {
    id: 6,
    question: "Petra is also known as?",
    options: ["White City", "Rose City", "Golden City", "Silver City"],
    answer: 1,
    wonder: "Petra",
    reward: 25,
  },
  {
    id: 7,
    question: "Mount Fuji is a?",
    options: ["Active Volcano", "Dormant Volcano", "Mountain Range", "Island"],
    answer: 0,
    wonder: "Mount Fuji",
    reward: 25,
  },
  {
    id: 8,
    question: "The Colosseum could hold how many people?",
    options: ["20,000", "50,000", "80,000", "100,000"],
    answer: 1,
    wonder: "Colosseum",
    reward: 30,
  },
  {
    id: 9,
    question: "Christ the Redeemer overlooks which city?",
    options: ["São Paulo", "Buenos Aires", "Rio de Janeiro", "Lima"],
    answer: 2,
    wonder: "Christ the Redeemer",
    reward: 25,
  },
  {
    id: 10,
    question: "Angkor Wat is the world's largest?",
    options: ["Palace", "Temple", "Mosque", "Church"],
    answer: 1,
    wonder: "Angkor Wat",
    reward: 25,
  },
];

// Word Association Mode - Connect related words
export const ASSOCIATION_PUZZLES = [
  {
    id: 1,
    theme: "Egyptian Wonder",
    centerWord: "PYRAMID",
    relatedWords: ["SAND", "PHARAOH", "TOMB", "DESERT", "SPHINX"],
    distractors: ["SNOW", "OCEAN", "FOREST"],
    reward: 40,
  },
  {
    id: 2,
    theme: "Ocean Paradise",
    centerWord: "REEF",
    relatedWords: ["CORAL", "FISH", "DIVE", "OCEAN", "TROPICAL"],
    distractors: ["MOUNTAIN", "DESERT", "SNOW"],
    reward: 40,
  },
  {
    id: 3,
    theme: "Mountain Peak",
    centerWord: "EVEREST",
    relatedWords: ["CLIMB", "SNOW", "PEAK", "NEPAL", "ALTITUDE"],
    distractors: ["BEACH", "OCEAN", "SAND"],
    reward: 40,
  },
  {
    id: 4,
    theme: "Japanese Culture",
    centerWord: "FUJI",
    relatedWords: ["SAKURA", "TEMPLE", "JAPAN", "SNOW", "VOLCANO"],
    distractors: ["PYRAMID", "DESERT", "CANYON"],
    reward: 40,
  },
  {
    id: 5,
    theme: "Parisian Icon",
    centerWord: "EIFFEL",
    relatedWords: ["TOWER", "PARIS", "IRON", "FRANCE", "ROMANTIC"],
    distractors: ["PYRAMID", "GREAT", "WALL"],
    reward: 40,
  },
];

// Game Mode Types
export type GameModeType = 'classic' | 'match' | 'scramble' | 'quiz' | 'association';

export interface GameMode {
  id: GameModeType;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockLevel: number;
}

export const GAME_MODES: GameMode[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Find words in the wheel',
    icon: '🎯',
    color: '#4ECDC4',
    unlockLevel: 1,
  },
  {
    id: 'match',
    name: 'Match Mode',
    description: 'Swipe to match words with wonders',
    icon: '🔗',
    color: '#FF6B6B',
    unlockLevel: 5,
  },
  {
    id: 'scramble',
    name: 'Scramble',
    description: 'Unscramble the wonder names',
    icon: '🔀',
    color: '#45B7D1',
    unlockLevel: 10,
  },
  {
    id: 'quiz',
    name: 'Wonder Quiz',
    description: 'Test your knowledge',
    icon: '❓',
    color: '#96CEB4',
    unlockLevel: 15,
  },
  {
    id: 'association',
    name: 'Word Connect',
    description: 'Link related words',
    icon: '🧠',
    color: '#DDA0DD',
    unlockLevel: 20,
  },
];

export default {
  MATCH_PUZZLES,
  SCRAMBLE_PUZZLES,
  QUIZ_PUZZLES,
  ASSOCIATION_PUZZLES,
  GAME_MODES,
};
