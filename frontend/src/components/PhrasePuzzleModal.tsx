import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  PHRASE_PUZZLES,
  PHRASE_CATEGORIES,
  PhrasePuzzle,
  getPhrasePuzzlesByCategory,
} from '../data/phrasePuzzles';

const { width, height } = Dimensions.get('window');

interface PhrasePuzzleModalProps {
  visible: boolean;
  onClose: () => void;
  onStartPuzzle: (puzzle: PhrasePuzzle) => void;
  completedPuzzles: number[];
}

const PhrasePuzzleModal: React.FC<PhrasePuzzleModalProps> = ({
  visible,
  onClose,
  onStartPuzzle,
  completedPuzzles,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('proverbs');
  const [selectedPuzzle, setSelectedPuzzle] = useState<PhrasePuzzle | null>(null);

  const puzzles = getPhrasePuzzlesByCategory(selectedCategory);
  const totalCompleted = completedPuzzles.length;
  const totalPuzzles = PHRASE_PUZZLES.length;

  const renderPuzzleCard = (puzzle: PhrasePuzzle) => {
    const isCompleted = completedPuzzles.includes(puzzle.id);

    return (
      <TouchableOpacity
        key={puzzle.id}
        style={[
          styles.puzzleCard,
          isCompleted && styles.puzzleCardCompleted,
        ]}
        onPress={() => setSelectedPuzzle(puzzle)}
      >
        <View style={styles.puzzleHeader}>
          <View style={styles.puzzleIdBadge}>
            <Text style={styles.puzzleIdText}>#{puzzle.id}</Text>
          </View>
          {isCompleted && (
            <Text style={styles.completedBadge}>✓</Text>
          )}
        </View>
        <Text style={styles.puzzleClue} numberOfLines={2}>
          "{puzzle.clue}"
        </Text>
        <View style={styles.puzzleFooter}>
          <View
            style={[
              styles.difficultyBadge,
              puzzle.difficulty === 'easy' && styles.difficultyEasy,
              puzzle.difficulty === 'medium' && styles.difficultyMedium,
              puzzle.difficulty === 'hard' && styles.difficultyHard,
            ]}
          >
            <Text style={styles.difficultyText}>
              {puzzle.difficulty.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.rewardText}>🪙 {puzzle.rewards.coins}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>✍️ Phrase Puzzles</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Progress */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                {totalCompleted}/{totalPuzzles} Completed
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(totalCompleted / totalPuzzles) * 100}%` },
                  ]}
                />
              </View>
            </View>

            {!selectedPuzzle ? (
              <>
                {/* Category Tabs */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryTabs}
                >
                  {PHRASE_CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryTab,
                        selectedCategory === cat.id && styles.categoryTabActive,
                        selectedCategory === cat.id && { borderColor: cat.color },
                      ]}
                      onPress={() => setSelectedCategory(cat.id)}
                    >
                      <Text style={styles.categoryIcon}>{cat.icon}</Text>
                      <Text
                        style={[
                          styles.categoryName,
                          selectedCategory === cat.id && styles.categoryNameActive,
                        ]}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Puzzles List */}
                <ScrollView style={styles.puzzlesList}>
                  {puzzles.map(renderPuzzleCard)}
                </ScrollView>
              </>
            ) : (
              /* Puzzle Detail View */
              <View style={styles.puzzleDetail}>
                <View style={styles.detailHeader}>
                  <Text style={styles.detailCategory}>
                    {PHRASE_CATEGORIES.find(c => c.id === selectedPuzzle.category)?.icon}
                    {' '}
                    {PHRASE_CATEGORIES.find(c => c.id === selectedPuzzle.category)?.name}
                  </Text>
                  <View
                    style={[
                      styles.difficultyBadge,
                      selectedPuzzle.difficulty === 'easy' && styles.difficultyEasy,
                      selectedPuzzle.difficulty === 'medium' && styles.difficultyMedium,
                      selectedPuzzle.difficulty === 'hard' && styles.difficultyHard,
                    ]}
                  >
                    <Text style={styles.difficultyText}>
                      {selectedPuzzle.difficulty.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.clueContainer}>
                  <Text style={styles.clueLabel}>Clue:</Text>
                  <Text style={styles.detailClue}>"{selectedPuzzle.clue}"</Text>
                </View>

                {selectedPuzzle.author && (
                  <Text style={styles.authorText}>— {selectedPuzzle.author}</Text>
                )}

                {/* Word Preview */}
                <View style={styles.wordPreview}>
                  <Text style={styles.previewLabel}>Words to find:</Text>
                  <View style={styles.wordsRow}>
                    {selectedPuzzle.words.filter((w, i, arr) => arr.indexOf(w) === i).map((word, index) => (
                      <View key={index} style={styles.wordBlank}>
                        <Text style={styles.wordBlankText}>
                          {'_'.repeat(word.length)}
                        </Text>
                        <Text style={styles.wordLength}>({word.length})</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Rewards */}
                <View style={styles.rewardsContainer}>
                  <Text style={styles.rewardsTitle}>Rewards</Text>
                  <View style={styles.rewardsRow}>
                    <View style={styles.rewardItem}>
                      <Text style={styles.rewardIcon}>🪙</Text>
                      <Text style={styles.rewardValue}>{selectedPuzzle.rewards.coins}</Text>
                    </View>
                    <View style={styles.rewardItem}>
                      <Text style={styles.rewardIcon}>⭐</Text>
                      <Text style={styles.rewardValue}>{selectedPuzzle.rewards.xp} XP</Text>
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.detailButtons}>
                  <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => setSelectedPuzzle(null)}
                  >
                    <Text style={styles.backText}>← Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.playBtn}
                    onPress={() => {
                      onStartPuzzle(selectedPuzzle);
                      onClose();
                    }}
                  >
                    <LinearGradient
                      colors={['#667eea', '#764ba2']}
                      style={styles.playGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.playText}>▶ Solve Puzzle</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </LinearGradient>
        </View>
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
  modal: {
    width: width * 0.95,
    height: height * 0.85,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: '#888',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 3,
  },
  categoryTabs: {
    marginBottom: 15,
    maxHeight: 70,
  },
  categoryTab: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryTabActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  categoryNameActive: {
    color: '#fff',
  },
  puzzlesList: {
    flex: 1,
  },
  puzzleCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  puzzleCardCompleted: {
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  puzzleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  puzzleIdBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  puzzleIdText: {
    fontSize: 11,
    color: '#888',
  },
  completedBadge: {
    fontSize: 18,
    color: '#2ecc71',
  },
  puzzleClue: {
    fontSize: 15,
    color: '#fff',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  puzzleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  difficultyEasy: {
    backgroundColor: '#27ae60',
  },
  difficultyMedium: {
    backgroundColor: '#f39c12',
  },
  difficultyHard: {
    backgroundColor: '#e74c3c',
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  rewardText: {
    fontSize: 14,
    color: '#f39c12',
  },
  puzzleDetail: {
    flex: 1,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailCategory: {
    fontSize: 16,
    color: '#888',
  },
  clueContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  clueLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  detailClue: {
    fontSize: 20,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  authorText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
    marginBottom: 20,
  },
  wordPreview: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  previewLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  wordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  wordBlank: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  wordBlankText: {
    fontSize: 18,
    color: '#667eea',
    letterSpacing: 2,
  },
  wordLength: {
    fontSize: 10,
    color: '#666',
  },
  rewardsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  rewardsTitle: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rewardItem: {
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 24,
  },
  rewardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  detailButtons: {
    flexDirection: 'row',
  },
  backBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    marginRight: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  playBtn: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  playGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  playText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhrasePuzzleModal;
