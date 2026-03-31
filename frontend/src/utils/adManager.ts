import { Platform } from 'react-native';
import { unityAdsManager, UNITY_ADS_CONFIG } from './unityAdsManager';

// ============================================
// AD MANAGER - Supports Unity Ads + AdMob
// Priority: Unity Ads first, AdMob as fallback
// ============================================

// AdMob Configuration (fallback)
const ADMOB_IDS = {
  REWARDED: 'ca-app-pub-9950221390211328/2786348652',
  INTERSTITIAL: 'ca-app-pub-9950221390211328/2786348652',
};

// Test Ad IDs for AdMob
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

// COPPA Configuration
export const AD_CONFIG = {
  tagForChildDirectedTreatment: true,
  tagForUnderAgeOfConsent: true,
  maxAdContentRating: 'G',
};

// Ad network preference
type AdNetwork = 'unity' | 'admob';

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
  private unityReady: boolean = false;
  private admobReady: boolean = false;
  private admobModuleLoaded: boolean = false;
  private rewardedAd: any = null;
  private interstitialAd: any = null;
  private lastAdTime: number = 0;
  private minAdInterval: number = 30000;
  private preferredNetwork: AdNetwork = 'unity'; // Unity Ads first

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('Initializing Ad Manager...');

    try {
      // Initialize Unity Ads first (preferred)
      this.unityReady = await unityAdsManager.initialize();
      console.log('Unity Ads ready:', this.unityReady);

      // Initialize AdMob as fallback
      if (Platform.OS !== 'web') {
        this.admobModuleLoaded = await initAdMobModule();
        
        if (this.admobModuleLoaded && MobileAds) {
          await MobileAds().initialize();
          await this.loadAdMobAds();
          this.admobReady = true;
          console.log('AdMob ready:', this.admobReady);
        }
      }

      this.isInitialized = true;
      console.log('Ad Manager initialized - Unity:', this.unityReady, 'AdMob:', this.admobReady);
    } catch (error) {
      console.error('Ad Manager initialization error:', error);
      this.isInitialized = true;
    }
  }

  private async loadAdMobAds(): Promise<void> {
    if (!this.admobModuleLoaded || !RewardedAd) return;

    try {
      // Load Rewarded Ad
      this.rewardedAd = RewardedAd.createForAdRequest(ADMOB_IDS.REWARDED, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['game', 'puzzle', 'word'],
      });
      
      this.rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
        console.log('AdMob rewarded ad loaded');
      });
      
      await this.rewardedAd.load();

      // Load Interstitial Ad
      this.interstitialAd = InterstitialAd.createForAdRequest(ADMOB_IDS.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['game', 'puzzle', 'word'],
      });
      
      this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log('AdMob interstitial ad loaded');
      });
      
      await this.interstitialAd.load();
    } catch (error) {
      console.log('Failed to load AdMob ads:', error);
    }
  }

  canShowAd(): boolean {
    const now = Date.now();
    return now - this.lastAdTime >= this.minAdInterval;
  }

  markAdShown(): void {
    this.lastAdTime = Date.now();
  }

  // Show rewarded ad - tries Unity first, then AdMob
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

    // Try Unity Ads first
    if (this.unityReady) {
      try {
        const result = await unityAdsManager.showRewardedAd();
        if (result) {
          this.markAdShown();
          return true;
        }
      } catch (error) {
        console.log('Unity Ad failed, trying AdMob:', error);
      }
    }

    // Fallback to AdMob
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
              this.loadAdMobAds(); // Reload for next time
            }
          );

          await this.rewardedAd.show();
        } catch (error) {
          console.log('AdMob rewarded ad error:', error);
          this.markAdShown();
          resolve(true);
          this.loadAdMobAds();
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

    // Try Unity first
    if (this.unityReady) {
      try {
        const result = await unityAdsManager.showInterstitialAd();
        if (result) {
          this.markAdShown();
          return true;
        }
      } catch (error) {
        console.log('Unity interstitial failed:', error);
      }
    }

    // Fallback to AdMob
    if (this.admobReady && this.interstitialAd) {
      return new Promise(async (resolve) => {
        try {
          const closeListener = this.interstitialAd.addAdEventListener(
            AdEventType.CLOSED,
            () => {
              this.markAdShown();
              closeListener();
              resolve(true);
              this.loadAdMobAds();
            }
          );

          await this.interstitialAd.show();
        } catch (error) {
          console.log('AdMob interstitial error:', error);
          this.markAdShown();
          resolve(true);
          this.loadAdMobAds();
        }
      });
    }

    this.markAdShown();
    return true;
  }

  // Set preferred ad network
  setPreferredNetwork(network: AdNetwork): void {
    this.preferredNetwork = network;
  }

  // Check which networks are available
  getAvailableNetworks(): { unity: boolean; admob: boolean } {
    return {
      unity: this.unityReady,
      admob: this.admobReady,
    };
  }

  // For consent
  setConsentGiven(consent: boolean): void {
    // Both networks respect this
  }

  hasConsent(): boolean {
    return true; // Mandatory ads
  }
}

export const adManager = new AdManager();

// Export Unity config for reference
export const UNITY_CONFIG = UNITY_ADS_CONFIG;
