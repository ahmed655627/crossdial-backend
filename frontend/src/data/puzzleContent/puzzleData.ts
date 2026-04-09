// Original, non-copyrighted puzzle content for all game modes
// Expanded with 50+ levels per mode

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
  pattern: string;
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

// MIRROR WORDS - 50 Original Puzzles
export const mirrorWordPuzzles: MirrorWordPuzzle[] = [
  // Easy (1-20)
  { id: 1, word: 'HEART', clue: 'The organ of emotions', difficulty: 'easy' },
  { id: 2, word: 'SMILE', clue: 'Expression of happiness', difficulty: 'easy' },
  { id: 3, word: 'PEACE', clue: 'Calm and tranquility', difficulty: 'easy' },
  { id: 4, word: 'DREAM', clue: 'Night visions', difficulty: 'easy' },
  { id: 5, word: 'TRUST', clue: 'Foundation of relationships', difficulty: 'easy' },
  { id: 6, word: 'LIGHT', clue: 'Opposite of darkness', difficulty: 'easy' },
  { id: 7, word: 'BRAVE', clue: 'Showing courage', difficulty: 'easy' },
  { id: 8, word: 'FAITH', clue: 'Complete trust', difficulty: 'easy' },
  { id: 9, word: 'GRACE', clue: 'Elegance and beauty', difficulty: 'easy' },
  { id: 10, word: 'BLISS', clue: 'Perfect happiness', difficulty: 'easy' },
  { id: 11, word: 'CHARM', clue: 'Pleasing quality', difficulty: 'easy' },
  { id: 12, word: 'SWEET', clue: 'Pleasing taste or person', difficulty: 'easy' },
  { id: 13, word: 'SHINE', clue: 'Give off light', difficulty: 'easy' },
  { id: 14, word: 'BLOOM', clue: 'Flower opening', difficulty: 'easy' },
  { id: 15, word: 'SPARK', clue: 'Small flash of light', difficulty: 'easy' },
  { id: 16, word: 'GLOW', clue: 'Soft steady light', difficulty: 'easy' },
  { id: 17, word: 'WARM', clue: 'Comfortably hot', difficulty: 'easy' },
  { id: 18, word: 'SOFT', clue: 'Gentle to touch', difficulty: 'easy' },
  { id: 19, word: 'PURE', clue: 'Free from contamination', difficulty: 'easy' },
  { id: 20, word: 'CALM', clue: 'Free from agitation', difficulty: 'easy' },
  // Medium (21-40)
  { id: 21, word: 'KINDNESS', clue: 'Being gentle and caring', difficulty: 'medium' },
  { id: 22, word: 'HARMONY', clue: 'Perfect balance', difficulty: 'medium' },
  { id: 23, word: 'PASSION', clue: 'Intense feeling', difficulty: 'medium' },
  { id: 24, word: 'DEVOTION', clue: 'Deep commitment', difficulty: 'medium' },
  { id: 25, word: 'CHERISH', clue: 'To hold dear', difficulty: 'medium' },
  { id: 26, word: 'COMFORT', clue: 'State of ease', difficulty: 'medium' },
  { id: 27, word: 'DELIGHT', clue: 'Great pleasure', difficulty: 'medium' },
  { id: 28, word: 'RESPECT', clue: 'High regard', difficulty: 'medium' },
  { id: 29, word: 'SINCERE', clue: 'Genuine and honest', difficulty: 'medium' },
  { id: 30, word: 'COURAGE', clue: 'Bravery in danger', difficulty: 'medium' },
  { id: 31, word: 'NURTURE', clue: 'Care and encourage', difficulty: 'medium' },
  { id: 32, word: 'HEALING', clue: 'Process of recovery', difficulty: 'medium' },
  { id: 33, word: 'WORSHIP', clue: 'Deep admiration', difficulty: 'medium' },
  { id: 34, word: 'PROTECT', clue: 'Keep safe', difficulty: 'medium' },
  { id: 35, word: 'INSPIRE', clue: 'Fill with motivation', difficulty: 'medium' },
  { id: 36, word: 'SUPPORT', clue: 'Give assistance', difficulty: 'medium' },
  { id: 37, word: 'EMBRACE', clue: 'Hold closely', difficulty: 'medium' },
  { id: 38, word: 'PROMISE', clue: 'Declaration of intent', difficulty: 'medium' },
  { id: 39, word: 'BELIEVE', clue: 'Accept as true', difficulty: 'medium' },
  { id: 40, word: 'FORGIVE', clue: 'Stop feeling angry', difficulty: 'medium' },
  // Hard (41-50)
  { id: 41, word: 'AFFECTION', clue: 'Warm feelings', difficulty: 'hard' },
  { id: 42, word: 'GRATITUDE', clue: 'Thankfulness', difficulty: 'hard' },
  { id: 43, word: 'COMPASSION', clue: 'Empathy for others', difficulty: 'hard' },
  { id: 44, word: 'SERENITY', clue: 'Inner calmness', difficulty: 'hard' },
  { id: 45, word: 'TENDERNESS', clue: 'Gentle affection', difficulty: 'hard' },
  { id: 46, word: 'ADMIRATION', clue: 'Respect and approval', difficulty: 'hard' },
  { id: 47, word: 'DEDICATION', clue: 'Committed effort', difficulty: 'hard' },
  { id: 48, word: 'FRIENDSHIP', clue: 'Bond between friends', difficulty: 'hard' },
  { id: 49, word: 'GENEROSITY', clue: 'Willingness to give', difficulty: 'hard' },
  { id: 50, word: 'CONTENTMENT', clue: 'State of satisfaction', difficulty: 'hard' },
];

