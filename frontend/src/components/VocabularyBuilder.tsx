import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';

const { width } = Dimensions.get('window');

export interface LearnedWord {
  word: string;
  definition: string;
  example: string;
  learnedAt: string;
  timesEncountered: number;
  mastery: number; // 0-100
}

interface VocabularyBuilderModalProps {
  visible: boolean;
  onClose: () => void;
  learnedWords: LearnedWord[];
  totalWordsFound: number;
}

export const VocabularyBuilderModal: React.FC<VocabularyBuilderModalProps> = ({
  visible,
  onClose,
  learnedWords,
  totalWordsFound,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<LearnedWord | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'mastery' | 'alpha'>('recent');

  const filteredWords = learnedWords
    .filter(w => w.word.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'alpha') return a.word.localeCompare(b.word);
      if (sortBy === 'mastery') return b.mastery - a.mastery;
      return new Date(b.learnedAt).getTime() - new Date(a.learnedAt).getTime();
    });

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return '#22c55e';
    if (mastery >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getMasteryLabel = (mastery: number) => {
    if (mastery >= 80) return 'Mastered';
    if (mastery >= 50) return 'Learning';
    return 'New';
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>📚 Vocabulary Builder</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{learnedWords.length}</Text>
                <Text style={styles.statLabel}>Words Learned</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {learnedWords.filter(w => w.mastery >= 80).length}
                </Text>
                <Text style={styles.statLabel}>Mastered</Text>
              </View>
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search words..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Sort Options */}
          <View style={styles.sortRow}>
            {(['recent', 'mastery', 'alpha'] as const).map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.sortButton, sortBy === option && styles.sortButtonActive]}
                onPress={() => setSortBy(option)}
              >
                <Text style={[styles.sortText, sortBy === option && styles.sortTextActive]}>
                  {option === 'alpha' ? 'A-Z' : option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Word List */}
          <ScrollView style={styles.wordList} showsVerticalScrollIndicator={false}>
            {filteredWords.map((word, index) => (
              <TouchableOpacity
                key={index}
                style={styles.wordCard}
                onPress={() => setSelectedWord(word)}
              >
                <View style={styles.wordHeader}>
                  <Text style={styles.wordText}>{word.word}</Text>
                  <View style={[styles.masteryBadge, { backgroundColor: getMasteryColor(word.mastery) }]}>
                    <Text style={styles.masteryText}>{getMasteryLabel(word.mastery)}</Text>
                  </View>
                </View>
                <Text style={styles.definitionPreview} numberOfLines={1}>
                  {word.definition}
                </Text>
                <View style={styles.masteryBar}>
                  <View
                    style={[
                      styles.masteryFill,
                      { width: `${word.mastery}%`, backgroundColor: getMasteryColor(word.mastery) },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        {/* Word Detail Modal */}
        {selectedWord && (
          <Modal visible={true} transparent animationType="fade">
            <View style={styles.detailOverlay}>
              <View style={styles.detailCard}>
                <Text style={styles.detailWord}>{selectedWord.word}</Text>
                <View style={[styles.masteryBadge, { backgroundColor: getMasteryColor(selectedWord.mastery) }]}>
                  <Text style={styles.masteryText}>{selectedWord.mastery}% Mastery</Text>
                </View>
                
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Definition</Text>
                  <Text style={styles.detailText}>{selectedWord.definition}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Example</Text>
                  <Text style={styles.detailExample}>"{selectedWord.example}"</Text>
                </View>

                <View style={styles.detailStats}>
                  <Text style={styles.detailStat}>📅 Learned: {new Date(selectedWord.learnedAt).toLocaleDateString()}</Text>
                  <Text style={styles.detailStat}>🔄 Encountered: {selectedWord.timesEncountered}x</Text>
                </View>

                <TouchableOpacity
                  style={styles.detailClose}
                  onPress={() => setSelectedWord(null)}
                >
                  <Text style={styles.detailCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    maxHeight: '90%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sortButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  sortText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  sortTextActive: {
    color: '#fff',
  },
  wordList: {
    paddingHorizontal: 16,
    maxHeight: 300,
  },
  wordCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  masteryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  masteryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  definitionPreview: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 8,
  },
  masteryBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  masteryFill: {
    height: '100%',
    borderRadius: 2,
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  detailOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCard: {
    width: width * 0.9,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  detailWord: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 12,
  },
  detailSection: {
    width: '100%',
    marginTop: 20,
  },
  detailLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  detailExample: {
    color: '#d1d5db',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  detailStats: {
    width: '100%',
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  detailStat: {
    color: '#9ca3af',
    marginBottom: 4,
  },
  detailClose: {
    marginTop: 20,
    padding: 16,
  },
  detailCloseText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VocabularyBuilderModal;
