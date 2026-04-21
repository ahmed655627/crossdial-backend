import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useGameStore } from '../store/gameStore';
import { soundManager } from '../utils/sounds';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;
// Further reduced wheel size to prevent bottom cutoff
const WHEEL_SIZE = isSmallScreen ? Math.min(width * 0.50, 190) : Math.min(width * 0.52, 210);
const LETTER_SIZE = isSmallScreen ? 40 : 44;

// Different colors for each letter position - vibrant rainbow colors
const LETTER_COLORS = [
  ['#FF6B6B', '#EE5A5A', '#DD4949'], // Red
  ['#4ECDC4', '#3DBDB5', '#2CADA6'], // Teal
  ['#FFE66D', '#FFD93D', '#FFCC00'], // Yellow
  ['#95E1D3', '#7DD3C4', '#65C5B5'], // Mint
  ['#FF9F43', '#FF8C2A', '#FF7911'], // Orange
  ['#A29BFE', '#8B82FD', '#7469FC'], // Purple
  ['#FD79A8', '#FC5C94', '#FB3F80'], // Pink
  ['#00CEC9', '#00B5B0', '#009C97'], // Cyan
  ['#6C5CE7', '#5B4BD6', '#4A3AC5'], // Indigo
  ['#E17055', '#D35F44', '#C54E33'], // Coral
];

interface LetterWheelProps {
  compact?: boolean;
}