// LOVE IN LAYERS - 30 Original Puzzles
export const layerPuzzles: LayerPuzzle[] = [
  // Easy (1-10)
  { id: 1, layers: ['CARE', 'RACE'], clues: ['Attention and concern', 'A competition'], difficulty: 'easy' },
  { id: 2, layers: ['LOVE', 'VOLE'], clues: ['Deep affection', 'Small rodent'], difficulty: 'easy' },
  { id: 3, layers: ['HEART', 'EARTH'], clues: ['Symbol of love', 'Our planet'], difficulty: 'easy' },
  { id: 4, layers: ['DEAR', 'DARE'], clues: ['Beloved', 'Challenge'], difficulty: 'easy' },
  { id: 5, layers: ['STOP', 'POST', 'POTS'], clues: ['Halt', 'Mail item', 'Cooking vessels'], difficulty: 'easy' },
  { id: 6, layers: ['STAR', 'RATS', 'ARTS'], clues: ['Celestial body', 'Rodents', 'Creative works'], difficulty: 'easy' },
  { id: 7, layers: ['LIVE', 'VEIL', 'EVIL'], clues: ['Exist', 'Face cover', 'Wicked'], difficulty: 'easy' },
  { id: 8, layers: ['TEAM', 'MEAT', 'MATE'], clues: ['Group', 'Animal flesh', 'Partner'], difficulty: 'easy' },
  { id: 9, layers: ['PEAR', 'REAP', 'RAPE'], clues: ['Fruit', 'Harvest', 'Yellow plant'], difficulty: 'easy' },
  { id: 10, layers: ['TIPS', 'SPIT', 'PITS'], clues: ['Advice', 'Expel saliva', 'Fruit seeds'], difficulty: 'easy' },
  // Medium (11-20)
  { id: 11, layers: ['SMILE', 'LIMES', 'SLIME'], clues: ['Happy expression', 'Green fruits', 'Sticky substance'], difficulty: 'medium' },
  { id: 12, layers: ['LISTEN', 'SILENT', 'ENLIST'], clues: ['Pay attention', 'No sound', 'Join up'], difficulty: 'medium' },
  { id: 13, layers: ['UNITED', 'UNTIED', 'DUNITE'], clues: ['Together', 'Loosened', 'A rock type'], difficulty: 'medium' },
  { id: 14, layers: ['MASTER', 'STREAM', 'TAMERS'], clues: ['Expert', 'Water flow', 'Animal trainers'], difficulty: 'medium' },
  { id: 15, layers: ['PLATES', 'STAPLE', 'PETALS'], clues: ['Dishes', 'Basic item', 'Flower parts'], difficulty: 'medium' },
  { id: 16, layers: ['DANGER', 'GARDEN', 'GANDER'], clues: ['Risk', 'Plant area', 'Male goose'], difficulty: 'medium' },
  { id: 17, layers: ['REMAIN', 'MARINE', 'AIRMEN'], clues: ['Stay', 'Ocean-related', 'Pilots'], difficulty: 'medium' },
  { id: 18, layers: ['ALLERGY', 'GALLERY', 'LARGELY'], clues: ['Immune reaction', 'Art space', 'Mostly'], difficulty: 'medium' },
  { id: 19, layers: ['PARSLEY', 'PLAYERS', 'REPLAYS'], clues: ['Herb', 'Game participants', 'Watch again'], difficulty: 'medium' },
  { id: 20, layers: ['TEACHER', 'CHEATER', 'HECTARE'], clues: ['Educator', 'Dishonest person', 'Land measure'], difficulty: 'medium' },
  // Hard (21-30)
  { id: 21, layers: ['ASTRONOMER', 'MOONSTARER'], clues: ['Space scientist', 'One who gazes at the moon'], difficulty: 'hard' },
  { id: 22, layers: ['ORCHESTRA', 'CARTHORSE'], clues: ['Music group', 'Working horse'], difficulty: 'hard' },
  { id: 23, layers: ['DORMITORY', 'DIRTYROOM'], clues: ['Sleeping quarters', 'Messy space'], difficulty: 'hard' },
  { id: 24, layers: ['ELECTION', 'COTELINE'], clues: ['Voting event', 'Rib meat'], difficulty: 'hard' },
  { id: 25, layers: ['CUSTOMERS', 'STORECUMS'], clues: ['Shoppers', 'Store arrivals'], difficulty: 'hard' },
  { id: 26, layers: ['PAINTERS', 'PANTRIES', 'PERTAINS'], clues: ['Artists', 'Food storage', 'Relates to'], difficulty: 'hard' },
  { id: 27, layers: ['VIOLENCE', 'CINEOVAL'], clues: ['Aggression', 'Oval cinema'], difficulty: 'hard' },
  { id: 28, layers: ['INTRODUCE', 'REDUCTION'], clues: ['Present someone', 'Decrease'], difficulty: 'hard' },
  { id: 29, layers: ['MEASURING', 'STREAMING'], clues: ['Calculating size', 'Flowing water'], difficulty: 'hard' },
  { id: 30, layers: ['CONSIDERATE', 'CREDENTIALS'], clues: ['Thoughtful', 'Qualifications'], difficulty: 'hard' },
];

