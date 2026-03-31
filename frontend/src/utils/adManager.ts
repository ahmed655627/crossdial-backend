import { Platform } from 'react-native';

// ============================================
// AD MANAGER - Google AdMob Only
// Unity Ads removed due to Gradle compatibility issues
// ============================================

// AdMob Configuration - Your Real IDs
const ADMOB_IDS = {
  REWARDED: 'ca-app-pub-9950221390211328/2786348652',
  INTERSTITIAL: 'ca-app-pub-9950221390211328/8095491367',  // Rewarded Interstitial
  BANNER: 'ca-app-pub-9950221390211328/2786348652',
};

// Test Ad IDs for development
const TEST_AD_IDS = {
  REWARDED: Platform.select({
    ios: 'ca-app-pub-3940256099942544/1712485313',
    android: 'ca-app-pub-3940256099942544/5224354917',
    default: 'ca-app-pub-3940256099942544/5224354917',
  }),
  INTERSTITIAL: Platform.select({
    ios: 'ca-app-pub-3940256099942544/4411468910',
    android: 'ca-app-pub-3940256099942544/1033173712',
    default: 'ca-app-pub-3940256099942544/1033173712',
  }),
};

// Use production IDs
const IS_PRODUCTION = true;

export const AD_UNIT_IDS = {
  REWARDED: IS_PRODUCTION ? ADMOB_IDS.REWARDED : TEST_AD_IDS.REWARDED,
  INTERSTITIAL: IS_PRODUCTION ? ADMOB_IDS.INTERSTITIAL : TEST_AD_IDS.INTERSTITIAL,
};

// COPPA Configuration
export const AD_CONFIG = {
  tagForChildDirectedTreatment: true,
  tagForUnderAgeOfConsent: true,
  maxAdContentRating: 'G',
};

// Dynamically import AdMob
let MobileAds: any = null;
let RewardedAd: any = null;
let InterstitialAd: any = null;
let AdEventType: any = null;
let RewardedAdEventType: any = null;

const initAdMobModule = async () => {
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
    console.log('AdMob module not available:', error);
    return false;
  }
};

class AdManager {
  private isInitialized: boolean = false;
  private admobReady: boolean = false;
  private admobModuleLoaded: boolean = false;
  private rewardedAd: any = null;
  private interstitialAd: any = null;
  private lastAdTime: number = 0;
  private minAdInterval: number = 30000; // 30 seconds

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('Initializing Ad Manager (AdMob only)...');

    try {
      if (Platform.OS !== 'web') {
        this.admobModuleLoaded = await initAdMobModule();
        
        if (this.admobModuleLoaded && MobileAds) {
          await MobileAds().initialize();
          await this.loadAds();
          this.admobReady = true;
          console.log('AdMob initialized successfully');
        }
      }

      this.isInitialized = true;
      console.log('Ad Manager initialized - AdMob ready:', this.admobReady);
    } catch (error) {
      console.error('Ad Manager initialization error:', error);
      this.isInitialized = true;
    }
  }

  private async loadAds(): Promise<void> {
    if (!this.admobModuleLoaded || !RewardedAd) return;

    try {
      // Load Rewarded Ad
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

      // Load Interstitial Ad
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
      console.log('Failed to load ads:', error);
    }
  }

  canShowAd(): boolean {
    const now = Date.now();
    return now - this.lastAdTime >= this.minAdInterval;
  }

  markAdShown(): void {
    this.lastAdTime = Date.now();
  }

  // Show rewarded ad
  async showRewardedAd(): Promise<boolean> {
    // On web, simulate
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        console.log('Simulating ad on web...');
        setTimeout(() => {
          this.markAdShown();
          resolve(true);
        }, 2000);
      });
    }

    // Use AdMob
    if (this.admobReady && this.rewardedAd) {
      return new Promise(async (resolve) => {
        try {
          const rewardListener = this.rewardedAd.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            () => {
              this.markAdShown();
              resolve(true);
            }
          );

          const closeListener = this.rewardedAd.addAdEventListener(
            AdEventType.CLOSED,
            () => {
              rewardListener();
              closeListener();
              this.loadAds(); // Reload for next time
            }
          );

          await this.rewardedAd.show();
        } catch (error) {
          console.log('Rewarded ad error:', error);
          this.markAdShown();
          resolve(true); // Give reward anyway on error
          this.loadAds();
        }
      });
    }

    // No ads available, give reward anyway
    console.log('No ads available, giving reward');
    this.markAdShown();
    return true;
  }

  // Show interstitial ad
  async showInterstitialAd(): Promise<boolean> {
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.markAdShown();
          resolve(true);
        }, 1500);
      });
    }

    if (this.admobReady && this.interstitialAd) {
      return new Promise(async (resolve) => {
        try {
          const closeListener = this.interstitialAd.addAdEventListener(
            AdEventType.CLOSED,
            () => {
              this.markAdShown();
              closeListener();
              resolve(true);
              this.loadAds();
            }
          );

          await this.interstitialAd.show();
        } catch (error) {
          console.log('Interstitial error:', error);
          this.markAdShown();
          resolve(true);
          this.loadAds();
        }
      });
    }

    this.markAdShown();
    return true;
  }

  // For consent
  setConsentGiven(consent: boolean): void {
    // AdMob respects this
  }

  hasConsent(): boolean {
    return true; // Mandatory ads
  }

  // Check if ads are ready
  isReady(): boolean {
    return this.admobReady;
  }
}

export const adManager = new AdManager();
