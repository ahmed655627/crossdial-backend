import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mirrorWordPuzzles, mirrorWord } from '../../data/puzzleContent/puzzleData';

interface Props {
  visible: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const MirrorWordsGame: React.FC<Props> = ({ visible, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentPuzzle = mirrorWordPuzzles[currentIndex];
  const mirroredWord = currentPuzzle ? mirrorWord(currentPuzzle.word) : '';

  useEffect(() => {
    if (visible) {
      setCurrentIndex(0);
      setUserInput('');
      setScore(0);
      setShowHint(false);
      setCompleted(false);
    }
  }, [visible]);

  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentPuzzle.word) {
      const points = showHint ? 5 : 10;
      setScore(score + points);
      
      if (currentIndex < mirrorWordPuzzles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserInput('');
        setShowHint(false);
      } else {
        setCompleted(true);
        onComplete(score + points);
      }
    } else {
      Alert.alert('Try Again', 'That\'s not quite right. Keep trying!');
    }
  };

  const renderMirroredLetters = () => {
    return (
      <View style={styles.mirrorContainer}>
        <View style={styles.mirrorEffect}>
          {mirroredWord.split('').map((letter, index) => (
            <View key={index} style={styles.letterBox}>
              <Text style={styles.mirroredLetter}>{letter}</Text>
            </View>
          ))}
        </View>
        <View style={styles.mirrorLine} />
        <Text style={styles.mirrorHint}>🪞 Mirror reflection above</Text>
      </View>
    );
  };

  if (completed) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <LinearGradient colors={['#667eea', '#764ba2']} style={styles.completedCard}>
            <Text style={styles.completedIcon}>🎉</Text>
            <Text style={styles.completedTitle}>Congratulations!</Text>
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
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
          </View>

          <Text style={styles.title}>🪞 Mirror Words</Text>
          <Text style={styles.progress}>
            Puzzle {currentIndex + 1} of {mirrorWordPuzzles.length}
          </Text>

          {renderMirroredLetters()}

          <View style={styles.clueBox}>
            <Text style={styles.clueLabel}>Clue:</Text>
            <Text style={styles.clueText}>{currentPuzzle?.clue}</Text>
          </View>

          {showHint && (
            <View style={styles.hintBox}>
              <Text style={styles.hintText}>
                First letter: {currentPuzzle?.word[0]}
              </Text>
            </View>
          )}

          <TextInput
            style={styles.input}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type the word..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.hintButton]}
              onPress={() => setShowHint(true)}
              disabled={showHint}
            >
              <Text style={styles.buttonText}>💡 Hint</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={checkAnswer}
            >
              <Text style={styles.buttonText}>✓ Submit</Text>
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
    marginBottom: 16,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  progress: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 20,
  },
  mirrorContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mirrorEffect: {
    flexDirection: 'row',
    transform: [{ scaleX: -1 }],
  },
  letterBox: {
    width: 40,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  mirroredLetter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  mirrorLine: {
    width: '80%',
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 10,
  },
  mirrorHint: {
    color: 'rgba(255,255,255,0.6)',
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
  hintBox: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  hintText: {
    color: '#FFD700',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 15,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
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
  hintButton: {
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

export default MirrorWordsGame;
