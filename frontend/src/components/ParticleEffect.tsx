import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface Particle {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  scale: Animated.Value;
  opacity: Animated.Value;
  rotation: Animated.Value;
  color: string;
  emoji: string;
}

interface ParticleEffectProps {
  trigger: number; // Increment to trigger effect
  type?: 'confetti' | 'sparkle' | 'star';
  originX?: number;
  originY?: number;
}

const EMOJIS = {
  confetti: ['🎉', '🎊', '✨', '💫', '⭐'],
  sparkle: ['✨', '💫', '⭐', '🌟', '✧'],
  star: ['⭐', '🌟', '💛', '✨'],
};

const COLORS = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#e91e63'];

const ParticleEffect: React.FC<ParticleEffectProps> = ({
  trigger,
  type = 'confetti',
  originX = width / 2,
  originY = height / 3,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleCount = type === 'confetti' ? 15 : 8;

  useEffect(() => {
    if (trigger > 0) {
      createParticles();
    }
  }, [trigger]);

  const createParticles = () => {
    const newParticles: Particle[] = [];
    const emojis = EMOJIS[type];

    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        id: Date.now() + i,
        x: new Animated.Value(originX),
        y: new Animated.Value(originY),
        scale: new Animated.Value(0),
        opacity: new Animated.Value(1),
        rotation: new Animated.Value(0),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };
      newParticles.push(particle);
    }

    setParticles((prev) => [...prev, ...newParticles]);

    // Animate each particle
    newParticles.forEach((particle, index) => {
      const angle = (Math.PI * 2 * index) / particleCount + Math.random() * 0.5;
      const distance = 80 + Math.random() * 60;
      const duration = 800 + Math.random() * 400;

      Animated.parallel([
        Animated.timing(particle.x, {
          toValue: originX + Math.cos(angle) * distance,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(particle.y, {
          toValue: originY + Math.sin(angle) * distance + 50,
          duration,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(particle.scale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(particle.scale, {
            toValue: 0,
            duration: duration - 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(particle.opacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(particle.rotation, {
          toValue: Math.random() * 4 - 2,
          duration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Remove particle after animation
        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
      });
    });
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle) => (
        <Animated.Text
          key={particle.id}
          style={[
            styles.particle,
            {
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                { scale: particle.scale },
                {
                  rotate: particle.rotation.interpolate({
                    inputRange: [-2, 2],
                    outputRange: ['-360deg', '360deg'],
                  }),
                },
              ],
              opacity: particle.opacity,
            },
          ]}
        >
          {particle.emoji}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
    fontSize: 20,
  },
});

export default ParticleEffect;
