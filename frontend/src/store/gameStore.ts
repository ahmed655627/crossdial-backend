import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export interface GridPosition {
  word: string;
  row: number;
  col: number;
  direction: 'horizontal' | 'vertical';
}

export interface Level {
  id: number;
  wonder: string;
  location: string;
  letters: string[];
  targetWords: string[];
  grid: GridPosition[];
  bonusWords: string[];
}

export interface UserProgress {
  id: string;
  device_id: string;
  current_level: number;
  coins: number;
  completed_levels: number[];
  found_words: Record<string, string[]>;
  bonus_words_found: Record<string, string[]>;
  total_bonus_words: number;
  hints_used: number;
}

interface GameState {
  // Device
  deviceId: string | null;
  
  // Levels
  levels: Level[];
  currentLevel: Level | null;
  
  // Progress
  progress: UserProgress | null;
  foundWords: string[];
  bonusWordsFound: string[];
  
  // UI State
  loading: boolean;
  error: string | null;
  currentWord: string;
  selectedLetterIndices: number[];
  showLevelComplete: boolean;
  lastWordResult: { word: string; isBonus: boolean; isValid: boolean } | null;
  hintLetter: { letter: string; position: GridPosition; letterIndex: number } | null;
  
  // Actions
  initialize: () => Promise<void>;
  loadLevels: () => Promise<void>;
  setCurrentLevel: (levelId: number) => Promise<void>;
  selectLetter: (index: number) => void;
  deselectLetter: () => void;
  clearSelection: () => void;
  submitWord: () => Promise<void>;
  shuffleLetters: () => void;
  useHint: () => Promise<void>;
  completeLevel: () => Promise<void>;
  resetGame: () => Promise<void>;
}

const getOrCreateDeviceId = async (): Promise<string> => {
  try {
    let deviceId = await AsyncStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = Crypto.randomUUID();
      await AsyncStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  } catch (error) {
    return Crypto.randomUUID();
  }
};

