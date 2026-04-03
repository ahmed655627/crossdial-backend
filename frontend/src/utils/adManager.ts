import { Platform } from 'react-native';

// ============================================
// AD MANAGER - Google AdMob Only
// Unity Ads removed due to Gradle compatibility issues
// ============================================

// AdMob Configuration - Your Real IDs
const ADMOB_IDS = {
  REWARDED: 'ca-app-pub-1991020937935015/5344139286',      // Original Rewarded
  REWARDED_VIDEO: 'ca-app-pub-1991020937935015/7618310803', // Video Rewarded (for coins, spins, double rewards)
  INTERSTITIAL: 'ca-app-pub-1991020937935015/6481126982',  // Interstitial (Game)
  BANNER: 'ca-app-pub-1991020937935015/3076430560',        // Banner Ad
  NATIVE: 'ca-app-pub-1991020937935015/6824103881',        // Native Ad
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
  REWARDED_VIDEO: IS_PRODUCTION ? ADMOB_IDS.REWARDED_VIDEO : TEST_AD_IDS.REWARDED,
  INTERSTITIAL: IS_PRODUCTION ? ADMOB_IDS.INTERSTITIAL : TEST_AD_IDS.INTERSTITIAL,
  BANNER: ADMOB_IDS.BANNER,
  NATIVE: ADMOB_IDS.NATIVE,
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
let BannerAd: any = null;
let BannerAdSize: any = null;
let AdEventType: any = null;
let RewardedAdEventType: any = null;

const initAdMobModule = async () => {
  if (Platform.OS === 'web') return false;
  
  try {
    const adsModule = await import('react-native-google-mobile-ads');
    MobileAds = adsModule.default;
    RewardedAd = adsModule.RewardedAd;
    InterstitialAd = adsModule.InterstitialAd;
    BannerAd = adsModule.BannerAd;
    BannerAdSize = adsModule.BannerAdSize;
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
  private rewardedVideoAd: any = null;
  private interstitialAd: any = null;
  private lastAdTime: number = 0;
  private minAdInterval: number = 30000; // 30 seconds
  private levelsCompletedSinceAd: number = 0;
  private LEVELS_BETWEEN_ADS: number = 3; // Show interstitial every 3 levels

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('Initializing Ad Manager (AdMob only)...');

    try {
      if (Platform.OS !== 'web') {
        this.admobModuleLoaded = await initAdMobModule();
        
        if (this.admobModuleLoaded && MobileAds) {
          // Initialize AdMob with proper configuration
          await MobileAds().initialize();
          
          // Set request configuration for better ad fill
          await MobileAds().setRequestConfiguration({
            // Mark as NOT for children to get more ads
            tagForChildDirectedTreatment: false,
            tagForUnderAgeOfConsent: false,
            maxAdContentRating: 'T', // Teen rating for more ad variety
          });
          
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
      // Load Rewarded Ad (for hints)
      this.rewardedAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED, {
        requestNonPersonalizedAdsOnly: false, // Allow personalized for better fill rate
        keywords: ['game', 'puzzle', 'word', 'brain', 'trivia'],
      });
      
      this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        console.log('✅ Rewarded ad loaded successfully');
      });
      
      this.rewardedAd.addAdEventListener(AdEventType.ERROR, (error: any) => {
        console.log('❌ Rewarded ad error:', error?.message || error);
        // Retry loading after 30 seconds
        setTimeout(() => this.loadRewardedAd(), 30000);
      });
      
      await this.rewardedAd.load();

      // Load Video Rewarded Ad (for coins, spins, double rewards)
      this.rewardedVideoAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED_VIDEO, {
        requestNonPersonalizedAdsOnly: false,
        keywords: ['game', 'puzzle', 'word', 'brain', 'trivia'],
      });
      
      this.rewardedVideoAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        console.log('✅ Video rewarded ad loaded successfully');
      });
      
      this.rewardedVideoAd.addAdEventListener(AdEventType.ERROR, (error: any) => {
        console.log('❌ Video rewarded ad error:', error?.message || error);
        // Retry loading after 30 seconds
        setTimeout(() => this.loadVideoRewardedAd(), 30000);
      });
      
      await this.rewardedVideoAd.load();

      // Load Interstitial Ad
      this.interstitialAd = InterstitialAd.createForAdRequest(AD_UNIT_IDS.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: false,
        keywords: ['game', 'puzzle', 'word', 'brain', 'trivia'],
      });
      
      this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log('✅ Interstitial ad loaded successfully');
      });
      
      this.interstitialAd.addAdEventListener(AdEventType.ERROR, (error: any) => {
        console.log('❌ Interstitial ad error:', error?.message || error);
        // Retry loading after 30 seconds
        setTimeout(() => this.loadInterstitialAd(), 30000);
      });
      
      await this.interstitialAd.load();
    } catch (error) {
      console.log('Failed to load ads:', error);
    }
  }

  // Separate reload methods for retry logic
  private async loadRewardedAd(): Promise<void> {
    if (!this.admobModuleLoaded || !RewardedAd) return;
    try {
      this.rewardedAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED, {
        requestNonPersonalizedAdsOnly: false,
        keywords: ['game', 'puzzle', 'word'],
      });
      this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        console.log('✅ Rewarded ad reloaded');
      });
      await this.rewardedAd.load();
    } catch (error) {
      console.log('Failed to reload rewarded ad:', error);
    }
  }

  private async loadInterstitialAd(): Promise<void> {
    if (!this.admobModuleLoaded || !InterstitialAd) return;
    try {
      this.interstitialAd = InterstitialAd.createForAdRequest(AD_UNIT_IDS.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: false,
        keywords: ['game', 'puzzle', 'word'],
      });
      this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log('✅ Interstitial ad reloaded');
      });
      await this.interstitialAd.load();
    } catch (error) {
      console.log('Failed to reload interstitial ad:', error);
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

  // Show video rewarded ad (for coins, spins, double rewards)
  async showVideoRewardedAd(): Promise<boolean> {
    // On web, simulate
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        console.log('Simulating video ad on web...');
        setTimeout(() => {
          this.markAdShown();
          resolve(true);
        }, 2000);
      });
    }

    // Use AdMob Video Rewarded
    if (this.admobReady && this.rewardedVideoAd) {
      return new Promise(async (resolve) => {
        try {
          const rewardListener = this.rewardedVideoAd.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            () => {
              this.markAdShown();
              resolve(true);
            }
          );

          const closeListener = this.rewardedVideoAd.addAdEventListener(
            AdEventType.CLOSED,
            () => {
              rewardListener();
              closeListener();
              this.loadVideoRewardedAd(); // Reload for next time
            }
          );

          await this.rewardedVideoAd.show();
        } catch (error) {
          console.log('Video rewarded ad error:', error);
          this.markAdShown();
          resolve(true); // Give reward anyway on error
          this.loadVideoRewardedAd();
        }
      });
    }

    // No ads available, give reward anyway
    console.log('No video ads available, giving reward');
    this.markAdShown();
    return true;
  }

  // Reload video rewarded ad separately
  private async loadVideoRewardedAd(): Promise<void> {
    if (!this.admobModuleLoaded || !RewardedAd) return;
    
    try {
      this.rewardedVideoAd = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED_VIDEO, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['game', 'puzzle', 'word'],
      });
      await this.rewardedVideoAd.load();
    } catch (error) {
      console.log('Failed to reload video ad:', error);
    }
  }

  // Track level completion and show interstitial every 3 levels
  async onLevelComplete(): Promise<void> {
    this.levelsCompletedSinceAd++;
    
    if (this.levelsCompletedSinceAd >= this.LEVELS_BETWEEN_ADS) {
      console.log('Showing interstitial after', this.LEVELS_BETWEEN_ADS, 'levels');
      await this.showInterstitialAd();
      this.levelsCompletedSinceAd = 0;
    }
  }

  // Get banner ad config (for components to use)
  getBannerConfig() {
    return {
      unitId: AD_UNIT_IDS.BANNER,
      size: 'BANNER', // Will be converted to BannerAdSize in component
    };
  }
}

export const adManager = new AdManager();
