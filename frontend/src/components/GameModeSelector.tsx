/**
 * Game Mode Selector Component
 * Allows users to switch between different game modes
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { GAME_MODES, GameModeType, GameMode } from '../data/gameModes';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface GameModeSelectorProps {
  visible: boolean;
  currentLevel: number;
  onSelectMode: (mode: GameModeType) => void;
  onClose: () => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  visible,
  currentLevel,
  onSelectMode,
  onClose,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameModeType>('classic');

  const handleSelectMode = (mode: GameMode) => {
    if (currentLevel >= mode.unlockLevel) {
      setSelectedMode(mode.id);
      onSelectMode(mode.id);
    }
  };

  const renderModeCard = (mode: GameMode, index: number) => {
    const isUnlocked = currentLevel >= mode.unlockLevel;
    const isSelected = selectedMode === mode.id;

    return (
      <TouchableOpacity
        key={mode.id}
        onPress={() => handleSelectMode(mode)}
        disabled={!isUnlocked}
        activeOpacity={0.8}
        style={styles.cardWrapper}
      >
        <LinearGradient
          colors={
            isSelected
              ? [mode.color, adjustColor(mode.color, -30)]
              : isUnlocked
              ? ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']
              : ['rgba(100,100,100,0.3)', 'rgba(80,80,80,0.2)']
          }
          style={[
            styles.modeCard,
            isSelected && styles.selectedCard,
            !isUnlocked && styles.lockedCard,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Icon */}
          <View style={[styles.iconContainer, isSelected && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={styles.modeIcon}>{mode.icon}</Text>
          </View>

          {/* Mode Info */}
          <View style={styles.modeInfo}>
            <Text style={[styles.modeName, !isUnlocked && styles.lockedText]}>
              {mode.name}
            </Text>
            <Text style={[styles.modeDescription, !isUnlocked && styles.lockedText]}>
              {mode.description}
            </Text>
          </View>

          {/* Lock/Check indicator */}
          <View style={styles.statusIndicator}>
            {!isUnlocked ? (
              <View style={styles.lockBadge}>
                <Text style={styles.lockIcon}>🔒</Text>
                <Text style={styles.unlockText}>Lvl {mode.unlockLevel}</Text>
              </View>
            ) : isSelected ? (
              <View style={styles.checkBadge}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
            ) : null}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🎮 Game Modes</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Choose your adventure! More modes unlock as you progress.
          </Text>

          {/* Mode Cards */}
          <ScrollView 
            style={styles.modesContainer}
            showsVerticalScrollIndicator={false}
          >
            {GAME_MODES.map((mode, index) => renderModeCard(mode, index))}
          </ScrollView>

          {/* Play Button */}
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => onSelectMode(selectedMode)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4ECDC4', '#44A08D']}
              style={styles.playButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.playButtonText}>
                Play {GAME_MODES.find(m => m.id === selectedMode)?.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Helper function to adjust color brightness
const adjustColor = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  modesContainer: {
    paddingHorizontal: 20,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedCard: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lockedCard: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modeIcon: {
    fontSize: 26,
  },
  modeInfo: {
    flex: 1,
  },
  modeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  lockedText: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  statusIndicator: {
    marginLeft: 10,
  },
  lockBadge: {
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 20,
  },
  unlockText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
  },
  checkBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  playButton: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  playButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default GameModeSelector;
