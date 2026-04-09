import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { wordPairPuzzles } from '../../data/puzzleContent/puzzleData';

interface Props {
  visible: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const WordPairGame: React.FC<Props> = ({ visible, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const currentPuzzle = wordPairPuzzles[currentIndex];

  useEffect(() => {
    if (visible) {
      resetGame();
    }
  }, [visible]);

  const resetGame = () => {
    setCurrentIndex(0);
    setInput1('');
    setInput2('');
    setScore(0);
    setCompleted(false);
    setFoundWords([]);
  };

  const checkAnswer = () => {
    const answers = [input1.toUpperCase(), input2.toUpperCase()];
    const targets = currentPuzzle.words;
    
    const correct = (
      (answers[0] === targets[0] && answers[1] === targets[1]) ||
      (answers[0] === targets[1] && answers[1] === targets[0])
    );

    if (correct) {
      const points = 15;
      setScore(score + points);
      setFoundWords([...foundWords, ...targets]);

      if (currentIndex < wordPairPuzzles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setInput1('');
        setInput2('');
      } else {
        setCompleted(true);
        onComplete(score + points);
      }
    } else {
      Alert.alert('Try Again', 'One or both words are incorrect!');
    }
  };

  if (completed) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <LinearGradient colors={['#a8edea', '#fed6e3']} style={styles.completedCard}>
            <Text style={styles.completedIcon}>👯</Text>
            <Text style={styles.completedTitle}>Perfect Pairs!</Text>
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
        <LinearGradient colors={['#a8edea', '#fed6e3']} style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
          </View>

          <Text style={styles.title}>👯 Word Pair</Text>
          <Text style={styles.progress}>
            Pair {currentIndex + 1} of {wordPairPuzzles.length}
          </Text>

          <View style={styles.clueBox}>
            <Text style={styles.clueLabel}>Find TWO words that match:</Text>
            <Text style={styles.clueText}>"{currentPuzzle?.clue}"</Text>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Word 1</Text>
              <TextInput
                style={styles.input}
                value={input1}
                onChangeText={setInput1}
                placeholder="First word..."
                placeholderTextColor="rgba(0,0,0,0.3)"
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>

            <Text style={styles.andText}>&</Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Word 2</Text>
              <TextInput
                style={styles.input}
                value={input2}
                onChangeText={setInput2}
                placeholder="Second word..."
                placeholderTextColor="rgba(0,0,0,0.3)"
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.hintBox}>
            <Text style={styles.hintText}>
              💡 Both words should relate to the clue above
            </Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={() => { setInput1(''); setInput2(''); }}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={checkAnswer}
              disabled={input1.length === 0 || input2.length === 0}
            >
              <Text style={styles.submitText}>✓ Check Pair</Text>
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
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  score: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  progress: {
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    marginBottom: 20,
  },
  clueBox: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  clueLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  clueText: {
    color: '#333',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  andText: {
    fontSize: 24,
    color: '#e74c3c',
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  hintBox: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  hintText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 13,
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
    color: '#e74c3c',
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

export default WordPairGame;