// EMOTION CHAIN - 30 Original Puzzles
export const emotionChainPuzzles: EmotionChainPuzzle[] = [
  // Easy (1-10)
  { id: 1, startWord: 'LOVE', chainWords: ['OVER', 'VERY', 'YEAR'], clues: ['Above', 'Extremely', '12 months'], difficulty: 'easy' },
  { id: 2, startWord: 'HOPE', chainWords: ['OPEN', 'PENS', 'NEST'], clues: ['Not closed', 'Writing tools', 'Bird home'], difficulty: 'easy' },
  { id: 3, startWord: 'CARE', chainWords: ['ACRE', 'RACE', 'EACH'], clues: ['Land measure', 'Competition', 'Every one'], difficulty: 'easy' },
  { id: 4, startWord: 'WARM', chainWords: ['WORM', 'WORN', 'ROWN'], clues: ['Crawling creature', 'Used up', 'Become king'], difficulty: 'easy' },
  { id: 5, startWord: 'SOFT', chainWords: ['FOOT', 'TOOF', 'FORT'], clues: ['Body part', 'Tooth (slang)', 'Castle'], difficulty: 'easy' },
  { id: 6, startWord: 'KIND', chainWords: ['DINK', 'DRINK', 'RIND'], clues: ['Double income', 'Beverage', 'Fruit skin'], difficulty: 'easy' },
  { id: 7, startWord: 'SOUL', chainWords: ['OUTS', 'STUN', 'NUTS'], clues: ['Eliminations', 'Shock', 'Tree seeds'], difficulty: 'easy' },
  { id: 8, startWord: 'CALM', chainWords: ['CLAM', 'LAMP', 'PALM'], clues: ['Shellfish', 'Light source', 'Tree type'], difficulty: 'easy' },
  { id: 9, startWord: 'PURE', chainWords: ['RUPE', 'PERT', 'TRAP'], clues: ['Currency', 'Lively', 'Snare'], difficulty: 'easy' },
  { id: 10, startWord: 'GLOW', chainWords: ['FOWL', 'WOLF', 'FLOW'], clues: ['Bird', 'Canine', 'Stream'], difficulty: 'easy' },
  // Medium (11-20)
  { id: 11, startWord: 'TRUST', chainWords: ['STRUT', 'TURFS', 'FIRST'], clues: ['Proud walk', 'Grass areas', 'Number one'], difficulty: 'medium' },
  { id: 12, startWord: 'PEACE', chainWords: ['SPACE', 'CAPES', 'PACES'], clues: ['Outer area', 'Superhero wear', 'Steps'], difficulty: 'medium' },
  { id: 13, startWord: 'DREAM', chainWords: ['ARMED', 'MADRE', 'DRAME'], clues: ['With weapons', 'Mother (Spanish)', 'Play'], difficulty: 'medium' },
  { id: 14, startWord: 'GRACE', chainWords: ['CAGER', 'RACER', 'CARER'], clues: ['Basketball player', 'Fast driver', 'Caretaker'], difficulty: 'medium' },
  { id: 15, startWord: 'LIGHT', chainWords: ['TIGHT', 'SIGHT', 'TILTS'], clues: ['Snug', 'Vision', 'Leans'], difficulty: 'medium' },
  { id: 16, startWord: 'HEART', chainWords: ['EARTH', 'HATER', 'RATHE'], clues: ['Planet', 'One who dislikes', 'Early'], difficulty: 'medium' },
  { id: 17, startWord: 'SWEET', chainWords: ['STEW', 'WETS', 'WEST'], clues: ['Slow cooked meal', 'Makes wet', 'Direction'], difficulty: 'medium' },
  { id: 18, startWord: 'SPARK', chainWords: ['PARKS', 'SHARP', 'HARPS'], clues: ['Green spaces', 'Pointy', 'String instruments'], difficulty: 'medium' },
  { id: 19, startWord: 'NOBLE', chainWords: ['BOLEN', 'ELBON', 'BONES'], clues: ['Name', 'Joint', 'Skeleton parts'], difficulty: 'medium' },
  { id: 20, startWord: 'BRAVE', chainWords: ['RAVEN', 'NERVE', 'NEVER'], clues: ['Black bird', 'Courage', 'At no time'], difficulty: 'medium' },
  // Hard (21-30)
  { id: 21, startWord: 'KINDNESS', chainWords: ['SKINNED', 'DINNERS', 'INDERS'], clues: ['Peeled', 'Evening meals', 'Finders'], difficulty: 'hard' },
  { id: 22, startWord: 'PASSION', chainWords: ['SOAPINS', 'PANSION'], clues: ['Soap items', 'Expansion'], difficulty: 'hard' },
  { id: 23, startWord: 'CHARITY', chainWords: ['RATCHIY', 'RICHTAY'], clues: ['Ratchet-like', 'Richly'], difficulty: 'hard' },
  { id: 24, startWord: 'RESPECT', chainWords: ['SCEPTER', 'SPECTRE', 'RECEPTS'], clues: ['Royal staff', 'Ghost', 'Receipts'], difficulty: 'hard' },
  { id: 25, startWord: 'HARMONY', chainWords: ['ROMHANY', 'MONARCHY'], clues: ['Gypsy name', 'Kingdom rule'], difficulty: 'hard' },
  { id: 26, startWord: 'COURAGE', chainWords: ['ACROUGE', 'ROUGECA'], clues: ['Acrobat rouge', 'Rouge color'], difficulty: 'hard' },
  { id: 27, startWord: 'HEALING', chainWords: ['LEAHING', 'GAHNILE'], clues: ['Leaching', 'Granite type'], difficulty: 'hard' },
  { id: 28, startWord: 'PATIENT', chainWords: ['PATIENT', 'TAIPENT'], clues: ['Sick person', 'Tent type'], difficulty: 'hard' },
  { id: 29, startWord: 'DEVOTED', chainWords: ['DOVETED', 'VEDOTET'], clues: ['Like a dove', 'Devoted'], difficulty: 'hard' },
  { id: 30, startWord: 'SINCERE', chainWords: ['CERESIN', 'INCRESE'], clues: ['Wax type', 'Growth'], difficulty: 'hard' },
];

