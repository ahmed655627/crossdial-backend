import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { generateDailyChallenge, getStreakBonus, STREAK_BONUSES, DailyChallenge } from '../data/dailyChallenges';

const { width } = Dimensions.get('window');

interface DailyChallengeModalProps {
  visible: boolean;
  onClose: () => void;
  onPlay: (challenge: DailyChallenge) => void;
  streak: number;
  lastPlayedDate: string | null;
  todayCompleted: boolean;
}

const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  visible,
  onClose,
  onPlay,
  streak,
  lastPlayedDate,
  todayCompleted,
}) => {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [timeUntilReset, setTimeUntilReset] = useState('');

  useEffect(() => {
    const today = new Date();
    setChallenge(generateDailyChallenge(today));

    // Update countdown timer
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

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const bonus = getStreakBonus(streak);

  if (!challenge) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>📅 Daily Challenge</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Streak Display */}
            <View style={styles.streakContainer}>
              <Text style={styles.streakIcon}>🔥</Text>
              <Text style={styles.streakCount}>{streak}</Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
            </View>

            {/* Bonus Multiplier */}
            <View style={styles.bonusRow}>
              <Text style={styles.bonusLabel}>Today's Bonus:</Text>
              <Text style={styles.bonusValue}>{bonus}x Rewards!</Text>
            </View>

            {/* Challenge Info */}
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTheme}>{challenge.theme}</Text>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>
                  {challenge.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Rewards Preview */}
            <View style={styles.rewardsContainer}>
              <Text style={styles.rewardsTitle}>Rewards</Text>
              <View style={styles.rewardsRow}>
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardIcon}>🪙</Text>
                  <Text style={styles.rewardValue}>
                    {Math.floor(challenge.rewards.coins * bonus)}
                  </Text>
                </View>
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardIcon}>💡</Text>
                  <Text style={styles.rewardValue}>
                    {Math.floor(challenge.rewards.hints * bonus)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Time until reset */}
            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>Resets in:</Text>
              <Text style={styles.timerValue}>{timeUntilReset}</Text>
            </View>

            {/* Play Button */}
            {todayCompleted ? (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>✓ Completed Today!</Text>
                <Text style={styles.comeBackText}>Come back tomorrow</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => onPlay(challenge)}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.playGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.playText}>▶ Play Daily Challenge</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            {/* Streak Progress */}
            <ScrollView horizontal style={styles.streakProgress} showsHorizontalScrollIndicator={false}>
              {STREAK_BONUSES.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.streakMilestone,
                    streak >= item.days && styles.streakMilestoneActive,
                  ]}
                >
                  <Text style={styles.milestoneDays}>{item.days}</Text>
                  <Text style={styles.milestoneBonus}>{item.bonus}x</Text>
                </View>
              ))}
            </ScrollView>
          </LinearGradient>
        </View>
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
  modal: {
    width: width * 0.9,
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: '#888',
  },
  streakContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  streakIcon: {
    fontSize: 40,
  },
  streakCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  streakLabel: {
    fontSize: 16,
    color: '#888',
  },
  bonusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(243,156,18,0.2)',
    padding: 10,
    borderRadius: 10,
  },
  bonusLabel: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  bonusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  challengeInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  challengeTheme: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#667eea',
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  rewardsContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  rewardsTitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rewardItem: {
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 24,
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerLabel: {
    fontSize: 12,
    color: '#888',
  },
  timerValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  playButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },
  playGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  playText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  completedBadge: {
    backgroundColor: 'rgba(46,204,113,0.2)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  comeBackText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  streakProgress: {
    flexDirection: 'row',
  },
  streakMilestone: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    minWidth: 60,
  },
  streakMilestoneActive: {
    backgroundColor: 'rgba(243,156,18,0.3)',
    borderColor: '#f39c12',
    borderWidth: 1,
  },
  milestoneDays: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  milestoneBonus: {
    fontSize: 12,
    color: '#f39c12',
  },
});

export default DailyChallengeModal;
