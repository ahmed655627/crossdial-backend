import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '../store/gameStore';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.82, 310);
const LETTER_SIZE = 54;

export const LetterWheel: React.FC = () => {
  const { currentLevel, selectedLetterIndices, currentWord, selectLetter, submitWord, clearSelection } = useGameStore();
  
  const letters = currentLevel?.letters || [];
  const numLetters = letters.length;
  
  // Calculate positions in a circle
  const getLetterPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (WHEEL_SIZE - LETTER_SIZE) / 2 - 15;
    const x = Math.cos(angle) * radius + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    const y = Math.sin(angle) * radius + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    return { x, y };
  };
  
  // Calculate letter center positions for gesture detection
  const getLetterCenter = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (WHEEL_SIZE - LETTER_SIZE) / 2 - 15;
    const x = Math.cos(angle) * radius + WHEEL_SIZE / 2;
    const y = Math.sin(angle) * radius + WHEEL_SIZE / 2;
    return { x, y };
  };
  
  const findLetterAtPosition = (x: number, y: number): number | null => {
    for (let i = 0; i < numLetters; i++) {
      const center = getLetterCenter(i);
      const distance = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
      if (distance < LETTER_SIZE / 2 + 8) {
        return i;
      }
    }
    return null;
  };
  
  const handleSelectLetter = (index: number) => {
    selectLetter(index);
  };
  
  const handleSubmit = () => {
    if (currentWord.length >= 3) {
      submitWord();
    } else {
      clearSelection();
    }
  };
  
  const panGesture = Gesture.Pan()
    .onStart((event) => {
      const letterIndex = findLetterAtPosition(event.x, event.y);
      if (letterIndex !== null) {
        runOnJS(handleSelectLetter)(letterIndex);
      }
    })
    .onUpdate((event) => {
      const letterIndex = findLetterAtPosition(event.x, event.y);
      if (letterIndex !== null) {
        runOnJS(handleSelectLetter)(letterIndex);
      }
    })
    .onEnd(() => {
      runOnJS(handleSubmit)();
    });
  
  // Draw lines between selected letters
  const renderLines = () => {
    if (selectedLetterIndices.length < 2) return null;
    
    const lines = [];
    for (let i = 0; i < selectedLetterIndices.length - 1; i++) {
      const start = getLetterCenter(selectedLetterIndices[i]);
      const end = getLetterCenter(selectedLetterIndices[i + 1]);
      
      const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
      
      lines.push(
        <View
          key={`line-${i}`}
          style={[
            styles.line,
            {
              width: length,
              left: start.x,
              top: start.y - 3,
              transform: [{ rotate: `${angle}deg` }],
              transformOrigin: 'left center',
            },
          ]}
        />
      );
    }
    return lines;
  };
  
  return (
    <View style={styles.container}>
      {/* Current word display - tap to submit */}
      <TouchableOpacity 
        style={styles.wordDisplayWrapper}
        onPress={() => {
          if (currentWord.length >= 3) {
            submitWord();
          }
        }}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={currentWord.length >= 3 ? ['rgba(39, 174, 96, 0.3)', 'rgba(46, 204, 113, 0.3)'] : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={styles.wordDisplay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.currentWordText, currentWord.length >= 3 && styles.validWord]}>
            {currentWord || '• • •'}
          </Text>
          {currentWord.length >= 3 && (
            <View style={styles.submitHint}>
              <Text style={styles.tapToSubmit}>TAP TO SUBMIT</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Letter wheel */}
      <GestureDetector gesture={panGesture}>
        <View style={styles.wheelWrapper}>
          {/* Outer ring glow */}
          <View style={styles.outerGlow} />
          
          <LinearGradient
            colors={['rgba(102, 126, 234, 0.2)', 'rgba(118, 75, 162, 0.2)']}
            style={[styles.wheel, { width: WHEEL_SIZE, height: WHEEL_SIZE }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Decorative rings */}
            <View style={styles.decorativeRing1} />
            <View style={styles.decorativeRing2} />
            
            {/* Connection lines */}
            {renderLines()}
            
            {/* Center circle with gradient */}
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.centerCircle}
            >
              <Text style={styles.centerText}>✦</Text>
            </LinearGradient>
            
            {/* Letters */}
            {letters.map((letter, index) => {
              const position = getLetterPosition(index);
              const isSelected = selectedLetterIndices.includes(index);
              const selectionOrder = selectedLetterIndices.indexOf(index);
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.letterWrapper,
                    {
                      left: position.x,
                      top: position.y,
                    },
                  ]}
                  onPress={() => handleSelectLetter(index)}
                  activeOpacity={0.8}
                >
                  {isSelected ? (
                    <LinearGradient
                      colors={['#FFD700', '#FFA500', '#FF8C00']}
                      style={[styles.letterContainer, styles.letterSelected]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={[styles.letterText, styles.letterTextSelected]}>
                        {letter}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <LinearGradient
                      colors={['#ffffff', '#f0f0f0']}
                      style={styles.letterContainer}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={styles.letterText}>
                        {letter}
                      </Text>
                    </LinearGradient>
                  )}
                  {isSelected && selectionOrder >= 0 && (
                    <View style={styles.selectionBadge}>
                      <Text style={styles.selectionBadgeText}>{selectionOrder + 1}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </LinearGradient>
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordDisplayWrapper: {
    marginBottom: 20,
  },
  wordDisplay: {
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 30,
    minWidth: 180,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  currentWordText: {
    fontSize: 28,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 6,
    textTransform: 'uppercase',
  },
  validWord: {
    color: '#fff',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  submitHint: {
    marginTop: 6,
    backgroundColor: 'rgba(39, 174, 96, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tapToSubmit: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  wheelWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerGlow: {
    position: 'absolute',
    width: WHEEL_SIZE + 30,
    height: WHEEL_SIZE + 30,
    borderRadius: (WHEEL_SIZE + 30) / 2,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  wheel: {
    position: 'relative',
    borderRadius: WHEEL_SIZE / 2,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  decorativeRing1: {
    position: 'absolute',
    width: WHEEL_SIZE - 20,
    height: WHEEL_SIZE - 20,
    borderRadius: (WHEEL_SIZE - 20) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    left: 10,
    top: 10,
  },
  decorativeRing2: {
    position: 'absolute',
    width: WHEEL_SIZE - 40,
    height: WHEEL_SIZE - 40,
    borderRadius: (WHEEL_SIZE - 40) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderStyle: 'dashed',
    left: 20,
    top: 20,
  },
  centerCircle: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    left: '50%',
    top: '50%',
    marginLeft: -35,
    marginTop: -35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  centerText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  letterWrapper: {
    position: 'absolute',
    width: LETTER_SIZE,
    height: LETTER_SIZE,
  },
  letterContainer: {
    width: LETTER_SIZE,
    height: LETTER_SIZE,
    borderRadius: LETTER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  letterSelected: {
    transform: [{ scale: 1.12 }],
    shadowColor: '#FFD700',
    shadowOpacity: 0.6,
  },
  letterText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2c3e50',
  },
  letterTextSelected: {
    color: '#1a1a2e',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  selectionBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  selectionBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
  },
  line: {
    position: 'absolute',
    height: 6,
    backgroundColor: '#FFD700',
    borderRadius: 3,
    zIndex: -1,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
});
