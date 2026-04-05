/**
 * Premium Letter Wheel Component
 * Features:
 * - Wooden/Golden premium design
 * - Animated letter trail with glow effects
 * - Particle explosions on word found
 * - Haptic feedback integration
 */

import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  withDelay,
  Easing,
  interpolate,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useGameStore } from '../store/gameStore';
import { useGameSettings } from '../stores/gameSettingsStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(SCREEN_WIDTH * 0.85, 320);
const LETTER_SIZE = 54;
const LETTER_RADIUS = (WHEEL_SIZE / 2) - LETTER_SIZE / 2 - 30; // Keep letters inside wheel

// Premium wheel themes
export const PREMIUM_WHEELS = {
  wooden: {
    outerRing: ['#8B4513', '#654321', '#5D4037', '#3E2723'],
    innerRing: ['#DEB887', '#D2691E', '#CD853F', '#A0522D'],
    centerGradient: ['#F5DEB3', '#DEB887', '#D2B48C'],
    letterButton: ['#FFFAF0', '#FFF8DC', '#FAEBD7'],
    letterButtonSelected: ['#FFD700', '#FFA500', '#FF8C00'],
    glowColor: '#FFD700',
    textColor: '#3E2723',
    textColorSelected: '#1a1a2e',
    woodGrain: true,
  },
  golden: {
    outerRing: ['#FFD700', '#DAA520', '#B8860B', '#8B7500'],
    innerRing: ['#FFF8DC', '#FFEBCD', '#FFE4B5', '#FFDAB9'],
    centerGradient: ['#FFFACD', '#FFE4B5', '#FFD700'],
    letterButton: ['#FFFFFF', '#FFF8E7', '#FFF5EE'],
    letterButtonSelected: ['#FF6B6B', '#FF4757', '#EE5A24'],
    glowColor: '#FFD700',
    textColor: '#8B4513',
    textColorSelected: '#FFFFFF',
    woodGrain: false,
  },
  crystal: {
    outerRing: ['#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8'],
    innerRing: ['#F0F9FF', '#E0F2FE', '#BAE6FD', '#7DD3FC'],
    centerGradient: ['#FFFFFF', '#F0F9FF', '#E0F2FE'],
    letterButton: ['#FFFFFF', '#F8FAFC', '#F1F5F9'],
    letterButtonSelected: ['#6366F1', '#4F46E5', '#4338CA'],
    glowColor: '#818CF8',
    textColor: '#1E3A5F',
    textColorSelected: '#FFFFFF',
    woodGrain: false,
  },
  emerald: {
    outerRing: ['#059669', '#047857', '#065F46', '#064E3B'],
    innerRing: ['#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399'],
    centerGradient: ['#ECFDF5', '#D1FAE5', '#A7F3D0'],
    letterButton: ['#FFFFFF', '#F0FDF4', '#DCFCE7'],
    letterButtonSelected: ['#F59E0B', '#D97706', '#B45309'],
    glowColor: '#10B981',
    textColor: '#064E3B',
    textColorSelected: '#FFFFFF',
    woodGrain: false,
  },
};

// Particle configuration
const PARTICLE_COUNT = 20;
const PARTICLE_COLORS = ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FF7675'];

interface PremiumLetterWheelProps {
  wheelTheme?: keyof typeof PREMIUM_WHEELS;
  onWordFound?: () => void;
}

