/**
 * Refined Game Layout Component
 * Proper visual hierarchy, spacing, and responsive design
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive scaling
const isSmallScreen = SCREEN_HEIGHT < 700;
const SPACING_MULTIPLIER = isSmallScreen ? 0.75 : 1;

// Spacing constants
const SPACING = {
  topToClue: 16 * SPACING_MULTIPLIER,
  clueToPanel: 20 * SPACING_MULTIPLIER,
  panelToLocks: 24 * SPACING_MULTIPLIER,
  locksToPreview: 32 * SPACING_MULTIPLIER,
  previewToWheel: 24 * SPACING_MULTIPLIER,
  wheelToClear: 16 * SPACING_MULTIPLIER,
  clearToBottom: 16 * SPACING_MULTIPLIER,
  lockItemGap: 8,
};

// Panel width
const PANEL_WIDTH = SCREEN_WIDTH * 0.88;
const LOCK_PILL_WIDTH = SCREEN_WIDTH * 0.18;
const WHEEL_SIZE = isSmallScreen ? SCREEN_WIDTH * 0.4 : SCREEN_WIDTH * 0.55;

interface RefinedWordPlaceholdersProps {
  targetWords: string[];
  foundWords: string[];
  hintWord?: string | null;
  isShowingHint?: boolean;
}

/**
 * Lock/Hint Row - Positioned OUTSIDE the main panel
 */
export const LockHintRow: React.FC<RefinedWordPlaceholdersProps> = ({
  targetWords,
  foundWords,
  hintWord,
  isShowingHint = false,
}) => {
  const sortedWords = [...targetWords].sort((a, b) => a.length - b.length);
  
  // Glow animation for hint
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (isShowingHint && hintWord) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [isShowingHint, hintWord]);

  return (
    <View style={lockStyles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={lockStyles.scrollContent}
      >
        {sortedWords.map((word, index) => {
          const isFound = foundWords.map(w => w.toUpperCase()).includes(word.toUpperCase());
          const isHintTarget = isShowingHint && hintWord?.toUpperCase() === word.toUpperCase();
          
          return (
            <Animated.View 
              key={index} 
              style={[
                lockStyles.pill,
                isFound && lockStyles.foundPill,
                !isFound && !isHintTarget && lockStyles.lockedPill,
                isHintTarget && lockStyles.hintPill,
              ]}
            >
              {isFound ? (
                <>
                  <Text style={lockStyles.checkmark}>✓</Text>
                  <Text style={lockStyles.foundWord}>{word.toUpperCase()}</Text>
                </>
              ) : (
                <>
                  <Text style={lockStyles.lockIcon}>
                    {isHintTarget ? '💡' : '🔒'}
                  </Text>
                  <Text style={[
                    lockStyles.wordLength,
                    isHintTarget && lockStyles.hintWordLength,
                    !isFound && !isHintTarget && lockStyles.disabledText,
                  ]}>
                    {word.length}
                  </Text>
                </>
              )}
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const lockStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: SPACING.panelToLocks,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    gap: SPACING.lockItemGap,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: LOCK_PILL_WIDTH,
    minWidth: 60,
    maxWidth: 80,
    height: 44, // Minimum touch target
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 22,
    marginHorizontal: SPACING.lockItemGap / 2,
    borderWidth: 1.5,
  },
  foundPill: {
    backgroundColor: 'rgba(76, 175, 80, 0.25)',
    borderColor: 'rgba(76, 175, 80, 0.7)',
  },
  lockedPill: {
    backgroundColor: 'rgba(30, 30, 50, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    opacity: 0.6, // Disabled state
  },
  hintPill: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
    borderColor: 'rgba(0, 212, 170, 0.7)',
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 14,
    marginRight: 4,
    fontWeight: 'bold',
  },
  foundWord: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  lockIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  wordLength: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  hintWordLength: {
    color: '#00d4aa',
  },
  disabledText: {
    opacity: 0.7,
  },
});

/**
 * Word Preview Component - Shows above wheel with fade animation
 */
interface WordPreviewProps {
  word: string;
  visible: boolean;
  onHide?: () => void;
}

export const WordPreview: React.FC<WordPreviewProps> = ({ word, visible, onHide }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showPreview, setShowPreview] = useState(visible);

  useEffect(() => {
    if (visible && word) {
      setShowPreview(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Auto-hide after 1.5s
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowPreview(false);
          onHide?.();
        });
      }, 1500);

      return () => clearTimeout(timer);
    } else if (!visible) {
      fadeAnim.setValue(0);
      setShowPreview(false);
    }
  }, [visible, word]);

  if (!showPreview || !word) return null;

  return (
    <Animated.View style={[previewStyles.container, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['#2ecc71', '#27ae60']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={previewStyles.gradient}
      >
        <Text style={previewStyles.word}>{word.toUpperCase()}</Text>
        <View style={previewStyles.tapBadge}>
          <Text style={previewStyles.tapText}>TAP</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const previewStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: SPACING.previewToWheel,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
  },
  word: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  tapBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 10,
  },
  tapText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});

