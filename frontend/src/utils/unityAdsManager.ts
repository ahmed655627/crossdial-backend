/**
 * Unity Ads Manager
 * Handles Unity Ads initialization and ad display
 */

import { Platform } from 'react-native';

// Unity Ads Game IDs
const UNITY_GAME_ID = '6078412';

// Unity Ad Unit IDs
const UNITY_AD_UNITS = {
  rewarded: 'Rewarded_Android',
  interstitial: 'Interstitial_Android',
  banner: 'Banner_Android',
};

// Track initialization state
let isUnityInitialized = false;
let UnityAds: any = null;

/**
 * Initialize Unity Ads SDK
 */
export const initializeUnityAds = async (): Promise<boolean> => {
  if (Platform.OS === 'web') {
    console.log('[UnityAds] Not supported on web');
    return false;
  }

  try {
    // Dynamic import to avoid web bundling issues
    const UnityModule = require('react-native-unity-ads');
    UnityAds = UnityModule.default || UnityModule;

    if (!UnityAds) {
      console.log('[UnityAds] Module not available');
      return false;
    }

    // Initialize Unity Ads
    await UnityAds.initialize(UNITY_GAME_ID, true); // true = test mode (set to false for production)
    
    isUnityInitialized = true;
    console.log('[UnityAds] ✅ Initialized successfully');
    
    return true;
  } catch (error) {
    console.log('[UnityAds] ❌ Initialization failed:', error);
    return false;
  }
};

/**
 * Check if Unity Ads is ready
 */
export const isUnityReady = (): boolean => {
  return isUnityInitialized && UnityAds !== null;
};

/**
 * Show Unity Rewarded Ad
 */
export const showUnityRewardedAd = async (): Promise<boolean> => {
  if (!isUnityReady()) {
    console.log('[UnityAds] Not initialized');
    return false;
  }

  try {
    // Load the ad first
    await UnityAds.loadAd(UNITY_AD_UNITS.rewarded);
    
    // Show the ad
    const result = await UnityAds.showAd(UNITY_AD_UNITS.rewarded);
    
    console.log('[UnityAds] ✅ Rewarded ad shown:', result);
    return result === 'COMPLETED';
  } catch (error) {
    console.log('[UnityAds] ❌ Rewarded ad error:', error);
    return false;
  }
};

/**
 * Show Unity Interstitial Ad
 */
export const showUnityInterstitialAd = async (): Promise<boolean> => {
  if (!isUnityReady()) {
    console.log('[UnityAds] Not initialized');
    return false;
  }

  try {
    // Load the ad first
    await UnityAds.loadAd(UNITY_AD_UNITS.interstitial);
    
    // Show the ad
    await UnityAds.showAd(UNITY_AD_UNITS.interstitial);
    
    console.log('[UnityAds] ✅ Interstitial ad shown');
    return true;
  } catch (error) {
    console.log('[UnityAds] ❌ Interstitial ad error:', error);
    return false;
  }
};

/**
 * Load Unity Banner Ad
 */
export const loadUnityBannerAd = async (): Promise<boolean> => {
  if (!isUnityReady()) {
    console.log('[UnityAds] Not initialized');
    return false;
  }

  try {
    await UnityAds.loadAd(UNITY_AD_UNITS.banner);
    console.log('[UnityAds] ✅ Banner loaded');
    return true;
  } catch (error) {
    console.log('[UnityAds] ❌ Banner error:', error);
    return false;
  }
};

/**
 * Unity Ads Manager Class (alternative approach)
 */
class UnityAdsManager {
  private initialized: boolean = false;
  private gameId: string = UNITY_GAME_ID;
  private testMode: boolean = true; // Set to false for production

  async initialize(): Promise<boolean> {
    if (this.initialized) return true;
    
    const result = await initializeUnityAds();
    this.initialized = result;
    return result;
  }

  async showRewarded(): Promise<boolean> {
    return showUnityRewardedAd();
  }

  async showInterstitial(): Promise<boolean> {
    return showUnityInterstitialAd();
  }

  async loadBanner(): Promise<boolean> {
    return loadUnityBannerAd();
  }

  isReady(): boolean {
    return this.initialized;
  }

  // Get ad unit IDs
  getAdUnits() {
    return UNITY_AD_UNITS;
  }

  // Set test mode
  setTestMode(enabled: boolean) {
    this.testMode = enabled;
  }
}

// Export singleton instance
export const unityAdsManager = new UnityAdsManager();

// Export configuration for reference
export const UNITY_CONFIG = {
  gameId: UNITY_GAME_ID,
  adUnits: UNITY_AD_UNITS,
};

export default unityAdsManager;
