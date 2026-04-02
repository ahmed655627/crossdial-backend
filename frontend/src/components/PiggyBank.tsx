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

interface PiggyBankModalProps {
  visible: boolean;
  onClose: () => void;
  savedCoins: number;
  breakCost: number; // Cost to break early (e.g., watch ad or pay coins)
  breakThreshold: number; // Coins needed to break for free
  onBreak: () => void;
  onWatchAd: () => void;
}

export const PiggyBankModal: React.FC<PiggyBankModalProps> = ({
  visible,
  onClose,
  savedCoins,
  breakCost,
  breakThreshold,
  onBreak,
  onWatchAd,
}) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isBreaking, setIsBreaking] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const progress = Math.min((savedCoins / breakThreshold) * 100, 100);
  const canBreakFree = savedCoins >= breakThreshold;

  const handleBreak = () => {
    setIsBreaking(true);

    // Shake animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 15, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -15, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 15, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]),
      { iterations: 6 }
    ).start();

    // After shaking, break
    setTimeout(() => {
      Animated.spring(scaleAnim, {
        toValue: 1.3,
        friction: 3,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setIsBroken(true);
        setIsBreaking(false);
        onBreak();
      }, 300);
    }, 1200);
  };

  const resetAndClose = () => {
    setIsBroken(false);
    setIsBreaking(false);
    scaleAnim.setValue(1);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {!isBroken ? (
            <>
              <Text style={styles.title}>🐷 Piggy Bank</Text>
              <Text style={styles.subtitle}>Save coins as you play!</Text>

              <Animated.View
                style={[
                  styles.piggyContainer,
                  {
                    transform: [
                      { translateX: shakeAnim },
                      { scale: scaleAnim },
                    ],
                  },
                ]}
              >
                <Text style={styles.piggyEmoji}>🐷</Text>
                <View style={styles.coinSlot}>
                  <Text style={styles.coinSlotText}>🪙</Text>
                </View>
              </Animated.View>

              <View style={styles.savedSection}>
                <Text style={styles.savedLabel}>Saved:</Text>
                <Text style={styles.savedAmount}>🪙 {savedCoins}</Text>
              </View>

              <View style={styles.progressSection}>
                <Text style={styles.progressLabel}>
                  {canBreakFree ? '✅ Ready to break!' : `${breakThreshold - savedCoins} more to break free`}
                </Text>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={['#fbbf24', '#f59e0b']}
                    style={[styles.progressFill, { width: `${progress}%` }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
              </View>

              <View style={styles.breakOptions}>
                {canBreakFree ? (
                  <TouchableOpacity
                    style={styles.breakButton}
                    onPress={handleBreak}
                    disabled={isBreaking}
                  >
                    <Text style={styles.breakButtonText}>
                      {isBreaking ? 'Breaking...' : '🔨 Break Piggy Bank!'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity style={styles.watchAdButton} onPress={onWatchAd}>
                      <Text style={styles.watchAdText}>🎬 Watch Ad to Break</Text>
                    </TouchableOpacity>
                    <Text style={styles.orText}>or keep saving!</Text>
                  </>
                )}
              </View>
            </>
          ) : (
            // Broken state - show coins
            <>
              <Text style={styles.congratsTitle}>🎉 Congratulations!</Text>
              <Text style={styles.brokenEmoji}>💥🐷💥</Text>
              <View style={styles.collectedCoins}>
                <Text style={styles.collectedIcon}>🪙</Text>
                <Text style={styles.collectedAmount}>+{savedCoins}</Text>
              </View>
              <Text style={styles.collectedLabel}>Coins Collected!</Text>
            </>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={resetAndClose}>
            <Text style={styles.closeText}>{isBroken ? 'Awesome!' : 'Close'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const PiggyBankButton: React.FC<{
  coins: number;
  onPress: () => void;
}> = ({ coins, onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Text style={styles.floatingIcon}>🐷</Text>
      <Text style={styles.floatingCoins}>{coins}</Text>
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
  piggyContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  piggyEmoji: {
    fontSize: 100,
  },
  coinSlot: {
    position: 'absolute',
    top: 10,
    right: 30,
  },
  coinSlotText: {
    fontSize: 24,
  },
  savedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  savedLabel: {
    color: '#9ca3af',
    fontSize: 16,
    marginRight: 8,
  },
  savedAmount: {
    color: '#fbbf24',
    fontSize: 28,
    fontWeight: 'bold',
  },
  progressSection: {
    width: '100%',
    marginBottom: 24,
  },
  progressLabel: {
    color: '#9ca3af',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  breakOptions: {
    alignItems: 'center',
    width: '100%',
  },
  breakButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  breakButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  watchAdButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  watchAdText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#9ca3af',
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 16,
  },
  brokenEmoji: {
    fontSize: 60,
    marginBottom: 24,
  },
  collectedCoins: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectedIcon: {
    fontSize: 40,
    marginRight: 8,
  },
  collectedAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  collectedLabel: {
    color: '#9ca3af',
    marginTop: 8,
  },
  closeButton: {
    marginTop: 24,
    padding: 12,
  },
  closeText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '600',
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  floatingIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  floatingCoins: {
    color: '#fbbf24',
    fontWeight: 'bold',
  },
});

export default PiggyBankModal;
