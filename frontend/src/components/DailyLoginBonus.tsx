import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

// Daily login rewards (7-day cycle)
const DAILY_REWARDS = [
  { day: 1, coins: 10, hint: 0, special: null, icon: '🪙' },
  { day: 2, coins: 15, hint: 0, special: null, icon: '🪙' },
  { day: 3, coins: 20, hint: 1, special: null, icon: '💡' },
  { day: 4, coins: 25, hint: 0, special: null, icon: '🪙' },
  { day: 5, coins: 30, hint: 1, special: null, icon: '💡' },
  { day: 6, coins: 40, hint: 0, special: null, icon: '🪙' },
  { day: 7, coins: 100, hint: 3, special: '🎁 Mystery Box', icon: '🎁' },
];

interface DailyLoginBonusProps {
  visible: boolean;
  onClose: () => void;
  onClaimReward: (coins: number, hints: number) => void;
}

export const DailyLoginBonus: React.FC<DailyLoginBonusProps> = ({
  visible,
  onClose,
  onClaimReward,
}) => {
  const [currentStreak, setCurrentStreak] = useState(1);
  const [canClaim, setCanClaim] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      loadStreakData();
      
      // Glow animation for claimable reward
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [visible]);

  const loadStreakData = async () => {
    try {
      const lastClaimDate = await AsyncStorage.getItem('lastDailyClaimDate');
      const streakCount = await AsyncStorage.getItem('dailyLoginStreak');
      
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (lastClaimDate === today) {
        setCanClaim(false);
        setClaimed(true);
        setCurrentStreak(parseInt(streakCount || '1'));
      } else if (lastClaimDate === yesterday) {
        setCanClaim(true);
        setClaimed(false);
        setCurrentStreak(Math.min((parseInt(streakCount || '0') + 1), 7));
      } else {
        // Streak broken, start from day 1
        setCanClaim(true);
        setClaimed(false);
        setCurrentStreak(1);
      }
    } catch (e) {
      console.log('Error loading streak data:', e);
      setCanClaim(true);
      setCurrentStreak(1);
    }
  };

  const handleClaim = async () => {
    if (!canClaim) return;
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Bounce animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
    
    const reward = DAILY_REWARDS[currentStreak - 1];
    
    // Save claim data
    const today = new Date().toDateString();
    await AsyncStorage.setItem('lastDailyClaimDate', today);
    await AsyncStorage.setItem('dailyLoginStreak', currentStreak.toString());
    
    setCanClaim(false);
    setClaimed(true);
    
    // Give reward
    onClaimReward(reward.coins, reward.hint);
    
    // Close after delay
    setTimeout(onClose, 1500);
  };

  const todayReward = DAILY_REWARDS[currentStreak - 1];
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#1a1a3e', '#2d2d5a', '#1a1a3e']}
            style={styles.content}
          >
            {/* Close button */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
            
            {/* Header */}
            <Text style={styles.title}>🎁 Daily Bonus</Text>
            <Text style={styles.subtitle}>Day {currentStreak} of 7</Text>
            
            {/* Reward cards */}
            <View style={styles.rewardsRow}>
              {DAILY_REWARDS.map((reward, index) => {
                const isToday = index === currentStreak - 1;
                const isPast = index < currentStreak - 1;
                const isFuture = index > currentStreak - 1;
                
                return (
                  <View key={index} style={styles.rewardCardWrapper}>
                    {isToday && canClaim && (
                      <Animated.View
                        style={[styles.glowEffect, { opacity: glowOpacity }]}
                      />
                    )}
                    <LinearGradient
                      colors={
                        isPast ? ['#4ECDC4', '#45B7D1'] :
                        isToday ? ['#FFE66D', '#F7DC6F'] :
                        ['#333', '#222']
                      }
                      style={[
                        styles.rewardCard,
                        isFuture && styles.rewardCardLocked,
                      ]}
                    >
                      <Text style={styles.dayText}>Day {reward.day}</Text>
                      <Text style={styles.rewardIcon}>{reward.icon}</Text>
                      <Text style={[styles.rewardAmount, isFuture && styles.textLocked]}>
                        {reward.coins}
                      </Text>
                      {isPast && <Text style={styles.checkmark}>✓</Text>}
                    </LinearGradient>
                  </View>
                );
              })}
            </View>
            
            {/* Today's reward detail */}
            <View style={styles.todayReward}>
              <Text style={styles.todayLabel}>Today's Reward:</Text>
              <View style={styles.todayRewardRow}>
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardItemIcon}>🪙</Text>
                  <Text style={styles.rewardItemText}>{todayReward.coins} coins</Text>
                </View>
                {todayReward.hint > 0 && (
                  <View style={styles.rewardItem}>
                    <Text style={styles.rewardItemIcon}>💡</Text>
                    <Text style={styles.rewardItemText}>{todayReward.hint} hints</Text>
                  </View>
                )}
              </View>
              {todayReward.special && (
                <Text style={styles.specialReward}>{todayReward.special}</Text>
              )}
            </View>
            
            {/* Claim button */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={[styles.claimBtn, !canClaim && styles.claimBtnDisabled]}
                onPress={handleClaim}
                disabled={!canClaim}
              >
                <LinearGradient
                  colors={canClaim ? ['#4ECDC4', '#45B7D1'] : ['#444', '#333']}
                  style={styles.claimGradient}
                >
                  <Text style={styles.claimText}>
                    {claimed ? '✓ Claimed!' : canClaim ? 'Claim Reward' : 'Come back tomorrow!'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
            
            {/* Streak info */}
            <Text style={styles.streakInfo}>
              🔥 Login daily to get bigger rewards!
            </Text>
          </LinearGradient>
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
    width: width * 0.95,
    maxWidth: 420,
  },
  content: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 20,
  },
  rewardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  rewardCardWrapper: {
    margin: 4,
    position: 'relative',
  },
  glowEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFE66D',
    borderRadius: 12,
    transform: [{ scale: 1.1 }],
  },
  rewardCard: {
    width: 48,
    height: 64,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  rewardCardLocked: {
    opacity: 0.5,
  },
  dayText: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  rewardIcon: {
    fontSize: 18,
    marginVertical: 2,
  },
  rewardAmount: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  textLocked: {
    opacity: 0.5,
  },
  checkmark: {
    position: 'absolute',
    top: 2,
    right: 2,
    fontSize: 10,
    color: '#FFFFFF',
  },
  todayReward: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  todayLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
  },
  todayRewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  rewardItemIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  rewardItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  specialReward: {
    marginTop: 8,
    fontSize: 14,
    color: '#FFE66D',
    fontWeight: '700',
  },
  claimBtn: {
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  claimBtnDisabled: {
    shadowOpacity: 0,
  },
  claimGradient: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
  },
  claimText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  streakInfo: {
    marginTop: 16,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default DailyLoginBonus;