export const LetterWheel: React.FC<LetterWheelProps> = ({ compact = false }) => {
  const { currentLevel, selectedLetterIndices, currentWord, selectLetter, submitWord, clearSelection } = useGameStore();
  
  const letters = currentLevel?.letters || [];
  const numLetters = letters.length;
  
  // Adjusted sizes for compact mode
  const wheelSize = compact ? WHEEL_SIZE * 0.85 : WHEEL_SIZE;
  const letterSize = compact ? LETTER_SIZE * 0.9 : LETTER_SIZE;
  
  // Calculate positions in a circle - keep letters well inside
  const getLetterPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (wheelSize - letterSize) / 2 - 8; // Tighter fit
    const x = Math.cos(angle) * radius + wheelSize / 2 - letterSize / 2;
    const y = Math.sin(angle) * radius + wheelSize / 2 - letterSize / 2;
    return { x, y };
  };
  
  // Calculate letter center positions for lines
  const getLetterCenter = (index: number) => {
    const angle = (index * 2 * Math.PI) / numLetters - Math.PI / 2;
    const radius = (wheelSize - letterSize) / 2 - 12;
    const x = Math.cos(angle) * radius + wheelSize / 2;
    const y = Math.sin(angle) * radius + wheelSize / 2;
    return { x, y };
  };
  
  const handleSelectLetter = (index: number) => {
    try {
      selectLetter(index);
      soundManager.playLetterTick();
    } catch (e) {
      console.log('Error selecting letter:', e);
    }
  };
  
  // Draw orange connection lines between selected letters
  const renderLines = () => {
    if (selectedLetterIndices.length < 2) return null;
    
    const lines = [];
    for (let i = 0; i < selectedLetterIndices.length - 1; i++) {
      const start = getLetterCenter(selectedLetterIndices[i]);
      const end = getLetterCenter(selectedLetterIndices[i + 1]);
      
      const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
      
      // Calculate center for proper rotation
      const centerX = (start.x + end.x) / 2;
      const centerY = (start.y + end.y) / 2;
      
      lines.push(
        <View key={`line-glow-${i}`}>
          {/* Glow effect */}
          <View
            style={[
              styles.lineGlow,
              {
                width: length + 8,
                left: centerX - (length + 8) / 2,
                top: centerY - 6,
                transform: [{ rotate: `${angle}deg` }],
              },
            ]}
          />
          {/* Main line - colorful gradient */}
          <LinearGradient
            colors={['#FF9800', '#E91E63', '#9C27B0']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[
              styles.line,
              {
                width: length,
                left: centerX - length / 2,
                top: centerY - 3,
                transform: [{ rotate: `${angle}deg` }],
              },
            ]}
          />
        </View>
      );
    }
    return lines;
  };
  
  const isValidWord = currentWord.length >= 3;
  
  return (
    <View style={styles.container}>
      {/* Current word display - Orange pill like Wordscapes */}
      <TouchableOpacity 
        style={styles.wordDisplayWrapper}
        onPress={() => isValidWord && submitWord()}
        activeOpacity={isValidWord ? 0.7 : 1}
      >
        <LinearGradient
          colors={isValidWord 
            ? ['#FF9800', '#E91E63', '#9C27B0'] // Colorful orange-pink-purple gradient
            : ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
          style={[styles.wordDisplay, isValidWord && styles.wordDisplayValid]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.currentWordText, isValidWord && styles.validWordText]}>
            {currentWord || '• • •'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Letter wheel - Frosted glass circle like Wordscapes */}
      <View style={[styles.wheelWrapper, { width: wheelSize + 20, height: wheelSize + 20 }]}>
        {/* Outer shadow ring */}
        <View style={[styles.outerShadow, { width: wheelSize + 16, height: wheelSize + 16, borderRadius: (wheelSize + 16) / 2 }]} />
        
        {/* Frosted glass wheel background */}
        <View style={[styles.wheelBackground, { width: wheelSize, height: wheelSize, borderRadius: wheelSize / 2 }]}>
          {/* Light gradient overlay for frosted look */}
          <LinearGradient
            colors={['rgba(255,255,255,0.95)', 'rgba(245,248,255,0.9)', 'rgba(240,244,255,0.85)']}
            style={[styles.wheel, { width: wheelSize, height: wheelSize, borderRadius: wheelSize / 2 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            {/* Subtle inner ring decorations */}
            <View style={[styles.innerRing1, { width: wheelSize - 20, height: wheelSize - 20, borderRadius: (wheelSize - 20) / 2 }]} />
            <View style={[styles.innerRing2, { width: wheelSize - 40, height: wheelSize - 40, borderRadius: (wheelSize - 40) / 2 }]} />
            
            {/* Connection lines */}
            {renderLines()}
            
            {/* Center decoration */}
            <View style={styles.centerCircle}>
              <View style={styles.centerInner} />
            </View>
            
            {/* Letters - Different colors for each letter */}
            {letters.map((letter, index) => {
              const position = getLetterPosition(index);
              const isSelected = selectedLetterIndices.includes(index);
              const selectionOrder = selectedLetterIndices.indexOf(index);
              
              // Get unique color for this letter position
              const letterColors = LETTER_COLORS[index % LETTER_COLORS.length];
              // Darker version when selected
              const selectedColors = letterColors.map(c => {
                // Darken by reducing brightness
                const r = parseInt(c.slice(1, 3), 16);
                const g = parseInt(c.slice(3, 5), 16);
                const b = parseInt(c.slice(5, 7), 16);
                const darken = 0.75;
                return `#${Math.round(r * darken).toString(16).padStart(2, '0')}${Math.round(g * darken).toString(16).padStart(2, '0')}${Math.round(b * darken).toString(16).padStart(2, '0')}`;
              });
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.letterWrapper,
                    { 
                      left: position.x, 
                      top: position.y,
                      width: letterSize,
                      height: letterSize,
                    },
                  ]}
                  onPress={() => handleSelectLetter(index)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={isSelected ? selectedColors : letterColors}
                    style={[
                      styles.letterCircle, 
                      { width: letterSize, height: letterSize, borderRadius: letterSize / 2 },
                      isSelected && styles.letterSelected
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {/* Top shine effect */}
                    <View style={[styles.letterShine, { borderTopLeftRadius: letterSize / 2, borderTopRightRadius: letterSize / 2 }]} />
                    {/* Bottom shadow */}
                    <View style={[styles.letterShadow, { borderBottomLeftRadius: letterSize / 2, borderBottomRightRadius: letterSize / 2 }]} />
                    <Text style={[styles.letterText, { fontSize: letterSize * 0.48 }]}>{letter}</Text>
                  </LinearGradient>
                  
                  {/* Selection order badge */}
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
      </View>
      
      {/* Clear button - subtle */}
      {currentWord.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={clearSelection}>
          <Text style={styles.clearBtnText}>✕ Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  wordDisplayWrapper: {
    marginBottom: 16,
  },
  wordDisplay: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 28,
    minWidth: 160,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  wordDisplayValid: {
    shadowColor: '#FF6B35',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  currentWordText: {
    fontSize: 24,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  validWordText: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  wheelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerShadow: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  wheelBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 12,
    overflow: 'hidden',
  },
  wheel: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(200, 210, 230, 0.5)',
  },
  innerRing1: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(180, 190, 210, 0.3)',
  },
  innerRing2: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(160, 170, 190, 0.2)',
    borderStyle: 'dashed',
  },
  centerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(220, 225, 235, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(180, 190, 210, 0.4)',
  },
  centerInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(200, 210, 225, 0.8)',
  },
  letterWrapper: {
    position: 'absolute',
  },
  letterCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 200, 100, 0.4)',
  },
  letterSelected: {
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    transform: [{ scale: 1.08 }],
  },
  letterShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '42%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  letterShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  letterText: {
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    zIndex: 1,
  },
  orderBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  orderBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  lineGlow: {
    position: 'absolute',
    height: 12,
    backgroundColor: 'rgba(255, 140, 66, 0.3)',
    borderRadius: 6,
  },
  line: {
    position: 'absolute',
    height: 6,
    borderRadius: 3,
  },
  clearBtn: {
    marginTop: 14,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  clearBtnText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default LetterWheel;
