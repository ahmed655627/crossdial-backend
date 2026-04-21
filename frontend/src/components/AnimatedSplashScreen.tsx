import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface AnimatedSplashScreenProps {
  onComplete: () => void;
}

const TIPS = [
  "Swipe to connect letters faster!",
  "Find bonus words for extra coins!",
  "Use hints wisely when stuck!",
  "Daily challenges give big rewards!",
  "Maintain your streak for bonuses!",
];

export const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  
  // Letter animations
  const letterAnims = useRef(
    'WONDER'.split('').map(() => ({
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(-50),
    }))
  ).current;
  
  const wordAnims = useRef(
    'QUEST'.split('').map(() => ({
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(50),
    }))
  ).current;
  
  const logoGlow = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const tipOpacity = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate letters one by one
    const animateLetters = () => {
      // Animate "WONDER"
      letterAnims.forEach((anim, index) => {
        setTimeout(() => {
          Animated.parallel([
            Animated.spring(anim.scale, {
              toValue: 1,
              friction: 4,
              tension: 100,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.spring(anim.translateY, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true,
            }),
          ]).start();
        }, index * 100);
      });
      
      // Animate "QUEST" after delay
      setTimeout(() => {
        wordAnims.forEach((anim, index) => {
          setTimeout(() => {
            Animated.parallel([
              Animated.spring(anim.scale, {
                toValue: 1,
                friction: 4,
                tension: 100,
                useNativeDriver: true,
              }),
              Animated.timing(anim.opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.spring(anim.translateY, {
                toValue: 0,
                friction: 5,
                useNativeDriver: true,
              }),
            ]).start();
          }, index * 100);
        });
      }, 600);
    };
    
    // Start letter animation
    animateLetters();
    
    // Logo glow animation
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoGlow, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(logoGlow, {
            toValue: 0.5,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 1200);
    
    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();
    
    // Update progress state
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
    
    // Tips rotation
    Animated.timing(tipOpacity, {
      toValue: 1,
      duration: 500,
      delay: 1500,
      useNativeDriver: true,
    }).start();
    
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % TIPS.length);
    }, 2000);
    
    // Complete after 3.5 seconds
    setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onComplete();
      });
    }, 3500);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    };
  }, []);

  const glowOpacity = logoGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const letterColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#A29BFE', '#45B7D1'];
  const questColors = ['#FF9F43', '#EE5A5A', '#DDA0DD', '#BB8FCE', '#F7DC6F'];

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <LinearGradient
        colors={['#1a1a3e', '#0d0d1a', '#1a1a3e']}
        style={styles.gradient}
      >
        {/* Background particles */}
        {Array(20).fill(0).map((_, i) => (
          <View
            key={i}
            style={[
              styles.particle,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                backgroundColor: letterColors[i % letterColors.length],
                opacity: Math.random() * 0.3 + 0.1,
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
              },
            ]}
          />
        ))}
        
        {/* Logo glow */}
        <Animated.View style={[styles.logoGlow, { opacity: glowOpacity }]} />
        
        {/* WONDER text */}
        <View style={styles.titleRow}>
          {'WONDER'.split('').map((letter, index) => (
            <Animated.View
              key={index}
              style={[
                styles.letterContainer,
                {
                  transform: [
                    { scale: letterAnims[index].scale },
                    { translateY: letterAnims[index].translateY },
                  ],
                  opacity: letterAnims[index].opacity,
                },
              ]}
            >
              <LinearGradient
                colors={[letterColors[index], letterColors[(index + 1) % letterColors.length]]}
                style={styles.letterBg}
              >
                <Text style={styles.letter}>{letter}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>
        
        {/* WORD text */}
        <Text style={styles.wordText}>WORD</Text>
        
        {/* QUEST text */}
        <View style={styles.titleRow}>
          {'QUEST'.split('').map((letter, index) => (
            <Animated.View
              key={index}
              style={[
                styles.letterContainer,
                {
                  transform: [
                    { scale: wordAnims[index].scale },
                    { translateY: wordAnims[index].translateY },
                  ],
                  opacity: wordAnims[index].opacity,
                },
              ]}
            >
              <LinearGradient
                colors={[questColors[index], questColors[(index + 1) % questColors.length]]}
                style={styles.letterBg}
              >
                <Text style={styles.letter}>{letter}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>
        
        {/* Loading progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{loadingProgress}%</Text>
        </View>
        
        {/* Tips */}
        <Animated.View style={[styles.tipContainer, { opacity: tipOpacity }]}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>{TIPS[currentTip]}</Text>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    borderRadius: 10,
  },
  logoGlow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#4ECDC4',
    top: height * 0.3,
  },
  titleRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  letterContainer: {
    marginHorizontal: 3,
  },
  letterBg: {
    width: 44,
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  letter: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  wordText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 8,
    marginVertical: 8,
  },
  progressContainer: {
    marginTop: 60,
    alignItems: 'center',
    width: width * 0.7,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tipText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
  },
});

export default AnimatedSplashScreen;
