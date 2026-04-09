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
import { missingHeartsPuzzles } from '../../data/puzzleContent/puzzleData';

interface Props {
  visible: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const MissingHeartsGame: React.FC<Props> = ({ visible, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filledLetters, setFilledLetters] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const currentPuzzle = missingHeartsPuzzles[currentIndex];
  const missingIndices = currentPuzzle?.pattern
    .split('')
    .map((char, index) => (char === '_' ? index : -1))
    .filter((index) => index !== -1) || [];

  useEffect(() => {
    if (visible) {
      setCurrentIndex(0);
      setFilledLetters({});
      setScore(0);
      setCompleted(false);
      setSelectedSlot(null);
    }
  }, [visible]);

  const availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleLetterSelect = (letter: string) => {
    if (selectedSlot !== null) {
      setFilledLetters({ ...filledLetters, [selectedSlot]: letter });
      
      // Move to next empty slot
      const nextEmpty = missingIndices.find(
        (idx) => idx > selectedSlot && !filledLetters[idx]
      );
      setSelectedSlot(nextEmpty ?? null);
    }
  };

  const checkAnswer = () => {
    let constructedWord = '';
    for (let i = 0; i < currentPuzzle.pattern.length; i++) {
      if (currentPuzzle.pattern[i] === '_') {
        constructedWord += filledLetters[i] || '_';
      } else {
        constructedWord += currentPuzzle.pattern[i];
      }
    }

    if (constructedWord === currentPuzzle.word) {
      const points = 10;
      setScore(score + points);
      
      if (currentIndex < missingHeartsPuzzles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setFilledLetters({});
        setSelectedSlot(null);
      } else {
        setCompleted(true);
        onComplete(score + points);
      }
    } else {
      Alert.alert('Try Again', 'Some letters are not correct. Keep trying!');
    }
  };

  const renderPattern = () => {
    return (
      <View style={styles.patternContainer}>
        {currentPuzzle?.pattern.split('').map((char, index) => {
          const isMissing = char === '_';
          const filledLetter = filledLetters[index];
          const isSelected = selectedSlot === index;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.letterSlot,
                isMissing && styles.missingSlot,
                isSelected && styles.selectedSlot,
              ]}
              onPress={() => isMissing && setSelectedSlot(index)}
              disabled={!isMissing}
            >
              {isMissing ? (
                <Text style={styles.filledLetter}>
                  {filledLetter || '💔'}
                </Text>
              ) : (
                <Text style={styles.fixedLetter}>{char}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  if (completed) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <LinearGradient colors={['#fa709a', '#fee140']} style={styles.completedCard}>
            <Text style={styles.completedIcon}>💖</Text>
            <Text style={styles.completedTitle}>Hearts Complete!</Text>
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
        <LinearGradient colors={['#fa709a', '#fee140']} style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
          </View>

          <Text style={styles.title}>💔 Missing Hearts</Text>
          <Text style={styles.progress}>
            Puzzle {currentIndex + 1} of {missingHeartsPuzzles.length}
          </Text>

          {renderPattern()}

          <View style={styles.clueBox}>
            <Text style={styles.clueLabel}>Clue:</Text>
            <Text style={styles.clueText}>{currentPuzzle?.clue}</Text>
          </View>

          <Text style={styles.instruction}>
            Tap a 💔 to select, then tap a letter below
          </Text>

          <View style={styles.keyboard}>
            {availableLetters.map((letter) => (
              <TouchableOpacity
                key={letter}
                style={styles.keyboardKey}
                onPress={() => handleLetterSelect(letter)}
                disabled={selectedSlot === null}
              >
                <Text style={styles.keyboardLetter}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={() => setFilledLetters({})}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={checkAnswer}
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
    maxHeight: '90%',
    borderRadius: 20,
    padding: 16,
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
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  score: {
    color: '#333',
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
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
    marginBottom: 16,
  },
  patternContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  letterSlot: {
    width: 40,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  missingSlot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 2,
    borderColor: '#ff6b6b',
    borderStyle: 'dashed',
  },
  selectedSlot: {
    borderColor: '#4CAF50',
    borderWidth: 3,
    borderStyle: 'solid',
  },
  fixedLetter: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  filledLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  clueBox: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  clueLabel: {
    color: '#333',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  clueText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  instruction: {
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 12,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  keyboardKey: {
    width: 32,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  keyboardLetter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
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
    backgroundColor: 'rgba(0,0,0,0.2)',
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
    color: '#333',
    marginBottom: 10,
  },
  completedScore: {
    fontSize: 24,
    color: '#e74c3c',
    marginBottom: 30,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
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

export default MissingHeartsGame;
