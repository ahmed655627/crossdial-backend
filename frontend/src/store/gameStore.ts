import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { soundManager } from '../utils/sounds';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

// Debug: Log API URL on load
console.log('API_URL:', API_URL || '(using relative paths)');

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
  hints: number;
  completed_levels: number[];
  found_words: Record<string, string[]>;
  bonus_words_found: Record<string, string[]>;
  total_bonus_words: number;
  hints_used: number;
  last_wheel_spin: string | null;
  total_score: number;
  username: string;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  levels_completed: number;
  rank: number;
}

export interface MultiplayerMatch {
  id: string;
  player1: string;
  player2: string;
  level_id: number;
  player1_words: string[];
  player2_words: string[];
  player1_score: number;
  player2_score: number;
  status: 'waiting' | 'playing' | 'finished';
  winner: string | null;
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
  
  // Sound settings
  soundEnabled: boolean;
  
  // Multiplayer
  leaderboard: LeaderboardEntry[];
  currentMatch: MultiplayerMatch | null;
  isSearchingMatch: boolean;
  
  // Daily Spin
  spinsRemaining: number;
  
  // Actions
  initialize: () => Promise<void>;
  loadLevels: () => Promise<void>;
  setCurrentLevel: (levelId: number) => Promise<void>;
  selectLetter: (index: number) => void;
  deselectLetter: () => void;
  clearSelection: () => void;
  submitWord: () => Promise<void>;
  shuffleLetters: () => void;
  useHint: () => Promise<boolean>;
  completeLevel: () => Promise<void>;
  resetGame: () => Promise<void>;
  resetLevel: () => void;
  restartLevel: () => void;
  
  // Daily rewards
  canSpinWheel: () => boolean;
  getSpinsRemaining: () => number;
  markWheelSpun: () => Promise<void>;
  addDailyReward: (type: string, value: number) => Promise<void>;
  fetchSpinStatus: () => Promise<void>;
  addExtraSpin: () => void;
  
  // Multiplayer
  loadLeaderboard: () => Promise<void>;
  searchMatch: () => Promise<void>;
  cancelMatchSearch: () => void;
  submitMultiplayerWord: (word: string) => Promise<void>;
  
  // Settings
  toggleSound: () => void;
  setUsername: (name: string) => Promise<void>;
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
  soundEnabled: true,
  leaderboard: [],
  currentMatch: null,
  isSearchingMatch: false,
  spinsRemaining: 6,  // Track remaining spins for the day

