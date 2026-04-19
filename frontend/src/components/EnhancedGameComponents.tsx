/**
 * Enhanced Game Components
 * Clean, minimal UI enhancements for game screen
 */

import React, { useEffect, useRef, useState, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

// ============================================
// 1. COMBO METER - Subtle bar that fills up
// ============================================
export const ComboMeter: React.FC<{
  combo: number;
  maxCombo?: number;
  multiplier: number;
}> = memo(({ combo, maxCombo = 10, multiplier }) => {
  const fillAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    Animated.spring(fillAnim, {
      toValue: Math.min(combo / maxCombo, 1),
      tension: 50,
      friction: 7,
      useNativeDriver: false,
    }).start();
    
    if (combo > 0) {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [combo]);

  if (combo === 0) return null;

  const fillWidth = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.comboMeter, { transform: [{ scale: pulseAnim }] }]}>
      <View style={styles.comboBarBg}>
        <Animated.View style={[styles.comboBarFill, { width: fillWidth }]}>
          <LinearGradient
            colors={['#f59e0b', '#ef4444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
      <View style={styles.comboInfo}>
        <Text style={styles.comboText}>{combo}x</Text>
        {multiplier > 1 && (
          <Text style={styles.multiplierText}>×{multiplier}</Text>
        )}
      </View>
    </Animated.View>
  );
});

// ============================================
// 2. FLOATING WORD TOAST - Beautiful feedback
// ============================================
export const FloatingWordToast: React.FC<{
  visible: boolean;
  word: string;
  points: number;
  type: 'success' | 'bonus' | 'combo' | 'error';
  onHide?: () => void;
}> = memo(({ visible, word, points, type, onHide }) => {
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      const hideTimer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -20,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          translateY.setValue(30);
          scale.setValue(0.8);
          onHide?.();
        });
      }, 1200);

      return () => clearTimeout(hideTimer);
    }
  }, [visible]);

  if (!visible) return null;

  const getColors = () => {
    switch (type) {
      case 'bonus': return ['#8b5cf6', '#a855f7'];
      case 'combo': return ['#f59e0b', '#ef4444'];
      case 'error': return ['#64748b', '#475569'];
      default: return ['#10b981', '#059669'];
    }
  };

  const getMessage = () => {
    switch (type) {
      case 'bonus': return 'BONUS!';
      case 'combo': return 'COMBO!';
      case 'error': return 'Try Again';
      default: return ['GREAT!', 'AWESOME!', 'NICE!', 'PERFECT!'][Math.floor(Math.random() * 4)];
    }
  };

  return (
    <Animated.View
      style={[
        styles.floatingToast,
        {
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    >
      <LinearGradient
        colors={getColors() as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.floatingToastGradient}
      >
        <Text style={styles.floatingToastWord}>{word}</Text>
        <View style={styles.floatingToastRight}>
          <Text style={styles.floatingToastMessage}>{getMessage()}</Text>
          {points > 0 && <Text style={styles.floatingToastPoints}>+{points}</Text>}
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================
// 3. MINI PROGRESS RING - Around level number
// ============================================
export const MiniProgressRing: React.FC<{
  progress: number;
  level: number;
  size?: number;
}> = memo(({ progress, level, size = 48 }) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: progress,
      tension: 50,
      friction: 7,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.progressRing, { width: size, height: size }]}>
      {/* Background circle */}
      <View style={[styles.ringBg, { 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        borderWidth: strokeWidth,
      }]} />
      
      {/* Progress arc - simplified with View */}
      <View style={[styles.ringProgress, {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
        borderColor: '#6366f1',
        borderTopColor: 'transparent',
        borderRightColor: progress > 0.25 ? '#6366f1' : 'transparent',
        borderBottomColor: progress > 0.5 ? '#6366f1' : 'transparent',
        borderLeftColor: progress > 0.75 ? '#6366f1' : 'transparent',
        transform: [{ rotate: '-90deg' }],
      }]} />
      
      <Text style={styles.ringLevel}>{level}</Text>
    </View>
  );
});

// ============================================
// 4. STAR RATING PREVIEW
// ============================================
export const StarRatingPreview: React.FC<{
  hintsUsed: number;
  maxHints?: number;
}> = memo(({ hintsUsed, maxHints = 3 }) => {
  const stars = hintsUsed === 0 ? 3 : hintsUsed === 1 ? 2 : 1;
  
  return (
    <View style={styles.starPreview}>
      {[1, 2, 3].map((star) => (
        <Ionicons
          key={star}
          name={star <= stars ? 'star' : 'star-outline'}
          size={14}
          color={star <= stars ? '#fbbf24' : '#475569'}
          style={styles.starIcon}
        />
      ))}
    </View>
  );
});

