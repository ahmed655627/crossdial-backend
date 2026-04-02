import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export interface WorldWonder {
  id: string;
  name: string;
  colors: string[];
  icon: string;
  description: string;
}

export const WORLD_WONDERS: WorldWonder[] = [
  {
    id: 'pyramid',
    name: 'Great Pyramid of Giza',
    colors: ['#d4a574', '#c4956a', '#a67c52'],
    icon: '🚩',
    description: 'Ancient Egyptian pyramid in Giza',
  },
  {
    id: 'gardens',
    name: 'Hanging Gardens',
    colors: ['#228b22', '#32cd32', '#90ee90'],
    icon: '🌿',
    description: 'Legendary gardens of Babylon',
  },
  {
    id: 'colossus',
    name: 'Colossus of Rhodes',
    colors: ['#cd7f32', '#b87333', '#8b4513'],
    icon: '🗿',
    description: 'Giant bronze statue in Greece',
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse of Alexandria',
    colors: ['#4169e1', '#1e90ff', '#87ceeb'],
    icon: '🚨',
    description: 'Ancient lighthouse in Egypt',
  },
  {
    id: 'mausoleum',
    name: 'Mausoleum at Halicarnassus',
    colors: ['#dda0dd', '#da70d6', '#ba55d3'],
    icon: '🏛️',
    description: 'Tomb in ancient Turkey',
  },
  {
    id: 'temple',
    name: 'Temple of Artemis',
    colors: ['#ffd700', '#ffb347', '#ff8c00'],
    icon: '⚩️',
    description: 'Greek temple in Ephesus',
  },
  {
    id: 'zeus',
    name: 'Statue of Zeus',
    colors: ['#f0e68c', '#daa520', '#b8860b'],
    icon: '⚡',
    description: 'Giant seated figure at Olympia',
  },
];

export const getWonderForLevel = (level: number): WorldWonder => {
  const wonderIndex = Math.floor((level - 1) / 22) % WORLD_WONDERS.length;
  return WORLD_WONDERS[wonderIndex];
};

interface AnimatedBackgroundProps {
  wonder: WorldWonder;
  children: React.ReactNode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  wonder,
  children,
}) => {
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating particles animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim3, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim3, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Shimmer effect
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateY1 = floatAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const translateY2 = floatAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  const translateY3 = floatAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[wonder.colors[0], wonder.colors[1], wonder.colors[2] || wonder.colors[1]]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Floating particles */}
      <Animated.View
        style={[
          styles.particle,
          styles.particle1,
          { transform: [{ translateY: translateY1 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle2,
          { transform: [{ translateY: translateY2 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle3,
          { transform: [{ translateY: translateY3 }] },
        ]}
      />

      {/* Shimmer overlay */}
      <Animated.View
        style={[
          styles.shimmer,
          { transform: [{ translateX: shimmerTranslate }] },
        ]}
      />

      {/* Wonder icon watermark */}
      <View style={styles.watermark}>
        <Animated.Text
          style={[
            styles.watermarkText,
            {
              opacity: floatAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [0.05, 0.1],
              }),
            },
          ]}
        >
          {wonder.icon}
        </Animated.Text>
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  particle1: {
    left: '20%',
    top: '30%',
  },
  particle2: {
    right: '25%',
    top: '50%',
  },
  particle3: {
    left: '60%',
    top: '70%',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ skewX: '-20deg' }],
  },
  watermark: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
  watermarkText: {
    fontSize: 150,
  },
});

export default AnimatedBackground;