export const useGameStore = create<GameState>((set, get) => ({
  // Initial State
  deviceId: null,
  levels: [],
  currentLevel: null,
  progress: null,
  foundWords: [],
  bonusWordsFound: [],
  loading: false,
  error: null,
  currentWord: '',
  selectedLetterIndices: [],
  showLevelComplete: false,
  lastWordResult: null,
  hintLetter: null,

  // Initialize the game
  initialize: async () => {
    set({ loading: true, error: null });
    try {
      const deviceId = await getOrCreateDeviceId();
      set({ deviceId });
      
      // Create or get progress
      const progressResponse = await fetch(`${API_URL}/api/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: deviceId }),
      });
      const progress = await progressResponse.json();
      
      // Load levels
      const levelsResponse = await fetch(`${API_URL}/api/levels`);
      const levels = await levelsResponse.json();
      
      set({ 
        progress, 
        levels,
        loading: false 
      });
      
      // Set current level
      const currentLevelId = progress.current_level || 1;
      await get().setCurrentLevel(currentLevelId);
      
    } catch (error) {
      console.error('Initialize error:', error);
      set({ error: 'Failed to initialize game', loading: false });
    }
  },

  loadLevels: async () => {
    try {
      const response = await fetch(`${API_URL}/api/levels`);
      const levels = await response.json();
      set({ levels });
    } catch (error) {
      console.error('Load levels error:', error);
    }
  },

  setCurrentLevel: async (levelId: number) => {
    const { levels, progress } = get();
    const level = levels.find(l => l.id === levelId);
    if (level) {
      const foundWords = progress?.found_words?.[String(levelId)] || [];
      const bonusWords = progress?.bonus_words_found?.[String(levelId)] || [];
      set({ 
        currentLevel: level, 
        foundWords: foundWords.map(w => w.toUpperCase()),
        bonusWordsFound: bonusWords.map(w => w.toUpperCase()),
        currentWord: '',
        selectedLetterIndices: [],
        showLevelComplete: false,
        lastWordResult: null,
        hintLetter: null
      });
    }
  },

  selectLetter: (index: number) => {
    const { selectedLetterIndices, currentLevel, currentWord } = get();
    if (!currentLevel) return;
    
    // Check if already selected
    if (selectedLetterIndices.includes(index)) {
      // If it's the last selected, deselect it
      if (selectedLetterIndices[selectedLetterIndices.length - 1] === index) {
        const newIndices = selectedLetterIndices.slice(0, -1);
        const newWord = currentWord.slice(0, -1);
        set({ selectedLetterIndices: newIndices, currentWord: newWord });
      }
      return;
    }
    
    // Add new letter
    const newIndices = [...selectedLetterIndices, index];
    const newWord = currentWord + currentLevel.letters[index];
    set({ selectedLetterIndices: newIndices, currentWord: newWord });
  },

  deselectLetter: () => {
    const { selectedLetterIndices, currentWord } = get();
    if (selectedLetterIndices.length > 0) {
      const newIndices = selectedLetterIndices.slice(0, -1);
      const newWord = currentWord.slice(0, -1);
      set({ selectedLetterIndices: newIndices, currentWord: newWord });
    }
  },

  clearSelection: () => {
    set({ selectedLetterIndices: [], currentWord: '' });
  },

  submitWord: async () => {
    const { currentWord, currentLevel, deviceId, foundWords, bonusWordsFound } = get();
    if (!currentLevel || !deviceId || currentWord.length < 3) {
      set({ selectedLetterIndices: [], currentWord: '', lastWordResult: null });
      return;
    }
    
    const word = currentWord.toUpperCase();
    
    // Check if already found
    if (foundWords.includes(word) || bonusWordsFound.includes(word)) {
      set({ 
        selectedLetterIndices: [], 
        currentWord: '',
        lastWordResult: { word, isBonus: false, isValid: false }
      });
      return;
    }
    
    try {
      // Validate word
      const response = await fetch(`${API_URL}/api/validate-word`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, level_id: currentLevel.id }),
      });
      const result = await response.json();
      
      if (result.valid) {
        // Add word to found list
        await fetch(`${API_URL}/api/progress/${deviceId}/add-word?level_id=${currentLevel.id}&word=${word}&is_bonus=${result.is_bonus_word}`, {
          method: 'POST',
        });
        
        // Update local state
        if (result.is_target_word) {
          const newFoundWords = [...foundWords, word];
          set({ foundWords: newFoundWords });
          
          // Check if level complete
          const targetWords = currentLevel.targetWords.map(w => w.toUpperCase());
          if (targetWords.every(tw => newFoundWords.includes(tw))) {
            set({ showLevelComplete: true });
          }
        } else {
          set({ bonusWordsFound: [...bonusWordsFound, word] });
        }
        
        // Refresh progress
        const progressResponse = await fetch(`${API_URL}/api/progress/${deviceId}`);
        const progress = await progressResponse.json();
        set({ progress });
        
        set({ lastWordResult: { word, isBonus: result.is_bonus_word, isValid: true } });
      } else {
        set({ lastWordResult: { word, isBonus: false, isValid: false } });
      }
    } catch (error) {
      console.error('Submit word error:', error);
    }
    
    set({ selectedLetterIndices: [], currentWord: '' });
  },

  shuffleLetters: () => {
    const { currentLevel } = get();
    if (!currentLevel) return;
    
    const shuffled = [...currentLevel.letters].sort(() => Math.random() - 0.5);
    set({ 
      currentLevel: { ...currentLevel, letters: shuffled },
      selectedLetterIndices: [],
      currentWord: ''
    });
  },

  useHint: async () => {
    const { deviceId, currentLevel, progress } = get();
    if (!deviceId || !currentLevel) return;
    
    if ((progress?.coins || 0) < 20) {
      set({ error: 'Not enough coins for a hint!' });
      setTimeout(() => set({ error: null }), 2000);
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: deviceId, level_id: currentLevel.id }),
      });
      const result = await response.json();
      
      if (result.success) {
        set({ 
          hintLetter: {
            letter: result.letter,
            position: result.position,
            letterIndex: result.position.letterIndex
          }
        });
        
        // Refresh progress
        const progressResponse = await fetch(`${API_URL}/api/progress/${deviceId}`);
        const progressData = await progressResponse.json();
        set({ progress: progressData });
        
        // Clear hint after 3 seconds
        setTimeout(() => set({ hintLetter: null }), 3000);
      } else {
        set({ error: result.message });
        setTimeout(() => set({ error: null }), 2000);
      }
    } catch (error) {
      console.error('Use hint error:', error);
    }
  },

  completeLevel: async () => {
    const { deviceId, currentLevel, levels } = get();
    if (!deviceId || !currentLevel) return;
    
    try {
      const response = await fetch(`${API_URL}/api/progress/${deviceId}/complete-level?level_id=${currentLevel.id}`, {
        method: 'POST',
      });
      const result = await response.json();
      
      // Refresh progress
      const progressResponse = await fetch(`${API_URL}/api/progress/${deviceId}`);
      const progress = await progressResponse.json();
      set({ progress });
      
      // Move to next level if available
      if (result.next_level_unlocked && result.current_level <= levels.length) {
        await get().setCurrentLevel(result.current_level);
      }
      
      set({ showLevelComplete: false });
    } catch (error) {
      console.error('Complete level error:', error);
    }
  },

  resetGame: async () => {
    try {
      await AsyncStorage.removeItem('device_id');
      set({
        deviceId: null,
        levels: [],
        currentLevel: null,
        progress: null,
        foundWords: [],
        bonusWordsFound: [],
        loading: false,
        error: null,
        currentWord: '',
        selectedLetterIndices: [],
        showLevelComplete: false,
        lastWordResult: null,
        hintLetter: null,
      });
      await get().initialize();
    } catch (error) {
      console.error('Reset game error:', error);
    }
  },
}));
