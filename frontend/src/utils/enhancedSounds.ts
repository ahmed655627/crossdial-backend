/**
 * Enhanced Sound Manager
 * Different sounds per letter, word length, and achievements
 */

import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

// Musical note frequencies for letter sounds (pentatonic scale for pleasant sounds)
const LETTER_NOTES = {
  A: 440,    // A4
  B: 493.88, // B4
  C: 523.25, // C5
  D: 587.33, // D5
  E: 659.25, // E5
  F: 698.46, // F5
  G: 783.99, // G5
  H: 440,
  I: 493.88,
  J: 523.25,
  K: 587.33,
  L: 659.25,
  M: 698.46,
  N: 783.99,
  O: 440,
  P: 493.88,
  Q: 523.25,
  R: 587.33,
  S: 659.25,
  T: 698.46,
  U: 783.99,
  V: 440,
  W: 493.88,
  X: 523.25,
  Y: 587.33,
  Z: 659.25,
};

// Sound URLs - using royalty-free game sounds
const SOUND_URLS = {
  // Letter selection sounds - soft taps
  letterTap1: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  letterTap2: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  letterTap3: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
  
  // Word found sounds - by length
  word3Letter: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
  word4Letter: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  word5Letter: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  word6Plus: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  
  // Bonus word
  bonusWord: 'https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3',
  
  // Wrong word
  wrongWord: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
  
  // Level complete - different intensities
  levelComplete: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  levelCompletePerfect: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  
  // Combo sounds
  combo2x: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  combo3x: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  combo5x: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  
  // Spin wheel
  spinWheel: 'https://assets.mixkit.co/active_storage/sfx/146/146-preview.mp3',
  spinWheelTick: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  
  // Rewards
  coinCollect: 'https://assets.mixkit.co/active_storage/sfx/888/888-preview.mp3',
  hintReveal: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  achievement: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  
  // UI sounds
  buttonClick: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  menuOpen: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
  menuClose: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  shuffle: 'https://assets.mixkit.co/active_storage/sfx/146/146-preview.mp3',
  
  // Theme sounds
  themeUnlock: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  
  // Streak sounds
  streak3: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  streak5: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  streak7: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
};

// Haptic patterns
type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'double' | 'triple';

class EnhancedSoundManager {
  private isInitialized = false;
  private soundEnabled = true;
  private hapticEnabled = true;
  private musicEnabled = true;
  private volume = 0.5;
  private letterSelectCount = 0;
  private comboCount = 0;
  private lastWordTime = 0;
  
