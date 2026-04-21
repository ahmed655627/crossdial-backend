import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface WeeklyEvent {
  id: string;
  name: string;
  description: string;
  icon: string;
  startDate: Date;
  endDate: Date;
  rewards: { coins: number; hints: number; special?: string };
  requirements: { wordsToFind: number; levelsToComplete?: number };
  progress: number;
  color: string[];
}

const WEEKLY_EVENTS: Omit<WeeklyEvent, 'startDate' | 'endDate' | 'progress'>[] = [
  {
    id: 'double_xp',
    name: 'Double XP Weekend',
    description: 'Earn 2x coins for every word found!',
    icon: '⚡',
    rewards: { coins: 500, hints: 5, special: 'Gold Frame' },
    requirements: { wordsToFind: 100 },
    color: ['#FFE66D', '#F7DC6F'],
  },
  {
    id: 'word_master',
    name: 'Word Master Challenge',
    description: 'Find 50 words with 6+ letters',
    icon: '📚',
    rewards: { coins: 300, hints: 3 },
    requirements: { wordsToFind: 50 },
    color: ['#4ECDC4', '#45B7D1'],
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete 20 levels in record time',
    icon: '🚀',
    rewards: { coins: 400, hints: 4, special: 'Fire Frame' },
    requirements: { wordsToFind: 0, levelsToComplete: 20 },
    color: ['#FF6B6B', '#EE5A5A'],
  },
  {
    id: 'perfect_week',
    name: 'Perfect Week',
    description: 'Play every day this week',
    icon: '🌟',
    rewards: { coins: 1000, hints: 10, special: 'Diamond Avatar' },
    requirements: { wordsToFind: 200 },
    color: ['#A29BFE', '#8B82FD'],
  },
];

interface WeeklyEventsScreenProps {
  visible: boolean;
  onClose: () => void;
  currentStats: { wordsFound: number; levelsCompleted: number };
  onClaimReward: (coins: number, hints: number) => void;
}

export const WeeklyEventsScreen: React.FC<WeeklyEventsScreenProps> = ({
  visible,
  onClose,
  currentStats,
  onClaimReward,
}) => {
  const [events, setEvents] = useState<WeeklyEvent[]>([]);
  const [claimedEvents, setClaimedEvents] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      loadEvents();
    }
  }, [visible]);

  const loadEvents = async () => {
    try {
      const claimed = await AsyncStorage.getItem('claimedWeeklyEvents');
      if (claimed) {
        setClaimedEvents(JSON.parse(claimed));
      }

      // Generate current week's events
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const currentEvents = WEEKLY_EVENTS.map((event, index) => ({
        ...event,
        startDate: weekStart,
        endDate: weekEnd,
        progress: event.requirements.levelsToComplete 
          ? Math.min(currentStats.levelsCompleted / event.requirements.levelsToComplete, 1)
          : Math.min(currentStats.wordsFound / event.requirements.wordsToFind, 1),
      }));

      setEvents(currentEvents);
    } catch (e) {
      console.log('Error loading events:', e);
    }
  };

  const handleClaim = async (event: WeeklyEvent) => {
    if (event.progress >= 1 && !claimedEvents.includes(event.id)) {
      const newClaimed = [...claimedEvents, event.id];
      setClaimedEvents(newClaimed);
      await AsyncStorage.setItem('claimedWeeklyEvents', JSON.stringify(newClaimed));
      onClaimReward(event.rewards.coins, event.rewards.hints);
    }
  };

  const getTimeRemaining = () => {
    if (events.length === 0) return '';
    const now = new Date();
    const end = events[0].endDate;
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
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
            <Text style={styles.title}>🎉 Weekly Events</Text>
            <View style={styles.timerBadge}>
              <Text style={styles.timerText}>{getTimeRemaining()}</Text>
            </View>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Events List */}
            {events.map((event) => {
              const isComplete = event.progress >= 1;
              const isClaimed = claimedEvents.includes(event.id);
              
              return (
                <View key={event.id} style={styles.eventCard}>
                  <LinearGradient
                    colors={isClaimed ? ['#333', '#222'] : event.color}
                    style={styles.eventGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {/* Event Icon & Info */}
                    <View style={styles.eventHeader}>
                      <Text style={styles.eventIcon}>{event.icon}</Text>
                      <View style={styles.eventInfo}>
                        <Text style={styles.eventName}>{event.name}</Text>
                        <Text style={styles.eventDesc}>{event.description}</Text>
                      </View>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${event.progress * 100}%` }]} />
                      </View>
                      <Text style={styles.progressText}>
                        {Math.round(event.progress * 100)}%
                      </Text>
                    </View>

                    {/* Rewards */}
                    <View style={styles.rewardsRow}>
                      <View style={styles.rewardItem}>
                        <Text style={styles.rewardIcon}>🪙</Text>
                        <Text style={styles.rewardValue}>{event.rewards.coins}</Text>
                      </View>
                      <View style={styles.rewardItem}>
                        <Text style={styles.rewardIcon}>💡</Text>
                        <Text style={styles.rewardValue}>{event.rewards.hints}</Text>
                      </View>
                      {event.rewards.special && (
                        <View style={styles.rewardItem}>
                          <Text style={styles.rewardIcon}>🎁</Text>
                          <Text style={styles.rewardValue}>{event.rewards.special}</Text>
                        </View>
                      )}
                    </View>

                    {/* Claim Button */}
                    {isComplete && !isClaimed && (
                      <TouchableOpacity
                        style={styles.claimBtn}
                        onPress={() => handleClaim(event)}
                      >
                        <Text style={styles.claimBtnText}>Claim Reward!</Text>
                      </TouchableOpacity>
                    )}
                    
                    {isClaimed && (
                      <View style={styles.claimedBadge}>
                        <Text style={styles.claimedText}>✓ Claimed</Text>
                      </View>
                    )}
                  </LinearGradient>
                </View>
              );
            })}

            {/* Coming Soon */}
            <View style={styles.comingSoon}>
              <Text style={styles.comingSoonIcon}>🔮</Text>
              <Text style={styles.comingSoonText}>More events coming next week!</Text>
            </View>
          </ScrollView>
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
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  timerBadge: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timerText: {
    color: '#FF6B6B',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  eventCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  eventGradient: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  eventDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    minWidth: 45,
  },
  rewardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  rewardIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  rewardValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  claimBtn: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  claimBtnText: {
    color: '#1a1a3e',
    fontSize: 16,
    fontWeight: '900',
  },
  claimedBadge: {
    marginTop: 12,
    alignItems: 'center',
  },
  claimedText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '700',
  },
  comingSoon: {
    alignItems: 'center',
    padding: 24,
  },
  comingSoonIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  comingSoonText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
});

export default WeeklyEventsScreen;
