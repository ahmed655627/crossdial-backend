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
import { emotionChainPuzzles } from '../../data/puzzleContent/puzzleData';

interface Props {
  visible: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const EmotionChainGame: React.FC<Props> = ({ visible, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chainPosition, setChainPosition] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [solvedChain, setSolvedChain] = useState<string[]>([]);

  const currentPuzzle = emotionChainPuzzles[currentIndex];
  const currentTargetWord = currentPuzzle?.chainWords[chainPosition] || '';
  const previousWord = chainPosition === 0 
    ? currentPuzzle?.startWord 
    : currentPuzzle?.chainWords[chainPosition - 1];

  useEffect(() => {
    if (visible) {
      resetGame();
    }
  }, [visible]);

  const resetGame = () => {
    setCurrentIndex(0);
    setChainPosition(0);
    setUserInput('');
    setScore(0);
    setCompleted(false);
    setSolvedChain([]);
  };

  const getSharedLetters = () => {
    if (!previousWord || !currentTargetWord) return [];
    const prevLetters = previousWord.split('');
    const targetLetters = currentTargetWord.split('');
    return prevLetters.filter(l => targetLetters.includes(l));
  };

  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentTargetWord) {
      const points = 12;
      setScore(score + points);
      setSolvedChain([...solvedChain, currentTargetWord]);

      if (chainPosition < currentPuzzle.chainWords.length - 1) {
        setChainPosition(chainPosition + 1);
        setUserInput('');
      } else if (currentIndex < emotionChainPuzzles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setChainPosition(0);
        setUserInput('');
        setSolvedChain([]);
      } else {
        setCompleted(true);
        onComplete(score + points);
      }
    } else {
      Alert.alert('Try Again', 'That word doesn\'t fit the chain!');
    }
  };

  if (completed) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.completedCard}>
            <Text style={styles.completedIcon}>🔗</Text>
            <Text style={styles.completedTitle}>Chain Complete!</Text>
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
        <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
          </View>

          <Text style={styles.title}>🔗 Emotion Chain</Text>
          <Text style={styles.progress}>
            Chain {currentIndex + 1} - Link {chainPosition + 1}
          </Text>

          {/* Chain visualization */}
          <View style={styles.chainContainer}>
            <View style={styles.chainLink}>
              <Text style={styles.chainWord}>{currentPuzzle?.startWord}</Text>
              <Text style={styles.chainLabel}>Start</Text>
            </View>
            
            {solvedChain.map((word, index) => (
              <React.Fragment key={index}>
                <Text style={styles.chainArrow}>→</Text>
                <View style={styles.chainLink}>
                  <Text style={styles.chainWord}>{word}</Text>
                </View>
              </React.Fragment>
            ))}
            
            {chainPosition < currentPuzzle?.chainWords.length && (
              <>
                <Text style={styles.chainArrow}>→</Text>
                <View style={[styles.chainLink, styles.currentLink]}>
                  <Text style={styles.chainWord}>???</Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.clueBox}>
            <Text style={styles.clueLabel}>Clue:</Text>
            <Text style={styles.clueText}>{currentPuzzle?.clues[chainPosition]}</Text>
          </View>

          <View style={styles.hintBox}>
            <Text style={styles.hintLabel}>💡 Hint:</Text>
            <Text style={styles.hintText}>
              Use letters from "{previousWord}" to form the next word
            </Text>
            <View style={styles.sharedLetters}>
              {getSharedLetters().map((letter, index) => (
                <View key={index} style={styles.sharedLetterBox}>
                  <Text style={styles.sharedLetter}>{letter}</Text>
                </View>
              ))}
            </View>
          </View>

          <TextInput
            style={styles.input}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type the next word..."
            placeholderTextColor="rgba(0,0,0,0.4)"
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={checkAnswer}
            disabled={userInput.length === 0}
          >
            <Text style={styles.submitButtonText}>✓ Add to Chain</Text>
          </TouchableOpacity>
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
    marginBottom: 16,
  },
  chainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  chainLink: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
  },
  currentLink: {
    backgroundColor: 'rgba(255,215,0,0.9)',
    borderWidth: 2,
    borderColor: '#fff',
  },
  chainWord: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  chainLabel: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
  },
  chainArrow: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 4,
  },
  clueBox: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  hintLabel: {
    color: '#FFD700',
    fontSize: 12,
    marginBottom: 5,
  },
  hintText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  sharedLetters: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sharedLetterBox: {
    width: 30,
    height: 30,
    backgroundColor: '#FFD700',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  sharedLetter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 15,
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
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

export default EmotionChainGame;
