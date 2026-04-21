/**
 * Offline Cache Hook
 * Caches levels locally for offline play
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'wonderwordquest_levels_cache';
const CACHE_EXPIRY_KEY = 'wonderwordquest_cache_expiry';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface Level {
  id: number;
  letters: string[];
  targetWords: string[];
  bonusWords?: string[];
  gridLayout?: any[];
  [key: string]: any;
}

export const useOfflineCache = () => {
  const [cachedLevels, setCachedLevels] = useState<Level[] | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [lastCacheTime, setLastCacheTime] = useState<Date | null>(null);

  // Load cached levels on mount
  useEffect(() => {
    loadCachedLevels();
  }, []);

  const loadCachedLevels = async () => {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      const expiry = await AsyncStorage.getItem(CACHE_EXPIRY_KEY);
      
      if (cached && expiry) {
        const expiryTime = parseInt(expiry, 10);
        if (Date.now() < expiryTime) {
          setCachedLevels(JSON.parse(cached));
          setLastCacheTime(new Date(expiryTime - CACHE_DURATION));
        }
      }
    } catch (e) {
      console.log('Error loading cache:', e);
    }
  };

  const cacheLevels = useCallback(async (levels: Level[]) => {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(levels));
      await AsyncStorage.setItem(CACHE_EXPIRY_KEY, String(Date.now() + CACHE_DURATION));
      setCachedLevels(levels);
      setLastCacheTime(new Date());
    } catch (e) {
      console.log('Error caching levels:', e);
    }
  }, []);

  const getCachedLevel = useCallback((levelId: number): Level | null => {
    if (!cachedLevels) return null;
    return cachedLevels.find(l => l.id === levelId) || null;
  }, [cachedLevels]);

  const clearCache = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
      await AsyncStorage.removeItem(CACHE_EXPIRY_KEY);
      setCachedLevels(null);
      setLastCacheTime(null);
    } catch (e) {
      console.log('Error clearing cache:', e);
    }
  }, []);

  return {
    cachedLevels,
    isOffline,
    setIsOffline,
    lastCacheTime,
    cacheLevels,
    getCachedLevel,
    clearCache,
    hasCachedData: !!cachedLevels && cachedLevels.length > 0,
  };
};

export default useOfflineCache;
