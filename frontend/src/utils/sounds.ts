import { Audio } from 'expo-av';
import { Platform } from 'react-native';

// Sound effects manager
class SoundManager {
  private sounds: { [key: string]: Audio.Sound | null } = {};
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      this.isInitialized = true;
    } catch (error) {
      console.log('Audio initialization error:', error);
    }
  }

  // Play a simple beep/tone for word found
  async playWordFound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3' },
        { shouldPlay: true, volume: 0.5 }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Play word found error:', error);
    }
  }

  // Play bonus word sound
  async playBonusWord() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3' },
        { shouldPlay: true, volume: 0.5 }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Play bonus word error:', error);
    }
  }

  // Play level complete fanfare
  async playLevelComplete() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3' },
        { shouldPlay: true, volume: 0.6 }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Play level complete error:', error);
    }
  }

  // Play wrong word sound
  async playWrongWord() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3' },
        { shouldPlay: true, volume: 0.3 }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Play wrong word error:', error);
    }
  }

  // Play button click
  async playClick() {
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
    } catch (error) {
      console.log('Play click error:', error);
    }
  }

  // Play spin wheel
  async playSpinWheel() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://assets.mixkit.co/active_storage/sfx/146/146-preview.mp3' },
        { shouldPlay: true, volume: 0.4 }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Play spin wheel error:', error);
    }
  }

  // Play reward
  async playReward() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3' },
        { shouldPlay: true, volume: 0.5 }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Play reward error:', error);
    }
  }
}

export const soundManager = new SoundManager();