// MISSING HEARTS - 50 Original Puzzles
export const missingHeartsPuzzles: MissingHeartsPuzzle[] = [
  // Easy (1-20)
  { id: 1, word: 'LOVE', pattern: 'L_V_', clue: 'Deep affection', difficulty: 'easy' },
  { id: 2, word: 'HOPE', pattern: 'H_P_', clue: 'Optimistic feeling', difficulty: 'easy' },
  { id: 3, word: 'CARE', pattern: 'C_R_', clue: 'Show concern', difficulty: 'easy' },
  { id: 4, word: 'DREAM', pattern: 'D_E_M', clue: 'Night vision', difficulty: 'easy' },
  { id: 5, word: 'PEACE', pattern: 'P__CE', clue: 'Tranquility', difficulty: 'easy' },
  { id: 6, word: 'HEART', pattern: 'H__RT', clue: 'Love organ', difficulty: 'easy' },
  { id: 7, word: 'SMILE', pattern: 'SM_L_', clue: 'Happy face', difficulty: 'easy' },
  { id: 8, word: 'TRUST', pattern: 'TR_ST', clue: 'Believe in', difficulty: 'easy' },
  { id: 9, word: 'FAITH', pattern: 'F__TH', clue: 'Strong belief', difficulty: 'easy' },
  { id: 10, word: 'GRACE', pattern: 'GR_C_', clue: 'Elegance', difficulty: 'easy' },
  { id: 11, word: 'SHINE', pattern: 'SH_N_', clue: 'Give light', difficulty: 'easy' },
  { id: 12, word: 'BRAVE', pattern: 'BR_V_', clue: 'Courageous', difficulty: 'easy' },
  { id: 13, word: 'SWEET', pattern: 'SW__T', clue: 'Sugary', difficulty: 'easy' },
  { id: 14, word: 'LIGHT', pattern: 'L_GHT', clue: 'Not dark', difficulty: 'easy' },
  { id: 15, word: 'HAPPY', pattern: 'H_PPY', clue: 'Joyful', difficulty: 'easy' },
  { id: 16, word: 'UNITY', pattern: 'UN_TY', clue: 'Togetherness', difficulty: 'easy' },
  { id: 17, word: 'FRESH', pattern: 'FR_SH', clue: 'Not stale', difficulty: 'easy' },
  { id: 18, word: 'CHARM', pattern: 'CH_RM', clue: 'Attractiveness', difficulty: 'easy' },
  { id: 19, word: 'GLORY', pattern: 'GL_RY', clue: 'Great honor', difficulty: 'easy' },
  { id: 20, word: 'BLOOM', pattern: 'BL__M', clue: 'Flower', difficulty: 'easy' },
  // Medium (21-40)
  { id: 21, word: 'KINDNESS', pattern: 'K_ND__SS', clue: 'Being gentle', difficulty: 'medium' },
  { id: 22, word: 'HARMONY', pattern: 'H_R__NY', clue: 'Perfect balance', difficulty: 'medium' },
  { id: 23, word: 'PASSION', pattern: 'P_SS__N', clue: 'Strong emotion', difficulty: 'medium' },
  { id: 24, word: 'COURAGE', pattern: 'C__R_GE', clue: 'Bravery', difficulty: 'medium' },
  { id: 25, word: 'RESPECT', pattern: 'R_SP_CT', clue: 'High regard', difficulty: 'medium' },
  { id: 26, word: 'COMFORT', pattern: 'C_MF_RT', clue: 'State of ease', difficulty: 'medium' },
  { id: 27, word: 'DELIGHT', pattern: 'D_L_GHT', clue: 'Great pleasure', difficulty: 'medium' },
  { id: 28, word: 'CHERISH', pattern: 'CH_R_SH', clue: 'Hold dear', difficulty: 'medium' },
  { id: 29, word: 'HEALING', pattern: 'H__L_NG', clue: 'Recovery', difficulty: 'medium' },
  { id: 30, word: 'NURTURE', pattern: 'N_RT_RE', clue: 'Care for', difficulty: 'medium' },
  { id: 31, word: 'PROTECT', pattern: 'PR_T_CT', clue: 'Keep safe', difficulty: 'medium' },
  { id: 32, word: 'INSPIRE', pattern: '_NSP_RE', clue: 'Motivate', difficulty: 'medium' },
  { id: 33, word: 'SUPPORT', pattern: 'S_PP_RT', clue: 'Help', difficulty: 'medium' },
  { id: 34, word: 'EMBRACE', pattern: '_MBR_CE', clue: 'Hug', difficulty: 'medium' },
  { id: 35, word: 'PROMISE', pattern: 'PR_M_SE', clue: 'Pledge', difficulty: 'medium' },
  { id: 36, word: 'BELIEVE', pattern: 'B_L__VE', clue: 'Accept as true', difficulty: 'medium' },
  { id: 37, word: 'FORGIVE', pattern: 'F_RG_VE', clue: 'Pardon', difficulty: 'medium' },
  { id: 38, word: 'WORSHIP', pattern: 'W_RSH_P', clue: 'Adore', difficulty: 'medium' },
  { id: 39, word: 'SINCERE', pattern: 'S_NC_RE', clue: 'Genuine', difficulty: 'medium' },
  { id: 40, word: 'DEVOTED', pattern: 'D_V_TED', clue: 'Loyal', difficulty: 'medium' },
  // Hard (41-50)
  { id: 41, word: 'GRATITUDE', pattern: 'GR_T_T_DE', clue: 'Thankfulness', difficulty: 'hard' },
  { id: 42, word: 'COMPASSION', pattern: 'C_MP_SS__N', clue: 'Empathy', difficulty: 'hard' },
  { id: 43, word: 'SERENITY', pattern: 'S_R_N_TY', clue: 'Calmness', difficulty: 'hard' },
  { id: 44, word: 'TENDERNESS', pattern: 'T_ND_RN_SS', clue: 'Gentle affection', difficulty: 'hard' },
  { id: 45, word: 'AFFECTION', pattern: '_FF_CT__N', clue: 'Warm feeling', difficulty: 'hard' },
  { id: 46, word: 'ADMIRATION', pattern: '_DM_R_T__N', clue: 'High regard', difficulty: 'hard' },
  { id: 47, word: 'DEDICATION', pattern: 'D_D_C_T__N', clue: 'Commitment', difficulty: 'hard' },
  { id: 48, word: 'FRIENDSHIP', pattern: 'FR__NDSH_P', clue: 'Close bond', difficulty: 'hard' },
  { id: 49, word: 'GENEROSITY', pattern: 'G_N_R_S_TY', clue: 'Giving nature', difficulty: 'hard' },
  { id: 50, word: 'CONTENTMENT', pattern: 'C_NT_NTM_NT', clue: 'Satisfaction', difficulty: 'hard' },
];

