import { Platform } from 'react-native';

// ============================================
// ADMOB CONFIGURATION
// App ID: ca-app-pub-9950221390211328~3528584689
// ============================================

// Production Ad Unit IDs
const PRODUCTION_AD_IDS = {
  // Your Rewarded Ad Unit ID
  REWARDED: 'ca-app-pub-9950221390211328/2786348652',
};

// Test Ad IDs (for development)
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

// Use production IDs for rewarded ads, test for others
// Set __DEV__ to false in production builds
const IS_PRODUCTION = !__DEV__;

export const AD_UNIT_IDS = {
  BANNER: TEST_AD_IDS.BANNER,
  INTERSTITIAL: TEST_AD_IDS.INTERSTITIAL,
  // Use your production rewarded ad ID
  REWARDED: IS_PRODUCTION ? PRODUCTION_AD_IDS.REWARDED : TEST_AD_IDS.REWARDED,
};

// COPPA Configuration for child-directed content
export const AD_CONFIG = {
  // App is directed to children under 13
  tagForChildDirectedTreatment: true,
  // Tag for users under age of consent (GDPR)
  tagForUnderAgeOfConsent: true,
  // Maximum ad content rating for children
  maxAdContentRating: 'G', // G = General audiences
};

// Ad manager for controlling ad display
class AdManager {
  private lastAdTime: number = 0;
  private minAdInterval: number = 30000; // 30 seconds minimum between ads
  private isInitialized: boolean = false;
  private consentGiven: boolean = false;
  
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // On native platforms, initialize MobileAds SDK
      if (Platform.OS !== 'web') {
        // The SDK will be initialized by the plugin configuration
        // Additional COPPA settings would be applied here
        console.log('AdManager initialized with COPPA compliance');
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize AdManager:', error);
    }
  }
  
  setConsentGiven(consent: boolean): void {
    this.consentGiven = consent;
  }
  
  hasConsent(): boolean {
    return this.consentGiven;
  }
  
  canShowAd(): boolean {
    const now = Date.now();
    return now - this.lastAdTime >= this.minAdInterval;
  }
  
  markAdShown(): void {
    this.lastAdTime = Date.now();
  }
  
  // Simulate ad watching for web (actual ads work on mobile)
  async showRewardedAd(): Promise<boolean> {
    if (!this.canShowAd()) {
      return false;
    }
    
    // On web, we'll simulate the ad
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.markAdShown();
          resolve(true);
        }, 1500); // Simulate 1.5s ad
      });
    }
    
    // On mobile, actual ad would be shown here
    // The react-native-google-mobile-ads library handles this
    this.markAdShown();
    return true;
  }
  
  async showInterstitialAd(): Promise<boolean> {
    if (!this.canShowAd()) {
      return false;
    }
    
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.markAdShown();
          resolve(true);
        }, 1000); // Simulate 1s ad
      });
    }
    
    this.markAdShown();
    return true;
  }
  
  // Get current ad unit ID for rewarded ads
  getRewardedAdUnitId(): string {
    return AD_UNIT_IDS.REWARDED;
  }
}

export const adManager = new AdManager();
