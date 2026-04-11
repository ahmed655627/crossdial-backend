import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '../store/gameStore';
import { soundManager } from '../utils/sounds';

const { width, height } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.58, 220);
const LETTER_SIZE = 44;

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
  
  // Calculate letter center positions for lines
  const getLetterCenter = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (WHEEL_SIZE - LETTER_SIZE) / 2 - 10;
    const x = Math.cos(angle) * radius + WHEEL_SIZE / 2;
    const y = Math.sin(angle) * radius + WHEEL_SIZE / 2;
    return { x, y };
  };
  
  const handleSelectLetter = (index: number) => {
    try {
      selectLetter(index);
      // Play tick sound when letter is selected
      soundManager.playLetterTick();
    } catch (e) {
      console.log('Error selecting letter:', e);
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
              top: start.y - 2,
              transform: [{ rotate: `${angle}deg` }],
              // transformOrigin removed - not supported on React Native mobile
            },
          ]}
        />
      );
    }
    return lines;
  };
  
  const isValidWord = currentWord.length >= 3;
  
  return (
    <View style={styles.container}>
      {/* Current word display */}
      <TouchableOpacity 
        style={styles.wordDisplayWrapper}
        onPress={() => isValidWord && submitWord()}
        activeOpacity={isValidWord ? 0.7 : 1}
      >
        <LinearGradient
          colors={isValidWord 
            ? ['rgba(16, 185, 129, 0.35)', 'rgba(5, 150, 105, 0.35)'] 
            : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.04)']}
          style={[styles.wordDisplay, isValidWord && styles.wordDisplayValid]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.currentWordText, isValidWord && styles.validWordText]}>
            {currentWord || '• • •'}
          </Text>
          {isValidWord && (
            <Text style={styles.tapHint}>TAP</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Letter wheel */}
      <View style={styles.wheelWrapper}>
        {/* Outer glow ring */}
        <View style={styles.outerGlow} />
        
        {/* Main wheel */}
        <LinearGradient
          colors={['rgba(30, 27, 75, 0.95)', 'rgba(55, 48, 107, 0.95)', 'rgba(45, 40, 85, 0.95)']}
          style={[styles.wheel, { width: WHEEL_SIZE, height: WHEEL_SIZE }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Decorative rings */}
          <View style={[styles.decorRing, { width: WHEEL_SIZE - 25, height: WHEEL_SIZE - 25, borderRadius: (WHEEL_SIZE - 25) / 2 }]} />
          <View style={[styles.decorRing2, { width: WHEEL_SIZE - 50, height: WHEEL_SIZE - 50, borderRadius: (WHEEL_SIZE - 50) / 2 }]} />
          
          {/* Connection lines */}
          {renderLines()}
          
          {/* Center */}
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.3)', 'rgba(109, 40, 217, 0.3)']}
            style={styles.centerCircle}
          >
            <Text style={styles.centerIcon}>✦</Text>
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
                  { left: position.x, top: position.y },
                ]}
                onPress={() => handleSelectLetter(index)}
                activeOpacity={0.7}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
                    style={[styles.letterCircle, styles.letterSelected]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.letterShineSelected} />
                    <Text style={styles.letterTextSelected}>{letter}</Text>
                  </LinearGradient>
                ) : (
                  <LinearGradient
                    colors={['#ffffff', '#f8f8f8', '#f0f0f0']}
                    style={styles.letterCircle}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  >
                    <View style={styles.letterShine} />
                    <Text style={styles.letterText}>{letter}</Text>
                  </LinearGradient>
                )}
                {isSelected && selectionOrder >= 0 && (
                  <View style={styles.orderBadge}>
                    <Text style={styles.orderBadgeText}>{selectionOrder + 1}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </LinearGradient>
      </View>
      
      {/* Clear button */}
      {currentWord.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={clearSelection}>
          <Text style={styles.clearBtnText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  wordDisplayWrapper: {
    marginBottom: 14,
  },
  wordDisplay: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
    minWidth: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // gap: 10, // REMOVED
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  wordDisplayValid: {
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  currentWordText: {
    fontSize: 22,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: 4,
  },
  validWordText: {
    color: '#10b981',
  },
  tapHint: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  wheelWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerGlow: {
    position: 'absolute',
    width: WHEEL_SIZE + 20,
    height: WHEEL_SIZE + 20,
    borderRadius: (WHEEL_SIZE + 20) / 2,
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.15)',
  },
  wheel: {
    position: 'relative',
    borderRadius: WHEEL_SIZE / 2,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#6d28d9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  decorRing2: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.12)',
  },
  centerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  centerIcon: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  letterWrapper: {
    position: 'absolute',
    width: LETTER_SIZE,
    height: LETTER_SIZE,
  },
  letterCircle: {
    width: LETTER_SIZE,
    height: LETTER_SIZE,
    borderRadius: LETTER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    overflow: 'hidden',
  },
  letterSelected: {
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    transform: [{ scale: 1.08 }],
  },
  letterShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderTopLeftRadius: LETTER_SIZE / 2,
    borderTopRightRadius: LETTER_SIZE / 2,
  },
  letterShineSelected: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderTopLeftRadius: LETTER_SIZE / 2,
    borderTopRightRadius: LETTER_SIZE / 2,
  },
  letterText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e1b4b',
  },
  letterTextSelected: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  orderBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  orderBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  line: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
    zIndex: -1,
  },
  clearBtn: {
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  clearBtnText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default LetterWheel;
