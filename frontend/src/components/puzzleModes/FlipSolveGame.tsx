import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { flipSolvePuzzles } from '../../data/puzzleContent/puzzleData';

interface Props {
  visible: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const FlipSolveGame: React.FC<Props> = ({ visible, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const flipAnimations = useRef<Animated.Value[]>([]);

  const currentPuzzle = flipSolvePuzzles[currentIndex];
  const scrambledLetters = currentPuzzle?.scrambled.split('') || [];

  useEffect(() => {
    if (visible) {
      resetGame();
    }
  }, [visible]);

  useEffect(() => {
    // Initialize flip animations for each letter
    flipAnimations.current = scrambledLetters.map(() => new Animated.Value(0));
  }, [currentIndex]);

  const resetGame = () => {
    setCurrentIndex(0);
    setFlippedIndices([]);
    setSelectedOrder([]);
    setScore(0);
    setCompleted(false);
  };

  const flipCard = (index: number) => {
    if (flippedIndices.includes(index)) {
      // Unflip
      Animated.spring(flipAnimations.current[index], {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      setFlippedIndices(flippedIndices.filter(i => i !== index));
      setSelectedOrder(selectedOrder.filter(i => i !== index));
    } else {
      // Flip
      Animated.spring(flipAnimations.current[index], {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      setFlippedIndices([...flippedIndices, index]);
      setSelectedOrder([...selectedOrder, index]);
    }
  };

  const getFormedWord = () => {
    return selectedOrder.map(i => scrambledLetters[i]).join('');
  };

  const checkAnswer = () => {
    const formedWord = getFormedWord();
    if (formedWord === currentPuzzle.word) {
      const points = 12;
      setScore(score + points);

      if (currentIndex < flipSolvePuzzles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setFlippedIndices([]);
        setSelectedOrder([]);
      } else {
        setCompleted(true);
        onComplete(score + points);
      }
    } else {
      Alert.alert('Try Again', 'That\'s not the correct word. Try a different order!');
    }
  };

  const renderCard = (letter: string, index: number) => {
    const isFlipped = flippedIndices.includes(index);
    const orderNum = selectedOrder.indexOf(index) + 1;
    
    const flipAnim = flipAnimations.current[index] || new Animated.Value(0);
    
    const frontInterpolate = flipAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    
    const backInterpolate = flipAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
    });

    return (
      <TouchableOpacity
        key={index}
        style={styles.cardContainer}
        onPress={() => flipCard(index)}
        activeOpacity={0.8}
      >
        <View style={styles.card}>
          {/* Card Back (scrambled) */}
          <Animated.View
            style={[
              styles.cardFace,
              styles.cardBack,
              { transform: [{ rotateY: frontInterpolate }] },
            ]}
          >
            <Text style={styles.cardBackText}>?</Text>
          </Animated.View>
          
          {/* Card Front (revealed letter) */}
          <Animated.View
            style={[
              styles.cardFace,
              styles.cardFront,
              { transform: [{ rotateY: backInterpolate }] },
            ]}
          >
            <Text style={styles.cardFrontText}>{letter}</Text>
            {isFlipped && orderNum > 0 && (
              <View style={styles.orderBadge}>
                <Text style={styles.orderText}>{orderNum}</Text>
              </View>
            )}
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  if (completed) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <LinearGradient colors={['#d299c2', '#fef9d7']} style={styles.completedCard}>
            <Text style={styles.completedIcon}>🎉</Text>
            <Text style={styles.completedTitle}>All Flipped!</Text>
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
        <LinearGradient colors={['#d299c2', '#fef9d7']} style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.score}>Score: {score}</Text>
          </View>

          <Text style={styles.title}>🔄 Flip & Solve</Text>
          <Text style={styles.progress}>
            Puzzle {currentIndex + 1} of {flipSolvePuzzles.length}
          </Text>

          <View style={styles.clueBox}>
            <Text style={styles.clueLabel}>Clue:</Text>
            <Text style={styles.clueText}>{currentPuzzle?.clue}</Text>
          </View>

          <Text style={styles.instruction}>
            Tap cards to flip & select in order
          </Text>

          <View style={styles.cardsContainer}>
            {scrambledLetters.map((letter, index) => renderCard(letter, index))}
          </View>

          <View style={styles.formedWord}>
            <Text style={styles.formedWordLabel}>Your word:</Text>
            <Text style={styles.formedWordText}>
              {getFormedWord() || '_ _ _ _ _'}
            </Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={() => { setFlippedIndices([]); setSelectedOrder([]); }}
            >
              <Text style={styles.buttonText}>🔄 Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={checkAnswer}
              disabled={selectedOrder.length === 0}
            >
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
    color: '#9b59b6',
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
    marginBottom: 16,
  },
  clueBox: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  clueLabel: {
    color: '#9b59b6',
    fontSize: 12,
    marginBottom: 4,
  },
  clueText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  instruction: {
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 13,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    margin: 6,
  },
  card: {
    width: 50,
    height: 60,
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: '#9b59b6',
  },
  cardFront: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#9b59b6',
  },
  cardBackText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardFrontText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  orderBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  formedWord: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 16,
  },
  formedWordLabel: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  formedWordText: {
    color: '#333',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
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
  resetButton: {
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
    color: '#9b59b6',
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

export default FlipSolveGame;
