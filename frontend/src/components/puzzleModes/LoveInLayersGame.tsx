import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { layerPuzzles } from '../../data/puzzleContent/puzzleData';

interface Props {
  visible: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const LoveInLayersGame: React.FC<Props> = ({ visible, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [solvedLayers, setSolvedLayers] = useState<boolean[]>([]);

  const currentPuzzle = layerPuzzles[currentIndex];
  const currentWord = currentPuzzle?.layers[currentLayer] || '';
  const scrambledLetters = currentWord.split('').sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (visible) {
      resetGame();
    }
  }, [visible]);

  const resetGame = () => {
    setCurrentIndex(0);
    setCurrentLayer(0);
    setSelectedLetters([]);
    setScore(0);
    setCompleted(false);
    setSolvedLayers([]);
  };

  const handleLetterSelect = (index: number) => {
    if (selectedLetters.includes(index)) {
      setSelectedLetters(selectedLetters.filter((i) => i !== index));
    } else {
      setSelectedLetters([...selectedLetters, index]);
    }
  };

  const getCurrentFormedWord = () => {
    return selectedLetters.map((i) => scrambledLetters[i]).join('');
  };

  const checkAnswer = () => {
    const formedWord = getCurrentFormedWord();
    if (formedWord === currentWord) {
      const points = 15;
      setScore(score + points);
      setSolvedLayers([...solvedLayers, true]);

      if (currentLayer < currentPuzzle.layers.length - 1) {
        // Move to next layer
        setCurrentLayer(currentLayer + 1);
        setSelectedLetters([]);
      } else if (currentIndex < layerPuzzles.length - 1) {
        // Move to next puzzle
        setCurrentIndex(currentIndex + 1);
        setCurrentLayer(0);
        setSelectedLetters([]);
        setSolvedLayers([]);
      } else {
        setCompleted(true);
        onComplete(score + points);
      }
    } else {
      Alert.alert('Try Again', 'That\'s not the right word for this layer!');
    }
  };

  if (completed) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.completedCard}>
            <Text style={styles.completedIcon}>🧅</Text>
            <Text style={styles.completedTitle}>All Layers Solved!</Text>
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
        <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
          </View>

          <Text style={styles.title}>🧅 Love in Layers</Text>
          <Text style={styles.progress}>
            Puzzle {currentIndex + 1} / Layer {currentLayer + 1} of {currentPuzzle?.layers.length}
          </Text>

          <View style={styles.layersIndicator}>
            {currentPuzzle?.layers.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.layerDot,
                  index < currentLayer && styles.layerSolved,
                  index === currentLayer && styles.layerCurrent,
                ]}
              >
                <Text style={styles.layerDotText}>
                  {index < currentLayer ? '✓' : index + 1}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.clueBox}>
            <Text style={styles.clueLabel}>Layer {currentLayer + 1} Clue:</Text>
            <Text style={styles.clueText}>{currentPuzzle?.clues[currentLayer]}</Text>
          </View>

          <View style={styles.formedWord}>
            <Text style={styles.formedWordText}>
              {getCurrentFormedWord() || 'Tap letters below'}
            </Text>
          </View>

          <View style={styles.lettersContainer}>
            {scrambledLetters.map((letter, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.letterTile,
                  selectedLetters.includes(index) && styles.selectedTile,
                ]}
                onPress={() => handleLetterSelect(index)}
              >
                <Text
                  style={[
                    styles.letterText,
                    selectedLetters.includes(index) && styles.selectedLetterText,
                  ]}
                >
                  {letter}
                </Text>
                {selectedLetters.includes(index) && (
                  <View style={styles.orderBadge}>
                    <Text style={styles.orderText}>
                      {selectedLetters.indexOf(index) + 1}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={() => setSelectedLetters([])}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={checkAnswer}
              disabled={selectedLetters.length === 0}
            >
              <Text style={styles.buttonText}>✓ Check</Text>
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
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backBtn: {
    padding: 8,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  score: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  progress: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 12,
  },
  layersIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  layerDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  layerSolved: {
    backgroundColor: '#4CAF50',
  },
  layerCurrent: {
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#fff',
  },
  layerDotText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  clueBox: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  clueLabel: {
    color: '#FFD700',
    fontSize: 12,
    marginBottom: 5,
  },
  clueText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  formedWord: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    minHeight: 50,
    justifyContent: 'center',
  },
  formedWordText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
  },
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  letterTile: {
    width: 45,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedTile: {
    backgroundColor: '#4CAF50',
  },
  letterText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedLetterText: {
    color: '#fff',
  },
  orderBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
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
    color: '#fff',
    marginBottom: 10,
  },
  completedScore: {
    fontSize: 24,
    color: '#FFD700',
    marginBottom: 30,
  },
  closeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoveInLayersGame;
