import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface LevelCompleteProps {
  visible: boolean;
  level: number;
  stars: number; // 1-3
  coins: number;
  onContinue: () => void;
}

export const LevelCompleteAnimation: React.FC<LevelCompleteProps> = ({
  visible,
  level,
  stars,
  coins,
  onContinue,
}) => {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const starAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const coinAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  
  // Firework particles
  const fireworks = useRef(
    Array(20).fill(0).map(() => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(height),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    if (visible) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Reset all animations
      overlayOpacity.setValue(0);
      cardScale.setValue(0);
      cardOpacity.setValue(0);
      starAnims.forEach(s => s.setValue(0));
      coinAnim.setValue(0);
      buttonAnim.setValue(0);
      
      // Animate fireworks
      fireworks.forEach((fw, i) => {
        fw.x.setValue(Math.random() * width);
        fw.y.setValue(height);
        fw.opacity.setValue(0);
        fw.scale.setValue(0);
        
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(fw.y, {
              toValue: Math.random() * (height * 0.5),
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(fw.opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.delay(800),
              Animated.timing(fw.opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.spring(fw.scale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
              }),
              Animated.timing(fw.scale, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
            ]),
          ]).start();
        }, i * 100);
      });

      // Main animation sequence
      Animated.sequence([
        // Fade in overlay
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Pop in card
        Animated.parallel([
          Animated.spring(cardScale, {
            toValue: 1,
            friction: 6,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.timing(cardOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        // Animate stars one by one
        ...starAnims.slice(0, stars).map((starAnim, index) =>
          Animated.sequence([
            Animated.delay(index * 200),
            Animated.spring(starAnim, {
              toValue: 1,
              friction: 4,
              tension: 100,
              useNativeDriver: true,
            }),
          ])
        ),
        // Coins animation
        Animated.spring(coinAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        // Button fade in
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, stars]);

  if (!visible) return null;

  const fireworkColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#DDA0DD', '#45B7D1', '#F7DC6F', '#BB8FCE'];

  return (
    <View style={styles.container}>
      {/* Fireworks */}
      {fireworks.map((fw, index) => (
        <Animated.View
          key={index}
          style={[
            styles.firework,
            {
              backgroundColor: fireworkColors[index % fireworkColors.length],
              transform: [
                { translateX: fw.x },
                { translateY: fw.y },
                { scale: fw.scale },
              ],
              opacity: fw.opacity,
            },
          ]}
        />
      ))}
      
      {/* Overlay */}
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      
      {/* Card */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ scale: cardScale }],
            opacity: cardOpacity,
          },
        ]}
      >
        <LinearGradient
          colors={['#1a1a3e', '#2d2d5a', '#1a1a3e']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Level Complete Title */}
          <Text style={styles.title}>LEVEL {level}</Text>
          <Text style={styles.subtitle}>COMPLETE!</Text>
          
          {/* Stars */}
          <View style={styles.starsContainer}>
            {[0, 1, 2].map((index) => (
              <Animated.View
                key={index}
                style={[
                  styles.starWrapper,
                  {
                    transform: [
                      { scale: index < stars ? starAnims[index] : 0.5 },
                      { rotate: index < stars ? '0deg' : '0deg' },
                    ],
                    opacity: index < stars ? 1 : 0.3,
                  },
                ]}
              >
                <Text style={styles.star}>⭐</Text>
              </Animated.View>
            ))}
          </View>
          
          {/* Coins earned */}
          <Animated.View
            style={[
              styles.coinsContainer,
              {
                transform: [{ scale: coinAnim }],
              },
            ]}
          >
            <Text style={styles.coinIcon}>🪙</Text>
            <Text style={styles.coinText}>+{coins}</Text>
          </Animated.View>
          
          {/* Continue button */}
          <Animated.View style={{ opacity: buttonAnim }}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={onContinue}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4ECDC4', '#45B7D1']}
                style={styles.continueGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.continueText}>CONTINUE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
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
    zIndex: 2000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  firework: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  cardContainer: {
    width: width * 0.85,
    maxWidth: 350,
  },
  card: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFD700',
    letterSpacing: 2,
    marginTop: 4,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 20,
  },
  starWrapper: {
    marginHorizontal: 8,
  },
  star: {
    fontSize: 48,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 24,
  },
  coinIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  coinText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFD700',
  },
  continueButton: {
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  continueGradient: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});

export default LevelCompleteAnimation;
