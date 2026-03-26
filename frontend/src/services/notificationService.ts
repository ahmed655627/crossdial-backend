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
        projectId: 'your-project-id', // This will be auto-detected from app.json
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
