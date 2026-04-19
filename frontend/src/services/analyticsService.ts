/**
 * Analytics Service
 * Tracks user behavior (Firebase/Mixpanel style)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

interface AnalyticsEvent {
  name: string;
  params?: Record<string, any>;
  timestamp: number;
}

class AnalyticsService {
  private userId: string | null = null;
  private sessionId: string;
  private eventQueue: AnalyticsEvent[] = [];
  private isInitialized = false;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async initialize(userId?: string) {
    this.userId = userId || await this.getOrCreateAnonymousId();
    this.isInitialized = true;
    
    // Track app open
    this.track('app_opened', {
      session_id: this.sessionId,
    });
    
    console.log('Analytics initialized for user:', this.userId);
  }

  private async getOrCreateAnonymousId(): Promise<string> {
    try {
      let id = await AsyncStorage.getItem('analytics_user_id');
      if (!id) {
        id = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await AsyncStorage.setItem('analytics_user_id', id);
      }
      return id;
    } catch {
      return `anon_${Date.now()}`;
    }
  }

  track(eventName: string, params?: Record<string, any>) {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    const event: AnalyticsEvent = {
      name: eventName,
      params: {
        ...params,
        user_id: this.userId,
        session_id: this.sessionId,
      },
      timestamp: Date.now(),
    };

    this.eventQueue.push(event);
    console.log('📊 Analytics:', eventName, params);

    // In production, send to analytics backend
    // this.flushEvents();
  }

  // Predefined events
  trackLevelStart(levelId: number, category: string) {
    this.track('level_started', { level_id: levelId, category });
  }

  trackLevelComplete(levelId: number, stars: number, timeSpent: number) {
    this.track('level_completed', {
      level_id: levelId,
      stars,
      time_spent_seconds: timeSpent,
    });
  }

  trackWordFound(word: string, isBonus: boolean, comboCount: number) {
    this.track('word_found', {
      word_length: word.length,
      is_bonus: isBonus,
      combo_count: comboCount,
    });
  }

  trackHintUsed(hintType: string, levelId: number) {
    this.track('hint_used', { hint_type: hintType, level_id: levelId });
  }

  trackPurchase(productId: string, price: number, currency: string) {
    this.track('purchase', { product_id: productId, price, currency });
  }

  trackAdWatched(adType: string, reward?: string) {
    this.track('ad_watched', { ad_type: adType, reward });
  }

  trackStreakUpdated(streakDays: number) {
    this.track('streak_updated', { streak_days: streakDays });
  }

  trackScreenView(screenName: string) {
    this.track('screen_view', { screen_name: screenName });
  }

  trackError(errorType: string, errorMessage: string) {
    this.track('error', { error_type: errorType, error_message: errorMessage });
  }

  setUserProperty(property: string, value: any) {
    this.track('user_property_set', { property, value });
  }

  // Get analytics data for debugging
  getEventQueue(): AnalyticsEvent[] {
    return [...this.eventQueue];
  }

  clearEventQueue() {
    this.eventQueue = [];
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;
