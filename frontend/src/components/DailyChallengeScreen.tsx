import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface DailyChallengeScreenProps {
  visible: boolean;
  onClose: () => void;
  onStartChallenge: (difficulty: 'easy' | 'medium' | 'hard') => void;
  currentStreak: number;
}

export const DailyChallengeScreen: React.FC<DailyChallengeScreenProps> = ({
  visible,
  onClose,
  onStartChallenge,
  currentStreak,
}) => {
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState('');

  useEffect(() => {
    checkDailyStatus();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [visible]);

  const checkDailyStatus = async () => {
    try {
      const lastCompleted = await AsyncStorage.getItem('lastDailyChallengeDate');
      const today = new Date().toDateString();
      setTodayCompleted(lastCompleted === today);
    } catch (e) {
      console.log('Error checking daily status:', e);
    }
  };

  const updateTimer = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeUntilReset(`${hours}h ${minutes}m ${seconds}s`);
  };

  const challenges = [
    {
      difficulty: 'easy' as const,
      name: 'Warm Up',
      icon: '🌱',
      description: '5 words, no time limit',
      reward: 50,
      color: ['#4ECDC4', '#45B7D1'],
    },
    {
      difficulty: 'medium' as const,
      name: 'Challenge',
      icon: '🔥',
      description: '8 words, 3 minutes',
      reward: 100,
      color: ['#FFE66D', '#F7DC6F'],
    },
    {
      difficulty: 'hard' as const,
      name: 'Expert',
      icon: '💎',
      description: '12 words, 2 minutes',
      reward: 200,
      color: ['#FF6B6B', '#EE5A5A'],
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#1a1a3e', '#0d0d1a']}
          style={styles.container}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🎯 Daily Challenge</Text>
            <View style={styles.streakBadge}>
              <Text style={styles.streakIcon}>🔥</Text>
              <Text style={styles.streakText}>{currentStreak}</Text>
            </View>
          </View>

          {/* Timer */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Resets in</Text>
            <Text style={styles.timerValue}>{timeUntilReset}</Text>
          </View>

          {/* Challenge Cards */}
          <View style={styles.challengesContainer}>
            {challenges.map((challenge) => (
              <TouchableOpacity
                key={challenge.difficulty}
                style={[styles.challengeCard, todayCompleted && styles.challengeCompleted]}
                onPress={() => !todayCompleted && onStartChallenge(challenge.difficulty)}
                disabled={todayCompleted}
              >
                <LinearGradient
                  colors={todayCompleted ? ['#333', '#222'] : challenge.color}
                  style={styles.challengeGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.challengeIcon}>{challenge.icon}</Text>
                  <View style={styles.challengeInfo}>
                    <Text style={styles.challengeName}>{challenge.name}</Text>
                    <Text style={styles.challengeDesc}>{challenge.description}</Text>
                  </View>
                  <View style={styles.rewardBadge}>
                    <Text style={styles.rewardIcon}>🪙</Text>
                    <Text style={styles.rewardText}>+{challenge.reward}</Text>
                  </View>
                  {todayCompleted && (
                    <View style={styles.completedOverlay}>
                      <Text style={styles.completedText}>✓ Completed</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Streak Rewards */}
          <View style={styles.streakRewardsSection}>
            <Text style={styles.streakRewardsTitle}>Streak Rewards</Text>
            <View style={styles.streakRewardsRow}>
              {[3, 7, 14, 30].map((days) => (
                <View
                  key={days}
                  style={[
                    styles.streakRewardItem,
                    currentStreak >= days && styles.streakRewardUnlocked,
                  ]}
                >
                  <Text style={styles.streakRewardIcon}>
                    {days === 3 ? '🎁' : days === 7 ? '💎' : days === 14 ? '👑' : '🏆'}
                  </Text>
                  <Text style={styles.streakRewardDays}>{days} days</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    marginTop: 60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF6B6B',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  timerValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#4ECDC4',
    marginTop: 4,
  },
  challengesContainer: {
    marginBottom: 24,
  },
  challengeCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  challengeCompleted: {
    opacity: 0.6,
  },
  challengeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  challengeIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  challengeDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  rewardIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  completedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4ECDC4',
  },
  streakRewardsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
  },
  streakRewardsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  streakRewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  streakRewardItem: {
    alignItems: 'center',
    opacity: 0.4,
  },
  streakRewardUnlocked: {
    opacity: 1,
  },
  streakRewardIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  streakRewardDays: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default DailyChallengeScreen;
