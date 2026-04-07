import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ComboCounterProps {
  combo: number;
  multiplier: number;
}

const ComboCounter: React.FC<ComboCounterProps> = ({ combo, multiplier }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (combo > 1) {
      // Pulse and rotate animation
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(rotateAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: -1, duration: 100, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]),
      ]).start();
    }
  }, [combo]);

  // Continuous glow for high combos
  useEffect(() => {
    if (combo >= 3) {
      const pulseGlow = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0.5, duration: 500, useNativeDriver: true }),
        ])
      );
      pulseGlow.start();
      return () => pulseGlow.stop();
    }
  }, [combo]);

  if (combo < 2) return null;

  const getComboColor = () => {
    if (combo >= 5) return ['#ff6b6b', '#ee5a5a', '#ff8787'];
    if (combo >= 3) return ['#f39c12', '#e67e22', '#f5b041'];
    return ['#3498db', '#2980b9', '#5dade2'];
  };

  const getFireEmoji = () => {
    if (combo >= 5) return '🔥🔥🔥';
    if (combo >= 3) return '🔥🔥';
    return '🔥';
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale: scaleAnim },
            {
              rotate: rotateAnim.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: ['-5deg', '0deg', '5deg'],
              }),
            },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={getComboColor() as [string, string, ...string[]]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.fireEmoji}>{getFireEmoji()}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.comboText}>{combo}x</Text>
          <Text style={styles.comboLabel}>COMBO</Text>
        </View>
        <Text style={styles.multiplierText}>+{Math.round((multiplier - 1) * 100)}%</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  fireEmoji: {
    fontSize: 14,
  },
  textContainer: {
    alignItems: 'center',
  },
  comboText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  comboLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  multiplierText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
  },
});

export default ComboCounter;
