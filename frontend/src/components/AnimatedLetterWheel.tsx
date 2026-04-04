/**
 * Animated Letter Wheel Component
 * With theme support and animations
 */

import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { WheelConfig, wheelConfigs, getWheelForLevel } from '../utils/gameThemes';
import { useGameSettings } from '../stores/gameSettingsStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(SCREEN_WIDTH * 0.85, 350);

interface AnimatedLetterWheelProps {
  letters: string[];
  selectedIndices: number[];
  onLetterPress: (index: number) => void;
  onShuffle?: () => void;
  level?: number;
  wheelDesign?: WheelConfig;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedLetterWheel: React.FC<AnimatedLetterWheelProps> = ({
  letters,
  selectedIndices,
  onLetterPress,
  onShuffle,
  level = 1,
  wheelDesign,
}) => {
  const { animationsEnabled, customWheel } = useGameSettings();
  
  // Get wheel config based on level or custom selection
  const wheel = useMemo(() => {
    if (customWheel) return wheelConfigs[customWheel];
    if (wheelDesign) return wheelDesign;
    return getWheelForLevel(level);
  }, [level, wheelDesign, customWheel]);

  // Wheel rotation animation
  const wheelRotation = useSharedValue(0);
  const wheelScale = useSharedValue(1);

  // Sparkle animations
  const sparkleOpacity = useSharedValue(0.5);
  const sparkleScale = useSharedValue(1);

  useEffect(() => {
    if (!animationsEnabled) return;

    // Subtle floating sparkle animation
    sparkleOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.3, { duration: 1500 })
      ),
      -1,
      true
    );

    sparkleScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 2000 }),
        withTiming(0.8, { duration: 2000 })
      ),
      -1,
      true
    );
  }, [animationsEnabled]);

  const handleShuffle = () => {
    if (animationsEnabled) {
      // Spin animation
      wheelScale.value = withSequence(
        withTiming(0.9, { duration: 100 }),
        withTiming(1, { duration: 300 })
      );
      wheelRotation.value = withTiming(
        wheelRotation.value + 360,
        { duration: 500, easing: Easing.out(Easing.cubic) }
      );
    }
    onShuffle?.();
  };

  const wheelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${wheelRotation.value}deg` },
      { scale: wheelScale.value },
    ],
  }));

  const sparkleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
    transform: [{ scale: sparkleScale.value }],
  }));

  // Calculate letter positions
  const letterRadius = WHEEL_SIZE / 2 - 70;
  const buttonSize = 38;

  const getLetterPosition = (index: number) => {
    const angle = (index * 2 * Math.PI / letters.length) - Math.PI / 2;
    return {
      x: Math.cos(angle) * letterRadius,
      y: Math.sin(angle) * letterRadius,
    };
  };

  // Parse gradient colors
  const outerGradient = wheel.outerRingGradient.length >= 2 
    ? wheel.outerRingGradient as [string, string, ...string[]]
    : [wheel.outerRingColor, wheel.outerRingColor] as [string, string];

  const innerGradient = wheel.innerGradient.length >= 2
    ? wheel.innerGradient as [string, string, ...string[]]
    : [wheel.innerColor, wheel.innerColor] as [string, string];

  return (
    <View style={styles.container}>
      {/* Sparkle particles around wheel */}
      <Animated.View style={[styles.sparkleContainer, sparkleAnimatedStyle]}>
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const dist = WHEEL_SIZE / 2 + 20 + (i % 3) * 15;
          return (
            <View
              key={i}
              style={[
                styles.sparkle,
                {
                  left: WHEEL_SIZE / 2 + Math.cos(angle) * dist - 4,
                  top: WHEEL_SIZE / 2 + Math.sin(angle) * dist - 4,
                  backgroundColor: wheel.glowColor,
                  width: 4 + (i % 2) * 4,
                  height: 4 + (i % 2) * 4,
                },
              ]}
            />
          );
        })}
      </Animated.View>

      {/* Main wheel */}
      <Animated.View style={[styles.wheelContainer, wheelAnimatedStyle]}>
        {/* Outer ring with gradient */}
        <LinearGradient
          colors={outerGradient}
          style={styles.outerRing}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Inner area with gradient */}
          <LinearGradient
            colors={innerGradient}
            style={styles.innerArea}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            {/* Center decoration */}
            <View style={[styles.centerCircle, { backgroundColor: wheel.outerRingColor }]}>
              <View style={[styles.centerDot, { backgroundColor: wheel.letterButtonColor }]} />
            </View>
          </LinearGradient>
        </LinearGradient>

        {/* Letter buttons */}
        {letters.map((letter, index) => {
          const pos = getLetterPosition(index);
          const isSelected = selectedIndices.includes(index);
          
          return (
            <LetterButton
              key={`${letter}-${index}`}
              letter={letter}
              position={pos}
              isSelected={isSelected}
              onPress={() => onLetterPress(index)}
              wheelConfig={wheel}
              buttonSize={buttonSize}
              animationsEnabled={animationsEnabled}
            />
          );
        })}
      </Animated.View>

      {/* Connection lines between selected letters */}
      {selectedIndices.length > 1 && (
        <View style={styles.linesContainer} pointerEvents="none">
          <ConnectionLines
            letters={letters}
            selectedIndices={selectedIndices}
            wheelSize={WHEEL_SIZE}
            letterRadius={letterRadius}
            lineColor={wheel.glowColor}
          />
        </View>
      )}
    </View>
  );
};

// Letter Button Component with animation
interface LetterButtonProps {
  letter: string;
  position: { x: number; y: number };
  isSelected: boolean;
  onPress: () => void;
  wheelConfig: WheelConfig;
  buttonSize: number;
  animationsEnabled: boolean;
}

const LetterButton: React.FC<LetterButtonProps> = ({
  letter,
  position,
  isSelected,
  onPress,
  wheelConfig,
  buttonSize,
  animationsEnabled,
}) => {
  const scale = useSharedValue(1);
  const glow = useSharedValue(0);

  useEffect(() => {
    if (!animationsEnabled) return;

    if (isSelected) {
      scale.value = withSpring(1.15, { damping: 8, stiffness: 200 });
      glow.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withSpring(1, { damping: 10, stiffness: 100 });
      glow.value = withTiming(0, { duration: 200 });
    }
  }, [isSelected, animationsEnabled]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: interpolate(glow.value, [0, 1], [0.2, 0.8]),
    shadowRadius: interpolate(glow.value, [0, 1], [2, 15]),
  }));

  const handlePress = () => {
    if (animationsEnabled) {
      scale.value = withSequence(
        withSpring(1.3, { damping: 5, stiffness: 300 }),
        withSpring(isSelected ? 1 : 1.15, { damping: 8, stiffness: 150 })
      );
    }
    onPress();
  };

  return (
    <AnimatedTouchable
      style={[
        styles.letterButton,
        {
          left: WHEEL_SIZE / 2 + position.x - buttonSize,
          top: WHEEL_SIZE / 2 + position.y - buttonSize,
          width: buttonSize * 2,
          height: buttonSize * 2,
          backgroundColor: isSelected ? wheelConfig.glowColor : wheelConfig.letterButtonColor,
          shadowColor: wheelConfig.glowColor,
        },
        animatedStyle,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.letterText,
          { 
            color: isSelected ? '#FFFFFF' : wheelConfig.letterTextColor,
            fontSize: buttonSize * 0.7,
          },
        ]}
      >
        {letter}
      </Text>
    </AnimatedTouchable>
  );
};

// Connection Lines Component
interface ConnectionLinesProps {
  letters: string[];
  selectedIndices: number[];
  wheelSize: number;
  letterRadius: number;
  lineColor: string;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  letters,
  selectedIndices,
  wheelSize,
  letterRadius,
  lineColor,
}) => {
  const getPosition = (index: number) => {
    const angle = (index * 2 * Math.PI / letters.length) - Math.PI / 2;
    return {
      x: wheelSize / 2 + Math.cos(angle) * letterRadius,
      y: wheelSize / 2 + Math.sin(angle) * letterRadius,
    };
  };

  const points = selectedIndices.map(i => getPosition(i));

  return (
    <View style={StyleSheet.absoluteFill}>
      {points.slice(0, -1).map((start, i) => {
        const end = points[i + 1];
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        return (
          <View
            key={i}
            style={[
              styles.connectionLine,
              {
                left: start.x,
                top: start.y - 3,
                width: length,
                backgroundColor: lineColor,
                transform: [{ rotate: `${angle}deg` }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleContainer: {
    position: 'absolute',
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
  },
  sparkle: {
    position: 'absolute',
    borderRadius: 10,
    opacity: 0.8,
  },
  wheelContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  innerArea: {
    width: WHEEL_SIZE - 24,
    height: WHEEL_SIZE - 24,
    borderRadius: (WHEEL_SIZE - 24) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  letterButton: {
    position: 'absolute',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  letterText: {
    fontWeight: 'bold',
  },
  linesContainer: {
    position: 'absolute',
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
  },
  connectionLine: {
    position: 'absolute',
    height: 6,
    borderRadius: 3,
    transformOrigin: 'left center',
  },
});

export default AnimatedLetterWheel;
