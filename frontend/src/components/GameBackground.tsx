/**
 * Professional Game Background System
 * Auto-changing beautiful backgrounds based on level themes
 */

import React, { useEffect, useState, useRef, memo } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// ============================================
// BEAUTIFUL BACKGROUND IMAGES (Unsplash)
// ============================================
const BACKGROUND_IMAGES = {
  // Nature & Mountains
  mountains1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  mountains2: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  mountains3: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
  
  // Ocean & Beach
  ocean1: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
  ocean2: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  ocean3: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
  
  // Forest & Nature
  forest1: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
  forest2: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80',
  forest3: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
  
  // Desert & Canyon
  desert1: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
  desert2: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&q=80',
  canyon1: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
  
  // Sky & Clouds
  sunset1: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80',
  sunset2: 'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=800&q=80',
  clouds1: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80',
  
  // Northern Lights & Night
  aurora1: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
  aurora2: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80',
  stars1: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
  
  // Tropical & Flowers
  tropical1: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
  flowers1: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
  cherry1: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80',
  
  // Ice & Winter
  winter1: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80',
  ice1: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=800&q=80',
  snow1: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=800&q=80',
  
  // Abstract & Minimal
  abstract1: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80',
  gradient1: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
  minimal1: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
};

// ============================================
// THEME CONFIGURATIONS
// ============================================
interface ThemeConfig {
  name: string;
  images: string[];
  gradient: [string, string, string];
  overlayOpacity: number;
  particleColor: string;
}

const THEME_CONFIGS: Record<string, ThemeConfig> = {
  // Levels 1-15: Mountain Adventure
  mountains: {
    name: 'Mountain Adventure',
    images: [BACKGROUND_IMAGES.mountains1, BACKGROUND_IMAGES.mountains2, BACKGROUND_IMAGES.mountains3],
    gradient: ['#1a1a2e', '#16213e', '#0f3460'],
    overlayOpacity: 0.4,
    particleColor: '#ffffff',
  },
  // Levels 16-30: Desert Journey
  desert: {
    name: 'Desert Journey',
    images: [BACKGROUND_IMAGES.desert1, BACKGROUND_IMAGES.desert2, BACKGROUND_IMAGES.canyon1],
    gradient: ['#2d1b00', '#4a3000', '#6b4400'],
    overlayOpacity: 0.35,
    particleColor: '#ffd700',
  },
  // Levels 31-45: Tropical Paradise
  tropical: {
    name: 'Tropical Paradise',
    images: [BACKGROUND_IMAGES.tropical1, BACKGROUND_IMAGES.ocean2, BACKGROUND_IMAGES.flowers1],
    gradient: ['#004d40', '#00695c', '#00897b'],
    overlayOpacity: 0.35,
    particleColor: '#00ff87',
  },
  // Levels 46-60: Ocean Depths
  ocean: {
    name: 'Ocean Depths',
    images: [BACKGROUND_IMAGES.ocean1, BACKGROUND_IMAGES.ocean3, BACKGROUND_IMAGES.ocean2],
    gradient: ['#001f3f', '#003366', '#004080'],
    overlayOpacity: 0.4,
    particleColor: '#00bcd4',
  },
  // Levels 61-75: Eastern Wonders
  asian: {
    name: 'Eastern Wonders',
    images: [BACKGROUND_IMAGES.cherry1, BACKGROUND_IMAGES.forest2, BACKGROUND_IMAGES.sunset1],
    gradient: ['#2d0a1e', '#4a1232', '#6b1a47'],
    overlayOpacity: 0.35,
    particleColor: '#ffb7c5',
  },
  // Levels 76-90: European Charm
  european: {
    name: 'European Charm',
    images: [BACKGROUND_IMAGES.forest1, BACKGROUND_IMAGES.clouds1, BACKGROUND_IMAGES.sunset2],
    gradient: ['#1a1a2e', '#2d3a4f', '#3d4f6f'],
    overlayOpacity: 0.4,
    particleColor: '#f4d03f',
  },
  // Levels 91-105: Volcanic Fury
  volcanic: {
    name: 'Volcanic Fury',
    images: [BACKGROUND_IMAGES.desert2, BACKGROUND_IMAGES.sunset1, BACKGROUND_IMAGES.canyon1],
    gradient: ['#1a0a00', '#3d1a00', '#5c2a00'],
    overlayOpacity: 0.45,
    particleColor: '#ff4500',
  },
  // Levels 106-120: Arctic Frost
  arctic: {
    name: 'Arctic Frost',
    images: [BACKGROUND_IMAGES.winter1, BACKGROUND_IMAGES.ice1, BACKGROUND_IMAGES.snow1],
    gradient: ['#0a1628', '#1a3a5c', '#2a5a8c'],
    overlayOpacity: 0.35,
    particleColor: '#87ceeb',
  },
  // Levels 121-135: Wild Jungle
  jungle: {
    name: 'Wild Jungle',
    images: [BACKGROUND_IMAGES.forest1, BACKGROUND_IMAGES.forest3, BACKGROUND_IMAGES.tropical1],
    gradient: ['#0a1a0a', '#1a3a1a', '#2a5a2a'],
    overlayOpacity: 0.4,
    particleColor: '#32cd32',
  },
  // Levels 136-150: Cosmic Quest
  space: {
    name: 'Cosmic Quest',
    images: [BACKGROUND_IMAGES.stars1, BACKGROUND_IMAGES.aurora1, BACKGROUND_IMAGES.gradient1],
    gradient: ['#0a0a1a', '#1a1a3a', '#2a2a5a'],
    overlayOpacity: 0.3,
    particleColor: '#9370db',
  },
  // Levels 151+: Aurora Dreams
  aurora: {
    name: 'Aurora Dreams',
    images: [BACKGROUND_IMAGES.aurora1, BACKGROUND_IMAGES.aurora2, BACKGROUND_IMAGES.stars1],
    gradient: ['#0a1a2a', '#1a3a4a', '#2a5a6a'],
    overlayOpacity: 0.3,
    particleColor: '#00ff7f',
  },
};

