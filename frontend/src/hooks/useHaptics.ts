/**
 * Haptic Feedback Hook
 * Provides haptic feedback for better mobile UX
 */

import { useCallback } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export const useHaptics = () => {
  const lightTap = useCallback(async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (e) {
        // Silent fail
      }
    }
  }, []);

  const mediumTap = useCallback(async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (e) {
        // Silent fail
      }
    }
  }, []);

  const heavyTap = useCallback(async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } catch (e) {
        // Silent fail
      }
    }
  }, []);

  const successVibrate = useCallback(async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (e) {
        // Silent fail
      }
    }
  }, []);

  const errorVibrate = useCallback(async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch (e) {
        // Silent fail
      }
    }
  }, []);

  const selectionTap = useCallback(async () => {
    if (Platform.OS !== 'web') {
      try {
        await Haptics.selectionAsync();
      } catch (e) {
        // Silent fail
      }
    }
  }, []);

  return {
    lightTap,
    mediumTap,
    heavyTap,
    successVibrate,
    errorVibrate,
    selectionTap,
  };
};

export default useHaptics;
