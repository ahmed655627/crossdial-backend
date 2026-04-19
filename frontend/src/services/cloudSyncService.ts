/**
 * Cloud Sync Service
 * Handles auto-saving user data and syncing with backend
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

// Keys for local storage
const STORAGE_KEYS = {
  PENDING_SYNC: 'pending_sync_data',
  LAST_SYNC: 'last_sync_timestamp',
  CACHED_LEVELS: 'cached_levels',
  CACHED_PROGRESS: 'cached_progress',
  OFFLINE_QUEUE: 'offline_action_queue',
};

interface SyncData {
  current_level?: number;
  coins?: number;
  hints?: number;
  found_words?: Record<string, string[]>;
  bonus_words_found?: Record<string, string[]>;
  total_words_found?: number;
  sound_enabled?: boolean;
  selected_language?: string;
  avatar?: string;
  theme_preference?: string;
}

interface OfflineAction {
  id: string;
  type: 'add_word' | 'complete_level' | 'use_hint' | 'spin_wheel' | 'add_reward';
  data: any;
  timestamp: number;
}

class CloudSyncService {
  private deviceId: string | null = null;
  private syncInterval: NodeJS.Timeout | null = null;
  private isOnline: boolean = true;

  /**
   * Initialize the sync service with device ID
   */
  async initialize(deviceId: string): Promise<void> {
    this.deviceId = deviceId;
    
    // Listen for network state changes
    NetInfo.addEventListener(state => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected ?? false;
      
      // When coming back online, sync pending data
      if (wasOffline && this.isOnline) {
        this.processOfflineQueue();
        this.syncToCloud();
      }
    });

    // Initial sync
    await this.syncToCloud();
    
    // Start periodic sync (every 60 seconds)
    this.startPeriodicSync();
    
    console.log('[CloudSync] Initialized for device:', deviceId);
  }

  /**
   * Start periodic background sync
   */
  private startPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    
    this.syncInterval = setInterval(() => {
      if (this.isOnline) {
        this.syncToCloud();
      }
    }, 60000); // Sync every 60 seconds
  }

  /**
   * Stop periodic sync (call on app close)
   */
  stopPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /**
   * Sync local data to cloud
   */
  async syncToCloud(data?: SyncData): Promise<boolean> {
    if (!this.deviceId) return false;

    try {
      // Get any pending sync data
      const pendingData = await this.getPendingSyncData();
      const mergedData = { ...pendingData, ...data };

      const response = await fetch(`${API_URL}/api/progress/${this.deviceId}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedData),
      });

      if (response.ok) {
        // Clear pending sync data on success
        await AsyncStorage.removeItem(STORAGE_KEYS.PENDING_SYNC);
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_SYNC, Date.now().toString());
        
        // Cache the returned progress
        const progress = await response.json();
        await this.cacheProgress(progress);
        
        console.log('[CloudSync] Sync successful');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('[CloudSync] Sync failed:', error);
      
      // Store data for later sync
      if (data) {
        await this.addPendingSyncData(data);
      }
      
      return false;
    }
  }

  /**
   * Queue data for sync when online
   */
  async addPendingSyncData(data: SyncData): Promise<void> {
    try {
      const existing = await this.getPendingSyncData();
      const merged = { ...existing, ...data };
      await AsyncStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(merged));
    } catch (error) {
      console.error('[CloudSync] Failed to queue sync data:', error);
    }
  }

  /**
   * Get pending sync data
   */
  private async getPendingSyncData(): Promise<SyncData> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PENDING_SYNC);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  /**
   * Add action to offline queue
   */
  async queueOfflineAction(action: Omit<OfflineAction, 'id' | 'timestamp'>): Promise<void> {
    try {
      const queue = await this.getOfflineQueue();
      queue.push({
        ...action,
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
      });
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
    } catch (error) {
      console.error('[CloudSync] Failed to queue offline action:', error);
    }
  }

  /**
   * Get offline action queue
   */
  private async getOfflineQueue(): Promise<OfflineAction[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Process offline queue when back online
   */
  async processOfflineQueue(): Promise<void> {
    if (!this.deviceId || !this.isOnline) return;

    const queue = await this.getOfflineQueue();
    if (queue.length === 0) return;

    console.log(`[CloudSync] Processing ${queue.length} offline actions`);

    const failedActions: OfflineAction[] = [];

    for (const action of queue) {
      try {
        let success = false;

        switch (action.type) {
          case 'add_word':
            const wordResponse = await fetch(
              `${API_URL}/api/progress/${this.deviceId}/add-word?level_id=${action.data.level_id}&word=${action.data.word}&is_bonus=${action.data.is_bonus}`,
              { method: 'POST' }
            );
            success = wordResponse.ok;
            break;

          case 'complete_level':
            const levelResponse = await fetch(
              `${API_URL}/api/progress/${this.deviceId}/complete-level?level_id=${action.data.level_id}`,
              { method: 'POST' }
            );
            success = levelResponse.ok;
            break;

          case 'spin_wheel':
            const spinResponse = await fetch(
              `${API_URL}/api/progress/${this.deviceId}/spin-wheel`,
              { method: 'POST' }
            );
            success = spinResponse.ok;
            break;

          case 'add_reward':
            const rewardResponse = await fetch(
              `${API_URL}/api/progress/${this.deviceId}/add-reward?type=${action.data.type}&value=${action.data.value}`,
              { method: 'POST' }
            );
            success = rewardResponse.ok;
            break;

          default:
            success = true; // Unknown action, skip it
        }

        if (!success) {
          failedActions.push(action);
        }
      } catch (error) {
        failedActions.push(action);
      }
    }

    // Save failed actions back to queue
    await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(failedActions));
    
    if (failedActions.length > 0) {
      console.log(`[CloudSync] ${failedActions.length} actions failed, will retry later`);
    }
  }

  /**
   * Cache levels for offline play
   */
  async cacheLevels(levels: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CACHED_LEVELS, JSON.stringify(levels));
      console.log('[CloudSync] Cached', levels.length, 'levels');
    } catch (error) {
      console.error('[CloudSync] Failed to cache levels:', error);
    }
  }

  /**
   * Get cached levels for offline play
   */
  async getCachedLevels(): Promise<any[] | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_LEVELS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  /**
   * Cache user progress locally
   */
  async cacheProgress(progress: any): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CACHED_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('[CloudSync] Failed to cache progress:', error);
    }
  }

  /**
   * Get cached progress for offline use
   */
  async getCachedProgress(): Promise<any | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_PROGRESS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  /**
   * Update user settings
   */
  async updateSettings(settings: {
    sound_enabled?: boolean;
    notifications_enabled?: boolean;
    avatar?: string;
    theme_preference?: string;
    selected_language?: string;
  }): Promise<boolean> {
    if (!this.deviceId) return false;

    try {
      const params = new URLSearchParams();
      Object.entries(settings).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });

      const response = await fetch(
        `${API_URL}/api/progress/${this.deviceId}/update-settings?${params.toString()}`,
        { method: 'POST' }
      );

      return response.ok;
    } catch (error) {
      console.error('[CloudSync] Failed to update settings:', error);
      return false;
    }
  }

  /**
   * Add achievement
   */
  async addAchievement(achievementId: string): Promise<boolean> {
    if (!this.deviceId) return false;

    try {
      const response = await fetch(
        `${API_URL}/api/progress/${this.deviceId}/add-achievement?achievement_id=${achievementId}`,
        { method: 'POST' }
      );

      return response.ok;
    } catch (error) {
      console.error('[CloudSync] Failed to add achievement:', error);
      return false;
    }
  }

  /**
   * Restore progress from cloud
   */
  async restoreFromCloud(): Promise<any | null> {
    if (!this.deviceId) return null;

    try {
      const response = await fetch(`${API_URL}/api/progress/${this.deviceId}/full`);
      if (response.ok) {
        const progress = await response.json();
        await this.cacheProgress(progress);
        return progress;
      }
      return null;
    } catch (error) {
      console.error('[CloudSync] Failed to restore from cloud:', error);
      return await this.getCachedProgress();
    }
  }

  /**
   * Check if online
   */
  getIsOnline(): boolean {
    return this.isOnline;
  }

  /**
   * Get last sync timestamp
   */
  async getLastSyncTime(): Promise<number | null> {
    try {
      const timestamp = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      return timestamp ? parseInt(timestamp, 10) : null;
    } catch {
      return null;
    }
  }
}

export const cloudSyncService = new CloudSyncService();
export default cloudSyncService;
