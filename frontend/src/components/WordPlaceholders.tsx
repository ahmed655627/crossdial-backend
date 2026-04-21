import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

  return (
    <View style={styles.container}>
      {/* Clean horizontal scroll for words */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sortedWords.map((word, index) => {
          const isFound = foundWords.map(w => w.toUpperCase()).includes(word.toUpperCase());
          const isHintTarget = isShowingHint && hintWord?.toUpperCase() === word.toUpperCase();
          
          if (isFound) {
            // Found word - green gradient chip
            return (
              <LinearGradient
                key={index}
                colors={['rgba(76, 175, 80, 0.35)', 'rgba(56, 142, 60, 0.35)']}
                style={styles.foundChip}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.foundWord}>{word.toUpperCase()}</Text>
              </LinearGradient>
            );
          }
          
          // Locked word - minimal dark chip
          return (
            <Animated.View 
              key={index} 
              style={[
                styles.lockedChip,
                isHintTarget && {
                  backgroundColor: glowColor,
                  borderColor: glowBorder,
                }
              ]}
            >
              <Text style={styles.lockIcon}>
                {isHintTarget ? '💡' : '🔒'}
              </Text>
              <Text style={[
                styles.wordLength,
                isHintTarget && styles.hintWordLength
              ]}>
                {word.length}
              </Text>
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  lockedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(40, 40, 60, 0.6)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 54,
    minHeight: 40,
  },
  foundChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(76, 175, 80, 0.6)',
    minWidth: 54,
    minHeight: 40,
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 13,
    marginRight: 4,
    fontWeight: 'bold',
  },
  foundWord: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  lockIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  wordLength: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '700',
  },
  hintWordLength: {
    color: '#00d4aa',
  },
});

export default WordPlaceholders;