// WORD PAIR - 40 Original Puzzles
export const wordPairPuzzles: WordPairPuzzle[] = [
  // Easy (1-15)
  { id: 1, words: ['LOVE', 'CARE'], clue: 'Deep affection and attention', difficulty: 'easy' },
  { id: 2, words: ['HOPE', 'WISH'], clue: 'Desire for something good', difficulty: 'easy' },
  { id: 3, words: ['PEACE', 'CALM'], clue: 'Tranquil states', difficulty: 'easy' },
  { id: 4, words: ['TRUST', 'FAITH'], clue: 'Belief in someone', difficulty: 'easy' },
  { id: 5, words: ['JOY', 'BLISS'], clue: 'Extreme happiness', difficulty: 'easy' },
  { id: 6, words: ['WARM', 'COZY'], clue: 'Comfortable heat', difficulty: 'easy' },
  { id: 7, words: ['SOFT', 'GENTLE'], clue: 'Not rough', difficulty: 'easy' },
  { id: 8, words: ['PURE', 'CLEAN'], clue: 'Free from dirt', difficulty: 'easy' },
  { id: 9, words: ['SMART', 'WISE'], clue: 'Intelligent', difficulty: 'easy' },
  { id: 10, words: ['FAST', 'QUICK'], clue: 'Speedy', difficulty: 'easy' },
  { id: 11, words: ['BIG', 'LARGE'], clue: 'Great in size', difficulty: 'easy' },
  { id: 12, words: ['SMALL', 'TINY'], clue: 'Little in size', difficulty: 'easy' },
  { id: 13, words: ['GOOD', 'NICE'], clue: 'Pleasant', difficulty: 'easy' },
  { id: 14, words: ['SAD', 'BLUE'], clue: 'Unhappy feeling', difficulty: 'easy' },
  { id: 15, words: ['MAD', 'ANGRY'], clue: 'Feeling rage', difficulty: 'easy' },
  // Medium (16-30)
  { id: 16, words: ['FRIEND', 'ALLY'], clue: 'Someone on your side', difficulty: 'medium' },
  { id: 17, words: ['BRAVE', 'BOLD'], clue: 'Showing courage', difficulty: 'medium' },
  { id: 18, words: ['GENTLE', 'TENDER'], clue: 'Soft and caring', difficulty: 'medium' },
  { id: 19, words: ['PASSION', 'FERVOR'], clue: 'Intense enthusiasm', difficulty: 'medium' },
  { id: 20, words: ['WISDOM', 'INSIGHT'], clue: 'Deep understanding', difficulty: 'medium' },
  { id: 21, words: ['HONEST', 'TRUTHFUL'], clue: 'Not lying', difficulty: 'medium' },
  { id: 22, words: ['HUMBLE', 'MODEST'], clue: 'Not arrogant', difficulty: 'medium' },
  { id: 23, words: ['SILENT', 'QUIET'], clue: 'Without noise', difficulty: 'medium' },
  { id: 24, words: ['BRIGHT', 'RADIANT'], clue: 'Shining', difficulty: 'medium' },
  { id: 25, words: ['STRONG', 'MIGHTY'], clue: 'Powerful', difficulty: 'medium' },
  { id: 26, words: ['PRETTY', 'LOVELY'], clue: 'Attractive', difficulty: 'medium' },
  { id: 27, words: ['HAPPY', 'JOYFUL'], clue: 'Full of joy', difficulty: 'medium' },
  { id: 28, words: ['SLEEPY', 'DROWSY'], clue: 'Ready to sleep', difficulty: 'medium' },
  { id: 29, words: ['HUNGRY', 'STARVING'], clue: 'Needing food', difficulty: 'medium' },
  { id: 30, words: ['SCARED', 'AFRAID'], clue: 'Feeling fear', difficulty: 'medium' },
  // Hard (31-40)
  { id: 31, words: ['GRATITUDE', 'THANKFULNESS'], clue: 'Feeling of appreciation', difficulty: 'hard' },
  { id: 32, words: ['SERENITY', 'TRANQUILITY'], clue: 'Perfect calmness', difficulty: 'hard' },
  { id: 33, words: ['COMPASSION', 'EMPATHY'], clue: 'Understanding others feelings', difficulty: 'hard' },
  { id: 34, words: ['DEDICATION', 'COMMITMENT'], clue: 'Devoted effort', difficulty: 'hard' },
  { id: 35, words: ['ADMIRATION', 'REVERENCE'], clue: 'Deep respect', difficulty: 'hard' },
  { id: 36, words: ['GENEROSITY', 'BENEVOLENCE'], clue: 'Giving freely', difficulty: 'hard' },
  { id: 37, words: ['ENTHUSIASM', 'EXCITEMENT'], clue: 'Eager interest', difficulty: 'hard' },
  { id: 38, words: ['PERSEVERANCE', 'PERSISTENCE'], clue: 'Not giving up', difficulty: 'hard' },
  { id: 39, words: ['INTELLIGENCE', 'BRILLIANCE'], clue: 'Mental ability', difficulty: 'hard' },
  { id: 40, words: ['SATISFACTION', 'FULFILLMENT'], clue: 'Feeling complete', difficulty: 'hard' },
];

