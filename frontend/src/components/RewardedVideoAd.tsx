/**
 * Rewarded Video Ad Component
 * Watch ads for free hints/coins
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type RewardType = 'coins' | 'hints' | 'continue';

interface RewardConfig {
  type: RewardType;
  amount: number;
  icon: string;
  color: string;
}

const REWARD_CONFIGS: Record<RewardType, RewardConfig> = {
  coins: { type: 'coins', amount: 25, icon: '💎', color: '#fbbf24' },
  hints: { type: 'hints', amount: 1, icon: '💡', color: '#a855f7' },
  continue: { type: 'continue', amount: 30, icon: '⏱️', color: '#3b82f6' },
};

interface RewardedVideoAdProps {
  visible: boolean;
  rewardType: RewardType;
  onClose: () => void;
  onRewardEarned: (type: RewardType, amount: number) => void;
}

const RewardedVideoAd: React.FC<RewardedVideoAdProps> = ({
  visible,
  rewardType,
  onClose,
  onRewardEarned,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);

  const config = REWARD_CONFIGS[rewardType];

  const handleWatchAd = async () => {
    setIsLoading(true);

    // Simulate ad loading
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsWatching(true);

    // Simulate watching ad (5 seconds)
    const duration = 5000;
    const interval = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setWatchProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        clearInterval(timer);
        setIsWatching(false);
        setWatchProgress(0);
        
        // Give reward
        onRewardEarned(config.type, config.amount);
        
        Alert.alert(
          '🎉 Reward Earned!',
          `You received ${config.amount} ${config.type === 'continue' ? 'extra seconds' : config.type}!`,
          [{ text: 'Awesome!', onPress: onClose }]
        );
      }
    }, interval);
  };

  const getRewardDescription = () => {
    switch (rewardType) {
      case 'coins':
        return `Get ${config.amount} free coins`;
      case 'hints':
        return `Get ${config.amount} free hint`;
      case 'continue':
        return `Get ${config.amount} extra seconds`;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {isWatching ? (
            // Watching ad
            <View style={styles.watchingContainer}>
              <Text style={styles.watchingEmoji}>🎬</Text>
              <Text style={styles.watchingText}>Watching Ad...</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${watchProgress}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {Math.ceil((100 - watchProgress) / 20)}s remaining
              </Text>
            </View>
          ) : (
            // Offer screen
            <>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#8892b0" />
              </TouchableOpacity>

              <Text style={styles.rewardIcon}>{config.icon}</Text>
              <Text style={styles.title}>{getRewardDescription()}</Text>
              <Text style={styles.subtitle}>
                Watch a short video to claim your reward
              </Text>

              <TouchableOpacity
                style={styles.watchButton}
                onPress={handleWatchAd}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={[config.color, config.color + 'dd']}
                  style={styles.watchButtonGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Ionicons name="play-circle" size={24} color="#fff" />
                      <Text style={styles.watchButtonText}>Watch Ad</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.disclaimer}>
                📡 Ads support free gameplay
              </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1e1e3f',
    borderRadius: 24,
    padding: 30,
    marginHorizontal: 30,
    alignItems: 'center',
    minWidth: 280,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  rewardIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 24,
  },
  watchButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 16,
  },
  watchButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  watchingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  watchingEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  watchingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  progressBar: {
    width: 200,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00b894',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default RewardedVideoAd;
