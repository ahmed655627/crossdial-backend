/**
 * useCloudSync Hook
 * Integrates cloud sync service with the game
 */

import { useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { cloudSyncService } from '../services/cloudSyncService';
import { notificationService } from '../services/notificationService';

export const useCloudSync = () => {
  const { deviceId, progress, levels, foundWords, currentLevel } = useGameStore();
  const appState = useRef(AppState.currentState);
  const lastSyncRef = useRef<number>(0);

  // Initialize cloud sync when device ID is available
  useEffect(() => {
    if (deviceId) {
      cloudSyncService.initialize(deviceId);
      
      // Cache levels for offline play
      if (levels.length > 0) {
        cloudSyncService.cacheLevels(levels);
      }
    }

    return () => {
      cloudSyncService.stopPeriodicSync();
    };
  }, [deviceId, levels]);

  // Sync when app comes to foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground - sync data
        syncNow();
        
        // Cancel streak reminders since user is back
        notificationService.cancelStreakReminders();
      } else if (nextAppState === 'background') {
        // App is going to background - schedule reminders
        if (progress?.daily_streak) {
          notificationService.scheduleStreakReminder(progress.daily_streak);
        }
        notificationService.scheduleInactiveReminder();
        
        // Final sync before going to background
        syncNow();
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [progress?.daily_streak]);

  // Sync progress data
  const syncNow = useCallback(async () => {
    if (!deviceId) return;

    // Debounce - don't sync more than once per 10 seconds
    const now = Date.now();
    if (now - lastSyncRef.current < 10000) return;
    lastSyncRef.current = now;

    await cloudSyncService.syncToCloud({
      current_level: progress?.current_level,
      coins: progress?.coins,
      hints: progress?.hints,
      found_words: progress?.found_words,
      bonus_words_found: progress?.bonus_words_found,
      total_words_found: progress?.total_words_found,
    });
  }, [deviceId, progress]);

  // Sync found words
  const syncFoundWord = useCallback(async (levelId: number, word: string, isBonus: boolean) => {
    if (!cloudSyncService.getIsOnline()) {
      // Queue for later
      await cloudSyncService.queueOfflineAction({
        type: 'add_word',
        data: { level_id: levelId, word, is_bonus: isBonus },
      });
    }
  }, []);

  // Sync level completion
  const syncLevelComplete = useCallback(async (levelId: number) => {
    if (!cloudSyncService.getIsOnline()) {
      await cloudSyncService.queueOfflineAction({
        type: 'complete_level',
        data: { level_id: levelId },
      });
    }
    
    // Schedule congratulations notification
    notificationService.scheduleCongratulationsNotification(levelId);
  }, []);

  // Update settings
  const updateSettings = useCallback(async (settings: {
    sound_enabled?: boolean;
    notifications_enabled?: boolean;
    avatar?: string;
    theme_preference?: string;
    selected_language?: string;
  }) => {
    return cloudSyncService.updateSettings(settings);
  }, []);

  // Add achievement
  const addAchievement = useCallback(async (achievementId: string) => {
    return cloudSyncService.addAchievement(achievementId);
  }, []);

  // Restore from cloud
  const restoreFromCloud = useCallback(async () => {
    return cloudSyncService.restoreFromCloud();
  }, []);

  // Get last sync time
  const getLastSyncTime = useCallback(async () => {
    return cloudSyncService.getLastSyncTime();
  }, []);

  // Check online status
  const isOnline = useCallback(() => {
    return cloudSyncService.getIsOnline();
  }, []);

  return {
    syncNow,
    syncFoundWord,
    syncLevelComplete,
    updateSettings,
    addAchievement,
    restoreFromCloud,
    getLastSyncTime,
    isOnline,
  };
};

export default useCloudSync;