  // Initialize the game
  initialize: async () => {
    set({ loading: true, error: null });
    try {
      await soundManager.initialize();
      
      const deviceId = await getOrCreateDeviceId();
      set({ deviceId });
      
      // Create or get progress with retry
      let progress = null;
      let retries = 3;
      
      while (retries > 0) {
        try {
          const progressResponse = await fetch(`${API_URL}/api/progress`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: deviceId }),
          });
          
          if (!progressResponse.ok) {
            throw new Error(`Progress API returned ${progressResponse.status}`);
          }
          
          progress = await progressResponse.json();
          break;
        } catch (err) {
          retries--;
          console.log(`Progress fetch retry ${3 - retries}/3`);
          if (retries === 0) throw err;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // Load levels with retry
      let levels = [];
      retries = 3;
      
      while (retries > 0) {
        try {
          const levelsResponse = await fetch(`${API_URL}/api/levels`);
          
          if (!levelsResponse.ok) {
            throw new Error(`Levels API returned ${levelsResponse.status}`);
          }
          
          levels = await levelsResponse.json();
          break;
        } catch (err) {
          retries--;
          console.log(`Levels fetch retry ${3 - retries}/3`);
          if (retries === 0) throw err;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      if (!levels || levels.length === 0) {
        throw new Error('No levels loaded from server');
      }
      
      // Set levels first (but don't set loading to false yet)
      set({ 
        progress, 
        levels,
      });
      
      // Set current level before setting loading to false
      const currentLevelId = progress?.current_level || 1;
      const level = levels.find((l: Level) => l.id === currentLevelId);
      if (level) {
        const foundWords = progress?.found_words?.[String(currentLevelId)] || [];
        const bonusWords = progress?.bonus_words_found?.[String(currentLevelId)] || [];
        set({ 
          currentLevel: level, 
          foundWords: foundWords.map((w: string) => w.toUpperCase()),
          bonusWordsFound: bonusWords.map((w: string) => w.toUpperCase()),
          currentWord: '',
          selectedLetterIndices: [],
          showLevelComplete: false,
          lastWordResult: null,
          hintLetter: null,
          loading: false  // Set loading to false only after currentLevel is set
        });
      } else {
        // Fallback to first level if current level not found
        const firstLevel = levels[0];
        set({ 
          currentLevel: firstLevel, 
          foundWords: [],
          bonusWordsFound: [],
          loading: false 
        });
      }
      
      // Load leaderboard (non-blocking)
      get().loadLeaderboard().catch(e => console.log('Leaderboard load failed:', e));
      
      // Fetch daily spin status (non-blocking)
      get().fetchSpinStatus().catch(e => console.log('Spin status fetch failed:', e));
      
    } catch (error) {
      console.error('Initialize error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      set({ error: `Failed to initialize: ${errorMsg}`, loading: false });
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
    const { selectedLetterIndices, currentLevel, currentWord, soundEnabled } = get();
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
    
    if (soundEnabled) {
      soundManager.playClick();
    }
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
    const { currentWord, currentLevel, deviceId, foundWords, bonusWordsFound, soundEnabled } = get();
    
    // Clear selection first to prevent multiple submissions
    set({ selectedLetterIndices: [], currentWord: '' });
    
    if (!currentLevel || !deviceId || currentWord.length < 3) {
      set({ lastWordResult: null });
      return;
    }
    
    const word = currentWord.toUpperCase();
    
    // Check if already found
    if (foundWords.includes(word) || bonusWordsFound.includes(word)) {
      set({ lastWordResult: { word, isBonus: false, isValid: false } });
      if (soundEnabled) soundManager.playWrongWord();
      return;
    }
    
    try {
      // Validate word
      const response = await fetch(`${API_URL}/api/validate-word`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, level_id: currentLevel.id }),
      });
      
      if (!response.ok) {
        console.error('Validate word response not ok:', response.status);
        set({ lastWordResult: { word, isBonus: false, isValid: false } });
        return;
      }
      
      const result = await response.json();
      
      if (result.valid) {
        // Add word to found list (non-blocking)
        fetch(`${API_URL}/api/progress/${deviceId}/add-word?level_id=${currentLevel.id}&word=${word}&is_bonus=${result.is_bonus_word}`, {
          method: 'POST',
        }).catch(e => console.error('Add word error:', e));
        
        // Update local state
        if (result.is_target_word) {
          const newFoundWords = [...foundWords, word];
          set({ foundWords: newFoundWords });
          
          if (soundEnabled) soundManager.playWordChime();
          
          // Check if level complete
          const targetWords = currentLevel.targetWords.map(w => w.toUpperCase());
          if (targetWords.every(tw => newFoundWords.includes(tw))) {
            set({ showLevelComplete: true });
            if (soundEnabled) soundManager.playLevelComplete();
          }
        } else {
          set({ bonusWordsFound: [...bonusWordsFound, word] });
          if (soundEnabled) soundManager.playBonusWord();
        }
        
        // Refresh progress (non-blocking)
        fetch(`${API_URL}/api/progress/${deviceId}`)
          .then(res => res.json())
          .then(progress => set({ progress }))
          .catch(e => console.error('Refresh progress error:', e));
        
        set({ lastWordResult: { word, isBonus: result.is_bonus_word, isValid: true } });
      } else {
        if (soundEnabled) soundManager.playWrongWord();
        set({ lastWordResult: { word, isBonus: false, isValid: false } });
      }
    } catch (error) {
      console.error('Submit word error:', error);
      set({ lastWordResult: { word, isBonus: false, isValid: false } });
    }
  },

  shuffleLetters: () => {
    const { currentLevel, soundEnabled, levels } = get();
    if (!currentLevel) return;
    
    // Shuffle the letters
    const shuffled = [...currentLevel.letters].sort(() => Math.random() - 0.5);
    
    // Also cycle through different wonder themes for visual variety
    // Get a random wonder from the same difficulty range
    const currentId = currentLevel.id;
    const rangeStart = Math.floor((currentId - 1) / 15) * 15 + 1;
    const rangeEnd = rangeStart + 14;
    
    // Get levels in the same theme range
    const sameTierLevels = levels.filter(l => l.id >= rangeStart && l.id <= rangeEnd);
    const randomWonder = sameTierLevels[Math.floor(Math.random() * sameTierLevels.length)];
    
    // Keep the same puzzle but show different location name for variety
    set({ 
      currentLevel: { 
        ...currentLevel, 
        letters: shuffled,
        // Optionally change the displayed wonder (visual only)
        wonder: randomWonder?.wonder || currentLevel.wonder,
        location: randomWonder?.location || currentLevel.location,
      },
      selectedLetterIndices: [],
      currentWord: ''
    });
    
    if (soundEnabled) soundManager.playClick();
  },

