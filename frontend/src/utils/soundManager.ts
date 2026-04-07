// Sound Manager for CrossDial Puzzles
// Handles all game sounds and background music

import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sound types
export type SoundType = 
  | 'tap' 
  | 'select' 
  | 'success' 
  | 'error' 
  | 'bonus' 
  | 'levelComplete' 
  | 'achievement'
  | 'coin'
  | 'hint'
  | 'shuffle';

// Sound URLs (using free sound effects)
const SOUND_URLS: Record<SoundType, string> = {
  tap: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  select: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  bonus: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  levelComplete: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  achievement: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  coin: 'https://assets.mixkit.co/active_storage/sfx/888/888-preview.mp3',
  hint: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
  shuffle: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
};

// Background music URLs
const MUSIC_URLS = {
  relaxing: 'https://assets.mixkit.co/active_storage/sfx/123/123-preview.mp3',
  upbeat: 'https://assets.mixkit.co/active_storage/sfx/124/124-preview.mp3',
};

class SoundManager {
  private sounds: Map<SoundType, Audio.Sound> = new Map();
  private backgroundMusic: Audio.Sound | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private musicVolume: number = 0.3;
  private soundVolume: number = 0.7;
  private initialized: boolean = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Load settings from storage
      const soundSetting = await AsyncStorage.getItem('soundEnabled');
      const musicSetting = await AsyncStorage.getItem('musicEnabled');
      
      this.soundEnabled = soundSetting !== 'false';
      this.musicEnabled = musicSetting !== 'false';
      
      // Configure audio mode
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: false,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      
      this.initialized = true;
      console.log('SoundManager initialized');
    } catch (error) {
      console.log('Error initializing SoundManager:', error);
    }
  }

  async playSound(type: SoundType): Promise<void> {
    if (!this.soundEnabled) return;
    
    try {
      // Create and play sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: SOUND_URLS[type] },
        { shouldPlay: true, volume: this.soundVolume }
      );
      
      // Unload after playing
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log(`Error playing sound ${type}:`, error);
    }
  }

  async playBackgroundMusic(type: 'relaxing' | 'upbeat' = 'relaxing'): Promise<void> {
    if (!this.musicEnabled) return;
    
    try {
      // Stop current music if playing
      await this.stopBackgroundMusic();
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: MUSIC_URLS[type] },
        { shouldPlay: true, isLooping: true, volume: this.musicVolume }
      );
      
      this.backgroundMusic = sound;
    } catch (error) {
      console.log('Error playing background music:', error);
    }
  }

  async stopBackgroundMusic(): Promise<void> {
    try {
      if (this.backgroundMusic) {
        await this.backgroundMusic.stopAsync();
        await this.backgroundMusic.unloadAsync();
        this.backgroundMusic = null;
      }
    } catch (error) {
      console.log('Error stopping background music:', error);
    }
  }

  async setSoundEnabled(enabled: boolean): Promise<void> {
    this.soundEnabled = enabled;
    await AsyncStorage.setItem('soundEnabled', enabled.toString());
  }

  async setMusicEnabled(enabled: boolean): Promise<void> {
    this.musicEnabled = enabled;
    await AsyncStorage.setItem('musicEnabled', enabled.toString());
    
    if (!enabled) {
      await this.stopBackgroundMusic();
    }
  }

  isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  async setMusicVolume(volume: number): Promise<void> {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.backgroundMusic) {
      await this.backgroundMusic.setVolumeAsync(this.musicVolume);
    }
  }

  async setSoundVolume(volume: number): Promise<void> {
    this.soundVolume = Math.max(0, Math.min(1, volume));
  }
}

export const soundManager = new SoundManager();
export default soundManager;
