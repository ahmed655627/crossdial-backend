/**
 * Push Notification Service
 * Handles scheduling and managing push notifications
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_SETTINGS_KEY = 'notification_settings';

interface NotificationSettings {
  streakReminders: boolean;
  dailyChallenge: boolean;
  newLevels: boolean;
  promotions: boolean;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  streakReminders: true,
  dailyChallenge: true,
  newLevels: true,
  promotions: false,
};

class PushNotificationService {
  private settings: NotificationSettings = DEFAULT_SETTINGS;
  private expoPushToken: string | null = null;

  async initialize() {
    try {
      // Request permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Push notification permission denied');
        return false;
      }

      // Get push token
      const tokenData = await Notifications.getExpoPushTokenAsync();
      this.expoPushToken = tokenData.data;
      console.log('Push token:', this.expoPushToken);

      // Configure notification behavior
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      // Load saved settings
      await this.loadSettings();

      return true;
    } catch (error) {
      console.error('Error initializing push notifications:', error);
      return false;
    }
  }

  async loadSettings() {
    try {
      const saved = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
      if (saved) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  }

  async saveSettings(settings: Partial<NotificationSettings>) {
    this.settings = { ...this.settings, ...settings };
    await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(this.settings));
  }

  getSettings(): NotificationSettings {
    return { ...this.settings };
  }

  // Schedule streak reminder (8 PM local time)
  async scheduleStreakReminder(streakDays: number) {
    if (!this.settings.streakReminders) return;

    await Notifications.cancelScheduledNotificationAsync('streak_reminder');

    const trigger = {
      hour: 20,
      minute: 0,
      repeats: true,
    };

    await Notifications.scheduleNotificationAsync({
      identifier: 'streak_reminder',
      content: {
        title: "🔥 Don't lose your streak!",
        body: `You're on a ${streakDays}-day streak! Play now to keep it going.`,
        sound: 'default',
        data: { type: 'streak_reminder' },
      },
      trigger,
    });

    console.log('Streak reminder scheduled');
  }

  // Schedule daily challenge reminder (9 AM local time)
  async scheduleDailyChallengeReminder() {
    if (!this.settings.dailyChallenge) return;

    await Notifications.cancelScheduledNotificationAsync('daily_challenge');

    const trigger = {
      hour: 9,
      minute: 0,
      repeats: true,
    };

    await Notifications.scheduleNotificationAsync({
      identifier: 'daily_challenge',
      content: {
        title: '🎯 New Daily Challenge!',
        body: "Today's challenge is ready. Can you beat it?",
        sound: 'default',
        data: { type: 'daily_challenge' },
      },
      trigger,
    });

    console.log('Daily challenge reminder scheduled');
  }

  // Send immediate notification (for testing)
  async sendTestNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🌍 CrossDial Puzzles',
        body: 'Notifications are working!',
        sound: 'default',
      },
      trigger: null, // Immediate
    });
  }

  // Cancel all notifications
  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Get push token
  getPushToken(): string | null {
    return this.expoPushToken;
  }
}

export const pushNotificationService = new PushNotificationService();
export default pushNotificationService;
