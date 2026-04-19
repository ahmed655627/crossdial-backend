import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

class NotificationService {
  private pushToken: string | null = null;

  // Register for push notifications
  async registerForPushNotifications(): Promise<string | null> {
    let token: string | null = null;

    // Check if physical device (push doesn't work on simulator)
    if (!Device.isDevice) {
      console.log('Push notifications require a physical device');
      return null;
    }

    // Check/request permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Push notification permission not granted');
      return null;
    }

    // Get Expo push token
    try {
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: 'words-of-wonders', // Matches app.json extra.eas.projectId
      });
      token = tokenData.data;
      this.pushToken = token;
      
      // Store token locally
      await AsyncStorage.setItem('push_token', token);
      
      console.log('Push token:', token);
    } catch (error) {
      console.error('Error getting push token:', error);
    }

    // Set up Android notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FFD700',
      });

      await Notifications.setNotificationChannelAsync('daily-rewards', {
        name: 'Daily Rewards',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
      });

      await Notifications.setNotificationChannelAsync('multiplayer', {
        name: 'Multiplayer',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
      });
    }

    return token;
  }

  // Register token with backend
  async registerTokenWithBackend(deviceId: string): Promise<void> {
    if (!this.pushToken) {
      await this.registerForPushNotifications();
    }

    if (this.pushToken) {
      try {
        await fetch(`${API_URL}/api/notifications/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            device_id: deviceId,
            push_token: this.pushToken,
            platform: Platform.OS,
          }),
        });
      } catch (error) {
        console.error('Error registering push token:', error);
      }
    }
  }

  // Schedule local notification for daily rewards
  async scheduleDailyRewardReminder(): Promise<void> {
    try {
      // Cancel any existing daily reward notifications
      await Notifications.cancelScheduledNotificationAsync('daily-reward-reminder');

      // Schedule for 24 hours from now
      await Notifications.scheduleNotificationAsync({
        identifier: 'daily-reward-reminder',
        content: {
          title: '🎁 Daily Reward Available!',
          body: 'Spin the wheel to win coins and hints!',
          data: { type: 'daily_reward' },
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 24 * 60 * 60, // 24 hours
          repeats: true,
        },
      });
    } catch (error) {
      console.log('Failed to schedule daily reward reminder:', error);
    }
  }

  // Schedule daily streak reminder
  async scheduleStreakReminder(currentStreak: number): Promise<void> {
    try {
      // Cancel any existing streak notifications
      await Notifications.cancelScheduledNotificationAsync('streak-reminder');
      await Notifications.cancelScheduledNotificationAsync('streak-at-risk');

      if (currentStreak > 0) {
        // Schedule a "keep your streak" reminder for 20 hours
        await Notifications.scheduleNotificationAsync({
          identifier: 'streak-at-risk',
          content: {
            title: `🔥 Your ${currentStreak}-day streak is at risk!`,
            body: 'Play now to keep your streak going!',
            data: { type: 'streak_reminder' },
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 20 * 60 * 60, // 20 hours
            repeats: false,
          },
        });

        // Schedule a "streak lost" warning for 23 hours
        await Notifications.scheduleNotificationAsync({
          identifier: 'streak-reminder',
          content: {
            title: `⚠️ Last chance to save your streak!`,
            body: `Don't lose your ${currentStreak}-day streak! Open now to play.`,
            data: { type: 'streak_urgent' },
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 23 * 60 * 60, // 23 hours
            repeats: false,
          },
        });
      }
    } catch (error) {
      console.log('Failed to schedule streak reminder:', error);
    }
  }

  // Cancel streak reminders (when user plays)
  async cancelStreakReminders(): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync('streak-reminder');
      await Notifications.cancelScheduledNotificationAsync('streak-at-risk');
    } catch (error) {
      console.log('Failed to cancel streak reminders:', error);
    }
  }

  // Schedule level completion celebration
  async scheduleCongratulationsNotification(levelNumber: number): Promise<void> {
    try {
      // Delayed congratulations (appears after 30 minutes if user leaves)
      await Notifications.scheduleNotificationAsync({
        identifier: 'level-congrats',
        content: {
          title: '🎉 Great job on Level ' + levelNumber + '!',
          body: 'Ready for the next challenge?',
          data: { type: 'level_congrats', level: levelNumber },
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 30 * 60, // 30 minutes
          repeats: false,
        },
      });
    } catch (error) {
      console.log('Failed to schedule congrats notification:', error);
    }
  }

  // Schedule inactive player reminder
  async scheduleInactiveReminder(): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync('inactive-reminder');

      await Notifications.scheduleNotificationAsync({
        identifier: 'inactive-reminder',
        content: {
          title: '📚 Missing your word puzzles?',
          body: 'New levels are waiting for you!',
          data: { type: 'inactive_reminder' },
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 3 * 24 * 60 * 60, // 3 days
          repeats: false,
        },
      });
    } catch (error) {
      console.log('Failed to schedule inactive reminder:', error);
    }
  }

  // Send local notification for level unlock
  async sendLevelUnlockNotification(levelNumber: number, wonderName: string): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🏆 New Level Unlocked!',
        body: `Level ${levelNumber}: ${wonderName} is now available!`,
        data: { type: 'level_unlock', level: levelNumber },
        sound: true,
      },
      trigger: null, // Send immediately
    });
  }

  // Send local notification for multiplayer match
  async sendMatchFoundNotification(opponentName: string): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⚔️ Match Found!',
        body: `${opponentName} is ready to battle!`,
        data: { type: 'match_found' },
        sound: true,
      },
      trigger: null,
    });
  }

  // Send local notification for match invite
  async sendMatchInviteNotification(fromPlayer: string): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📩 Match Invitation',
        body: `${fromPlayer} challenges you to a word battle!`,
        data: { type: 'match_invite' },
        sound: true,
      },
      trigger: null,
    });
  }

  // Add notification listeners
  addNotificationListeners(
    onReceived: (notification: Notifications.Notification) => void,
    onResponse: (response: Notifications.NotificationResponse) => void
  ): () => void {
    const receivedSubscription = Notifications.addNotificationReceivedListener(onReceived);
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(onResponse);

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }

  // Get pending notifications
  async getPendingNotifications(): Promise<Notifications.NotificationRequest[]> {
    return Notifications.getAllScheduledNotificationsAsync();
  }

  // Cancel all notifications
  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Get badge count
  async getBadgeCount(): Promise<number> {
    return Notifications.getBadgeCountAsync();
  }

  // Set badge count
  async setBadgeCount(count: number): Promise<void> {
    await Notifications.setBadgeCountAsync(count);
  }
}

export const notificationService = new NotificationService();
