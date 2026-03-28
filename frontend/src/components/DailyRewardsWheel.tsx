import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';
import { soundManager } from '../utils/sounds';
import { adManager } from '../utils/adManager';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.75, 300);

// Wheel segments with rewards
const WHEEL_SEGMENTS = [
  { label: '10', type: 'coins', value: 10, color: '#3498db' },
  { label: '1 Hint', type: 'hint', value: 1, color: '#9b59b6' },
  { label: '25', type: 'coins', value: 25, color: '#2ecc71' },
  { label: '50', type: 'coins', value: 50, color: '#e74c3c' },
  { label: '2 Hints', type: 'hint', value: 2, color: '#f39c12' },
  { label: '100', type: 'coins', value: 100, color: '#1abc9c' },
  { label: '15', type: 'coins', value: 15, color: '#e67e22' },
  { label: '3 Hints', type: 'hint', value: 3, color: '#8e44ad' },
];

interface DailyRewardsWheelProps {
  visible: boolean;
  onClose: () => void;
}

export const DailyRewardsWheel: React.FC<DailyRewardsWheelProps> = ({ visible, onClose }) => {
  const { addDailyReward, progress, canSpinWheel, markWheelSpun, spinsRemaining, fetchSpinStatus } = useGameStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showingAd, setShowingAd] = useState(false);
  const [reward, setReward] = useState<{ type: string; value: number } | null>(null);
  const [showReward, setShowReward] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const currentRotation = useRef(0);

  const canSpin = canSpinWheel();

  // Fetch spin status when modal opens
  useEffect(() => {
    if (visible) {
      fetchSpinStatus();
    }
  }, [visible]);

  const spinWheel = async () => {
    if (isSpinning || !canSpin) return;

    // Show ad first
    setShowingAd(true);
    await adManager.showRewardedAd();
    setShowingAd(false);

    setIsSpinning(true);
    soundManager.playSpinWheel();

    // Random segment
    const segmentIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const selectedReward = WHEEL_SEGMENTS[segmentIndex];
    
    // Calculate rotation (multiple full rotations + segment position)
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    const targetAngle = 360 * 5 + (360 - segmentIndex * segmentAngle - segmentAngle / 2);
    
    currentRotation.current = targetAngle;

    Animated.timing(spinValue, {
      toValue: targetAngle,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(async () => {
      setIsSpinning(false);
      setReward(selectedReward);
      setShowReward(true);
      
      // Award the reward
      await addDailyReward(selectedReward.type, selectedReward.value);
      markWheelSpun();
      soundManager.playReward();
    });
  };

  const closeReward = () => {
    setShowReward(false);
    setReward(null);
    onClose();
  };

  const rotation = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Daily Rewards</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#2c3e50" />
            </TouchableOpacity>
          </View>

          {showingAd ? (
            <View style={styles.adContainer}>
              <ActivityIndicator size="large" color="#3498db" />
              <Text style={styles.adText}>Loading reward ad...</Text>
            </View>
          ) : showReward && reward ? (
            <View style={styles.rewardContainer}>
              <Ionicons 
                name={reward.type === 'coins' ? 'diamond' : 'bulb'} 
                size={80} 
                color={reward.type === 'coins' ? '#FFD700' : '#9b59b6'} 
              />
              <Text style={styles.rewardTitle}>Congratulations!</Text>
              <Text style={styles.rewardText}>
                You won {reward.type === 'coins' ? `${reward.value} Coins!` : `${reward.value} Hint${reward.value > 1 ? 's' : ''}!`}
              </Text>
              <TouchableOpacity style={styles.collectButton} onPress={closeReward}>
                <Text style={styles.collectButtonText}>Collect</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Wheel */}
              <View style={styles.wheelContainer}>
                {/* Pointer */}
                <View style={styles.pointer}>
                  <Ionicons name="caret-down" size={40} color="#e74c3c" />
                </View>
                
                {/* Wheel */}
                <Animated.View 
                  style={[
                    styles.wheel,
                    { transform: [{ rotate: rotation }] }
                  ]}
                >
                  {WHEEL_SEGMENTS.map((segment, index) => {
                    const angle = (index * 360) / WHEEL_SEGMENTS.length;
                    return (
                      <View
                        key={index}
                        style={[
                          styles.segment,
                          {
                            backgroundColor: segment.color,
                            transform: [
                              { rotate: `${angle}deg` },
                              { translateY: -WHEEL_SIZE / 4 },
                            ],
                          },
                        ]}
                      >
                        <Text style={styles.segmentText}>{segment.label}</Text>
                      </View>
                    );
                  })}
                  <View style={styles.wheelCenter}>
                    <Ionicons name="gift" size={30} color="#fff" />
                  </View>
                </Animated.View>
              </View>

              {/* Spin Button */}
              <TouchableOpacity
                style={[
                  styles.spinButton,
                  (!canSpin || isSpinning) && styles.spinButtonDisabled,
                ]}
                onPress={spinWheel}
                disabled={!canSpin || isSpinning}
              >
                <Ionicons name="play" size={24} color="#fff" />
                <Text style={styles.spinButtonText}>
                  {isSpinning ? 'Spinning...' : canSpin ? 'Watch Ad & Spin!' : 'No spins left!'}
                </Text>
              </TouchableOpacity>

              {/* Spins Remaining Counter */}
              <View style={styles.spinsCounter}>
                <Ionicons name="sync" size={18} color="#3498db" />
                <Text style={styles.spinsCounterText}>
                  {spinsRemaining}/6 spins remaining today
                </Text>
              </View>

              {!canSpin && (
                <Text style={styles.cooldownText}>
                  Come back tomorrow for 6 more spins!
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    width: width * 0.9,
    maxWidth: 380,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 5,
  },
  wheelContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pointer: {
    position: 'absolute',
    top: -5,
    zIndex: 10,
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    backgroundColor: '#34495e',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#2c3e50',
  },
  segment: {
    position: 'absolute',
    width: WHEEL_SIZE / 2 - 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'left center',
    left: WHEEL_SIZE / 2,
    borderRadius: 5,
  },
  segmentText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  wheelCenter: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#c0392b',
  },
  spinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    gap: 10,
  },
  spinButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  spinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cooldownText: {
    marginTop: 10,
    color: '#7f8c8d',
    fontSize: 14,
    textAlign: 'center',
  },
  spinsCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 6,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  spinsCounterText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '600',
  },
  adContainer: {
    padding: 40,
    alignItems: 'center',
  },
  adText: {
    marginTop: 15,
    fontSize: 16,
    color: '#7f8c8d',
  },
  rewardContainer: {
    padding: 30,
    alignItems: 'center',
  },
  rewardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 15,
  },
  rewardText: {
    fontSize: 20,
    color: '#2c3e50',
    marginTop: 10,
    marginBottom: 25,
  },
  collectButton: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  collectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
