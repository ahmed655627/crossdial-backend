import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface DayReward {
  day: number;
  reward: string;
  amount: number;
  icon: string;
  claimed: boolean;
  isToday: boolean;
}

interface DailyLoginCalendarProps {
  visible: boolean;
  onClose: () => void;
  onClaim: (day: number, doubled: boolean) => void;
  onWatchAd: () => Promise<boolean>;
  currentStreak: number;
  lastClaimDate: string | null;
}

const DAILY_REWARDS: Omit<DayReward, 'claimed' | 'isToday'>[] = [
  { day: 1, reward: 'Coins', amount: 50, icon: '🪙' },
  { day: 2, reward: 'Hints', amount: 2, icon: '💡' },
  { day: 3, reward: 'Coins', amount: 100, icon: '🪙' },
  { day: 4, reward: 'Mystery Box', amount: 1, icon: '📦' },
  { day: 5, reward: 'Coins', amount: 150, icon: '💰' },
  { day: 6, reward: 'Hints', amount: 5, icon: '✨' },
  { day: 7, reward: 'MEGA REWARD', amount: 500, icon: '👑' },
];

export const DailyLoginCalendar: React.FC<DailyLoginCalendarProps> = ({
  visible,
  onClose,
  onClaim,
  onWatchAd,
  currentStreak,
  lastClaimDate,
}) => {
  const [claiming, setClaiming] = useState(false);
  const [watchingAd, setWatchingAd] = useState(false);
  const [todayClaimed, setTodayClaimed] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  const today = new Date().toDateString();
  const canClaim = lastClaimDate !== today && !todayClaimed;
  const currentDay = Math.min(currentStreak + 1, 7);

  useEffect(() => {
    if (canClaim) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [canClaim]);

  const handleClaim = async (doubled: boolean) => {
    if (doubled) {
      setWatchingAd(true);
      const rewarded = await onWatchAd();
      setWatchingAd(false);
      if (!rewarded) return;
    }
    
    setClaiming(true);
    setTimeout(() => {
      onClaim(currentDay, doubled);
      setTodayClaimed(true);
      setClaiming(false);
    }, 500);
  };

  const rewards = DAILY_REWARDS.map((r, idx) => ({
    ...r,
    claimed: idx < currentStreak,
    isToday: idx === currentStreak,
  }));

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.header}
          >
            <Text style={styles.title}>Daily Login Rewards</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.streakBanner}>
            <Ionicons name="flame" size={24} color="#f39c12" />
            <Text style={styles.streakText}>{currentStreak} Day Streak!</Text>
          </View>

          <View style={styles.calendarGrid}>
            {rewards.map((reward) => (
              <Animated.View
                key={reward.day}
                style={[
                  styles.dayCard,
                  reward.claimed && styles.dayCardClaimed,
                  reward.isToday && styles.dayCardToday,
                  reward.isToday && canClaim && { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <Text style={styles.dayNumber}>Day {reward.day}</Text>
                <Text style={styles.dayIcon}>{reward.icon}</Text>
                <Text style={styles.dayReward}>
                  {reward.day === 7 ? reward.reward : `${reward.amount} ${reward.reward}`}
                </Text>
                {reward.claimed && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
                  </View>
                )}
              </Animated.View>
            ))}
          </View>

          {canClaim ? (
            <View style={styles.claimButtons}>
              <TouchableOpacity
                style={styles.claimButton}
                onPress={() => handleClaim(false)}
                disabled={claiming}
              >
                <Text style={styles.claimButtonText}>
                  {claiming ? 'Claiming...' : 'Claim Reward'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.doubleButton}
                onPress={() => handleClaim(true)}
                disabled={claiming || watchingAd}
              >
                <Ionicons name="play-circle" size={18} color="#fff" />
                <Text style={styles.doubleButtonText}>
                  {watchingAd ? 'Loading...' : 'Watch Ad for 2X'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.claimedMessage}>
              <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
              <Text style={styles.claimedText}>Come back tomorrow!</Text>
            </View>
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
  container: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff3cd',
    gap: 8,
  },
  streakText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'center',
    gap: 10,
  },
  dayCard: {
    width: (width * 0.9 - 60) / 4,
    aspectRatio: 0.9,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  dayCardClaimed: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
  },
  dayCardToday: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffc107',
    borderWidth: 3,
  },
  dayNumber: {
    fontSize: 10,
    color: '#6c757d',
    fontWeight: '600',
  },
  dayIcon: {
    fontSize: 24,
    marginVertical: 4,
  },
  dayReward: {
    fontSize: 9,
    color: '#495057',
    textAlign: 'center',
    fontWeight: '500',
  },
  checkmark: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  claimButtons: {
    padding: 20,
    gap: 12,
  },
  claimButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  doubleButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 14,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  doubleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  claimedMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  claimedText: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '600',
  },
});

export default DailyLoginCalendar;
