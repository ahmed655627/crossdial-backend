import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface WordFormingDisplayProps {
  letters: string[];
  isValid?: boolean;
  isInvalid?: boolean;
}

const WordFormingDisplay: React.FC<WordFormingDisplayProps> = ({
  letters,
  isValid = false,
  isInvalid = false,
}) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isInvalid) {
      // Shake animation for invalid word
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [isInvalid]);

  useEffect(() => {
    if (isValid) {
      // Pulse animation for valid word
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
      
      // Glow animation
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [isValid]);

  // Animate each new letter
  const letterAnims = useRef<Animated.Value[]>([]);
  
  useEffect(() => {
    // Add new animation for new letter
    if (letters.length > letterAnims.current.length) {
      const newAnim = new Animated.Value(0);
      letterAnims.current.push(newAnim);
      Animated.spring(newAnim, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else if (letters.length < letterAnims.current.length) {
      letterAnims.current = letterAnims.current.slice(0, letters.length);
    }
  }, [letters.length]);

  if (letters.length === 0) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: shakeAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={
          isValid
            ? ['rgba(46, 204, 113, 0.3)', 'rgba(46, 204, 113, 0.1)']
            : isInvalid
            ? ['rgba(231, 76, 60, 0.3)', 'rgba(231, 76, 60, 0.1)']
            : ['rgba(102, 126, 234, 0.2)', 'rgba(102, 126, 234, 0.1)']
        }
        style={styles.gradient}
      >
        <View style={styles.lettersContainer}>
          {letters.map((letter, index) => {
            const anim = letterAnims.current[index] || new Animated.Value(1);
            return (
              <Animated.View
                key={index}
                style={[
                  styles.letterBox,
                  isValid && styles.letterBoxValid,
                  isInvalid && styles.letterBoxInvalid,
                  {
                    transform: [
                      {
                        scale: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 1],
                        }),
                      },
                    ],
                    opacity: anim,
                  },
                ]}
              >
                <Text style={[
                  styles.letter,
                  isValid && styles.letterValid,
                  isInvalid && styles.letterInvalid,
                ]}>
                  {letter}
                </Text>
              </Animated.View>
            );
          })}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 4,
  },
  gradient: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 80,
  },
  lettersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  letterBox: {
    width: 28,
    height: 32,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 1.5,
  },
  letterBoxValid: {
    backgroundColor: 'rgba(46, 204, 113, 0.3)',
    borderColor: '#2ecc71',
  },
  letterBoxInvalid: {
    backgroundColor: 'rgba(231, 76, 60, 0.3)',
    borderColor: '#e74c3c',
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  letterValid: {
    color: '#2ecc71',
  },
  letterInvalid: {
    color: '#e74c3c',
  },
});

export default WordFormingDisplay;
