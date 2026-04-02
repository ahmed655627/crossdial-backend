import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

export interface Theme {
  id: string;
  name: string;
  icon: string;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    text: string;
    accent: string;
    tile: string;
  };
  locked?: boolean;
  unlockCoins?: number;
}

export const THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Classic',
    icon: '🌙',
    colors: {
      background: '#1a1a2e',
      primary: '#fbbf24',
      secondary: '#8b5cf6',
      text: '#ffffff',
      accent: '#3b82f6',
      tile: '#fbbf24',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    colors: {
      background: '#0c4a6e',
      primary: '#06b6d4',
      secondary: '#0ea5e9',
      text: '#ffffff',
      accent: '#22d3ee',
      tile: '#06b6d4',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    colors: {
      background: '#14532d',
      primary: '#22c55e',
      secondary: '#4ade80',
      text: '#ffffff',
      accent: '#86efac',
      tile: '#22c55e',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: '🌅',
    colors: {
      background: '#7c2d12',
      primary: '#f97316',
      secondary: '#fb923c',
      text: '#ffffff',
      accent: '#fdba74',
      tile: '#f97316',
    },
    locked: true,
    unlockCoins: 500,
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    icon: '🌌',
    colors: {
      background: '#312e81',
      primary: '#a855f7',
      secondary: '#c084fc',
      text: '#ffffff',
      accent: '#e879f9',
      tile: '#a855f7',
    },
    locked: true,
    unlockCoins: 750,
  },
  {
    id: 'candy',
    name: 'Candy',
    icon: '🍬',
    colors: {
      background: '#831843',
      primary: '#ec4899',
      secondary: '#f472b6',
      text: '#ffffff',
      accent: '#f9a8d4',
      tile: '#ec4899',
    },
    locked: true,
    unlockCoins: 1000,
  },
];

interface ThemeSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  currentTheme: string;
  onSelectTheme: (theme: Theme) => void;
  coins: number;
  unlockedThemes: string[];
  onUnlockTheme: (theme: Theme) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  visible,
  onClose,
  currentTheme,
  onSelectTheme,
  coins,
  unlockedThemes,
  onUnlockTheme,
}) => {
  const isUnlocked = (theme: Theme) => {
    return !theme.locked || unlockedThemes.includes(theme.id);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerIcon}>🎨</Text>
            <Text style={styles.title}>Choose Theme</Text>
            <View style={styles.coinBadge}>
              <Text style={styles.coinIcon}>🪙</Text>
              <Text style={styles.coinText}>{coins}</Text>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.themeGrid}>
              {THEMES.map((theme) => {
                const unlocked = isUnlocked(theme);
                const isActive = currentTheme === theme.id;

                return (
                  <TouchableOpacity
                    key={theme.id}
                    style={[
                      styles.themeCard,
                      { backgroundColor: theme.colors.background },
                      isActive && styles.activeCard,
                    ]}
                    onPress={() => {
                      if (unlocked) {
                        onSelectTheme(theme);
                      } else if (coins >= (theme.unlockCoins || 0)) {
                        onUnlockTheme(theme);
                      }
                    }}
                  >
                    <Text style={styles.themeIcon}>{theme.icon}</Text>
                    <Text style={[styles.themeName, { color: theme.colors.text }]}>
                      {theme.name}
                    </Text>

                    <View style={styles.colorPreview}>
                      {Object.values(theme.colors).slice(1, 4).map((color, idx) => (
                        <View
                          key={idx}
                          style={[styles.colorDot, { backgroundColor: color }]}
                        />
                      ))}
                    </View>

                    {!unlocked && (
                      <View style={styles.lockedOverlay}>
                        <Text style={styles.lockIcon}>🔒</Text>
                        <View style={styles.unlockCost}>
                          <Text style={styles.coinSmall}>🪙</Text>
                          <Text style={styles.costText}>{theme.unlockCoins}</Text>
                        </View>
                      </View>
                    )}

                    {isActive && (
                      <View style={styles.activeBadge}>
                        <Text style={styles.activeText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginLeft: 12,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  coinIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  coinText: {
    color: '#fbbf24',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  activeCard: {
    borderWidth: 3,
    borderColor: '#22c55e',
  },
  themeIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 6,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  lockIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  unlockCost: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinSmall: {
    fontSize: 16,
    marginRight: 4,
  },
  costText: {
    color: '#fbbf24',
    fontWeight: 'bold',
  },
  activeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#22c55e',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeButtonText: {
    color: '#8b5cf6',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ThemeSelectorModal;