// ============================================
// 5. FLOATING ACTION MENU - Collapsible
// ============================================
export const FloatingActionMenu: React.FC<{
  onShuffle: () => void;
  onHint: () => void;
  onPause: () => void;
  hintsRemaining: number;
  isExpanded?: boolean;
}> = memo(({ onShuffle, onHint, onPause, hintsRemaining, isExpanded: initialExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const expandAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.parallel([
      Animated.spring(expandAnim, {
        toValue,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    setIsExpanded(!isExpanded);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const scale1 = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });
  const translateY1 = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  const scale2 = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });
  const translateY2 = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -120],
  });

  const scale3 = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });
  const translateY3 = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -180],
  });

  return (
    <View style={styles.fabContainer}>
      {/* Pause */}
      <Animated.View style={[
        styles.fabItem,
        { transform: [{ translateY: translateY3 }, { scale: scale3 }], opacity: expandAnim }
      ]}>
        <TouchableOpacity style={styles.fabBtn} onPress={onPause}>
          <Ionicons name="pause" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.fabLabel}>Pause</Text>
      </Animated.View>

      {/* Hint */}
      <Animated.View style={[
        styles.fabItem,
        { transform: [{ translateY: translateY2 }, { scale: scale2 }], opacity: expandAnim }
      ]}>
        <TouchableOpacity 
          style={[styles.fabBtn, styles.fabBtnHint]} 
          onPress={onHint}
          disabled={hintsRemaining === 0}
        >
          <Ionicons name="bulb" size={20} color="#fff" />
          {hintsRemaining > 0 && (
            <View style={styles.fabBadge}>
              <Text style={styles.fabBadgeText}>{hintsRemaining}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.fabLabel}>Hint</Text>
      </Animated.View>

      {/* Shuffle */}
      <Animated.View style={[
        styles.fabItem,
        { transform: [{ translateY: translateY1 }, { scale: scale1 }], opacity: expandAnim }
      ]}>
        <TouchableOpacity style={[styles.fabBtn, styles.fabBtnShuffle]} onPress={onShuffle}>
          <Ionicons name="shuffle" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.fabLabel}>Shuffle</Text>
      </Animated.View>

      {/* Main Toggle */}
      <TouchableOpacity style={styles.fabMain} onPress={toggle}>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <Ionicons name="add" size={28} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
});

// ============================================
// 6. SHAKE ANIMATION WRAPPER
// ============================================
export const ShakeWrapper: React.FC<{
  trigger: boolean;
  children: React.ReactNode;
}> = memo(({ trigger, children }) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [trigger]);

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
      {children}
    </Animated.View>
  );
});

// ============================================
// 7. CELEBRATION BURST
// ============================================
export const CelebrationBurst: React.FC<{
  trigger: number;
  color?: string;
}> = memo(({ trigger, color = '#fbbf24' }) => {
  const particles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
      angle: (i * 30) * (Math.PI / 180),
    }))
  ).current;

  useEffect(() => {
    if (trigger > 0) {
      particles.forEach((p, i) => {
        const distance = 60 + Math.random() * 40;
        const targetX = Math.cos(p.angle) * distance;
        const targetY = Math.sin(p.angle) * distance;

        p.translateX.setValue(0);
        p.translateY.setValue(0);
        p.scale.setValue(0);
        p.opacity.setValue(1);

        Animated.parallel([
          Animated.timing(p.translateX, {
            toValue: targetX,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(p.translateY, {
            toValue: targetY,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(p.scale, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(p.scale, {
              toValue: 0,
              duration: 450,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(p.opacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [trigger]);

  if (trigger === 0) return null;

  return (
    <View style={styles.burstContainer} pointerEvents="none">
      {particles.map((p) => (
        <Animated.View
          key={p.id}
          style={[
            styles.burstParticle,
            {
              backgroundColor: color,
              transform: [
                { translateX: p.translateX },
                { translateY: p.translateY },
                { scale: p.scale },
              ],
              opacity: p.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
});

// ============================================
// 8. GAME HEADER - Clean minimal design
// ============================================
export const GameHeader: React.FC<{
  level: number;
  progress: number;
  coins: number;
  hints: number;
  hintsUsed: number;
  onPause: () => void;
  onHome: () => void;
}> = memo(({ level, progress, coins, hints, hintsUsed, onPause, onHome }) => {
  return (
    <View style={styles.gameHeader}>
      <TouchableOpacity style={styles.headerBtn} onPress={onHome}>
        <Ionicons name="chevron-back" size={22} color="#94a3b8" />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <MiniProgressRing progress={progress} level={level} size={40} />
        <StarRatingPreview hintsUsed={hintsUsed} />
      </View>

      <View style={styles.headerRight}>
        <View style={styles.headerPill}>
          <Ionicons name="bulb" size={12} color="#a855f7" />
          <Text style={styles.headerPillText}>{hints}</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn} onPress={onPause}>
          <Ionicons name="pause" size={18} color="#94a3b8" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  // Combo Meter
  comboMeter: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  comboBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  comboBarFill: {
    height: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  comboInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  comboText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#f59e0b',
  },
  multiplierText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ef4444',
  },

  // Floating Toast
  floatingToast: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    zIndex: 100,
  },
  floatingToastGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 12,
  },
  floatingToastWord: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
  },
  floatingToastRight: {
    alignItems: 'flex-end',
  },
  floatingToastMessage: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  floatingToastPoints: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },

  // Progress Ring
  progressRing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringBg: {
    position: 'absolute',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  ringProgress: {
    position: 'absolute',
  },
  ringLevel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
  },

  // Star Preview
  starPreview: {
    flexDirection: 'row',
    gap: 2,
  },
  starIcon: {
    marginHorizontal: 1,
  },

  // FAB
  fabContainer: {
    position: 'absolute',
    bottom: 140,
    right: 16,
    alignItems: 'center',
  },
  fabItem: {
    position: 'absolute',
    alignItems: 'center',
    gap: 4,
  },
  fabBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabBtnHint: {
    backgroundColor: '#a855f7',
  },
  fabBtnShuffle: {
    backgroundColor: '#6366f1',
  },
  fabBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#fbbf24',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  fabLabel: {
    fontSize: 10,
    color: '#94a3b8',
  },
  fabMain: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // Burst
  burstContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  burstParticle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Game Header
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
    gap: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  headerPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e2e8f0',
  },
});

export default {
  ComboMeter,
  FloatingWordToast,
  MiniProgressRing,
  StarRatingPreview,
  FloatingActionMenu,
  ShakeWrapper,
  CelebrationBurst,
  GameHeader,
};
