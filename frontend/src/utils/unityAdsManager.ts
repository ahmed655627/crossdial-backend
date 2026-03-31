import { Platform } from 'react-native';

// ============================================
// UNITY ADS CONFIGURATION
// Get your Game ID from Unity Dashboard:
// https://dashboard.unity3d.com
// ============================================

// Unity Ads Game IDs - REPLACE WITH YOUR IDs
const UNITY_GAME_IDS = {
  android: '5678901', // Replace with your Android Game ID
  ios: '5678902',     // Replace with your iOS Game ID
};

// Unity Ads Placement IDs
const UNITY_PLACEMENTS = {
  REWARDED: 'rewardedVideo',
  INTERSTITIAL: 'interstitial',
  BANNER: 'banner',
};

// Test mode - set to false for production
const TEST_MODE = false;

// Dynamically import Unity Ads
let UnityAds: any = null;

const initUnityAdsModule = async () => {
  if (Platform.OS === 'web') return false;
  
  try {
    const unityModule = await import('react-native-unity-ads');
    UnityAds = unityModule.default;
    return true;
  } catch (error) {
    console.log('Unity Ads module not available:', error);
    return false;
  }
};

class UnityAdsManager {
  private isInitialized: boolean = false;
  private isReady: boolean = false;
  private moduleLoaded: boolean = false;
  private lastAdTime: number = 0;
  private minAdInterval: number = 30000; // 30 seconds

  async initialize(): Promise<boolean> {
    if (this.isInitialized) return this.isReady;
    
    if (Platform.OS === 'web') {
      this.isInitialized = true;
      return false;
    }

    try {
      this.moduleLoaded = await initUnityAdsModule();
      
      if (!this.moduleLoaded || !UnityAds) {
        console.log('Unity Ads module not loaded');
        this.isInitialized = true;
        return false;
      }

      const gameId = Platform.OS === 'ios' 
        ? UNITY_GAME_IDS.ios 
        : UNITY_GAME_IDS.android;

      // Initialize Unity Ads
      await UnityAds.initialize(gameId, TEST_MODE);
      
      console.log('Unity Ads initialized successfully');
      this.isInitialized = true;
      this.isReady = true;
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Unity Ads:', error);
      this.isInitialized = true;
      return false;
    }
  }

  canShowAd(): boolean {
    const now = Date.now();
    return now - this.lastAdTime >= this.minAdInterval;
  }

  markAdShown(): void {
    this.lastAdTime = Date.now();
  }

  // Show rewarded video ad
  async showRewardedAd(): Promise<boolean> {
    if (Platform.OS === 'web') {
      // Simulate on web
      return new Promise((resolve) => {
        console.log('Simulating Unity rewarded ad on web...');
        setTimeout(() => {
          this.markAdShown();
          resolve(true);
        }, 2000);
      });
    }

    if (!this.moduleLoaded || !UnityAds || !this.isReady) {
      console.log('Unity Ads not ready, simulating...');
      this.markAdShown();
      return true;
    }

    return new Promise(async (resolve) => {
      try {
        // Check if ad is ready
        const isReady = await UnityAds.isReady(UNITY_PLACEMENTS.REWARDED);
        
        if (!isReady) {
          console.log('Unity rewarded ad not ready');
          this.markAdShown();
          resolve(true); // Give reward anyway
          return;
        }

        // Show the ad
        const result = await UnityAds.show(UNITY_PLACEMENTS.REWARDED);
        
        if (result === 'COMPLETED' || result === 'FINISHED') {
          console.log('Unity rewarded ad completed');
          this.markAdShown();
          resolve(true);
        } else if (result === 'SKIPPED') {
          console.log('Unity rewarded ad skipped');
          this.markAdShown();
          resolve(false); // No reward for skipped ads
        } else {
          console.log('Unity ad result:', result);
          this.markAdShown();
          resolve(true);
        }
      } catch (error) {
        console.error('Error showing Unity rewarded ad:', error);
        this.markAdShown();
        resolve(true); // Give reward on error
      }
    });
  }

  // Show interstitial ad
  async showInterstitialAd(): Promise<boolean> {
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        console.log('Simulating Unity interstitial on web...');
        setTimeout(() => {
          this.markAdShown();
          resolve(true);
        }, 1500);
      });
    }

    if (!this.moduleLoaded || !UnityAds || !this.isReady) {
      console.log('Unity Ads not ready');
      this.markAdShown();
      return true;
    }

    return new Promise(async (resolve) => {
      try {
        const isReady = await UnityAds.isReady(UNITY_PLACEMENTS.INTERSTITIAL);
        
        if (!isReady) {
          console.log('Unity interstitial not ready');
          this.markAdShown();
          resolve(true);
          return;
        }

        await UnityAds.show(UNITY_PLACEMENTS.INTERSTITIAL);
        this.markAdShown();
        resolve(true);
      } catch (error) {
        console.error('Error showing Unity interstitial:', error);
        this.markAdShown();
        resolve(true);
      }
    });
  }

  // Get placements
  getRewardedPlacement(): string {
    return UNITY_PLACEMENTS.REWARDED;
  }

  getInterstitialPlacement(): string {
    return UNITY_PLACEMENTS.INTERSTITIAL;
  }

  isAdReady(): boolean {
    return this.isReady;
  }
}

export const unityAdsManager = new UnityAdsManager();

// Export config for easy access
export const UNITY_ADS_CONFIG = {
  GAME_IDS: UNITY_GAME_IDS,
  PLACEMENTS: UNITY_PLACEMENTS,
  TEST_MODE,
};