// FLIP & SOLVE - 40 Original Puzzles
export const flipSolvePuzzles: FlipSolvePuzzle[] = [
  // Easy (1-15)
  { id: 1, word: 'HEART', scrambled: 'RATHE', clue: 'Symbol of love', difficulty: 'easy' },
  { id: 2, word: 'SMILE', scrambled: 'MILES', clue: 'Happy expression', difficulty: 'easy' },
  { id: 3, word: 'DREAM', scrambled: 'ARMED', clue: 'Sleep vision', difficulty: 'easy' },
  { id: 4, word: 'TRUST', scrambled: 'STRUT', clue: 'Confidence in someone', difficulty: 'easy' },
  { id: 5, word: 'GRACE', scrambled: 'CAGER', clue: 'Elegance', difficulty: 'easy' },
  { id: 6, word: 'PEACE', scrambled: 'APIECE', clue: 'Tranquility', difficulty: 'easy' },
  { id: 7, word: 'SHINE', scrambled: 'SHIEN', clue: 'Gleam', difficulty: 'easy' },
  { id: 8, word: 'BRAVE', scrambled: 'BREVA', clue: 'Courageous', difficulty: 'easy' },
  { id: 9, word: 'SWEET', scrambled: 'STEW', clue: 'Sugary taste', difficulty: 'easy' },
  { id: 10, word: 'LIGHT', scrambled: 'GILTH', clue: 'Illumination', difficulty: 'easy' },
  { id: 11, word: 'CHARM', scrambled: 'MARCH', clue: 'Attractiveness', difficulty: 'easy' },
  { id: 12, word: 'FAITH', scrambled: 'FITHA', clue: 'Strong belief', difficulty: 'easy' },
  { id: 13, word: 'GLORY', scrambled: 'GOLRY', clue: 'Great honor', difficulty: 'easy' },
  { id: 14, word: 'BLOOM', scrambled: 'MOBOL', clue: 'Flower', difficulty: 'easy' },
  { id: 15, word: 'UNITY', scrambled: 'NUTIY', clue: 'Togetherness', difficulty: 'easy' },
  // Medium (16-30)
  { id: 16, word: 'LISTEN', scrambled: 'SILENT', clue: 'Pay attention', difficulty: 'medium' },
  { id: 17, word: 'CARING', scrambled: 'RACING', clue: 'Showing concern', difficulty: 'medium' },
  { id: 18, word: 'HONEST', scrambled: 'ETHNOS', clue: 'Truthful', difficulty: 'medium' },
  { id: 19, word: 'PATIENT', scrambled: 'PATINE', clue: 'Willing to wait', difficulty: 'medium' },
  { id: 20, word: 'DEVOTED', scrambled: 'DOVETED', clue: 'Loyal and loving', difficulty: 'medium' },
  { id: 21, word: 'COMFORT', scrambled: 'FORMCOT', clue: 'State of ease', difficulty: 'medium' },
  { id: 22, word: 'RESPECT', scrambled: 'SCEPTER', clue: 'High regard', difficulty: 'medium' },
  { id: 23, word: 'COURAGE', scrambled: 'COUGARE', clue: 'Bravery', difficulty: 'medium' },
  { id: 24, word: 'HEALING', scrambled: 'LEAHING', clue: 'Recovery', difficulty: 'medium' },
  { id: 25, word: 'NURTURE', scrambled: 'UNTRUER', clue: 'Care for', difficulty: 'medium' },
  { id: 26, word: 'PROTECT', scrambled: 'PROCTET', clue: 'Keep safe', difficulty: 'medium' },
  { id: 27, word: 'INSPIRE', scrambled: 'SPINIER', clue: 'Motivate', difficulty: 'medium' },
  { id: 28, word: 'SUPPORT', scrambled: 'STUPOR', clue: 'Help', difficulty: 'medium' },
  { id: 29, word: 'EMBRACE', scrambled: 'BECAMER', clue: 'Hug', difficulty: 'medium' },
  { id: 30, word: 'PROMISE', scrambled: 'IMPOSER', clue: 'Pledge', difficulty: 'medium' },
  // Hard (31-40)
  { id: 31, word: 'GRATITUDE', scrambled: 'DIGATURET', clue: 'Thankfulness', difficulty: 'hard' },
  { id: 32, word: 'COMPASSION', scrambled: 'COMPAISONS', clue: 'Empathy', difficulty: 'hard' },
  { id: 33, word: 'SERENITY', scrambled: 'TYRENIES', clue: 'Calmness', difficulty: 'hard' },
  { id: 34, word: 'TENDERNESS', scrambled: 'RESENTENDS', clue: 'Gentle affection', difficulty: 'hard' },
  { id: 35, word: 'AFFECTION', scrambled: 'COFFINATE', clue: 'Warm feeling', difficulty: 'hard' },
  { id: 36, word: 'ADMIRATION', scrambled: 'DAMNIRATIO', clue: 'High regard', difficulty: 'hard' },
  { id: 37, word: 'DEDICATION', scrambled: 'DICATIONED', clue: 'Commitment', difficulty: 'hard' },
  { id: 38, word: 'FRIENDSHIP', scrambled: 'SHIPFRIEND', clue: 'Close bond', difficulty: 'hard' },
  { id: 39, word: 'GENEROSITY', scrambled: 'YOGENERIST', clue: 'Giving nature', difficulty: 'hard' },
  { id: 40, word: 'CONTENTMENT', scrambled: 'MENTCONTENT', clue: 'Satisfaction', difficulty: 'hard' },
];

