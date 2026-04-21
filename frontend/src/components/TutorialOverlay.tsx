import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface TutorialOverlayProps {
  onComplete: () => void;
}

const TUTORIAL_STEPS = [
  {
    title: 'Welcome to WonderWordQuest!',
    description: 'Swipe or tap letters on the wheel to form words',
    icon: '👋',
    highlight: 'wheel',
  },
  {
    title: 'Connect Letters',
    description: 'Tap letters in order to spell words. Lines show your path!',
    icon: '✨',
    highlight: 'wheel',
  },
  {
    title: 'Fill the Grid',
    description: 'Find all hidden words to complete the puzzle',
    icon: '🧩',
    highlight: 'grid',
  },
  {
    title: 'Use Hints',
    description: 'Stuck? Use hints to reveal letters. Watch ads to earn more!',
    icon: '💡',
    highlight: 'tools',
  },
  {
    title: 'Daily Rewards',
    description: 'Spin the wheel daily for free coins and hints!',
    icon: '🎁',
    highlight: 'none',
  },
];

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    checkFirstTime();
  }, []);

  useEffect(() => {
    // Pulse animation for finger
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const checkFirstTime = async () => {
    try {
      const hasSeenTutorial = await AsyncStorage.getItem('hasSeenTutorial');
      if (!hasSeenTutorial) {
        setVisible(true);
        animateIn();
      } else {
        onComplete();
      }
    } catch (e) {
      onComplete();
    }
  };

  const animateIn = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNext = async () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      // Animate out then in
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        animateIn();
      });
    } else {
      // Complete tutorial
      await AsyncStorage.setItem('hasSeenTutorial', 'true');
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        onComplete();
      });
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('hasSeenTutorial', 'true');
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onComplete();
    });
  };

  if (!visible) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.overlay} />
      
      {/* Animated finger pointing */}
      <Animated.View
        style={[
          styles.fingerContainer,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Text style={styles.finger}>👆</Text>
      </Animated.View>
      
      {/* Tutorial card */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={['#1a1a3e', '#2d2d5a']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Progress dots */}
          <View style={styles.progressContainer}>
            {TUTORIAL_STEPS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentStep && styles.progressDotActive,
                  index < currentStep && styles.progressDotCompleted,
                ]}
              />
            ))}
          </View>
          
          {/* Icon */}
          <Text style={styles.icon}>{step.icon}</Text>
          
          {/* Title */}
          <Text style={styles.title}>{step.title}</Text>
          
          {/* Description */}
          <Text style={styles.description}>{step.description}</Text>
          
          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            {!isLastStep && (
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <LinearGradient
                colors={['#4ECDC4', '#45B7D1']}
                style={styles.nextGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.nextText}>
                  {isLastStep ? "Let's Play!" : 'Next'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 3000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  fingerContainer: {
    position: 'absolute',
    top: height * 0.45,
    left: width * 0.5 - 25,
  },
  finger: {
    fontSize: 50,
  },
  cardContainer: {
    width: width * 0.9,
    maxWidth: 400,
    marginBottom: 40,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#4ECDC4',
    width: 24,
  },
  progressDotCompleted: {
    backgroundColor: '#4ECDC4',
  },
  icon: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextGradient: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default TutorialOverlay;