  // Preloaded sounds cache
  private soundCache: Map<string, Audio.Sound> = new Map();

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      
      this.isInitialized = true;
      console.log('EnhancedSoundManager initialized');
    } catch (error) {
      console.log('Sound initialization error:', error);
      this.isInitialized = true;
    }
  }

  // Settings
  setEnabled(enabled: boolean) { this.soundEnabled = enabled; }
  setHapticEnabled(enabled: boolean) { this.hapticEnabled = enabled; }
  setMusicEnabled(enabled: boolean) { this.musicEnabled = enabled; }
  setVolume(vol: number) { this.volume = Math.max(0, Math.min(1, vol)); }

  // Haptic feedback with patterns
  private async haptic(pattern: HapticPattern = 'light') {
    if (!this.hapticEnabled || Platform.OS === 'web') return;
    
    try {
      switch (pattern) {
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'double':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 100);
          break;
        case 'triple':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 80);
          setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 160);
          break;
        default:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {}
  }

  // Play sound from URL
  private async playSound(url: string, vol: number = 1) {
    if (!this.soundEnabled || Platform.OS === 'web') return;
    
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true, volume: this.volume * vol }
      );
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Sound playback error:', error);
    }
  }

  // ===============================
  // LETTER SELECTION SOUNDS
  // ===============================
  
  async playLetterSelect(letter: string, selectionIndex: number) {
    this.letterSelectCount++;
    
    // Alternate between tap sounds for variety
    const tapSounds = [SOUND_URLS.letterTap1, SOUND_URLS.letterTap2, SOUND_URLS.letterTap3];
    const soundIndex = selectionIndex % tapSounds.length;
    
    // Volume increases slightly with each letter (building anticipation)
    const vol = 0.2 + (selectionIndex * 0.05);
    
    await this.haptic('light');
    await this.playSound(tapSounds[soundIndex], Math.min(vol, 0.5));
  }

  async playLetterDeselect() {
    await this.haptic('light');
    await this.playSound(SOUND_URLS.menuClose, 0.2);
  }

  // ===============================
  // WORD FOUND SOUNDS
  // ===============================
  
  async playWordFound(wordLength: number, isBonus: boolean = false) {
    const now = Date.now();
    
    // Check for combo (words found within 2 seconds)
    if (now - this.lastWordTime < 2000) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastWordTime = now;
    
    // Play appropriate sound based on word length
    let soundUrl: string;
    let hapticPattern: HapticPattern;
    
    if (isBonus) {
      soundUrl = SOUND_URLS.bonusWord;
      hapticPattern = 'triple';
    } else if (wordLength <= 3) {
      soundUrl = SOUND_URLS.word3Letter;
      hapticPattern = 'light';
    } else if (wordLength === 4) {
      soundUrl = SOUND_URLS.word4Letter;
      hapticPattern = 'medium';
    } else if (wordLength === 5) {
      soundUrl = SOUND_URLS.word5Letter;
      hapticPattern = 'double';
    } else {
      soundUrl = SOUND_URLS.word6Plus;
      hapticPattern = 'triple';
    }
    
    // Play word found sound
    await this.haptic(hapticPattern);
    await this.playSound(soundUrl, 0.5 + (wordLength * 0.1));
    
    // Play combo sound if applicable
    if (this.comboCount >= 2) {
      setTimeout(() => this.playCombo(this.comboCount), 200);
    }
    
    this.letterSelectCount = 0;
  }

  // ===============================
  // COMBO SOUNDS
  // ===============================
  
  async playCombo(count: number) {
    if (count < 2) return;
    
    let soundUrl: string;
    
    if (count >= 5) {
      soundUrl = SOUND_URLS.combo5x;
      await this.haptic('triple');
    } else if (count >= 3) {
      soundUrl = SOUND_URLS.combo3x;
      await this.haptic('double');
    } else {
      soundUrl = SOUND_URLS.combo2x;
      await this.haptic('medium');
    }
    
    await this.playSound(soundUrl, 0.4);
  }

  // ===============================
  // WRONG WORD SOUND
  // ===============================
  
  async playWrongWord() {
    this.comboCount = 0;
    await this.haptic('error');
    await this.playSound(SOUND_URLS.wrongWord, 0.4);
  }

  // ===============================
  // LEVEL COMPLETE SOUNDS
  // ===============================
  
  async playLevelComplete(starsEarned: number = 3) {
    await this.haptic('heavy');
    
    if (starsEarned === 3) {
      // Perfect level completion
      await this.playSound(SOUND_URLS.levelCompletePerfect, 0.7);
      setTimeout(() => this.haptic('success'), 200);
      setTimeout(() => this.haptic('success'), 400);
      setTimeout(() => this.haptic('success'), 600);
    } else {
      await this.playSound(SOUND_URLS.levelComplete, 0.6);
      setTimeout(() => this.haptic('success'), 300);
    }
  }

  // ===============================
  // UI SOUNDS
  // ===============================
  
  async playClick() {
    await this.haptic('light');
    await this.playSound(SOUND_URLS.buttonClick, 0.3);
  }

  async playMenuOpen() {
    await this.haptic('light');
    await this.playSound(SOUND_URLS.menuOpen, 0.3);
  }

  async playMenuClose() {
    await this.haptic('light');
    await this.playSound(SOUND_URLS.menuClose, 0.3);
  }

  async playShuffle() {
    await this.haptic('medium');
    await this.playSound(SOUND_URLS.shuffle, 0.4);
    
    // Simulate shuffle ticks
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.haptic('light'), i * 80);
    }
  }

  // ===============================
  // SPIN WHEEL SOUNDS
  // ===============================
  
  async playSpinWheel() {
    await this.playSound(SOUND_URLS.spinWheel, 0.5);
    
    // Simulate wheel ticks that slow down
    const ticks = [100, 150, 200, 280, 400, 550, 750];
    ticks.forEach((delay, i) => {
      setTimeout(() => {
        this.haptic('light');
        if (i < ticks.length - 1) {
          this.playSound(SOUND_URLS.spinWheelTick, 0.2);
        }
      }, delay);
    });
  }

  async playSpinWheelResult() {
    await this.haptic('heavy');
    await this.playSound(SOUND_URLS.coinCollect, 0.6);
  }

  // ===============================
  // REWARD SOUNDS
  // ===============================
  
  async playCoinCollect(amount: number = 1) {
    await this.haptic('light');
    await this.playSound(SOUND_URLS.coinCollect, 0.4);
    
    // Multiple ticks for large coin amounts
    if (amount >= 50) {
      setTimeout(() => this.playSound(SOUND_URLS.coinCollect, 0.3), 100);
      setTimeout(() => this.playSound(SOUND_URLS.coinCollect, 0.2), 200);
    }
  }

  async playHintReveal() {
    await this.haptic('medium');
    await this.playSound(SOUND_URLS.hintReveal, 0.5);
  }

  async playAchievement() {
    await this.haptic('triple');
    await this.playSound(SOUND_URLS.achievement, 0.7);
  }

  async playThemeUnlock() {
    await this.haptic('success');
    await this.playSound(SOUND_URLS.themeUnlock, 0.6);
  }

  // ===============================
  // STREAK SOUNDS
  // ===============================
  
  async playStreak(days: number) {
    if (days >= 7) {
      await this.haptic('triple');
      await this.playSound(SOUND_URLS.streak7, 0.7);
    } else if (days >= 5) {
      await this.haptic('double');
      await this.playSound(SOUND_URLS.streak5, 0.6);
    } else if (days >= 3) {
      await this.haptic('medium');
      await this.playSound(SOUND_URLS.streak3, 0.5);
    }
  }

  // ===============================
  // SPECIAL EFFECTS
  // ===============================
  
  // Word found with particle explosion feel
  async playWordFoundWithEffects(word: string) {
    const length = word.length;
    await this.playWordFound(length);
  }

  // Reset combo counter (when navigating away or after timeout)
  resetCombo() {
    this.comboCount = 0;
    this.lastWordTime = 0;
  }

  // Get current combo count
  getComboCount() {
    return this.comboCount;
  }
}

// Export singleton instance
export const enhancedSoundManager = new EnhancedSoundManager();

// Also export the old soundManager name for backwards compatibility
export const soundManager = {
  initialize: () => enhancedSoundManager.initialize(),
  setEnabled: (enabled: boolean) => enhancedSoundManager.setEnabled(enabled),
  playWordFound: () => enhancedSoundManager.playWordFound(4),
  playBonusWord: () => enhancedSoundManager.playWordFound(4, true),
  playLevelComplete: () => enhancedSoundManager.playLevelComplete(3),
  playWrongWord: () => enhancedSoundManager.playWrongWord(),
  playClick: () => enhancedSoundManager.playClick(),
  playSpinWheel: () => enhancedSoundManager.playSpinWheel(),
  playReward: () => enhancedSoundManager.playCoinCollect(10),
  playLetterSelect: () => enhancedSoundManager.playLetterSelect('A', 0),
};

export default enhancedSoundManager;
