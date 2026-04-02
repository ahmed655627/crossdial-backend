import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface LevelSkipModalProps {
  visible: boolean;
  onClose: () => void;
  onSkip: () => void;
  onWatchAd: () => Promise<boolean>;
  currentLevel: number;
  skipCost: number;
  coins: number;
}

export const LevelSkipModal: React.FC<LevelSkipModalProps> = ({
  visible,
  onClose,
  onSkip,
  onWatchAd,
  currentLevel,
  skipCost,
  coins,
}) => {
  const [skipping, setSkipping] = useState(false);
  const [watchingAd, setWatchingAd] = useState(false);

  const canAfford = coins >= skipCost;

  const handleSkipWithCoins = () => {
    if (!canAfford) return;
    setSkipping(true);
    setTimeout(() => {
      onSkip();
      setSkipping(false);
    }, 500);
  };

  const handleSkipWithAd = async () => {
    setWatchingAd(true);
    const rewarded = await onWatchAd();
    setWatchingAd(false);
    if (rewarded) {
      onSkip();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#e74c3c', '#c0392b']}
            style={styles.header}
          >
            <Ionicons name="rocket" size={40} color="#fff" />
            <Text style={styles.title}>Skip Level {currentLevel}?</Text>
          </LinearGradient>

          <View style={styles.content}>
            <Text style={styles.description}>
              Stuck on this level? No worries! Skip it and move on to the next challenge.
            </Text>

            <View style={styles.options}>
              {/* Pay with Coins */}
              <TouchableOpacity
                style={[styles.optionButton, !canAfford && styles.optionDisabled]}
                onPress={handleSkipWithCoins}
                disabled={!canAfford || skipping}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name="cash" size={24} color="#f1c40f" />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>Pay {skipCost} Coins</Text>
                  <Text style={styles.optionSubtitle}>
                    {canAfford ? 'Skip instantly' : `Need ${skipCost - coins} more coins`}
                  </Text>
                </View>
                <Ionicons 
                  name={canAfford ? "chevron-forward" : "lock-closed"} 
                  size={20} 
                  color={canAfford ? "#667eea" : "#bdc3c7"} 
                />
              </TouchableOpacity>

              {/* Watch Ad */}
              <TouchableOpacity
                style={[styles.optionButton, styles.optionHighlight]}
                onPress={handleSkipWithAd}
                disabled={watchingAd}
              >
                <View style={[styles.optionIcon, { backgroundColor: '#8b5cf6' }]}>
                  <Ionicons name="play-circle" size={24} color="#fff" />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>
                    {watchingAd ? 'Loading Ad...' : 'Watch Ad to Skip'}
                  </Text>
                  <Text style={styles.optionSubtitle}>Free! (~30 seconds)</Text>
                </View>
                <View style={styles.freeBadge}>
                  <Text style={styles.freeText}>FREE</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Keep Trying</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Free Hints Modal
interface FreeHintsModalProps {
  visible: boolean;
  onClose: () => void;
  onGetHints: (amount: number) => void;
  onWatchAd: () => Promise<boolean>;
  currentHints: number;
}

export const FreeHintsModal: React.FC<FreeHintsModalProps> = ({
  visible,
  onClose,
  onGetHints,
  onWatchAd,
  currentHints,
}) => {
  const [watchingAd, setWatchingAd] = useState(false);
  const [hintsEarned, setHintsEarned] = useState(0);

  const handleWatchAd = async () => {
    setWatchingAd(true);
    const rewarded = await onWatchAd();
    setWatchingAd(false);
    if (rewarded) {
      setHintsEarned(prev => prev + 3);
      onGetHints(3);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#f39c12', '#e67e22']}
            style={styles.header}
          >
            <Ionicons name="bulb" size={40} color="#fff" />
            <Text style={styles.title}>Get Free Hints!</Text>
          </LinearGradient>

          <View style={styles.content}>
            <View style={styles.hintsDisplay}>
              <Text style={styles.hintsLabel}>Current Hints</Text>
              <Text style={styles.hintsValue}>{currentHints}</Text>
            </View>

            {hintsEarned > 0 && (
              <View style={styles.earnedBanner}>
                <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
                <Text style={styles.earnedText}>+{hintsEarned} hints earned this session!</Text>
              </View>
            )}

            <Text style={styles.description}>
              Watch a short video ad to get 3 free hints instantly!
            </Text>

            <TouchableOpacity
              style={styles.watchAdButton}
              onPress={handleWatchAd}
              disabled={watchingAd}
            >
              <LinearGradient
                colors={['#8b5cf6', '#7c3aed']}
                style={styles.watchAdGradient}
              >
                <Ionicons name="play-circle" size={24} color="#fff" />
                <Text style={styles.watchAdText}>
                  {watchingAd ? 'Loading...' : 'Watch Ad for +3 Hints'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              You can watch multiple ads to earn more hints!
            </Text>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 25,
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  options: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  optionHighlight: {
    borderColor: '#8b5cf6',
    borderWidth: 2,
    backgroundColor: '#f5f3ff',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff3cd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 2,
  },
  freeBadge: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  freeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelText: {
    color: '#667eea',
    fontSize: 15,
    fontWeight: '600',
  },
  hintsDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  hintsLabel: {
    fontSize: 14,
    color: '#95a5a6',
  },
  hintsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  earnedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    gap: 8,
  },
  earnedText: {
    color: '#155724',
    fontWeight: '600',
  },
  watchAdButton: {
    marginVertical: 15,
  },
  watchAdGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    gap: 10,
  },
  watchAdText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#bdc3c7',
    textAlign: 'center',
    marginTop: 5,
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
  },
  closeText: {
    color: '#95a5a6',
    fontSize: 15,
  },
});

export default LevelSkipModal;
