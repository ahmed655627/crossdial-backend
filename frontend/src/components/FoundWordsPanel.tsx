import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FoundWordsPanelProps {
  foundWords: string[];
  totalWords: number;
}

const FoundWordsPanel: React.FC<FoundWordsPanelProps> = ({
  foundWords,
  totalWords,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="list" size={14} color="#fff" />
          <Text style={styles.headerText}>
            {foundWords.length}/{totalWords} Words
          </Text>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#888"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.wordsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.wordsList}
          >
            {foundWords.map((word, index) => (
              <View key={index} style={styles.wordBadge}>
                <Ionicons name="checkmark-circle" size={12} color="#2ecc71" />
                <Text style={styles.wordText}>{word}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 6,
  },
  headerText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  wordsContainer: {
    paddingBottom: 8,
  },
  wordsList: {
    paddingHorizontal: 10,
  },
  wordBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  wordCheckmark: {
    marginRight: 4,
  },
  wordText: {
    fontSize: 11,
    color: '#2ecc71',
    fontWeight: '600',
  },
});

export default FoundWordsPanel;
