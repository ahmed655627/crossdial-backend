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

const { width, height } = Dimensions.get('window');

export interface MysteryBoxReward {
  type: 'coins' | 'hints' | 'powerup' | 'theme' | 'rare';
  amount: number;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const MYSTERY_BOX_REWARDS: MysteryBoxReward[] = [
  { type: 'coins', amount: 25, name: '25 Coins', icon: '🪙', rarity: 'common' },
  { type: 'coins', amount: 50, name: '50 Coins', icon: '🪙', rarity: 'common' },
  { type: 'coins', amount: 100, name: '100 Coins', icon: '💰', rarity: 'rare' },
  { type: 'coins', amount: 250, name: '250 Coins', icon: '💰', rarity: 'epic' },
  { type: 'hints', amount: 1, name: '1 Hint', icon: '💡', rarity: 'common' },
  { type: 'hints', amount: 3, name: '3 Hints', icon: '💡', rarity: 'rare' },
  { type: 'hints', amount: 5, name: '5 Hints', icon: '✨', rarity: 'epic' },
  { type: 'powerup', amount: 1, name: 'Time Freeze', icon: '❄️', rarity: 'rare' },
  { type: 'powerup', amount: 1, name: 'Auto Word', icon: '🌟', rarity: 'epic' },
  { type: 'rare', amount: 1, name: 'Golden Key', icon: '🔑', rarity: 'legendary' },
];

interface MysteryBoxModalProps {
  visible: boolean;
  onClose: () => void;
  onClaim: (reward: MysteryBoxReward) => void;
  boxesAvailable: number;
}

export const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({
  visible,
  onClose,
  onClaim,
  boxesAvailable,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [reward, setReward] = useState<MysteryBoxReward | null>(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#ffd700';
      case 'epic': return '#a855f7';
      case 'rare': return '#3b82f6';
      default: return '#9ca3af';
    }
  };

  const openBox = () => {
    if (boxesAvailable <= 0) return;

    setIsOpening(true);

    // Shake animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]),
      { iterations: 10 }
    ).start();

    // After shaking, reveal reward
    setTimeout(() => {
      // Weighted random selection
      const weights = {
        common: 50,
        rare: 30,
        epic: 15,
        legendary: 5,
      };

      const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
      let random = Math.random() * totalWeight;
      let selectedRarity = 'common';

      for (const [rarity, weight] of Object.entries(weights)) {
        random -= weight;
        if (random <= 0) {
          selectedRarity = rarity;
          break;
        }
      }

      const possibleRewards = MYSTERY_BOX_REWARDS.filter(r => r.rarity === selectedRarity);
      const selectedReward = possibleRewards[Math.floor(Math.random() * possibleRewards.length)];

      setReward(selectedReward);

      // Glow animation for reward
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0.5, duration: 500, useNativeDriver: true }),
        ])
      ).start();

      setIsOpening(false);
    }, 2000);
  };

  const claimReward = () => {
    if (reward) {
      onClaim(reward);
      setReward(null);
      glowAnim.setValue(0);
    }
  };

  const resetAndClose = () => {
    setReward(null);
    setIsOpening(false);
    glowAnim.setValue(0);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {!reward ? (
            // Box Opening View
            <>
              <Text style={styles.title}>🎁 Mystery Box</Text>
              <Text style={styles.subtitle}>
                {boxesAvailable} box{boxesAvailable !== 1 ? 'es' : ''} available
              </Text>

              <Animated.View
                style={[
                  styles.boxContainer,
                  { transform: [{ translateX: shakeAnim }] },
                ]}
              >
                <Text style={styles.boxEmoji}>{isOpening ? '📦' : '🎁'}</Text>
              </Animated.View>

              <TouchableOpacity
                style={[
                  styles.openButton,
                  (isOpening || boxesAvailable <= 0) && styles.buttonDisabled,
                ]}
                onPress={openBox}
                disabled={isOpening || boxesAvailable <= 0}
              >
                <Text style={styles.openButtonText}>
                  {isOpening ? 'Opening...' : 'Open Box'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            // Reward View
            <>
              <Animated.View
                style={[
                  styles.rewardContainer,
                  {
                    opacity: glowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                    transform: [
                      {
                        scale: glowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.05],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View
                  style={[
                    styles.rarityBadge,
                    { backgroundColor: getRarityColor(reward.rarity) },
                  ]}
                >
                  <Text style={styles.rarityText}>{reward.rarity.toUpperCase()}</Text>
                </View>

                <Text style={styles.rewardIcon}>{reward.icon}</Text>
                <Text style={styles.rewardName}>{reward.name}</Text>
              </Animated.View>

              <TouchableOpacity style={styles.claimButton} onPress={claimReward}>
                <Text style={styles.claimButtonText}>Claim Reward!</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={resetAndClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const MysteryBoxButton: React.FC<{
  count: number;
  onPress: () => void;
}> = ({ count, onPress }) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (count > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: 1.1, duration: 500, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [count]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          styles.floatingButton,
          { transform: [{ scale: bounceAnim }] },
        ]}
      >
        <Text style={styles.floatingIcon}>🎁</Text>
        {count > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
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
    width: width * 0.85,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9ca3af',
    marginBottom: 24,
  },
  boxContainer: {
    marginBottom: 32,
  },
  boxEmoji: {
    fontSize: 120,
  },
  openButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rewardContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  rarityBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  rarityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rewardIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  rewardName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  claimButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 16,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingIcon: {
    fontSize: 32,
  },
  countBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  countText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MysteryBoxModal;
