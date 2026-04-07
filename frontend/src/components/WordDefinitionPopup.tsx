import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { getWordDefinition, WordDefinition } from '../data/wordDefinitions';

const { width } = Dimensions.get('window');

interface WordDefinitionPopupProps {
  word: string | null;
  onDismiss: () => void;
}

const WordDefinitionPopup: React.FC<WordDefinitionPopupProps> = ({ word, onDismiss }) => {
  const [definition, setDefinition] = useState<WordDefinition | null>(null);
  const slideAnim = useRef(new Animated.Value(100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (word) {
      const def = getWordDefinition(word);
      setDefinition(def);
      
      // Animate in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [word]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  if (!word || !definition) return null;

  const partOfSpeechColors: Record<string, string> = {
    noun: '#3498db',
    verb: '#e74c3c',
    adjective: '#f39c12',
    adverb: '#9b59b6',
    preposition: '#1abc9c',
    conjunction: '#34495e',
    pronoun: '#2ecc71',
    interjection: '#e91e63',
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity style={styles.card} onPress={handleDismiss} activeOpacity={0.9}>
        {/* Word Header */}
        <View style={styles.header}>
          <Text style={styles.word}>{definition.word}</Text>
          <View
            style={[
              styles.partOfSpeechBadge,
              { backgroundColor: partOfSpeechColors[definition.partOfSpeech] || '#888' },
            ]}
          >
            <Text style={styles.partOfSpeech}>{definition.partOfSpeech}</Text>
          </View>
        </View>

        {/* Definition */}
        <Text style={styles.definition}>{definition.definition}</Text>

        {/* Example */}
        {definition.example && (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleLabel}>Example:</Text>
            <Text style={styles.example}>"{definition.example}"</Text>
          </View>
        )}

        {/* Synonyms */}
        {definition.synonyms && definition.synonyms.length > 0 && (
          <View style={styles.synonymsContainer}>
            <Text style={styles.synonymsLabel}>Synonyms:</Text>
            <View style={styles.synonymsRow}>
              {definition.synonyms.slice(0, 3).map((syn, index) => (
                <View key={index} style={styles.synonymBadge}>
                  <Text style={styles.synonymText}>{syn}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Fun Fact */}
        {definition.funFact && (
          <View style={styles.funFactContainer}>
            <Text style={styles.funFactIcon}>💡</Text>
            <Text style={styles.funFact}>{definition.funFact}</Text>
          </View>
        )}

        <Text style={styles.tapToDismiss}>Tap to dismiss</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    zIndex: 1000,
  },
  card: {
    backgroundColor: 'rgba(26, 26, 46, 0.95)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  partOfSpeechBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  partOfSpeech: {
    fontSize: 12,
    color: '#fff',
    fontStyle: 'italic',
  },
  definition: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
    marginBottom: 12,
  },
  exampleContainer: {
    marginBottom: 12,
  },
  exampleLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  example: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
  },
  synonymsContainer: {
    marginBottom: 12,
  },
  synonymsLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  synonymsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  synonymBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  synonymText: {
    fontSize: 12,
    color: '#9b59b6',
  },
  funFactContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(243,156,18,0.1)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  funFactIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  funFact: {
    fontSize: 13,
    color: '#f39c12',
    flex: 1,
  },
  tapToDismiss: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
});

export default WordDefinitionPopup;
