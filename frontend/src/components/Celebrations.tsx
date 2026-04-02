import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface CelebrationProps {
  visible: boolean;
  type: 'level_complete' | 'combo' | 'achievement' | 'bonus_word';
  onComplete?: () => void;
}

const CONFETTI_COLORS = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ff8a5b', '#a855f7'];

export const Celebration: React.FC<CelebrationProps> = ({
  visible,
  type,
  onComplete,
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: Animated.Value;
    y: Animated.Value;
    rotation: Animated.Value;
    scale: Animated.Value;
    color: string;
  }>>([]);

  useEffect(() => {
    if (visible) {
      // Create particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: new Animated.Value(Math.random() * width),
        y: new Animated.Value(-50),
        rotation: new Animated.Value(0),
        scale: new Animated.Value(1),
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      }));

      setParticles(newParticles);

      // Animate particles
      newParticles.forEach((particle, i) => {
        const delay = i * 30;
        const duration = 2000 + Math.random() * 1000;

        Animated.parallel([
          Animated.timing(particle.y, {
            toValue: height + 50,
            duration,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(particle.rotation, {
            toValue: Math.random() * 10 - 5,
            duration,
            delay,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(particle.scale, {
              toValue: 1.5,
              duration: duration / 2,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: 0,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });

      // Cleanup after animation
      setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3500);
    }
  }, [visible]);

  if (!visible && particles.length === 0) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              backgroundColor: particle.color,
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                {
                  rotate: particle.rotation.interpolate({
                    inputRange: [-5, 5],
                    outputRange: ['-180deg', '180deg'],
                  }),
                },
                { scale: particle.scale },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

// Fireworks effect
export const Fireworks: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [bursts, setBursts] = useState<Array<{
    id: number;
    x: number;
    y: number;
    particles: Array<{
      angle: number;
      distance: Animated.Value;
      opacity: Animated.Value;
      color: string;
    }>;
  }>>([]);

  useEffect(() => {
    if (visible) {
      // Create multiple bursts
      const newBursts = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: width * 0.2 + Math.random() * width * 0.6,
        y: height * 0.2 + Math.random() * height * 0.3,
        particles: Array.from({ length: 20 }, (_, j) => ({
          angle: (j / 20) * Math.PI * 2,
          distance: new Animated.Value(0),
          opacity: new Animated.Value(1),
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        })),
      }));

      setBursts(newBursts);

      // Animate bursts with delays
      newBursts.forEach((burst, i) => {
        const delay = i * 300;
        burst.particles.forEach((particle) => {
          Animated.parallel([
            Animated.timing(particle.distance, {
              toValue: 100 + Math.random() * 50,
              duration: 800,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0,
              duration: 1000,
              delay: delay + 300,
              useNativeDriver: true,
            }),
          ]).start();
        });
      });

      setTimeout(() => setBursts([]), 2000);
    }
  }, [visible]);

  if (!visible && bursts.length === 0) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {bursts.map((burst) => (
        <View key={burst.id} style={[styles.burstCenter, { left: burst.x, top: burst.y }]}>
          {burst.particles.map((particle, index) => (
            <Animated.View
              key={index}
              style={[
                styles.fireworkParticle,
                {
                  backgroundColor: particle.color,
                  opacity: particle.opacity,
                  transform: [
                    {
                      translateX: Animated.multiply(
                        particle.distance,
                        Math.cos(particle.angle)
                      ),
                    },
                    {
                      translateY: Animated.multiply(
                        particle.distance,
                        Math.sin(particle.angle)
                      ),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

// Star burst effect
export const StarBurst: React.FC<{ visible: boolean; x: number; y: number }> = ({
  visible,
  x,
  y,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0);
      opacityAnim.setValue(1);
      
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 500,
          delay: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.starBurst,
        {
          left: x - 30,
          top: y - 30,
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.starText}>✨</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  burstCenter: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  fireworkParticle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  starBurst: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starText: {
    fontSize: 50,
  },
});

export default Celebration;