// ============================================
// GET THEME FOR LEVEL
// ============================================
export const getThemeForLevel = (level: number): ThemeConfig => {
  if (level <= 15) return THEME_CONFIGS.mountains;
  if (level <= 30) return THEME_CONFIGS.desert;
  if (level <= 45) return THEME_CONFIGS.tropical;
  if (level <= 60) return THEME_CONFIGS.ocean;
  if (level <= 75) return THEME_CONFIGS.asian;
  if (level <= 90) return THEME_CONFIGS.european;
  if (level <= 105) return THEME_CONFIGS.volcanic;
  if (level <= 120) return THEME_CONFIGS.arctic;
  if (level <= 135) return THEME_CONFIGS.jungle;
  if (level <= 150) return THEME_CONFIGS.space;
  return THEME_CONFIGS.aurora;
};

// ============================================
// FLOATING PARTICLES COMPONENT
// ============================================
const FloatingParticle: React.FC<{ color: string; delay: number }> = memo(({ color, delay }) => {
  const translateY = useRef(new Animated.Value(height + 50)).current;
  const translateX = useRef(new Animated.Value(Math.random() * width)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.3 + Math.random() * 0.7)).current;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(height + 50);
      translateX.setValue(Math.random() * width);
      opacity.setValue(0);

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -50,
            duration: 8000 + Math.random() * 4000,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.6,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.delay(4000),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start(() => animate());
    };

    animate();
  }, []);

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          backgroundColor: color,
          transform: [{ translateX }, { translateY }, { scale }],
          opacity,
        },
      ]}
    />
  );
});

// ============================================
// MAIN BACKGROUND COMPONENT
// ============================================
interface GameBackgroundProps {
  level: number;
  children: React.ReactNode;
}

export const GameBackground: React.FC<GameBackgroundProps> = memo(({ level, children }) => {
  const theme = getThemeForLevel(level);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Auto-change background every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageIndex((prev) => (prev + 1) % theme.images.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [theme]);

  // Reset image index when theme changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoaded(false);
  }, [level]);

  const currentImage = theme.images[currentImageIndex];

  return (
    <View style={styles.container}>
      {/* Gradient Base */}
      <LinearGradient
        colors={theme.gradient}
        style={StyleSheet.absoluteFill}
      />

      {/* Background Image with Fade */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
        <ImageBackground
          source={{ uri: currentImage }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        >
          {/* Dark Overlay for readability */}
          <LinearGradient
            colors={[
              `rgba(0, 0, 0, ${theme.overlayOpacity + 0.2})`,
              `rgba(0, 0, 0, ${theme.overlayOpacity})`,
              `rgba(0, 0, 0, ${theme.overlayOpacity + 0.3})`,
            ]}
            style={StyleSheet.absoluteFill}
          />
        </ImageBackground>
      </Animated.View>

      {/* Floating Particles */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingParticle
            key={i}
            color={theme.particleColor}
            delay={i * 800}
          />
        ))}
      </View>

      {/* Vignette Effect */}
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'transparent', 'transparent', 'rgba(0,0,0,0.5)']}
        locations={[0, 0.2, 0.8, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Content */}
      {children}
    </View>
  );
});

// ============================================
// SIMPLE GRADIENT BACKGROUND (Fallback)
// ============================================
interface SimpleBackgroundProps {
  level: number;
  children: React.ReactNode;
}

export const SimpleBackground: React.FC<SimpleBackgroundProps> = memo(({ level, children }) => {
  const theme = getThemeForLevel(level);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.gradient}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Subtle Glow Orbs */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[styles.glowOrb, styles.glowOrb1, { backgroundColor: theme.particleColor }]} />
        <View style={[styles.glowOrb, styles.glowOrb2, { backgroundColor: theme.particleColor }]} />
        <View style={[styles.glowOrb, styles.glowOrb3, { backgroundColor: theme.particleColor }]} />
      </View>

      {children}
    </View>
  );
});

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  glowOrb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.05,
  },
  glowOrb1: {
    width: 200,
    height: 200,
    top: '10%',
    left: '-10%',
  },
  glowOrb2: {
    width: 150,
    height: 150,
    top: '50%',
    right: '-5%',
  },
  glowOrb3: {
    width: 180,
    height: 180,
    bottom: '10%',
    left: '20%',
  },
});

export default GameBackground;
