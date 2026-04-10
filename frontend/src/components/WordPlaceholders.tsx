import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface WordPlaceholdersProps {
  targetWords: string[];
  foundWords: string[];
}

const WordPlaceholders: React.FC<WordPlaceholdersProps> = ({
  targetWords,
  foundWords,
}) => {
  // Sort words by length for display
  const sortedWords = [...targetWords].sort((a, b) => a.length - b.length);

  return (
    <View style={styles.container}>
      {sortedWords.map((word, index) => {
        const isFound = foundWords.includes(word);
        
        return (
          <View key={index} style={styles.wordRow}>
            {isFound ? (
              // Show the found word
              <View style={styles.foundWordContainer}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.foundWord}>{word}</Text>
              </View>
            ) : (
              // Show placeholder with word length
              <View style={styles.placeholderContainer}>
                <Text style={styles.lockIcon}>🔒</Text>
                <View style={styles.underscores}>
                  {word.split('').map((_, letterIndex) => (
                    <Text key={letterIndex} style={styles.underscore}>_</Text>
                  ))}
                </View>
                <Text style={styles.lengthHint}>({word.length})</Text>
              </View>
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
  lengthHint: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    marginLeft: 8,
  },
});

export default WordPlaceholders;
