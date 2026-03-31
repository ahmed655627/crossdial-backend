import { Platform } from 'react-native';

// ============================================
// ADMOB CONFIGURATION
// App ID: ca-app-pub-9950221390211328~3528584689
// ============================================

// Production Ad Unit IDs - YOUR REAL ADS
const PRODUCTION_AD_IDS = {
  REWARDED: 'ca-app-pub-9950221390211328/2786348652',
  INTERSTITIAL: 'ca-app-pub-9950221390211328/2786348652', // Add your interstitial ID
  BANNER: 'ca-app-pub-9950221390211328/2786348652', // Add your banner ID
};

// Test Ad IDs (for development only)
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

// Always use production IDs for real ads
const IS_PRODUCTION = true; // Force production ads

export const AD_UNIT_IDS = {
  BANNER: IS_PRODUCTION ? PRODUCTION_AD_IDS.BANNER : TEST_AD_IDS.BANNER,
  INTERSTITIAL: IS_PRODUCTION ? PRODUCTION_AD_IDS.INTERSTITIAL : TEST_AD_IDS.INTERSTITIAL,
  REWARDED: IS_PRODUCTION ? PRODUCTION_AD_IDS.REWARDED : TEST_AD_IDS.REWARDED,
};

// COPPA Configuration for child-directed content
export const AD_CONFIG = {
  tagForChildDirectedTreatment: true,
  tagForUnderAgeOfConsent: true,
  maxAdContentRating: 'G',
};

// Dynamically import react-native-google-mobile-ads
let MobileAds: any = null;
let RewardedAd: any = null;
let InterstitialAd: any = null;
let AdEventType: any = null;
let RewardedAdEventType: any = null;

// Initialize ads module
const initAdsModule = async () => {
  if (Platform.OS === 'web') return false;
  
  try {
    const adsModule = await import('react-native-google-mobile-ads');
    MobileAds = adsModule.default;
    RewardedAd = adsModule.RewardedAd;
    InterstitialAd = adsModule.InterstitialAd;
    AdEventType = adsModule.AdEventType;
    RewardedAdEventType = adsModule.RewardedAdEventType;
    return true;
  } catch (error) {
    console.log('Ads module not available:', error);
    return false;
  }
};

// Ad manager for controlling ad display
class AdManager {
  private lastAdTime: number = 0;
  private minAdInterval: number = 30000; // 30 seconds minimum between ads
  private isInitialized: boolean = false;
  private consentGiven: boolean = true; // Default to true for mandatory ads
  private adsModuleLoaded: boolean = false;
  private rewardedAd: any = null;
  private interstitialAd: any = null;
  
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      if (Platform.OS !== 'web') {
        // Load ads module
        this.adsModuleLoaded = await initAdsModule();
        
        if (this.adsModuleLoaded && MobileAds) {
          // Initialize MobileAds SDK
          await MobileAds().initialize();
          console.log('AdMob SDK initialized successfully');
          
          // Pre-load ads
          await this.loadRewardedAd();
          await this.loadInterstitialAd();
        }
      }
      this.isInitialized = true;
      console.log('AdManager initialized');
    } catch (error) {
      console.error('Failed to initialize AdManager:', error);
      this.isInitialized = true; // Continue anyway
    }
  }
  
  private async loadRewardedAd(): Promise<void> {
    if (!this.adsModuleLoaded || !RewardedAd) return;
    
    try {
      this.rewardedAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['game', 'puzzle', 'word'],
      });
      
      this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        console.log('Rewarded ad loaded');
      });
      
      this.rewardedAd.addAdEventListener(AdEventType.ERROR, (error: any) => {
        console.log('Rewarded ad error:', error);
      });
      
      await this.rewardedAd.load();
    } catch (error) {
      console.log('Failed to load rewarded ad:', error);
    }
  }
  
  private async loadInterstitialAd(): Promise<void> {
    if (!this.adsModuleLoaded || !InterstitialAd) return;
    
    try {
      this.interstitialAd = InterstitialAd.createForAdRequest(AD_UNIT_IDS.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['game', 'puzzle', 'word'],
      });
      
      this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log('Interstitial ad loaded');
      });
      
      this.interstitialAd.addAdEventListener(AdEventType.ERROR, (error: any) => {
        console.log('Interstitial ad error:', error);
      });
      
      await this.interstitialAd.load();
    } catch (error) {
      console.log('Failed to load interstitial ad:', error);
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
  
  // Show rewarded ad and wait for completion
  async showRewardedAd(): Promise<boolean> {
    // On web, simulate the ad
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        console.log('Simulating ad on web...');
        setTimeout(() => {
          this.markAdShown();
          resolve(true);
        }, 2000);
      });
    }
    
    if (!this.adsModuleLoaded || !this.rewardedAd) {
      console.log('Ads not loaded, simulating...');
      this.markAdShown();
      return true;
    }
    
    return new Promise(async (resolve) => {
      try {
        // Add reward listener
        const rewardListener = this.rewardedAd.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          () => {
            console.log('User earned reward');
            this.markAdShown();
            resolve(true);
          }
        );
        
        // Add close listener
        const closeListener = this.rewardedAd.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            console.log('Rewarded ad closed');
            rewardListener();
            closeListener();
            // Reload ad for next time
            this.loadRewardedAd();
          }
        );
        
        // Show the ad
        await this.rewardedAd.show();
      } catch (error) {
        console.log('Error showing rewarded ad:', error);
        this.markAdShown();
        resolve(true); // Give reward anyway on error
        // Try to reload ad
        this.loadRewardedAd();
      }
    });
  }
  
  // Show interstitial ad
  async showInterstitialAd(): Promise<boolean> {
    // On web, simulate the ad
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        console.log('Simulating interstitial on web...');
        setTimeout(() => {
          this.markAdShown();
          resolve(true);
        }, 1500);
      });
    }
    
    if (!this.adsModuleLoaded || !this.interstitialAd) {
      console.log('Interstitial not loaded, simulating...');
      this.markAdShown();
      return true;
    }
    
    return new Promise(async (resolve) => {
      try {
        // Add close listener
        const closeListener = this.interstitialAd.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            console.log('Interstitial ad closed');
            this.markAdShown();
            closeListener();
            resolve(true);
            // Reload ad for next time
            this.loadInterstitialAd();
          }
        );
        
        // Show the ad
        await this.interstitialAd.show();
      } catch (error) {
        console.log('Error showing interstitial ad:', error);
        this.markAdShown();
        resolve(true);
        // Try to reload ad
        this.loadInterstitialAd();
      }
    });
  }
  
  // Get current ad unit ID for rewarded ads
  getRewardedAdUnitId(): string {
    return AD_UNIT_IDS.REWARDED;
  }
  
  getInterstitialAdUnitId(): string {
    return AD_UNIT_IDS.INTERSTITIAL;
  }
}

export const adManager = new AdManager();
