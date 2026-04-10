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
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxHeight: 50,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  wordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  foundChip: {
    backgroundColor: 'rgba(76, 175, 80, 0.25)',
    borderColor: 'rgba(76, 175, 80, 0.5)',
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 12,
    marginRight: 4,
  },
  foundWord: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  lockIcon: {
    fontSize: 10,
    marginRight: 4,
    opacity: 0.7,
  },
  wordLength: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  hintWordLength: {
    color: '#00d4aa',
  },
});

export default WordPlaceholders;
