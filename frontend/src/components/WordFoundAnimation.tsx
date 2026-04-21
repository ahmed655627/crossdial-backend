import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface WordFoundAnimationProps {
  word: string;
  visible: boolean;
  onComplete: () => void;
}

export const WordFoundAnimation: React.FC<WordFoundAnimationProps> = ({
  word,
  visible,
  onComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  
  // Particle animations
  const particles = useRef(
    Array(12).fill(0).map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(1),
      scale: new Animated.Value(1),
    }))
  ).current;

  useEffect(() => {
    if (visible) {
      // Haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Reset animations
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
      bounceAnim.setValue(0);
      
      particles.forEach(p => {
        p.x.setValue(0);
        p.y.setValue(0);
        p.opacity.setValue(1);
        p.scale.setValue(1);
      });

      // Main word animation
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            tension: 100,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -15,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(600),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onComplete();
      });

      // Particle explosion animation
      particles.forEach((particle, index) => {
        const angle = (index / particles.length) * Math.PI * 2;
        const distance = 80 + Math.random() * 60;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        Animated.parallel([
          Animated.timing(particle.x, {
            toValue: targetX,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(particle.y, {
            toValue: targetY,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(particle.opacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(particle.scale, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const particleColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#DDA0DD', '#45B7D1'];

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Particles */}
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              backgroundColor: particleColors[index % particleColors.length],
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                { scale: particle.scale },
              ],
              opacity: particle.opacity,
            },
          ]}
        />
      ))}
      
      {/* Word display */}
      <Animated.View
        style={[
          styles.wordContainer,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: bounceAnim },
            ],
            opacity: opacityAnim,
          },
        ]}
      >
        <LinearGradient
          colors={['#4ECDC4', '#45B7D1', '#96CEB4']}
          style={styles.wordGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.wordText}>{word}</Text>
          <Text style={styles.checkmark}>✓</Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  wordContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  wordGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  wordText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  checkmark: {
    fontSize: 24,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: 'bold',
  },
});

export default WordFoundAnimation;
