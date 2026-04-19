/**
 * Ad Manager Web Stub
 * Returns no-op functions for web platform
 */

class AdManagerWeb {
  private isInitialized = false;

  async initialize(): Promise<void> {
    console.log('[AdManager] Web platform - ads disabled');
    this.isInitialized = true;
  }

  isReady(): boolean {
    return false;
  }

  async showRewardedAd(): Promise<boolean> {
    console.log('[AdManager] Ads not available on web');
    return false;
  }

  async showRewardedVideoAd(): Promise<boolean> {
    return false;
  }

  async showInterstitialAd(): Promise<boolean> {
    return false;
  }

  onLevelComplete(): void {}
  
  getBannerAdConfig(): any {
    return { unitId: '', size: 'BANNER' };
  }

  async showUnityRewardedAd(): Promise<boolean> {
    return false;
  }

  async showUnityInterstitialAd(): Promise<boolean> {
    return false;
  }

  async showUnityBannerAd(): Promise<boolean> {
    return false;
  }

  isUnityAdsReady(): boolean {
    return false;
  }

  getUnityConfig(): any {
    return { gameId: '', adUnits: {} };
  }

  setConsentGiven(consent: boolean): void {
    console.log('[AdManager] Consent set (web stub):', consent);
  }
}

export const adManager = new AdManagerWeb();
export default adManager;
