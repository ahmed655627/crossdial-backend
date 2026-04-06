import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '../../store/gameStore';
import { LevelTheme } from '../../data/levelThemes';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.8, 300);
const LETTER_SIZE = 52;

interface EnhancedLetterWheelProps {
  theme?: LevelTheme;
}

export const EnhancedLetterWheel: React.FC<EnhancedLetterWheelProps> = ({ theme }) => {
  const { currentLevel, selectedLetterIndices, currentWord, selectLetter, submitWord, clearSelection } = useGameStore();
  
  const letters = currentLevel?.letters || [];
  const numLetters = letters.length;
  
  const themeColor = theme?.primaryColor || '#4fc3f7';
  const wheelBg = theme?.wheelBackground || 'rgba(0, 20, 40, 0.85)';
  
  const getLetterPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (WHEEL_SIZE - LETTER_SIZE) / 2 - 12;
    const x = Math.cos(angle) * radius + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    const y = Math.sin(angle) * radius + WHEEL_SIZE / 2 - LETTER_SIZE / 2;
    return { x, y };
  };
  
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
  
  // Draw connection lines
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
            styles.connectionLine,
            {
              width: length,
              left: start.x,
              top: start.y - 2,
              transform: [{ rotate: `${angle}deg` }],
              transformOrigin: 'left center',
              backgroundColor: themeColor,
            },
          ]}
        />
      );
    }
    return lines;
  };
  
  return (
    <View style={styles.container}>
      {/* Word display */}
      <TouchableOpacity 
        style={styles.wordDisplayWrapper}
        onPress={() => currentWord.length >= 3 && submitWord()}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={currentWord.length >= 3 
            ? [themeColor + '40', themeColor + '20'] 
            : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={styles.wordDisplay}
        >
          <Text style={[styles.currentWordText, currentWord.length >= 3 && { color: themeColor }]}>
            {currentWord || '• • •'}
          </Text>
          {currentWord.length >= 3 && (
            <Text style={[styles.submitHint, { color: themeColor }]}>TAP TO SUBMIT</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Wheel */}
      <View style={styles.wheelWrapper}>
        {/* Outer glow ring */}
        <View style={[styles.outerGlow, { borderColor: themeColor + '30' }]} />
        
        <View style={[
          styles.wheel, 
          { 
            width: WHEEL_SIZE, 
            height: WHEEL_SIZE,
            backgroundColor: wheelBg,
          }
        ]}>
          {/* Decorative rings */}
          <View style={[styles.decorRing1, { borderColor: themeColor + '15' }]} />
          <View style={[styles.decorRing2, { borderColor: themeColor + '10' }]} />
          
          {/* Connection lines */}
          {renderLines()}
          
          {/* Center */}
          <LinearGradient
            colors={[themeColor + '30', themeColor + '10']}
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
                  styles.letterButton,
                  {
                    left: position.x,
                    top: position.y,
                    width: LETTER_SIZE,
                    height: LETTER_SIZE,
                  },
                ]}
                onPress={() => handleSelectLetter(index)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={isSelected 
                    ? [themeColor, themeColor + 'CC', themeColor + '99']
                    : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']}
                  style={[
                    styles.letterGradient,
                    isSelected && styles.selectedLetter,
                    { borderColor: isSelected ? themeColor : 'rgba(255, 255, 255, 0.2)' },
                  ]}
                >
                  {/* 3D highlight */}
                  {isSelected && <View style={styles.letterHighlight} />}
                  
                  <Text style={[
                    styles.letterText,
                    isSelected && styles.selectedText,
                  ]}>
                    {letter}
                  </Text>
                  
                  {/* Selection order badge */}
                  {isSelected && selectionOrder >= 0 && (
                    <View style={[styles.orderBadge, { backgroundColor: themeColor }]}>
                      <Text style={styles.orderText}>{selectionOrder + 1}</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      
      {/* Clear button */}
      {currentWord.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  wordDisplayWrapper: {
    marginBottom: 15,
  },
  wordDisplay: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    minWidth: 160,
    alignItems: 'center',
  },
  currentWordText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 4,
  },
  submitHint: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 1,
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
    borderWidth: 3,
  },
  wheel: {
    borderRadius: WHEEL_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
  },
  decorRing1: {
    position: 'absolute',
    width: WHEEL_SIZE - 30,
    height: WHEEL_SIZE - 30,
    borderRadius: (WHEEL_SIZE - 30) / 2,
    borderWidth: 1,
  },
  decorRing2: {
    position: 'absolute',
    width: WHEEL_SIZE - 60,
    height: WHEEL_SIZE - 60,
    borderRadius: (WHEEL_SIZE - 60) / 2,
    borderWidth: 1,
  },
  connectionLine: {
    position: 'absolute',
    height: 4,
    borderRadius: 2,
    zIndex: 1,
  },
  centerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIcon: {
    fontSize: 22,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  letterButton: {
    position: 'absolute',
    zIndex: 10,
  },
  letterGradient: {
    flex: 1,
    borderRadius: LETTER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    overflow: 'hidden',
  },
  selectedLetter: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  letterHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderTopLeftRadius: LETTER_SIZE / 2,
    borderTopRightRadius: LETTER_SIZE / 2,
  },
  letterText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  selectedText: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  orderBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  orderText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
  },
  clearText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
});
