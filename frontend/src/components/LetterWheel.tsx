import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '../store/gameStore';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.78, 300);
const LETTER_SIZE = 52;

export const LetterWheel: React.FC = () => {
  const { currentLevel, selectedLetterIndices, currentWord, selectLetter, submitWord, clearSelection } = useGameStore();
  
  const letters = currentLevel?.letters || [];
  const numLetters = letters.length;
  
  // Calculate positions in a circle
  const getLetterPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (WHEEL_SIZE - LETTER_SIZE) / 2 - 12;
    const x = Math.cos(angle) * radius + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    const y = Math.sin(angle) * radius + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    return { x, y };
  };
  
  // Calculate letter center positions for lines
  const getLetterCenter = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (WHEEL_SIZE - LETTER_SIZE) / 2 - 12;
    const x = Math.cos(angle) * radius + WHEEL_SIZE / 2;
    const y = Math.sin(angle) * radius + WHEEL_SIZE / 2;
    return { x, y };
  };
  
  const handleSelectLetter = (index: number) => {
    try {
      selectLetter(index);
    } catch (e) {
      console.log('Error selecting letter:', e);
    }
  };
  
  const handleSubmit = () => {
    try {
      if (currentWord.length >= 3) {
        submitWord();
      } else {
        clearSelection();
      }
    } catch (e) {
      console.log('Error submitting:', e);
    }
  };
  
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
          colors={currentWord.length >= 3 
            ? ['rgba(16, 185, 129, 0.4)', 'rgba(5, 150, 105, 0.4)'] 
            : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.04)']}
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
      <View style={styles.wheelWrapper}>
        {/* Outer glow */}
        <View style={styles.outerGlow} />
        
        {/* Main wheel */}
        <LinearGradient
          colors={['rgba(15, 12, 41, 0.95)', 'rgba(48, 43, 99, 0.95)', 'rgba(36, 36, 62, 0.95)']}
          style={[styles.wheel, { width: WHEEL_SIZE, height: WHEEL_SIZE }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Decorative rings */}
          <View style={styles.decorativeRing1} />
          <View style={styles.decorativeRing2} />
          <View style={styles.decorativeRing3} />
          
          {/* Connection lines */}
          {renderLines()}
          
          {/* Center circle with gradient */}
          <LinearGradient
            colors={['rgba(102, 126, 234, 0.3)', 'rgba(118, 75, 162, 0.3)']}
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
                    colors={['#667eea', '#764ba2', '#f093fb']}
                    style={[styles.letterContainer, styles.letterSelected]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.letterShine} />
                    <Text style={[styles.letterText, styles.letterTextSelected]}>
                      {letter}
                    </Text>
                  </LinearGradient>
                ) : (
                  <LinearGradient
                    colors={['#ffffff', '#f0f0f0', '#e8e8e8']}
                    style={styles.letterContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  >
                    <View style={styles.letterShineUnselected} />
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
      
      {/* Clear button */}
      {currentWord.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordDisplayWrapper: {
    marginBottom: 18,
  },
  wordDisplay: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 28,
    minWidth: 160,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  currentWordText: {
    fontSize: 26,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  validWord: {
    color: '#10b981',
    textShadowColor: 'rgba(16, 185, 129, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  submitHint: {
    marginTop: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tapToSubmit: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10b981',
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
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  wheel: {
    position: 'relative',
    borderRadius: WHEEL_SIZE / 2,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  decorativeRing1: {
    position: 'absolute',
    width: WHEEL_SIZE - 20,
    height: WHEEL_SIZE - 20,
    borderRadius: (WHEEL_SIZE - 20) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    left: 10,
    top: 10,
  },
  decorativeRing2: {
    position: 'absolute',
    width: WHEEL_SIZE - 45,
    height: WHEEL_SIZE - 45,
    borderRadius: (WHEEL_SIZE - 45) / 2,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.15)',
    left: 22.5,
    top: 22.5,
  },
  decorativeRing3: {
    position: 'absolute',
    width: WHEEL_SIZE - 70,
    height: WHEEL_SIZE - 70,
    borderRadius: (WHEEL_SIZE - 70) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    borderStyle: 'dashed',
    left: 35,
    top: 35,
  },
  centerCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    left: '50%',
    top: '50%',
    marginLeft: -30,
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  centerText: {
    fontSize: 22,
    color: 'rgba(255, 255, 255, 0.4)',
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
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  letterSelected: {
    transform: [{ scale: 1.1 }],
    shadowColor: '#667eea',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  letterShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderTopLeftRadius: LETTER_SIZE / 2,
    borderTopRightRadius: LETTER_SIZE / 2,
  },
  letterShineUnselected: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderTopLeftRadius: LETTER_SIZE / 2,
    borderTopRightRadius: LETTER_SIZE / 2,
  },
  letterText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  letterTextSelected: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  selectionBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  selectionBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
  },
  line: {
    position: 'absolute',
    height: 5,
    backgroundColor: '#667eea',
    borderRadius: 2.5,
    zIndex: -1,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 3,
  },
  clearButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  clearButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default LetterWheel;
