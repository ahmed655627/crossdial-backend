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
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 48,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  wordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 50, 0.85)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  foundChip: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderColor: 'rgba(76, 175, 80, 0.6)',
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 14,
    marginRight: 5,
  },
  foundWord: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  lockIcon: {
    fontSize: 12,
    marginRight: 5,
  },
  wordLength: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  hintWordLength: {
    color: '#00d4aa',
  },
});

export default WordPlaceholders;
