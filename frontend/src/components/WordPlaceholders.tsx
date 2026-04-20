import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
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

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 212, 170, 0.1)', 'rgba(0, 212, 170, 0.4)'],
  });
  
  const glowBorder = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 212, 170, 0.2)', 'rgba(0, 212, 170, 0.7)'],
  });

  // Count found vs total
  const foundCount = foundWords.length;
  const totalCount = targetWords.length;

  return (
    <View style={styles.container}>
      {/* Compact horizontal scroll for words */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sortedWords.map((word, index) => {
          const isFound = foundWords.map(w => w.toUpperCase()).includes(word.toUpperCase());
          const isHintTarget = isShowingHint && hintWord?.toUpperCase() === word.toUpperCase();
          
          return (
            <Animated.View 
              key={index} 
              style={[
                styles.wordChip,
                isFound && styles.foundChip,
                isHintTarget && {
                  backgroundColor: glowColor,
                  borderColor: glowBorder,
                }
              ]}
            >
              {isFound ? (
                <>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.foundWord}>{word}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.lockIcon}>
                    {isHintTarget ? '💡' : '🔒'}
                  </Text>
                  <Text style={[
                    styles.wordLength,
                    isHintTarget && styles.hintWordLength
                  ]}>
                    {word.length}
                  </Text>
                </>
              )}
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  wordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 30, 50, 0.7)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 22,
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    minWidth: 60,
    minHeight: 44, // Touch target
    opacity: 0.6, // Disabled state for locked
  },
  foundChip: {
    backgroundColor: 'rgba(76, 175, 80, 0.25)',
    borderColor: 'rgba(76, 175, 80, 0.7)',
    opacity: 1, // Active state
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 14,
    marginRight: 5,
    fontWeight: 'bold',
  },
  foundWord: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  lockIcon: {
    fontSize: 12,
    marginRight: 5,
  },
  wordLength: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.8,
  },
  hintWordLength: {
    color: '#00d4aa',
    opacity: 1,
  },
});

export default WordPlaceholders;
