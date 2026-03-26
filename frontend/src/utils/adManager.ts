import { Platform } from 'react-native';

// AdMob Test IDs
const TEST_AD_IDS = {
  BANNER: Platform.select({
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
    default: 'ca-app-pub-3940256099942544/6300978111',
  }),
  INTERSTITIAL: Platform.select({
    ios: 'ca-app-pub-3940256099942544/4411468910',
    android: 'ca-app-pub-3940256099942544/1033173712',
    default: 'ca-app-pub-3940256099942544/1033173712',
  }),
  REWARDED: Platform.select({
    ios: 'ca-app-pub-3940256099942544/1712485313',
    android: 'ca-app-pub-3940256099942544/5224354917',
    default: 'ca-app-pub-3940256099942544/5224354917',
  }),
};

export const AD_UNIT_IDS = TEST_AD_IDS;

// Ad manager for controlling ad display
class AdManager {
  private lastAdTime: number = 0;
  private minAdInterval: number = 30000; // 30 seconds minimum between ads
  
  canShowAd(): boolean {
    const now = Date.now();
    return now - this.lastAdTime >= this.minAdInterval;
  }
  
  markAdShown(): void {
    this.lastAdTime = Date.now();
  }
  
  // Simulate ad watching for web (actual ads work on mobile)
  async showRewardedAd(): Promise<boolean> {
    // On web, we'll simulate the ad
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1500); // Simulate 1.5s ad
      });
    }
    return true;
  }
  
  async showInterstitialAd(): Promise<boolean> {
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000); // Simulate 1s ad
      });
    }
    return true;
  }
}

export const adManager = new AdManager();
