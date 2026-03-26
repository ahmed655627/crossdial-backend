import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { adManager } from '../utils/adManager';

const CONSENT_KEY = 'privacy_consent';
const CONSENT_VERSION = '1.0'; // Increment when privacy policy changes

export interface ConsentData {
  version: string;
  timestamp: string;
  adsConsent: boolean;
  trackingConsent: boolean;
  ageVerified: boolean;
}

class PrivacyService {
  private consentData: ConsentData | null = null;

  // Check if user has given consent
  async hasConsent(): Promise<boolean> {
    try {
      const stored = await AsyncStorage.getItem(CONSENT_KEY);
      if (!stored) return false;
      
      const data: ConsentData = JSON.parse(stored);
      // Check if consent is for current version
      if (data.version !== CONSENT_VERSION) {
        return false; // Need to re-consent for new policy
      }
      
      this.consentData = data;
      return true;
    } catch (error) {
      console.error('Error checking consent:', error);
      return false;
    }
  }

  // Save user consent
  async saveConsent(adsConsent: boolean): Promise<void> {
    try {
      const consentData: ConsentData = {
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        adsConsent,
        trackingConsent: false, // COPPA - no tracking for children
        ageVerified: true,
      };
      
      await AsyncStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
      this.consentData = consentData;
      
      // Update ad manager with consent
      adManager.setConsentGiven(adsConsent);
      
      // Request tracking permission on iOS if consent given
      if (Platform.OS === 'ios' && adsConsent) {
        await this.requestTrackingPermission();
      }
    } catch (error) {
      console.error('Error saving consent:', error);
    }
  }

  // Request iOS App Tracking Transparency permission
  async requestTrackingPermission(): Promise<boolean> {
    if (Platform.OS !== 'ios') return true;
    
    try {
      // Dynamic import to avoid issues on non-iOS platforms
      const { requestTrackingPermissionsAsync } = await import('expo-tracking-transparency');
      const { status } = await requestTrackingPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting tracking permission:', error);
      return false;
    }
  }

  // Get current consent data
  getConsentData(): ConsentData | null {
    return this.consentData;
  }

  // Check if ads are allowed
  canShowAds(): boolean {
    return this.consentData?.adsConsent ?? false;
  }

  // Withdraw consent (for settings screen)
  async withdrawConsent(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CONSENT_KEY);
      this.consentData = null;
      adManager.setConsentGiven(false);
    } catch (error) {
      console.error('Error withdrawing consent:', error);
    }
  }

  // Delete all user data (for privacy compliance)
  async deleteAllData(): Promise<void> {
    try {
      // Get all keys and remove them
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      this.consentData = null;
    } catch (error) {
      console.error('Error deleting all data:', error);
    }
  }
}

export const privacyService = new PrivacyService();