// CROSSED EMOTIONS - Mini crosswords - 20 Original Puzzles
export const crossedEmotionsPuzzles: CrossedEmotionsPuzzle[] = [
  {
    id: 1,
    grid: [
      { word: 'LOVE', row: 0, col: 0, direction: 'across' },
      { word: 'LIFE', row: 0, col: 0, direction: 'down' },
      { word: 'EVER', row: 0, col: 3, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Deep affection' },
      { direction: 'down', number: 1, clue: 'Existence' },
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
      { word: 'HOPE', row: 0, col: 0, direction: 'across' },
      { word: 'HELP', row: 0, col: 0, direction: 'down' },
      { word: 'EACH', row: 0, col: 3, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Optimism' },
      { direction: 'down', number: 1, clue: 'Assist' },
      { direction: 'down', number: 2, clue: 'Every' },
    ],
    difficulty: 'easy',
  },
  {
    id: 4,
    grid: [
      { word: 'WARM', row: 0, col: 0, direction: 'across' },
      { word: 'WISH', row: 0, col: 0, direction: 'down' },
      { word: 'MAKE', row: 0, col: 3, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Comfortably hot' },
      { direction: 'down', number: 1, clue: 'Desire' },
      { direction: 'down', number: 2, clue: 'Create' },
    ],
    difficulty: 'easy',
  },
  {
    id: 5,
    grid: [
      { word: 'PEACE', row: 0, col: 0, direction: 'across' },
      { word: 'PURE', row: 0, col: 0, direction: 'down' },
      { word: 'EASE', row: 0, col: 4, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Tranquility' },
      { direction: 'down', number: 1, clue: 'Clean and innocent' },
      { direction: 'down', number: 2, clue: 'Comfort' },
    ],
    difficulty: 'easy',
  },
  {
    id: 6,
    grid: [
      { word: 'TRUST', row: 0, col: 0, direction: 'across' },
      { word: 'TRUE', row: 0, col: 0, direction: 'down' },
      { word: 'SWEET', row: 0, col: 4, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Belief in someone' },
      { direction: 'down', number: 1, clue: 'Genuine' },
      { direction: 'down', number: 2, clue: 'Pleasant taste' },
    ],
    difficulty: 'medium',
  },
  {
    id: 7,
    grid: [
      { word: 'HEART', row: 0, col: 0, direction: 'across' },
      { word: 'HAPPY', row: 0, col: 0, direction: 'down' },
      { word: 'TEACH', row: 0, col: 4, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Love organ' },
      { direction: 'down', number: 1, clue: 'Joyful' },
      { direction: 'down', number: 2, clue: 'Educate' },
    ],
    difficulty: 'medium',
  },
  {
    id: 8,
    grid: [
      { word: 'SMILE', row: 0, col: 0, direction: 'across' },
      { word: 'SHINE', row: 0, col: 0, direction: 'down' },
      { word: 'EARLY', row: 0, col: 4, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Happy expression' },
      { direction: 'down', number: 1, clue: 'Give light' },
      { direction: 'down', number: 2, clue: 'Not late' },
    ],
    difficulty: 'medium',
  },
  {
    id: 9,
    grid: [
      { word: 'GRACE', row: 0, col: 0, direction: 'across' },
      { word: 'GLORY', row: 0, col: 0, direction: 'down' },
      { word: 'EVERY', row: 0, col: 4, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Elegance' },
      { direction: 'down', number: 1, clue: 'Great honor' },
      { direction: 'down', number: 2, clue: 'Each one' },
    ],
    difficulty: 'medium',
  },
  {
    id: 10,
    grid: [
      { word: 'DREAM', row: 0, col: 0, direction: 'across' },
      { word: 'DIVINE', row: 0, col: 0, direction: 'down' },
      { word: 'MERCY', row: 0, col: 4, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Sleep vision' },
      { direction: 'down', number: 1, clue: 'Godly' },
      { direction: 'down', number: 2, clue: 'Compassion' },
    ],
    difficulty: 'medium',
  },
  {
    id: 11,
    grid: [
      { word: 'KINDNESS', row: 0, col: 0, direction: 'across' },
      { word: 'KEEN', row: 0, col: 0, direction: 'down' },
      { word: 'SOFT', row: 0, col: 7, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Being gentle and caring' },
      { direction: 'down', number: 1, clue: 'Eager' },
      { direction: 'down', number: 2, clue: 'Not hard' },
    ],
    difficulty: 'hard',
  },
  {
    id: 12,
    grid: [
      { word: 'HARMONY', row: 0, col: 0, direction: 'across' },
      { word: 'HAPPY', row: 0, col: 0, direction: 'down' },
      { word: 'YOUTH', row: 0, col: 6, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Perfect balance' },
      { direction: 'down', number: 1, clue: 'Joyful' },
      { direction: 'down', number: 2, clue: 'Young age' },
    ],
    difficulty: 'hard',
  },
  {
    id: 13,
    grid: [
      { word: 'PASSION', row: 0, col: 0, direction: 'across' },
      { word: 'PEACE', row: 0, col: 0, direction: 'down' },
      { word: 'NIGHT', row: 0, col: 6, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Intense emotion' },
      { direction: 'down', number: 1, clue: 'Tranquility' },
      { direction: 'down', number: 2, clue: 'Evening time' },
    ],
    difficulty: 'hard',
  },
  {
    id: 14,
    grid: [
      { word: 'COURAGE', row: 0, col: 0, direction: 'across' },
      { word: 'CHARM', row: 0, col: 0, direction: 'down' },
      { word: 'EAGER', row: 0, col: 6, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Bravery' },
      { direction: 'down', number: 1, clue: 'Attractiveness' },
      { direction: 'down', number: 2, clue: 'Keen' },
    ],
    difficulty: 'hard',
  },
  {
    id: 15,
    grid: [
      { word: 'RESPECT', row: 0, col: 0, direction: 'across' },
      { word: 'REACH', row: 0, col: 0, direction: 'down' },
      { word: 'TEACH', row: 0, col: 6, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'High regard' },
      { direction: 'down', number: 1, clue: 'Extend to' },
      { direction: 'down', number: 2, clue: 'Educate' },
    ],
    difficulty: 'hard',
  },
  {
    id: 16,
    grid: [
      { word: 'COMFORT', row: 0, col: 0, direction: 'across' },
      { word: 'CALM', row: 0, col: 0, direction: 'down' },
      { word: 'TOTAL', row: 0, col: 6, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'State of ease' },
      { direction: 'down', number: 1, clue: 'Peaceful' },
      { direction: 'down', number: 2, clue: 'Complete' },
    ],
    difficulty: 'hard',
  },
  {
    id: 17,
    grid: [
      { word: 'HEALING', row: 0, col: 0, direction: 'across' },
      { word: 'HEART', row: 0, col: 0, direction: 'down' },
      { word: 'GIANT', row: 0, col: 6, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Recovery process' },
      { direction: 'down', number: 1, clue: 'Love organ' },
      { direction: 'down', number: 2, clue: 'Very large' },
    ],
    difficulty: 'hard',
  },
  {
    id: 18,
    grid: [
      { word: 'NURTURE', row: 0, col: 0, direction: 'across' },
      { word: 'NOBLE', row: 0, col: 0, direction: 'down' },
      { word: 'EAGER', row: 0, col: 6, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Care for growth' },
      { direction: 'down', number: 1, clue: 'Dignified' },
      { direction: 'down', number: 2, clue: 'Enthusiastic' },
    ],
    difficulty: 'hard',
  },
  {
    id: 19,
    grid: [
      { word: 'PROTECT', row: 0, col: 0, direction: 'across' },
      { word: 'PEACE', row: 0, col: 0, direction: 'down' },
      { word: 'TEACH', row: 0, col: 6, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Keep safe' },
      { direction: 'down', number: 1, clue: 'Tranquility' },
      { direction: 'down', number: 2, clue: 'Educate' },
    ],
    difficulty: 'hard',
  },
  {
    id: 20,
    grid: [
      { word: 'INSPIRE', row: 0, col: 0, direction: 'across' },
      { word: 'IDEAL', row: 0, col: 0, direction: 'down' },
      { word: 'EAGER', row: 0, col: 6, direction: 'down' },
    ],
    clues: [
      { direction: 'across', number: 1, clue: 'Motivate' },
      { direction: 'down', number: 1, clue: 'Perfect' },
      { direction: 'down', number: 2, clue: 'Enthusiastic' },
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
