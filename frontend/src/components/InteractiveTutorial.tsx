/**
 * Interactive Tutorial Component
 * Clean, step-by-step tutorial overlay
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  position: 'top' | 'center' | 'bottom';
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome!',
    description: 'Swipe between letters to form words',
    icon: '👆',
    position: 'center',
  },
  {
    id: 'wheel',
    title: 'Letter Wheel',
    description: 'Connect letters by dragging your finger',
    icon: '🔤',
    position: 'bottom',
  },
  {
    id: 'words',
    title: 'Find Words',
    description: 'Complete all words to finish the level',
    icon: '✨',
    position: 'top',
  },
  {
    id: 'hints',
    title: 'Need Help?',
    description: 'Use hints when you\'re stuck',
    icon: '💡',
    position: 'center',
  },
];

interface InteractiveTutorialProps {
  visible: boolean;
  onComplete: () => void;
}

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  visible,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleNext = async () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Complete tutorial
      await AsyncStorage.setItem('tutorial_completed', 'true');
      onComplete();
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('tutorial_completed', 'true');
    onComplete();
  };

  if (!visible) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.card,
          step.position === 'top' && styles.cardTop,
          step.position === 'center' && styles.cardCenter,
          step.position === 'bottom' && styles.cardBottom,
          { opacity: fadeAnim },
        ]}
      >
        <Text style={styles.icon}>{step.icon}</Text>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>

        <View style={styles.dotsRow}>
          {TUTORIAL_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {isLastStep ? "Let's Play!" : 'Next'}
          </Text>
          {!isLastStep && (
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    padding: 10,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1e1e3f',
    borderRadius: 24,
    padding: 30,
    marginHorizontal: 30,
    alignItems: 'center',
    maxWidth: 320,
  },
  cardTop: {
    marginTop: -height * 0.25,
  },
  cardCenter: {
    // Default center
  },
  cardBottom: {
    marginTop: height * 0.15,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#00b894',
    width: 24,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00b894',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
});

export default InteractiveTutorial;
