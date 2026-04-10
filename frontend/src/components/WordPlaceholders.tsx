import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

interface WordPlaceholdersProps {
  targetWords: string[];
  foundWords: string[];
  hintWord?: string | null;
  isShowingHint?: boolean;
}

const WordPlaceholders: React.FC<WordPlaceholdersProps> = ({
  targetWords,
  foundWords,
  hintWord,
  isShowingHint = false,
}) => {
  // Sort words by length for display
  const sortedWords = [...targetWords].sort((a, b) => a.length - b.length);
  
  // Glow animation for hint
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (isShowingHint && hintWord) {
      // Start subtle glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [isShowingHint, hintWord]);

  // Interpolate glow for hint word
  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 212, 170, 0.1)', 'rgba(0, 212, 170, 0.4)'],
  });
  
  const glowBorder = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 212, 170, 0.2)', 'rgba(0, 212, 170, 0.7)'],
  });

  return (
    <View style={styles.container}>
      {sortedWords.map((word, index) => {
        const isFound = foundWords.map(w => w.toUpperCase()).includes(word.toUpperCase());
        const isHintTarget = isShowingHint && hintWord?.toUpperCase() === word.toUpperCase();
        
        return (
          <View key={index} style={styles.wordRow}>
            {isFound ? (
              // Show the found word
              <View style={styles.foundWordContainer}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.foundWord}>{word}</Text>
              </View>
            ) : (
              // Show placeholder with word length (with optional glow hint)
              <Animated.View style={[
                styles.placeholderContainer,
                isHintTarget && {
                  backgroundColor: glowColor,
                  borderColor: glowBorder,
                }
              ]}>
                <Text style={[
                  styles.lockIcon,
                  isHintTarget && styles.hintLockIcon
                ]}>
                  {isHintTarget ? '💡' : '🔒'}
                </Text>
                <View style={styles.underscores}>
                  {word.split('').map((_, letterIndex) => (
                    <Text 
                      key={letterIndex} 
                      style={[
                        styles.underscore,
                        isHintTarget && letterIndex === 0 && styles.hintFirstLetter
                      ]}
                    >
                      _
                    </Text>
                  ))}
                </View>
                <Text style={[
                  styles.lengthHint,
                  isHintTarget && styles.hintLengthHint
                ]}>
                  ({word.length})
                </Text>
              </Animated.View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  wordRow: {
    marginVertical: 4,
  },
  foundWordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.4)',
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 16,
    marginRight: 8,
  },
  foundWord: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  placeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  lockIcon: {
    fontSize: 14,
    marginRight: 8,
    opacity: 0.6,
  },
  hintLockIcon: {
    opacity: 1,
  },
  underscores: {
    flexDirection: 'row',
    flex: 1,
  },
  underscore: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 3,
    letterSpacing: 2,
  },
  hintFirstLetter: {
    color: '#00d4aa',
    textShadowColor: '#00d4aa',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  lengthHint: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    marginLeft: 8,
  },
  hintLengthHint: {
    color: 'rgba(0, 212, 170, 0.8)',
  },
});

export default WordPlaceholders;
