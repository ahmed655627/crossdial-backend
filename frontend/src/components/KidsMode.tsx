import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Kids mode specific words - simple and fun
export const KIDS_WORDS = {
  animals: ['CAT', 'DOG', 'PIG', 'COW', 'HEN', 'BEE', 'ANT', 'BAT', 'FOX', 'OWL'],
  colors: ['RED', 'BLUE', 'PINK', 'GOLD', 'GRAY', 'TAN'],
  food: ['PIE', 'JAM', 'EGG', 'HAM', 'NUT', 'PEA', 'TEA'],
  nature: ['SUN', 'SKY', 'SEA', 'ICE', 'MUD', 'DEW', 'FOG'],
  toys: ['TOY', 'BAT', 'TOP', 'BOX', 'CAR', 'BUS'],
};

interface KidsModeWrapperProps {
  children: React.ReactNode;
  enabled: boolean;
}

export const KidsModeWrapper: React.FC<KidsModeWrapperProps> = ({ children, enabled }) => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const rainbowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (enabled) {
      // Create floating stars
      const newStars = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        delay: Math.random() * 2000,
      }));
      setStars(newStars);

      // Rainbow animation
      Animated.loop(
        Animated.timing(rainbowAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  const rainbowColors = rainbowAnim.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#9b59b6', '#ff6b6b'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#a855f7', '#ec4899', '#f472b6']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Floating stars */}
      {stars.map((star) => (
        <FloatingStar key={star.id} x={star.x} delay={star.delay} />
      ))}

      {/* Cartoon clouds */}
      <View style={[styles.cloud, styles.cloud1]}>
        <Text style={styles.cloudEmoji}>☁️</Text>
      </View>
      <View style={[styles.cloud, styles.cloud2]}>
        <Text style={styles.cloudEmoji}>☁️</Text>
      </View>

      {children}
    </View>
  );
};

const FloatingStar: React.FC<{ x: number; delay: number }> = ({ x, delay }) => {
  const floatAnim = useRef(new Animated.Value(height + 50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5 + Math.random() * 0.5)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(floatAnim, {
            toValue: -50,
            duration: 8000 + Math.random() * 4000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.star,
        {
          left: x,
          transform: [
            { translateY: floatAnim },
            { rotate },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <Text style={styles.starEmoji}>⭐</Text>
    </Animated.View>
  );
};

// Kid-friendly letter tiles
export const KidsLetterTile: React.FC<{
  letter: string;
  selected: boolean;
  onPress: () => void;
}> = ({ letter, selected, onPress }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={[
          styles.kidsTile,
          selected && styles.kidsTileSelected,
          { transform: [{ scale: bounceAnim }] },
        ]}
      >
        <Text style={styles.kidsTileLetter}>{letter}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Success celebration for kids
export const KidsSuccessCelebration: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [emojis, setEmojis] = useState<string[]>([]);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const celebrationEmojis = ['🎉', '⭐', '🎈', '🌟', '🥳', '👏', '🏆'];
      setEmojis(celebrationEmojis);

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2000);
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.celebration,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Text style={styles.celebrationText}>GREAT JOB!</Text>
      <View style={styles.emojiRow}>
        {emojis.map((emoji, i) => (
          <Text key={i} style={styles.celebrationEmoji}>{emoji}</Text>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  star: {
    position: 'absolute',
  },
  starEmoji: {
    fontSize: 30,
  },
  cloud: {
    position: 'absolute',
  },
  cloud1: {
    top: 50,
    left: 20,
  },
  cloud2: {
    top: 80,
    right: 40,
  },
  cloudEmoji: {
    fontSize: 60,
    opacity: 0.6,
  },
  kidsTile: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  kidsTileSelected: {
    backgroundColor: '#22c55e',
  },
  kidsTileLetter: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  celebration: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  celebrationText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 16,
  },
  emojiRow: {
    flexDirection: 'row',
    gap: 8,
  },
  celebrationEmoji: {
    fontSize: 32,
  },
});

export default KidsModeWrapper;
