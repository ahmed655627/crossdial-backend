import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

// Sound effects manager with real audio
class SoundManager {
  private isInitialized = false;
  private soundEnabled = true;
  private ambientSound: Audio.Sound | null = null;
  private ambientEnabled = false;
  private sounds: { [key: string]: Audio.Sound | null } = {
    click: null,
    wordFound: null,
    bonusWord: null,
    levelComplete: null,
    wrongWord: null,
    spin: null,
    reward: null,
    letterTick: null,
    wordChime: null,
  };

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Set audio mode for game sounds
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      
      this.isInitialized = true;
      console.log('SoundManager initialized');
    } catch (error) {
      console.log('Sound initialization error:', error);
      this.isInitialized = true; // Continue without sounds
    }
  }

  setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  // Generate a simple tone using oscillator-like approach
  private async playTone(frequency: number, duration: number, volume: number = 0.5) {
    if (!this.soundEnabled || Platform.OS === 'web') {
      // Fallback to haptics on web or when sound disabled
      await this.provideHapticFeedback('light');
      return;
    }

    try {
      // Use a generated sound URI or bundled asset
      // Since we can't generate tones directly, we'll use haptics + visual feedback
      await this.provideHapticFeedback('light');
    } catch (error) {
      console.log('Tone playback error:', error);
    }
  }

  // Provide haptic feedback
  private async provideHapticFeedback(style: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light') {
    if (!this.soundEnabled) return;
    
    try {
      if (Platform.OS === 'web') return;
      
      switch (style) {
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
        default:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      // Haptics not available
    }
  }

  // Play word found sound - happy chime
  async playWordFound() {
    await this.provideHapticFeedback('success');
    if (Platform.OS !== 'web') {
      // Play success notification sound
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
          { shouldPlay: true, volume: 0.5 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Could not play word found sound');
      }
    }
  }

  // Play bonus word sound - double chime
  async playBonusWord() {
    await this.provideHapticFeedback('success');
    if (Platform.OS !== 'web') {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3' },
          { shouldPlay: true, volume: 0.6 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Could not play bonus word sound');
      }
    }
    setTimeout(() => this.provideHapticFeedback('success'), 100);
  }

  // Play level complete fanfare
  async playLevelComplete() {
    await this.provideHapticFeedback('heavy');
    if (Platform.OS !== 'web') {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3' },
          { shouldPlay: true, volume: 0.7 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Could not play level complete sound');
      }
    }
    setTimeout(() => this.provideHapticFeedback('success'), 200);
    setTimeout(() => this.provideHapticFeedback('success'), 400);
  }

  // Play wrong word sound - error buzz
  async playWrongWord() {
    await this.provideHapticFeedback('error');
    if (Platform.OS !== 'web') {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3' },
          { shouldPlay: true, volume: 0.4 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Could not play wrong word sound');
      }
    }
  }

  // Play button click
  async playClick() {
    await this.provideHapticFeedback('light');
    if (Platform.OS !== 'web') {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' },
          { shouldPlay: true, volume: 0.3 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        // Silent fail for click
      }
    }
  }

  // Play spin wheel
  async playSpinWheel() {
    if (Platform.OS !== 'web') {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/146/146-preview.mp3' },
          { shouldPlay: true, volume: 0.5 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Could not play spin sound');
      }
    }
    // Multiple light taps to simulate spinning
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.provideHapticFeedback('light'), i * 100);
    }
  }

  // Play reward
  async playReward() {
    await this.provideHapticFeedback('success');
    if (Platform.OS !== 'web') {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3' },
          { shouldPlay: true, volume: 0.6 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Could not play reward sound');
      }
    }
  }

  // Play letter select sound - soft tick when letters connect
  async playLetterSelect() {
    await this.provideHapticFeedback('light');
    if (Platform.OS !== 'web') {
      try {
        // Soft tick sound for letter selection
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' },
          { shouldPlay: true, volume: 0.15 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        // Silent fail
      }
    }
  }

  // Play letter tick - even softer tick for each letter
  async playLetterTick() {
    if (!this.soundEnabled) return;
    await this.provideHapticFeedback('light');
    // On native, play a very soft tick
    if (Platform.OS !== 'web') {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' },
          { shouldPlay: true, volume: 0.1 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        // Silent fail for tick
      }
    }
  }

  // Play word chime - pleasant chime when word is completed
  async playWordChime() {
    if (!this.soundEnabled) return;
    await this.provideHapticFeedback('success');
    if (Platform.OS !== 'web') {
      try {
        // Pleasant chime for word completion
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
          { shouldPlay: true, volume: 0.4 }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Could not play word chime');
      }
    }
  }

  // Play combo chime - ascending chime for combos
  async playComboChime(comboLevel: number = 1) {
    if (!this.soundEnabled) return;
    await this.provideHapticFeedback('medium');
    if (Platform.OS !== 'web') {
      try {
        // Higher pitch for higher combos
        const volume = Math.min(0.3 + (comboLevel * 0.1), 0.7);
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3' },
          { shouldPlay: true, volume }
        );
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Could not play combo chime');
      }
    }
  }

  // Toggle ambient sound (mountain wind loop)
  async toggleAmbient(enabled: boolean) {
    this.ambientEnabled = enabled;
    
    if (Platform.OS === 'web') return;
    
    if (enabled && !this.ambientSound) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'https://assets.mixkit.co/active_storage/sfx/147/147-preview.mp3' },
          { shouldPlay: true, isLooping: true, volume: 0.1 }
        );
        this.ambientSound = sound;
      } catch (e) {
        console.log('Could not start ambient sound');
      }
    } else if (!enabled && this.ambientSound) {
      try {
        await this.ambientSound.stopAsync();
        await this.ambientSound.unloadAsync();
        this.ambientSound = null;
      } catch (e) {
        // Silent fail
      }
    }
  }

  // Check if ambient is enabled
  isAmbientEnabled(): boolean {
    return this.ambientEnabled;
  }
}

export const soundManager = new SoundManager();
