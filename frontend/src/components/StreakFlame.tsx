/**
 * Streak Flame Component
 * Animated flame for daily streaks
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

interface StreakFlameProps {
  streakDays: number;
  size?: 'small' | 'medium' | 'large';
}

const StreakFlame: React.FC<StreakFlameProps> = ({
  streakDays,
  size = 'medium',
}) => {
  const flameAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Flame flicker animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(flameAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(flameAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const sizeConfig = {
    small: { emoji: 24, text: 12, container: 40 },
    medium: { emoji: 32, text: 14, container: 56 },
    large: { emoji: 48, text: 18, container: 80 },
  };

  const config = sizeConfig[size];

  // Flame color based on streak
  const getFlameEmoji = () => {
    if (streakDays >= 30) return '💜'; // Purple for 30+
    if (streakDays >= 14) return '💙'; // Blue for 14+
    if (streakDays >= 7) return '🧡'; // Orange for 7+
    return '🔥'; // Red for default
  };

  const flameRotate = flameAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-3deg', '3deg'],
  });

  const flameScale = flameAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.05, 1],
  });

  if (streakDays === 0) return null;

  return (
    <View style={[styles.container, { width: config.container, height: config.container }]}>
      <Animated.View
        style={[
          styles.glowCircle,
          {
            opacity: glowAnim,
            width: config.container * 1.5,
            height: config.container * 1.5,
          },
        ]}
      />
      <Animated.Text
        style={[
          styles.flame,
          {
            fontSize: config.emoji,
            transform: [{ rotate: flameRotate }, { scale: flameScale }],
          },
        ]}
      >
        {getFlameEmoji()}
      </Animated.Text>
      <Text style={[styles.streakText, { fontSize: config.text }]}>
        {streakDays}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowCircle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
  },
  flame: {
    position: 'absolute',
    top: 0,
  },
  streakText: {
    color: '#fff',
    fontWeight: '800',
    position: 'absolute',
    bottom: 2,
  },
});

export default StreakFlame;