export const PremiumLetterWheel: React.FC<PremiumLetterWheelProps> = ({
  wheelTheme = 'wooden',
  onWordFound,
}) => {
  const { 
    currentLevel, 
    selectedLetterIndices, 
    currentWord, 
    selectLetter, 
    submitWord, 
    clearSelection,
    lastWordResult,
    soundEnabled,
  } = useGameStore();
  
  const { animationsEnabled } = useGameSettings();
  const theme = PREMIUM_WHEELS[wheelTheme];
  
  const letters = currentLevel?.letters || [];
  const numLetters = letters.length;
  
  // Animation values
  const wheelScale = useSharedValue(1);
  const wheelRotation = useSharedValue(0);
  const trailOpacity = useSharedValue(0);
  const trailPoints = useSharedValue<{x: number, y: number}[]>([]);
  
  // Particle animation values
  const particleAnims = useRef(
    [...Array(PARTICLE_COUNT)].map(() => ({
      x: useSharedValue(WHEEL_SIZE / 2),
      y: useSharedValue(WHEEL_SIZE / 2),
      scale: useSharedValue(0),
      opacity: useSharedValue(0),
      rotation: useSharedValue(0),
    }))
  ).current;
  
  // Center glow pulse
  const centerPulse = useSharedValue(1);
  const centerGlow = useSharedValue(0.3);
  
  useEffect(() => {
    if (!animationsEnabled) return;
    
    // Subtle pulse animation for center
    centerPulse.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    centerGlow.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 2000 }),
        withTiming(0.3, { duration: 2000 })
      ),
      -1,
      true
    );
  }, [animationsEnabled]);
  
  // Trigger particle explosion when word is found
  useEffect(() => {
    if (lastWordResult?.isValid && animationsEnabled) {
      triggerParticleExplosion();
      onWordFound?.();
    }
  }, [lastWordResult]);
  
  const triggerParticleExplosion = () => {
    particleAnims.forEach((anim, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 80 + Math.random() * 100;
      const duration = 600 + Math.random() * 400;
      
      // Reset position
      anim.x.value = WHEEL_SIZE / 2;
      anim.y.value = WHEEL_SIZE / 2;
      anim.scale.value = 0;
      anim.opacity.value = 1;
      anim.rotation.value = 0;
      
      // Animate outward
      anim.x.value = withTiming(
        WHEEL_SIZE / 2 + Math.cos(angle) * distance,
        { duration, easing: Easing.out(Easing.cubic) }
      );
      anim.y.value = withTiming(
        WHEEL_SIZE / 2 + Math.sin(angle) * distance,
        { duration, easing: Easing.out(Easing.cubic) }
      );
      anim.scale.value = withSequence(
        withTiming(1 + Math.random() * 0.5, { duration: 150 }),
        withTiming(0, { duration: duration - 150 })
      );
      anim.opacity.value = withDelay(
        duration * 0.5,
        withTiming(0, { duration: duration * 0.5 })
      );
      anim.rotation.value = withTiming(
        360 * (Math.random() > 0.5 ? 1 : -1),
        { duration }
      );
    });
    
    // Haptic feedback
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };
  
  // Calculate letter positions
  const getLetterPosition = useCallback((index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const x = Math.cos(angle) * LETTER_RADIUS + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    const y = Math.sin(angle) * LETTER_RADIUS + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    return { x, y };
  }, [numLetters]);
  
  const getLetterCenter = useCallback((index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const x = Math.cos(angle) * LETTER_RADIUS + WHEEL_SIZE / 2;
    const y = Math.sin(angle) * LETTER_RADIUS + WHEEL_SIZE / 2;
    return { x, y };
  }, [numLetters]);
  
  const findLetterAtPosition = useCallback((x: number, y: number): number | null => {
    for (let i = 0; i < numLetters; i++) {
      const center = getLetterCenter(i);
      const distance = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
      if (distance < LETTER_SIZE / 2 + 12) {
        return i;
      }
    }
    return null;
  }, [numLetters, getLetterCenter]);
  
  const handleSelectLetter = useCallback((index: number) => {
    selectLetter(index);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [selectLetter]);
  
  const handleSubmit = useCallback(() => {
    if (currentWord.length >= 3) {
      submitWord();
    } else {
      clearSelection();
    }
    trailOpacity.value = withTiming(0, { duration: 200 });
  }, [currentWord, submitWord, clearSelection]);

  // Handle tap on letter (for single taps)
  const handleTapLetter = useCallback((index: number) => {
    selectLetter(index);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [selectLetter]);
  
  // Tap gesture for single taps on letters
  const tapGesture = Gesture.Tap()
    .onStart((event) => {
      const letterIndex = findLetterAtPosition(event.x, event.y);
      if (letterIndex !== null) {
        runOnJS(handleTapLetter)(letterIndex);
      }
    });

  // Pan gesture for swiping through letters
  const panGesture = Gesture.Pan()
    .minDistance(5)
    .onStart((event) => {
      trailOpacity.value = withTiming(1, { duration: 100 });
      const letterIndex = findLetterAtPosition(event.x, event.y);
      if (letterIndex !== null) {
        runOnJS(handleSelectLetter)(letterIndex);
      }
    })
    .onUpdate((event) => {
      const letterIndex = findLetterAtPosition(event.x, event.y);
      if (letterIndex !== null) {
        runOnJS(handleSelectLetter)(letterIndex);
      }
    })
    .onEnd(() => {
      runOnJS(handleSubmit)();
    });
  
  // Combine tap and pan gestures - tap has priority for single taps
  const combinedGesture = Gesture.Exclusive(panGesture, tapGesture);
  
  // Animated styles
  const wheelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: wheelScale.value },
      { rotate: `${wheelRotation.value}deg` },
    ],
  }));
  
  const centerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: centerPulse.value }],
    shadowOpacity: centerGlow.value,
  }));
  
  // Render glowing connection lines
  const renderConnectionLines = () => {
    if (selectedLetterIndices.length < 2) return null;
    
    return selectedLetterIndices.slice(0, -1).map((_, i) => {
      const start = getLetterCenter(selectedLetterIndices[i]);
      const end = getLetterCenter(selectedLetterIndices[i + 1]);
      const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
      
      return (
        <View key={`line-${i}`} style={styles.lineContainer}>
          {/* Outer glow */}
          <View
            style={[
              styles.lineGlow,
              {
                width: length + 10,
                left: start.x - 5,
                top: start.y - 8,
                transform: [{ rotate: `${angle}deg` }],
                backgroundColor: theme.glowColor,
                opacity: 0.3,
              },
            ]}
          />
          {/* Main line */}
          <LinearGradient
            colors={theme.letterButtonSelected as [string, string, ...string[]]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[
              styles.connectionLine,
              {
                width: length,
                left: start.x,
                top: start.y - 4,
                transform: [{ rotate: `${angle}deg` }],
              },
            ]}
          />
        </View>
      );
    });
  };
  
  // Render particles
  const renderParticles = () => {
    return particleAnims.map((anim, i) => {
      const color = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
      
      const animatedStyle = useAnimatedStyle(() => ({
        transform: [
          { translateX: anim.x.value - 8 },
          { translateY: anim.y.value - 8 },
          { scale: anim.scale.value },
          { rotate: `${anim.rotation.value}deg` },
        ],
        opacity: anim.opacity.value,
      }));
      
      return (
        <Animated.View
          key={`particle-${i}`}
          style={[
            styles.particle,
            { backgroundColor: color },
            animatedStyle,
          ]}
        />
      );
    });
  };
  
  // Render wood grain texture overlay
  const renderWoodGrain = () => {
    if (!theme.woodGrain) return null;
    
    return (
      <View style={styles.woodGrainContainer} pointerEvents="none">
        {[...Array(8)].map((_, i) => (
          <View
            key={`grain-${i}`}
            style={[
              styles.woodGrainLine,
              {
                top: 30 + i * 35,
                opacity: 0.1 + (i % 3) * 0.05,
                transform: [{ rotate: `${-5 + i * 2}deg` }],
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Current word display */}
      <View style={styles.wordDisplayContainer}>
        <LinearGradient
          colors={
            currentWord.length >= 3 
              ? ['rgba(46, 204, 113, 0.4)', 'rgba(39, 174, 96, 0.4)'] 
              : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']
          }
          style={styles.wordDisplay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[
            styles.currentWordText,
            currentWord.length >= 3 && styles.validWordText
          ]}>
            {currentWord || '• • •'}
          </Text>
          {currentWord.length >= 3 && (
            <View style={styles.submitHintBadge}>
              <Text style={styles.submitHintText}>TAP TO SUBMIT</Text>
            </View>
          )}
        </LinearGradient>
      </View>
      
      {/* Main wheel */}
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[styles.wheelWrapper, wheelAnimatedStyle]}>
          {/* Outer shadow/glow ring */}
          <View style={[styles.outerShadow, { shadowColor: theme.glowColor }]} />
          
          {/* Outer decorative ring */}
          <LinearGradient
            colors={theme.outerRing as [string, string, ...string[]]}
            style={styles.outerRing}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Wood grain overlay */}
            {renderWoodGrain()}
            
            {/* Inner ring */}
            <LinearGradient
              colors={theme.innerRing as [string, string, ...string[]]}
              style={styles.innerRing}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >
              {/* Decorative circles */}
              <View style={styles.decorativeRing1} />
              <View style={styles.decorativeRing2} />
              
              {/* Connection lines */}
              {renderConnectionLines()}
              
              {/* Center circle */}
              <Animated.View style={[styles.centerCircleWrapper, centerAnimatedStyle]}>
                <LinearGradient
                  colors={theme.centerGradient as [string, string, ...string[]]}
                  style={styles.centerCircle}
                >
                  <Text style={styles.centerIcon}>✦</Text>
                </LinearGradient>
              </Animated.View>
              
              {/* Letter buttons */}
              {letters.map((letter, index) => {
                const position = getLetterPosition(index);
                const isSelected = selectedLetterIndices.includes(index);
                const selectionOrder = selectedLetterIndices.indexOf(index);
                
                return (
                  <LetterButton
                    key={`letter-${index}`}
                    letter={letter}
                    position={position}
                    isSelected={isSelected}
                    selectionOrder={selectionOrder}
                    onPress={() => handleSelectLetter(index)}
                    theme={theme}
                    animationsEnabled={animationsEnabled}
                  />
                );
              })}
            </LinearGradient>
          </LinearGradient>
          
          {/* Particles layer */}
          <View style={styles.particlesContainer} pointerEvents="none">
            {renderParticles()}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// Letter Button Component
interface LetterButtonProps {
  letter: string;
  position: { x: number; y: number };
  isSelected: boolean;
  selectionOrder: number;
  onPress: () => void;
  theme: typeof PREMIUM_WHEELS.wooden;
  animationsEnabled: boolean;
}

const LetterButton: React.FC<LetterButtonProps> = ({
  letter,
  position,
  isSelected,
  selectionOrder,
  onPress,
  theme,
  animationsEnabled,
}) => {
  const scale = useSharedValue(1);
  const shadowRadius = useSharedValue(4);
  
  useEffect(() => {
    if (!animationsEnabled) return;
    
    if (isSelected) {
      scale.value = withSpring(1.15, { damping: 8, stiffness: 250 });
      shadowRadius.value = withTiming(15, { duration: 150 });
    } else {
      scale.value = withSpring(1, { damping: 10, stiffness: 150 });
      shadowRadius.value = withTiming(4, { duration: 150 });
    }
  }, [isSelected, animationsEnabled]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowRadius: shadowRadius.value,
  }));
  
  const gradientColors = isSelected 
    ? theme.letterButtonSelected 
    : theme.letterButton;
  
  return (
    <Animated.View
      style={[
        styles.letterWrapper,
        {
          left: position.x,
          top: position.y,
          shadowColor: isSelected ? theme.glowColor : '#000',
        },
        animatedStyle,
      ]}
    >
      <LinearGradient
        colors={gradientColors as [string, string, ...string[]]}
        style={styles.letterButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text style={[
          styles.letterText,
          { color: isSelected ? theme.textColorSelected : theme.textColor }
        ]}>
          {letter}
        </Text>
      </LinearGradient>
      
      {/* Selection order badge */}
      {isSelected && selectionOrder >= 0 && (
        <View style={styles.selectionBadge}>
          <Text style={styles.selectionBadgeText}>{selectionOrder + 1}</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wordDisplayContainer: {
    marginBottom: 20,
  },
  wordDisplay: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    minWidth: 180,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  currentWordText: {
    fontSize: 26,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  validWordText: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  submitHintBadge: {
    marginTop: 6,
    backgroundColor: 'rgba(46, 204, 113, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  submitHintText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  wheelWrapper: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerShadow: {
    position: 'absolute',
    width: WHEEL_SIZE + 20,
    height: WHEEL_SIZE + 20,
    borderRadius: (WHEEL_SIZE + 20) / 2,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  outerRing: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  woodGrainContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    borderRadius: WHEEL_SIZE / 2,
  },
  woodGrainLine: {
    position: 'absolute',
    left: -20,
    right: -20,
    height: 2,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  innerRing: {
    width: WHEEL_SIZE - 20,
    height: WHEEL_SIZE - 20,
    borderRadius: (WHEEL_SIZE - 20) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  decorativeRing1: {
    position: 'absolute',
    width: WHEEL_SIZE - 50,
    height: WHEEL_SIZE - 50,
    borderRadius: (WHEEL_SIZE - 50) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  decorativeRing2: {
    position: 'absolute',
    width: WHEEL_SIZE - 80,
    height: WHEEL_SIZE - 80,
    borderRadius: (WHEEL_SIZE - 80) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed',
  },
  lineContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  connectionLine: {
    position: 'absolute',
    height: 8,
    borderRadius: 4,
    transformOrigin: 'left center',
  },
  lineGlow: {
    position: 'absolute',
    height: 16,
    borderRadius: 8,
    transformOrigin: 'left center',
  },
  centerCircleWrapper: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    elevation: 8,
  },
  centerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  centerIcon: {
    fontSize: 24,
    color: '#8B4513',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  letterWrapper: {
    position: 'absolute',
    width: LETTER_SIZE,
    height: LETTER_SIZE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 8,
  },
  letterButton: {
    width: LETTER_SIZE,
    height: LETTER_SIZE,
    borderRadius: LETTER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  letterText: {
    fontSize: 24,
    fontWeight: '900',
  },
  selectionBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF4757',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  selectionBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});

export default PremiumLetterWheel;
