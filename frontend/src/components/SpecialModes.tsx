import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Reverse Mode - Given the word, arrange letters
export interface ReverseModeProps {
  visible: boolean;
  onClose: () => void;
  word: string;
  scrambledLetters: string[];
  onComplete: (correct: boolean) => void;
}

export const ReverseMode: React.FC<ReverseModeProps> = ({
  visible,
  onClose,
  word,
  scrambledLetters,
  onComplete,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [availableLetters, setAvailableLetters] = useState(scrambledLetters);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setSelectedIndices([]);
      setAvailableLetters(scrambledLetters);
      setIsCorrect(null);
    }
  }, [visible, scrambledLetters]);

  const handleSelectLetter = (index: number) => {
    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    // Check if complete
    if (newSelected.length === word.length) {
      const formed = newSelected.map(i => scrambledLetters[i]).join('');
      const correct = formed === word;
      setIsCorrect(correct);

      if (!correct) {
        // Shake animation
        Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();

        setTimeout(() => {
          setSelectedIndices([]);
          setIsCorrect(null);
        }, 1000);
      } else {
        setTimeout(() => onComplete(true), 1500);
      }
    }
  };

  const handleUnselectLetter = (posIndex: number) => {
    const newSelected = selectedIndices.filter((_, i) => i !== posIndex);
    setSelectedIndices(newSelected);
  };

  const formed = selectedIndices.map(i => scrambledLetters[i]).join('');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.header}>
            <Text style={styles.headerIcon}>🔄</Text>
            <Text style={styles.title}>Reverse Mode</Text>
            <Text style={styles.subtitle}>Arrange the letters to form:</Text>
            <Text style={styles.targetWord}>{word}</Text>
          </LinearGradient>

          <View style={styles.content}>
            {/* Selected letters row */}
            <Animated.View
              style={[
                styles.selectedRow,
                { transform: [{ translateX: shakeAnim }] },
                isCorrect === true && styles.correctRow,
                isCorrect === false && styles.wrongRow,
              ]}
            >
              {Array(word.length).fill(0).map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.selectedSlot,
                    selectedIndices[i] !== undefined && styles.selectedSlotFilled,
                  ]}
                  onPress={() => selectedIndices[i] !== undefined && handleUnselectLetter(i)}
                >
                  <Text style={styles.selectedLetter}>
                    {selectedIndices[i] !== undefined ? scrambledLetters[selectedIndices[i]] : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>

            {/* Available letters */}
            <View style={styles.lettersRow}>
              {scrambledLetters.map((letter, index) => {
                const isUsed = selectedIndices.includes(index);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.letterTile,
                      isUsed && styles.letterTileUsed,
                    ]}
                    onPress={() => !isUsed && handleSelectLetter(index)}
                    disabled={isUsed}
                  >
                    <Text style={[styles.letterText, isUsed && styles.letterTextUsed]}>
                      {letter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {isCorrect && (
              <View style={styles.successMessage}>
                <Text style={styles.successEmoji}>✅</Text>
                <Text style={styles.successText}>Perfect!</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Blind Mode - Some letters are hidden
export interface BlindModeProps {
  visible: boolean;
  word: string;
  revealedPositions: number[]; // indices of revealed letters
  onGuess: (guess: string) => void;
  onClose: () => void;
}

export const BlindMode: React.FC<BlindModeProps> = ({
  visible,
  word,
  revealedPositions,
  onGuess,
  onClose,
}) => {
  const [guess, setGuess] = useState('');
  const [shake, setShake] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const getMaskedWord = () => {
    return word.split('').map((char, i) => {
      if (revealedPositions.includes(i)) return char;
      if (guess.length > i - revealedPositions.filter(p => p < i).length) {
        return guess[i - revealedPositions.filter(p => p < i).length];
      }
      return '_';
    }).join(' ');
  };

  const handleSubmit = () => {
    const fullGuess = word.split('').map((char, i) => {
      if (revealedPositions.includes(i)) return char;
      return guess[i - revealedPositions.filter(p => p < i).length] || '';
    }).join('');

    if (fullGuess.toUpperCase() === word.toUpperCase()) {
      onGuess(word);
    } else {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      setGuess('');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient colors={['#1f2937', '#374151']} style={styles.header}>
            <Text style={styles.headerIcon}>👁️‍🗨️</Text>
            <Text style={styles.title}>Blind Mode</Text>
            <Text style={styles.subtitle}>Fill in the missing letters</Text>
          </LinearGradient>

          <View style={styles.content}>
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              <Text style={styles.maskedWord}>{getMaskedWord()}</Text>
            </Animated.View>

            <Text style={styles.hintText}>
              {word.length - revealedPositions.length} letters hidden
            </Text>

            <View style={styles.inputContainer}>
              {/* Virtual keyboard or input would go here */}
              <Text style={styles.inputPlaceholder}>
                Tap letters on wheel to guess
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Give Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Boss Level
export interface BossLevelProps {
  visible: boolean;
  onClose: () => void;
  onStart: () => void;
  bossNumber: number;
  bossName: string;
  bossIcon: string;
  rewards: { coins: number; hints: number };
  difficulty: number; // 1-10
}

export const BossLevel: React.FC<BossLevelProps> = ({
  visible,
  onClose,
  onStart,
  bossNumber,
  bossName,
  bossIcon,
  rewards,
  difficulty,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.bossContainer}>
          <LinearGradient colors={['#dc2626', '#991b1b']} style={styles.bossHeader}>
            <Text style={styles.bossLabel}>⚔️ BOSS LEVEL {bossNumber} ⚔️</Text>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Text style={styles.bossIcon}>{bossIcon}</Text>
            </Animated.View>
            <Text style={styles.bossName}>{bossName}</Text>
          </LinearGradient>

          <View style={styles.bossContent}>
            <View style={styles.difficultyRow}>
              <Text style={styles.diffLabel}>Difficulty:</Text>
              <View style={styles.difficultyBar}>
                {Array(10).fill(0).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.difficultyDot,
                      i < difficulty && styles.difficultyDotFilled,
                    ]}
                  />
                ))}
              </View>
            </View>

            <View style={styles.bossRewards}>
              <Text style={styles.rewardsTitle}>🏆 Victory Rewards</Text>
              <View style={styles.rewardsRow}>
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardIcon}>🪙</Text>
                  <Text style={styles.rewardAmount}>{rewards.coins}</Text>
                </View>
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardIcon}>💡</Text>
                  <Text style={styles.rewardAmount}>{rewards.hints}</Text>
                </View>
              </View>
            </View>

            <View style={styles.bossWarning}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>No hints allowed in boss fights!</Text>
            </View>

            <TouchableOpacity style={styles.bossStartButton} onPress={onStart}>
              <Text style={styles.bossStartText}>⚔️ Fight Boss!</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Not Yet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const BOSS_DATA = [
  { level: 25, name: 'Sphinx Guardian', icon: '🫅', difficulty: 3 },
  { level: 50, name: 'Garden Serpent', icon: '🐉', difficulty: 4 },
  { level: 75, name: 'Bronze Titan', icon: '🤖', difficulty: 5 },
  { level: 100, name: 'Storm Keeper', icon: '⚡', difficulty: 6 },
  { level: 125, name: 'Shadow Master', icon: '👻', difficulty: 7 },
  { level: 150, name: 'Word Dragon', icon: '🐲', difficulty: 10 },
];

export const getBossForLevel = (level: number) => {
  return BOSS_DATA.find(b => b.level === level);
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  targetWord: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginTop: 12,
    letterSpacing: 4,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  selectedRow: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 8,
  },
  correctRow: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderRadius: 12,
    padding: 8,
  },
  wrongRow: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 12,
    padding: 8,
  },
  selectedSlot: {
    width: 44,
    height: 52,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSlotFilled: {
    backgroundColor: '#8b5cf6',
    borderStyle: 'solid',
    borderColor: '#8b5cf6',
  },
  selectedLetter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  lettersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  letterTile: {
    width: 50,
    height: 50,
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterTileUsed: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  letterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  letterTextUsed: {
    color: 'rgba(255,255,255,0.3)',
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  successEmoji: {
    fontSize: 32,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  maskedWord: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 8,
    textAlign: 'center',
    marginBottom: 24,
  },
  hintText: {
    color: '#9ca3af',
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 12,
    width: '100%',
  },
  inputPlaceholder: {
    color: '#9ca3af',
    textAlign: 'center',
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
  bossContainer: {
    width: width * 0.95,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#dc2626',
  },
  bossHeader: {
    padding: 24,
    alignItems: 'center',
  },
  bossLabel: {
    color: '#fbbf24',
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 2,
  },
  bossIcon: {
    fontSize: 100,
    marginBottom: 16,
  },
  bossName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  bossContent: {
    padding: 20,
  },
  difficultyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  diffLabel: {
    color: '#9ca3af',
    marginRight: 12,
  },
  difficultyBar: {
    flexDirection: 'row',
    gap: 6,
  },
  difficultyDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  difficultyDotFilled: {
    backgroundColor: '#ef4444',
  },
  bossRewards: {
    backgroundColor: 'rgba(255,215,0,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  rewardsTitle: {
    color: '#fbbf24',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardIcon: {
    fontSize: 24,
  },
  rewardAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bossWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  warningIcon: {
    fontSize: 20,
  },
  warningText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  bossStartButton: {
    backgroundColor: '#dc2626',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  bossStartText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ReverseMode;
