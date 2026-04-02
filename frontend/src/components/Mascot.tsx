import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface MascotProps {
  mood: 'happy' | 'thinking' | 'celebrating' | 'sad' | 'sleeping';
  message?: string;
  visible: boolean;
}

export const Mascot: React.FC<MascotProps> = ({ mood, message, visible }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const messageAnim = useRef(new Animated.Value(0)).current;

  const getMascotEmoji = () => {
    switch (mood) {
      case 'happy': return '🦉';
      case 'thinking': return '🧐';
      case 'celebrating': return '🥳';
      case 'sad': return '😢';
      case 'sleeping': return '😴';
      default: return '🦉';
    }
  };

  useEffect(() => {
    if (visible) {
      // Bounce animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Slide in
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }).start();

      // Message fade in
      if (message) {
        Animated.timing(messageAnim, {
          toValue: 1,
          duration: 300,
          delay: 300,
          useNativeDriver: true,
        }).start();
      }
    } else {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
      messageAnim.setValue(0);
    }
  }, [visible, message]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.mascotContainer,
          {
            transform: [
              { translateX: slideAnim },
              { translateY: bounceAnim },
            ],
          },
        ]}
      >
        <View style={styles.mascotCircle}>
          <Text style={styles.mascotEmoji}>{getMascotEmoji()}</Text>
        </View>
        {message && (
          <Animated.View
            style={[
              styles.speechBubble,
              { opacity: messageAnim },
            ]}
          >
            <Text style={styles.speechText}>{message}</Text>
            <View style={styles.speechTail} />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

// Preset messages for different situations
export const MASCOT_MESSAGES = {
  welcome: "Welcome back! Let's find some words!",
  hint: "Need a hint? I'm here to help!",
  combo: "Wow! You're on fire! 🔥",
  stuck: "Try looking for shorter words first!",
  levelComplete: "Amazing! You did it! 🎉",
  dailyReward: "Spin the wheel for a surprise!",
  achievement: "You've earned a new badge!",
  streak: "Keep up the streak!",
  sleeping: "zzz... Wake me up to play!",
};

// Mini mascot for corners/buttons
export const MiniMascot: React.FC<{
  onPress?: () => void;
  hasMessage?: boolean;
}> = ({ onPress, hasMessage }) => {
  const wiggleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (hasMessage) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wiggleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(wiggleAnim, {
            toValue: -1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(wiggleAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.delay(2000),
        ])
      ).start();
    }
  }, [hasMessage]);

  const rotate = wiggleAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-5deg', '0deg', '5deg'],
  });

  return (
    <Animated.View
      style={[
        styles.miniMascot,
        { transform: [{ rotate }] },
      ]}
    >
      <Text style={styles.miniEmoji}>🦉</Text>
      {hasMessage && (
        <View style={styles.notificationDot} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 120,
    right: 0,
    zIndex: 50,
  },
  mascotContainer: {
    alignItems: 'flex-end',
  },
  mascotCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginRight: 10,
  },
  mascotEmoji: {
    fontSize: 40,
  },
  speechBubble: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    maxWidth: 200,
    marginRight: 20,
    marginTop: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  speechText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  speechTail: {
    position: 'absolute',
    bottom: -8,
    right: 20,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },
  miniMascot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniEmoji: {
    fontSize: 24,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Mascot;