/**
 * Main Game Panel - Contains crossword grid
 */
interface MainPanelProps {
  children: React.ReactNode;
}

export const MainGamePanel: React.FC<MainPanelProps> = ({ children }) => {
  return (
    <View style={panelStyles.container}>
      <View style={panelStyles.panel}>
        {children}
      </View>
    </View>
  );
};

const panelStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: SPACING.clueToPanel,
  },
  panel: {
    width: PANEL_WIDTH,
    backgroundColor: 'rgba(20, 20, 35, 0.85)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
});

/**
 * Solved Word Display - With scale-in animation
 */
interface SolvedWordProps {
  word: string;
  isNew?: boolean;
}

export const SolvedWord: React.FC<SolvedWordProps> = ({ word, isNew = false }) => {
  const scaleAnim = useRef(new Animated.Value(isNew ? 0.5 : 1)).current;

  useEffect(() => {
    if (isNew) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isNew]);

  return (
    <Animated.View style={[solvedStyles.container, { transform: [{ scale: scaleAnim }] }]}>
      {word.split('').map((letter, index) => (
        <View key={index} style={solvedStyles.letterTile}>
          <Text style={solvedStyles.letter}>{letter.toUpperCase()}</Text>
        </View>
      ))}
    </Animated.View>
  );
};

const solvedStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  letterTile: {
    width: 40,
    height: 44,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  letter: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

/**
 * Game Layout Container - Manages vertical flow
 */
interface GameLayoutProps {
  children: React.ReactNode;
  timeChallengeActive?: boolean;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children, timeChallengeActive }) => {
  return (
    <View style={[layoutStyles.container, timeChallengeActive && layoutStyles.compactContainer]}>
      {children}
    </View>
  );
};

const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  compactContainer: {
    // Reduce gaps on compact mode
  },
});

/**
 * Wheel Container - Proper positioning
 */
interface WheelContainerProps {
  children: React.ReactNode;
  compact?: boolean;
}

export const WheelContainer: React.FC<WheelContainerProps> = ({ children, compact }) => {
  return (
    <View style={[wheelContainerStyles.container, compact && wheelContainerStyles.compact]}>
      {children}
    </View>
  );
};

const wheelContainerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.locksToPreview,
    marginBottom: SPACING.wheelToClear,
  },
  compact: {
    marginTop: SPACING.locksToPreview * 0.5,
    marginBottom: SPACING.wheelToClear * 0.5,
    transform: [{ scale: 0.85 }],
  },
});

/**
 * Clear Button - Styled consistently
 */
interface ClearButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[clearStyles.button, disabled && clearStyles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[clearStyles.text, disabled && clearStyles.disabledText]}>Clear</Text>
    </TouchableOpacity>
  );
};

const clearStyles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    minHeight: 44, // Touch target
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.clearToBottom,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

// Export spacing constants for use in main component
export const GAME_SPACING = SPACING;
export const GAME_PANEL_WIDTH = PANEL_WIDTH;
export const GAME_WHEEL_SIZE = WHEEL_SIZE;
export const IS_SMALL_SCREEN = isSmallScreen;
