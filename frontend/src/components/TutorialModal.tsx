import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface TutorialStep {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: '👋',
    title: 'Welcome to Wonder Words!',
    description: 'Discover hidden words and explore amazing destinations around the world!',
  },
  {
    icon: '🎯',
    title: 'Find the Words',
    description: 'Look at the crossword grid above. Your goal is to find all the hidden words that fit in the boxes.',
  },
  {
    icon: '⭕',
    title: 'Use the Letter Wheel',
    description: 'Swipe through the letters in the wheel at the bottom. Connect letters to form words!',
  },
  {
    icon: '✨',
    title: 'Earn Rewards',
    description: 'Complete levels to earn coins. Use coins for hints when you get stuck!',
  },
  {
    icon: '💡',
    title: 'Need Help?',
    description: 'Use hints to reveal a letter or shuffle the wheel. Watch ads to earn free hints!',
  },
  {
    icon: '🎁',
    title: 'Daily Rewards',
    description: 'Come back every day to spin the wheel and earn bonus rewards!',
  },
  {
    icon: '🚀',
    title: "You're Ready!",
    description: 'Start your word adventure now. Good luck and have fun!',
  },
];

interface TutorialModalProps {
  visible: boolean;
  onComplete: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  visible,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateTransition = (direction: 'next' | 'prev') => {
    const slideOut = direction === 'next' ? -50 : 50;
    const slideIn = direction === 'next' ? 50 : -50;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: slideOut,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentStep((prev) =>
        direction === 'next' ? prev + 1 : prev - 1
      );
      slideAnim.setValue(slideIn);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      animateTransition('next');
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      animateTransition('prev');
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Skip button */}
          {!isLastStep && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* Content */}
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <Text style={styles.icon}>{step.icon}</Text>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.description}>{step.description}</Text>
          </Animated.View>

          {/* Progress dots */}
          <View style={styles.dotsContainer}>
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

          {/* Navigation buttons */}
          <View style={styles.buttonRow}>
            {currentStep > 0 && (
              <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
                <Text style={styles.prevButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.nextButton, isLastStep && styles.startButton]}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {isLastStep ? "Let's Play!" : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  skipText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  icon: {
    fontSize: 72,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#8b5cf6',
    width: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  prevButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  prevButtonText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  startButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 48,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TutorialModal;
