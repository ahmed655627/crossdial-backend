/**
 * Theme Context
 * Dark/Light theme support
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'dark' | 'light';

interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  primary: string;
  accent: string;
  card: string;
  border: string;
}

const darkTheme: ThemeColors = {
  background: '#1a1a2e',
  backgroundSecondary: '#16213e',
  text: '#ffffff',
  textSecondary: '#8892b0',
  primary: '#00b894',
  accent: '#667eea',
  card: 'rgba(255, 255, 255, 0.05)',
  border: 'rgba(255, 255, 255, 0.1)',
};

const lightTheme: ThemeColors = {
  background: '#f5f7fa',
  backgroundSecondary: '#ffffff',
  text: '#1a1a2e',
  textSecondary: '#64748b',
  primary: '#00b894',
  accent: '#667eea',
  card: '#ffffff',
  border: 'rgba(0, 0, 0, 0.1)',
};

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem('theme_mode');
      if (saved === 'light' || saved === 'dark') {
        setMode(saved);
      }
    } catch (e) {
      console.log('Error loading theme:', e);
    }
  };

  const toggleTheme = async () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    try {
      await AsyncStorage.setItem('theme_mode', newMode);
    } catch (e) {
      console.log('Error saving theme:', e);
    }
  };

  const setTheme = async (newMode: ThemeMode) => {
    setMode(newMode);
    try {
      await AsyncStorage.setItem('theme_mode', newMode);
    } catch (e) {
      console.log('Error saving theme:', e);
    }
  };

  const colors = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
