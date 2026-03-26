import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { useGameStore } from '../store/gameStore';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.85, 320);
const LETTER_SIZE = 56;

export const LetterWheel: React.FC = () => {
  const { currentLevel, selectedLetterIndices, currentWord, selectLetter, submitWord, clearSelection } = useGameStore();
  
  const letters = currentLevel?.letters || [];
  const numLetters = letters.length;
  
  // Calculate positions in a circle
  const getLetterPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (WHEEL_SIZE - LETTER_SIZE) / 2 - 10;
    const x = Math.cos(angle) * radius + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    const y = Math.sin(angle) * radius + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    return { x, y };
  };
  
  // Calculate letter center positions for gesture detection
  const getLetterCenter = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (WHEEL_SIZE - LETTER_SIZE) / 2 - 10;
    const x = Math.cos(angle) * radius + WHEEL_SIZE / 2;
    const y = Math.sin(angle) * radius + WHEEL_SIZE / 2;
    return { x, y };
  };
  
  const findLetterAtPosition = (x: number, y: number): number | null => {
    for (let i = 0; i < numLetters; i++) {
      const center = getLetterCenter(i);
      const distance = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
      if (distance < LETTER_SIZE / 2 + 5) {
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
              top: start.y - 2,
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
        style={styles.wordDisplay}
        onPress={() => {
          if (currentWord.length >= 3) {
            submitWord();
          }
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.currentWordText}>
          {currentWord || ' '}
        </Text>
        {currentWord.length >= 3 && (
          <Text style={styles.tapToSubmit}>Tap to submit</Text>
        )}
      </TouchableOpacity>
      
      {/* Letter wheel */}
      <GestureDetector gesture={panGesture}>
        <View style={[styles.wheel, { width: WHEEL_SIZE, height: WHEEL_SIZE }]}>
          {/* Connection lines */}
          {renderLines()}
          
          {/* Center circle */}
          <View style={styles.centerCircle} />
          
          {/* Letters */}
          {letters.map((letter, index) => {
            const position = getLetterPosition(index);
            const isSelected = selectedLetterIndices.includes(index);
            const selectionOrder = selectedLetterIndices.indexOf(index);
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.letterContainer,
                  {
                    left: position.x,
                    top: position.y,
                  },
                  isSelected && styles.letterSelected,
                ]}
                onPress={() => handleSelectLetter(index)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.letterText,
                  isSelected && styles.letterTextSelected
                ]}>
                  {letter}
                </Text>
                {isSelected && selectionOrder >= 0 && (
                  <View style={styles.selectionBadge}>
                    <Text style={styles.selectionBadgeText}>{selectionOrder + 1}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
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
  wordDisplay: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
    minWidth: 150,
    alignItems: 'center',
  },
  currentWordText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  tapToSubmit: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  wheel: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1000,
  },
  centerCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    left: '50%',
    top: '50%',
    marginLeft: -30,
    marginTop: -30,
  },
  letterContainer: {
    position: 'absolute',
    width: LETTER_SIZE,
    height: LETTER_SIZE,
    borderRadius: LETTER_SIZE / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  letterSelected: {
    backgroundColor: '#FFD700',
    transform: [{ scale: 1.15 }],
  },
  letterText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  letterTextSelected: {
    color: '#1a1a2e',
  },
  selectionBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  line: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#FFD700',
    borderRadius: 2,
    zIndex: -1,
  },
});
