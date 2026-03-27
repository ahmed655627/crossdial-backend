import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Sound effects manager - using haptics as fallback for reliable feedback
class SoundManager {
  private isInitialized = false;
  private soundEnabled = true;

  async initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
  }

  setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  // Provide haptic feedback as a reliable cross-platform alternative
  private async provideHapticFeedback(style: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light') {
    if (!this.soundEnabled) return;
    
    try {
      if (Platform.OS === 'web') return; // No haptics on web
      
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
      // Haptics not available, silently fail
    }
  }

  // Play a simple beep/tone for word found
  async playWordFound() {
    await this.provideHapticFeedback('success');
  }

  // Play bonus word sound
  async playBonusWord() {
    await this.provideHapticFeedback('success');
    // Double tap for bonus
    setTimeout(() => this.provideHapticFeedback('success'), 100);
  }

  // Play level complete fanfare
  async playLevelComplete() {
    await this.provideHapticFeedback('heavy');
    setTimeout(() => this.provideHapticFeedback('success'), 200);
    setTimeout(() => this.provideHapticFeedback('success'), 400);
  }

  // Play wrong word sound
  async playWrongWord() {
    await this.provideHapticFeedback('error');
  }

  // Play button click
  async playClick() {
    await this.provideHapticFeedback('light');
  }

  // Play spin wheel
  async playSpinWheel() {
    // Multiple light taps to simulate spinning
    for (let i = 0; i < 5; i++) {
      setTimeout(() => this.provideHapticFeedback('light'), i * 100);
    }
  }

  // Play reward
  async playReward() {
    await this.provideHapticFeedback('success');
  }
}

export const soundManager = new SoundManager();
