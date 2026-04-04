/**
 * Themed Background Component
 * Dynamic background based on level/theme with particles
 */

import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BackgroundConfig, backgroundConfigs, getBackgroundForLevel } from '../utils/gameThemes';
import { useGameSettings } from '../stores/gameSettingsStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ThemedBackgroundProps {
  level?: number;
  backgroundTheme?: BackgroundConfig;
  children: React.ReactNode;
  showParticles?: boolean;
}

export const ThemedBackground: React.FC<ThemedBackgroundProps> = ({
  level = 1,
  backgroundTheme,
  children,
  showParticles = true,
}) => {
  const { particlesEnabled, customBackground } = useGameSettings();

  // Get background config
  const background = useMemo(() => {
    if (customBackground) return backgroundConfigs[customBackground];
    if (backgroundTheme) return backgroundTheme;
    return getBackgroundForLevel(level);
  }, [level, backgroundTheme, customBackground]);

  // Parse gradient colors
  const gradientColors = background.gradientColors.length >= 2
    ? background.gradientColors as [string, string, ...string[]]
    : ['#1a1a2e', '#16213e'] as [string, string];

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Background Image Overlay (if available) */}
      {background.imageUrl && (
        <Image
          source={{ uri: `${background.imageUrl}?w=800&h=1200&fit=crop` }}
          style={[styles.backgroundImage, { opacity: 1 - background.overlayOpacity }]}
          blurRadius={2}
        />
      )}

      {/* Animated Particles */}
      {showParticles && particlesEnabled && (
        <ParticleOverlay particleColor={background.particleColor} />
      )}

      {/* Content */}
      {children}
    </View>
  );
};

// Particle Overlay Component
interface ParticleOverlayProps {
  particleColor: string;
}

const ParticleOverlay: React.FC<ParticleOverlayProps> = ({ particleColor }) => {
  // Generate random particles
  const particles = useMemo(() => {
    return [...Array(25)].map((_, i) => ({
      id: i,
      x: Math.random() * SCREEN_WIDTH,
      y: Math.random() * SCREEN_HEIGHT,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3000,
      duration: 3000 + Math.random() * 4000,
    }));
  }, []);

  return (
    <View style={styles.particleContainer} pointerEvents="none">
      {particles.map((particle) => (
        <AnimatedParticle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          size={particle.size}
          color={particleColor}
          delay={particle.delay}
          duration={particle.duration}
        />
      ))}
    </View>
  );
};

// Single Animated Particle
interface AnimatedParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const AnimatedParticle: React.FC<AnimatedParticleProps> = ({
  x,
  y,
  size,
  color,
  delay,
  duration,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    // Floating up animation
    translateY.value = withRepeat(
      withSequence(
        withTiming(-50, { duration, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Fade in/out
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: duration / 2 }),
        withTiming(0.2, { duration: duration / 2 })
      ),
      -1,
      true
    );

    // Scale pulsing
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: duration / 2 }),
        withTiming(0.8, { duration: duration / 2 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  particleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
  },
});

export default ThemedBackground;
