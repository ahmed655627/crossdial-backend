import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export interface ScratchCardReward {
  type: 'coins' | 'hints' | 'bonus' | 'nothing';
  amount: number;
  icon: string;
  message: string;
}

const SCRATCH_REWARDS: ScratchCardReward[] = [
  { type: 'coins', amount: 100, icon: '🪙', message: '100 Coins!' },
  { type: 'coins', amount: 50, icon: '🪙', message: '50 Coins!' },
  { type: 'coins', amount: 25, icon: '🪙', message: '25 Coins!' },
  { type: 'hints', amount: 2, icon: '💡', message: '2 Hints!' },
  { type: 'hints', amount: 1, icon: '💡', message: '1 Hint!' },
  { type: 'bonus', amount: 2, icon: '✨', message: '2X Multiplier!' },
  { type: 'nothing', amount: 0, icon: '😔', message: 'Try Again Tomorrow!' },
];

interface ScratchCardModalProps {
  visible: boolean;
  onClose: () => void;
  onReveal: (reward: ScratchCardReward) => void;
  canScratch: boolean;
}

export const ScratchCardModal: React.FC<ScratchCardModalProps> = ({
  visible,
  onClose,
  onReveal,
  canScratch,
}) => {
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [reward, setReward] = useState<ScratchCardReward | null>(null);
  const scratchAnim = useRef(new Animated.Value(1)).current;

  const selectReward = (): ScratchCardReward => {
    // Weighted selection
    const weights = [
      { reward: SCRATCH_REWARDS[0], weight: 5 },   // 100 coins - rare
      { reward: SCRATCH_REWARDS[1], weight: 15 },  // 50 coins
      { reward: SCRATCH_REWARDS[2], weight: 25 },  // 25 coins
      { reward: SCRATCH_REWARDS[3], weight: 10 },  // 2 hints
      { reward: SCRATCH_REWARDS[4], weight: 20 },  // 1 hint
      { reward: SCRATCH_REWARDS[5], weight: 5 },   // 2x multiplier
      { reward: SCRATCH_REWARDS[6], weight: 20 },  // nothing
    ];

    const total = weights.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * total;

    for (const { reward, weight } of weights) {
      random -= weight;
      if (random <= 0) return reward;
    }

    return SCRATCH_REWARDS[6];
  };

  const handleScratch = () => {
    if (!canScratch || isRevealed) return;

    const newProgress = Math.min(scratchProgress + 15, 100);
    setScratchProgress(newProgress);

    if (newProgress >= 70 && !isRevealed) {
      // Reveal the reward
      const selectedReward = selectReward();
      setReward(selectedReward);
      setIsRevealed(true);

      Animated.timing(scratchAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onReveal(selectedReward);
      });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: () => handleScratch(),
    })
  ).current;

  const resetCard = () => {
    setScratchProgress(0);
    setIsRevealed(false);
    setReward(null);
    scratchAnim.setValue(1);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>🎫 Daily Scratch Card</Text>
          <Text style={styles.subtitle}>
            {canScratch ? 'Scratch to reveal your prize!' : 'Come back tomorrow!'}
          </Text>

          <View style={styles.cardContainer} {...panResponder.panHandlers}>
            {/* Reward underneath */}
            <View style={styles.rewardLayer}>
              {reward ? (
                <>
                  <Text style={styles.rewardIcon}>{reward.icon}</Text>
                  <Text style={styles.rewardMessage}>{reward.message}</Text>
                </>
              ) : (
                <Text style={styles.questionMark}>?</Text>
              )}
            </View>

            {/* Scratch layer */}
            <Animated.View
              style={[
                styles.scratchLayer,
                { opacity: scratchAnim },
              ]}
            >
              <LinearGradient
                colors={['#fbbf24', '#f59e0b', '#d97706']}
                style={styles.scratchGradient}
              >
                {!isRevealed && (
                  <>
                    <Text style={styles.scratchText}>☝️</Text>
                    <Text style={styles.scratchHint}>Scratch Here!</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[styles.progressFill, { width: `${scratchProgress}%` }]}
                      />
                    </View>
                  </>
                )}
              </LinearGradient>
            </Animated.View>
          </View>

          {isRevealed && reward && reward.type !== 'nothing' && (
            <TouchableOpacity style={styles.claimButton} onPress={resetCard}>
              <Text style={styles.claimText}>Claim Reward!</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={resetCard}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
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
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9ca3af',
    marginBottom: 24,
  },
  cardContainer: {
    width: width * 0.7,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  rewardLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardIcon: {
    fontSize: 60,
    marginBottom: 8,
  },
  rewardMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  questionMark: {
    fontSize: 80,
    color: 'rgba(255,255,255,0.3)',
  },
  scratchLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  scratchGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scratchText: {
    fontSize: 48,
    marginBottom: 8,
  },
  scratchHint: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  claimButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  claimText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 12,
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 16,
  },
});

export default ScratchCardModal;