  useHint: async () => {
    const { deviceId, currentLevel, progress } = get();
    if (!deviceId || !currentLevel) return false;
    
    const hints = progress?.hints || 0;
    const coins = progress?.coins || 0;
    
    // Check if user has hints or enough coins
    if (hints <= 0 && coins < 20) {
      set({ error: 'Not enough coins or hints!' });
      setTimeout(() => set({ error: null }), 2000);
      return false;
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
        return true;
      } else {
        set({ error: result.message });
        setTimeout(() => set({ error: null }), 2000);
        return false;
      }
    } catch (error) {
      console.error('Use hint error:', error);
      return false;
    }
  },

  completeLevel: async () => {
    const { deviceId, currentLevel, levels, soundEnabled } = get();
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
      
      // Update leaderboard
      await get().loadLeaderboard();
    } catch (error) {
      console.error('Complete level error:', error);
    }
  },

  resetLevel: () => {
    const { currentLevel } = get();
    if (!currentLevel) return;
    
    set({
      foundWords: [],
      bonusWordsFound: [],
      currentWord: '',
      selectedLetterIndices: [],
      showLevelComplete: false,
      lastWordResult: null,
      hintLetter: null
    });
  },

  restartLevel: () => {
    const { currentLevel, deviceId } = get();
    if (!currentLevel || !deviceId) return;
    
    // Clear found words for this level
    set({
      foundWords: [],
      bonusWordsFound: [],
      currentWord: '',
      selectedLetterIndices: [],
      showLevelComplete: false,
      lastWordResult: null,
      hintLetter: null
    });
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

  // Daily rewards
  canSpinWheel: () => {
    const { spinsRemaining } = get();
    return spinsRemaining > 0;
  },

  getSpinsRemaining: () => {
    const { spinsRemaining } = get();
    return spinsRemaining;
  },

  fetchSpinStatus: async () => {
    const { deviceId } = get();
    if (!deviceId) return;
    
    try {
      const response = await fetch(`${API_URL}/api/progress/${deviceId}/spin-status`);
      const status = await response.json();
      set({ spinsRemaining: status.spins_remaining || 0 });
    } catch (error) {
      console.error('Fetch spin status error:', error);
    }
  },

  addExtraSpin: () => {
    const { spinsRemaining } = get();
    set({ spinsRemaining: spinsRemaining + 1 });
  },

  markWheelSpun: async () => {
    const { deviceId, spinsRemaining } = get();
    if (!deviceId) return;
    
    try {
      const response = await fetch(`${API_URL}/api/progress/${deviceId}/spin-wheel`, {
        method: 'POST',
      });
      const result = await response.json();
      
      if (result.success) {
        set({ spinsRemaining: result.spins_remaining || 0 });
      }
      
      // Refresh progress
      const progressResponse = await fetch(`${API_URL}/api/progress/${deviceId}`);
      const progress = await progressResponse.json();
      set({ progress });
    } catch (error) {
      console.error('Mark wheel spun error:', error);
    }
  },

  addDailyReward: async (type: string, value: number) => {
    const { deviceId } = get();
    if (!deviceId) return;
    
    try {
      await fetch(`${API_URL}/api/progress/${deviceId}/add-reward?type=${type}&value=${value}`, {
        method: 'POST',
      });
      
      // Refresh progress
      const progressResponse = await fetch(`${API_URL}/api/progress/${deviceId}`);
      const progress = await progressResponse.json();
      set({ progress });
    } catch (error) {
      console.error('Add daily reward error:', error);
    }
  },

  // Multiplayer
  loadLeaderboard: async () => {
    try {
      const response = await fetch(`${API_URL}/api/leaderboard`);
      const leaderboard = await response.json();
      set({ leaderboard });
    } catch (error) {
      console.error('Load leaderboard error:', error);
    }
  },

  searchMatch: async () => {
    const { deviceId } = get();
    if (!deviceId) return;
    
    set({ isSearchingMatch: true });
    
    try {
      const response = await fetch(`${API_URL}/api/multiplayer/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: deviceId }),
      });
      const match = await response.json();
      
      if (match.status === 'playing') {
        set({ currentMatch: match, isSearchingMatch: false });
      }
    } catch (error) {
      console.error('Search match error:', error);
      set({ isSearchingMatch: false });
    }
  },

  cancelMatchSearch: () => {
    set({ isSearchingMatch: false });
  },

  submitMultiplayerWord: async (word: string) => {
    const { deviceId, currentMatch } = get();
    if (!deviceId || !currentMatch) return;
    
    try {
      const response = await fetch(`${API_URL}/api/multiplayer/submit-word`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          match_id: currentMatch.id, 
          device_id: deviceId, 
          word 
        }),
      });
      const updatedMatch = await response.json();
      set({ currentMatch: updatedMatch });
    } catch (error) {
      console.error('Submit multiplayer word error:', error);
    }
  },

  // Settings
  toggleSound: () => {
    const { soundEnabled } = get();
    set({ soundEnabled: !soundEnabled });
  },

  setUsername: async (name: string) => {
    const { deviceId } = get();
    if (!deviceId) return;
    
    try {
      await fetch(`${API_URL}/api/progress/${deviceId}/username`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name }),
      });
      
      // Refresh progress
      const progressResponse = await fetch(`${API_URL}/api/progress/${deviceId}`);
      const progress = await progressResponse.json();
      set({ progress });
    } catch (error) {
      console.error('Set username error:', error);
    }
  },
}));
