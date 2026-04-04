/**
 * Game Settings Store
 * Manages language, theme, sound, and other settings
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupportedLanguage, getTranslation, Translations } from './localization';
import { BackgroundTheme, WheelDesign } from './gameThemes';

interface GameSettings {
  // Language
  language: SupportedLanguage;
  translations: Translations;
  
  // Audio
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
  
  // Visual
  animationsEnabled: boolean;
  particlesEnabled: boolean;
  
  // Theme overrides (null = use level-based theme)
  customBackground: BackgroundTheme | null;
  customWheel: WheelDesign | null;
  
  // Notifications
  notificationsEnabled: boolean;
  dailyReminderTime: string; // HH:MM format
  
  // Actions
  setLanguage: (lang: SupportedLanguage) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setMusicEnabled: (enabled: boolean) => void;
  setVibrationEnabled: (enabled: boolean) => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  setParticlesEnabled: (enabled: boolean) => void;
  setCustomBackground: (bg: BackgroundTheme | null) => void;
  setCustomWheel: (wheel: WheelDesign | null) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setDailyReminderTime: (time: string) => void;
  
  // Helper
  t: (key: keyof Translations) => string;
  resetToDefaults: () => void;
}

const defaultSettings = {
  language: 'en' as SupportedLanguage,
  translations: getTranslation('en'),
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  animationsEnabled: true,
  particlesEnabled: true,
  customBackground: null,
  customWheel: null,
  notificationsEnabled: true,
  dailyReminderTime: '09:00',
};

export const useGameSettings = create<GameSettings>()(
  persist(
    (set, get) => ({
      ...defaultSettings,

      setLanguage: (lang: SupportedLanguage) => {
        const translations = getTranslation(lang);
        set({ language: lang, translations });
      },

      setSoundEnabled: (enabled: boolean) => set({ soundEnabled: enabled }),
      
      setMusicEnabled: (enabled: boolean) => set({ musicEnabled: enabled }),
      
      setVibrationEnabled: (enabled: boolean) => set({ vibrationEnabled: enabled }),
      
      setAnimationsEnabled: (enabled: boolean) => set({ animationsEnabled: enabled }),
      
      setParticlesEnabled: (enabled: boolean) => set({ particlesEnabled: enabled }),
      
      setCustomBackground: (bg: BackgroundTheme | null) => set({ customBackground: bg }),
      
      setCustomWheel: (wheel: WheelDesign | null) => set({ customWheel: wheel }),
      
      setNotificationsEnabled: (enabled: boolean) => set({ notificationsEnabled: enabled }),
      
      setDailyReminderTime: (time: string) => set({ dailyReminderTime: time }),

      // Translation helper
      t: (key: keyof Translations) => {
        const state = get();
        return state.translations[key] || key;
      },

      resetToDefaults: () => {
        set({
          ...defaultSettings,
          translations: getTranslation('en'),
        });
      },
    }),
    {
      name: 'game-settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        language: state.language,
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled,
        vibrationEnabled: state.vibrationEnabled,
        animationsEnabled: state.animationsEnabled,
        particlesEnabled: state.particlesEnabled,
        customBackground: state.customBackground,
        customWheel: state.customWheel,
        notificationsEnabled: state.notificationsEnabled,
        dailyReminderTime: state.dailyReminderTime,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Restore translations after rehydration
          state.translations = getTranslation(state.language);
        }
      },
    }
  )
);

// Export shorthand for translation function
export const useTranslation = () => {
  const { t, language, translations } = useGameSettings();
  return { t, language, translations };
};

export default useGameSettings;
