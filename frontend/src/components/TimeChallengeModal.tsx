/**
 * Time Challenge Modal
 * Explains time challenge mode and lets user start one
 */

import React from 'react';
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

interface TimeChallengeModalProps {
  visible: boolean;
  onClose: () => void;
  onStartChallenge: (difficulty: 'easy' | 'medium' | 'hard') => void;
  bestTime: number | null;
}

export const TimeChallengeModal: React.FC<TimeChallengeModalProps> = ({
  visible,
  onClose,
  onStartChallenge,
  bestTime,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const difficulties = [
    { id: 'easy', name: 'Easy', time: 180, color: '#2ecc71', icon: '🌱' },
    { id: 'medium', name: 'Medium', time: 120, color: '#f39c12', icon: '⚡' },
    { id: 'hard', name: 'Hard', time: 60, color: '#e74c3c', icon: '🔥' },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#e67e22', '#d35400']}
            style={styles.header}
          >
            <Text style={styles.title}>⏱️ Time Challenge</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          {bestTime && (
            <View style={styles.bestTimeBar}>
              <Ionicons name="trophy" size={20} color="#FFD700" />
              <Text style={styles.bestTimeText}>Best Time: {formatTime(bestTime)}</Text>
            </View>
          )}

          <View style={styles.content}>
            <Text style={styles.description}>
              Race against the clock! Complete the level before time runs out to earn bonus coins.
            </Text>

            <Text style={styles.sectionTitle}>Choose Difficulty</Text>

            {difficulties.map((diff) => (
              <TouchableOpacity
                key={diff.id}
                style={styles.difficultyCard}
                onPress={() => onStartChallenge(diff.id as 'easy' | 'medium' | 'hard')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[diff.color, diff.color + '99']}
                  style={styles.difficultyGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.difficultyIcon}>{diff.icon}</Text>
                  <View style={styles.difficultyInfo}>
                    <Text style={styles.difficultyName}>{diff.name}</Text>
                    <Text style={styles.difficultyTime}>{formatTime(diff.time)}</Text>
                  </View>
                  <View style={styles.playButton}>
                    <Ionicons name="play" size={20} color={diff.color} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}

            <View style={styles.rewardsBox}>
              <Text style={styles.rewardsTitle}>🎁 Rewards</Text>
              <View style={styles.rewardRow}>
                <Text style={styles.rewardLabel}>Complete Easy:</Text>
                <Text style={styles.rewardValue}>+25 coins</Text>
              </View>
              <View style={styles.rewardRow}>
                <Text style={styles.rewardLabel}>Complete Medium:</Text>
                <Text style={styles.rewardValue}>+50 coins</Text>
              </View>
              <View style={styles.rewardRow}>
                <Text style={styles.rewardLabel}>Complete Hard:</Text>
                <Text style={styles.rewardValue}>+100 coins</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  bestTimeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#2c3e50',
    // gap: 8, // REMOVED
  },
  bestTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  difficultyCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  difficultyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  difficultyIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  difficultyInfo: {
    flex: 1,
  },
  difficultyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  difficultyTime: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardsBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  rewardsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rewardLabel: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  rewardValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#27ae60',
  },
});

export default TimeChallengeModal;
