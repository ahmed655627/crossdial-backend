import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { crossedEmotionsPuzzles } from '../../data/puzzleContent/puzzleData';

interface Props {
  visible: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const CrossedEmotionsGame: React.FC<Props> = ({ visible, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedClue, setSelectedClue] = useState<{ direction: string; number: number } | null>(null);

  const currentPuzzle = crossedEmotionsPuzzles[currentIndex];

  useEffect(() => {
    if (visible) {
      resetGame();
    }
  }, [visible]);

  const resetGame = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setScore(0);
    setCompleted(false);
    setSelectedClue(null);
  };

  const getGridSize = () => {
    let maxRow = 0;
    let maxCol = 0;
    currentPuzzle?.grid.forEach((entry) => {
      const endRow = entry.direction === 'down' ? entry.row + entry.word.length - 1 : entry.row;
      const endCol = entry.direction === 'across' ? entry.col + entry.word.length - 1 : entry.col;
      maxRow = Math.max(maxRow, endRow);
      maxCol = Math.max(maxCol, endCol);
    });
    return { rows: maxRow + 1, cols: maxCol + 1 };
  };

  const getCellLetter = (row: number, col: number): string | null => {
    for (const entry of currentPuzzle?.grid || []) {
      if (entry.direction === 'across') {
        if (entry.row === row && col >= entry.col && col < entry.col + entry.word.length) {
          return entry.word[col - entry.col];
        }
      } else {
        if (entry.col === col && row >= entry.row && row < entry.row + entry.word.length) {
          return entry.word[row - entry.row];
        }
      }
    }
    return null;
  };

  const getCellNumber = (row: number, col: number): number | null => {
    const clue = currentPuzzle?.clues.find((c, index) => {
      const gridEntry = currentPuzzle.grid[index];
      return gridEntry && gridEntry.row === row && gridEntry.col === col;
    });
    return clue ? clue.number : null;
  };

  const getUserAnswer = (row: number, col: number): string => {
    const key = `${row}-${col}`;
    return userAnswers[key] || '';
  };

  const handleCellInput = (row: number, col: number, value: string) => {
    const key = `${row}-${col}`;
    setUserAnswers({ ...userAnswers, [key]: value.toUpperCase().slice(0, 1) });
  };

  const checkAnswers = () => {
    const { rows, cols } = getGridSize();
    let allCorrect = true;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const correctLetter = getCellLetter(row, col);
        if (correctLetter) {
          const userLetter = getUserAnswer(row, col);
          if (userLetter !== correctLetter) {
            allCorrect = false;
            break;
          }
        }
      }
      if (!allCorrect) break;
    }

    if (allCorrect) {
      const points = 20;
      setScore(score + points);

      if (currentIndex < crossedEmotionsPuzzles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswers({});
        setSelectedClue(null);
      } else {
        setCompleted(true);
        onComplete(score + points);
      }
    } else {
      Alert.alert('Not quite!', 'Some letters are incorrect. Keep trying!');
    }
  };

  const renderGrid = () => {
    const { rows, cols } = getGridSize();
    const grid = [];

    for (let row = 0; row < rows; row++) {
      const rowCells = [];
      for (let col = 0; col < cols; col++) {
        const letter = getCellLetter(row, col);
        const cellNumber = getCellNumber(row, col);
        const isActive = letter !== null;

        rowCells.push(
          <View
            key={`${row}-${col}`}
            style={[styles.cell, isActive ? styles.activeCell : styles.inactiveCell]}
          >
            {cellNumber && <Text style={styles.cellNumber}>{cellNumber}</Text>}
            {isActive && (
              <TextInput
                style={styles.cellInput}
                value={getUserAnswer(row, col)}
                onChangeText={(value) => handleCellInput(row, col, value)}
                maxLength={1}
                autoCapitalize="characters"
              />
            )}
          </View>
        );
      }
      grid.push(
        <View key={row} style={styles.gridRow}>
          {rowCells}
        </View>
      );
    }

    return grid;
  };

  if (completed) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <LinearGradient colors={['#89f7fe', '#66a6ff']} style={styles.completedCard}>
            <Text style={styles.completedIcon}>✨</Text>
            <Text style={styles.completedTitle}>Crossword Master!</Text>
            <Text style={styles.completedScore}>Score: {score}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Back to Menu</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <LinearGradient colors={['#89f7fe', '#66a6ff']} style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
          </View>

          <Text style={styles.title}>➕ Crossed Emotions</Text>
          <Text style={styles.progress}>
            Puzzle {currentIndex + 1} of {crossedEmotionsPuzzles.length}
          </Text>

          <View style={styles.gridContainer}>{renderGrid()}</View>

          <ScrollView style={styles.cluesContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.cluesTitle}>📝 Clues</Text>
            
            <Text style={styles.directionLabel}>Across →</Text>
            {currentPuzzle?.clues
              .filter((c) => c.direction === 'across')
              .map((clue, index) => (
                <TouchableOpacity
                  key={`across-${index}`}
                  style={styles.clueItem}
                  onPress={() => setSelectedClue({ direction: 'across', number: clue.number })}
                >
                  <Text style={styles.clueNumber}>{clue.number}.</Text>
                  <Text style={styles.clueText}>{clue.clue}</Text>
                </TouchableOpacity>
              ))}

            <Text style={styles.directionLabel}>Down ↓</Text>
            {currentPuzzle?.clues
              .filter((c) => c.direction === 'down')
              .map((clue, index) => (
                <TouchableOpacity
                  key={`down-${index}`}
                  style={styles.clueItem}
                  onPress={() => setSelectedClue({ direction: 'down', number: clue.number })}
                >
                  <Text style={styles.clueNumber}>{clue.number}.</Text>
                  <Text style={styles.clueText}>{clue.clue}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={() => setUserAnswers({})}
            >
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={checkAnswers}>
              <Text style={styles.submitText}>✓ Check</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
    borderRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  backBtn: {
    padding: 8,
  },
  backBtnText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  score: {
    color: '#1a5f7a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  progress: {
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    marginBottom: 12,
  },
  gridContainer: {
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 10,
    borderRadius: 12,
  },
  gridRow: {
    flexDirection: 'row',
  },
  cell: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCell: {
    backgroundColor: '#fff',
  },
  inactiveCell: {
    backgroundColor: '#333',
  },
  cellNumber: {
    position: 'absolute',
    top: 1,
    left: 2,
    fontSize: 8,
    color: '#666',
  },
  cellInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cluesContainer: {
    maxHeight: 180,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  cluesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  directionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a5f7a',
    marginTop: 8,
    marginBottom: 4,
  },
  clueItem: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  clueNumber: {
    fontWeight: 'bold',
    color: '#333',
    width: 25,
  },
  clueText: {
    color: '#333',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  completedCard: {
    width: '85%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  completedIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  completedTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  completedScore: {
    fontSize: 24,
    color: '#1a5f7a',
    marginBottom: 30,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CrossedEmotionsGame;
