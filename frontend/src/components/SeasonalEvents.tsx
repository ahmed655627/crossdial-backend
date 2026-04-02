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

const { width } = Dimensions.get('window');

export interface SeasonalEvent {
  id: string;
  name: string;
  icon: string;
  startDate: string;
  endDate: string;
  theme: {
    colors: string[];
    accentColor: string;
  };
  specialLevels: number[];
  rewards: {
    type: 'coins' | 'powerup' | 'theme';
    amount: number;
    icon: string;
  }[];
  description: string;
}

const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: 'christmas',
    name: 'Winter Wonderland',
    icon: '❄️',
    startDate: '2025-12-20',
    endDate: '2026-01-05',
    theme: {
      colors: ['#1e40af', '#3b82f6', '#93c5fd'],
      accentColor: '#ef4444',
    },
    specialLevels: [1, 2, 3, 4, 5],
    rewards: [
      { type: 'coins', amount: 500, icon: '🪙' },
      { type: 'theme', amount: 1, icon: '❄️' },
    ],
    description: 'Find winter-themed words and unlock exclusive rewards!',
  },
  {
    id: 'halloween',
    name: 'Spooky Words',
    icon: '🎃',
    startDate: '2025-10-25',
    endDate: '2025-11-05',
    theme: {
      colors: ['#1f2937', '#374151', '#4b5563'],
      accentColor: '#f97316',
    },
    specialLevels: [1, 2, 3, 4, 5],
    rewards: [
      { type: 'coins', amount: 400, icon: '🪙' },
      { type: 'powerup', amount: 3, icon: '👻' },
    ],
    description: 'Uncover spooky words before Halloween ends!',
  },
  {
    id: 'summer',
    name: 'Summer Splash',
    icon: '☀️',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    theme: {
      colors: ['#0891b2', '#06b6d4', '#67e8f9'],
      accentColor: '#fbbf24',
    },
    specialLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    rewards: [
      { type: 'coins', amount: 1000, icon: '🪙' },
      { type: 'theme', amount: 1, icon: '🌴' },
    ],
    description: 'Beat the heat with beach and summer words!',
  },
  {
    id: 'valentine',
    name: 'Love Letters',
    icon: '💕',
    startDate: '2025-02-10',
    endDate: '2025-02-20',
    theme: {
      colors: ['#be185d', '#ec4899', '#f9a8d4'],
      accentColor: '#ef4444',
    },
    specialLevels: [1, 2, 3, 4, 5],
    rewards: [
      { type: 'coins', amount: 300, icon: '🪙' },
      { type: 'powerup', amount: 2, icon: '💌' },
    ],
    description: 'Find words of love and friendship!',
  },
];

interface SeasonalEventModalProps {
  visible: boolean;
  onClose: () => void;
  event: SeasonalEvent;
  progress: number; // 0-100
  onPlayEvent: () => void;
}

export const SeasonalEventModal: React.FC<SeasonalEventModalProps> = ({
  visible,
  onClose,
  event,
  progress,
  onPlayEvent,
}) => {
  const getTimeRemaining = () => {
    const end = new Date(event.endDate).getTime();
    const now = Date.now();
    const diff = end - now;
    
    if (diff <= 0) return 'Event ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days remaining`;
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={event.theme.colors}
            style={styles.header}
          >
            <Text style={styles.eventIcon}>{event.icon}</Text>
            <Text style={styles.eventName}>{event.name}</Text>
            <View style={styles.timerBadge}>
              <Text style={styles.timerText}>{getTimeRemaining()}</Text>
            </View>
          </LinearGradient>

          <View style={styles.content}>
            <Text style={styles.description}>{event.description}</Text>

            {/* Progress */}
            <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>Event Progress</Text>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={event.theme.colors}
                  style={[styles.progressFill, { width: `${progress}%` }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
              <Text style={styles.progressText}>{progress}%</Text>
            </View>

            {/* Rewards */}
            <Text style={styles.sectionTitle}>🎁 Event Rewards</Text>
            <View style={styles.rewardsRow}>
              {event.rewards.map((reward, index) => (
                <View key={index} style={styles.rewardBox}>
                  <Text style={styles.rewardIcon}>{reward.icon}</Text>
                  <Text style={styles.rewardAmount}>
                    {reward.type === 'theme' ? 'Exclusive' : `x${reward.amount}`}
                  </Text>
                  <Text style={styles.rewardType}>
                    {reward.type === 'theme' ? 'Theme' : reward.type}
                  </Text>
                </View>
              ))}
            </View>

            {/* Special Levels */}
            <Text style={styles.sectionTitle}>⭐ Special Levels</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.levelsRow}>
                {event.specialLevels.map((level, index) => (
                  <View
                    key={index}
                    style={[
                      styles.levelBadge,
                      { borderColor: event.theme.accentColor },
                    ]}
                  >
                    <Text style={styles.levelNumber}>{level}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.playButton, { backgroundColor: event.theme.accentColor }]}
              onPress={onPlayEvent}
            >
              <Text style={styles.playText}>Play Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const getActiveEvent = (): SeasonalEvent | null => {
  const now = Date.now();
  return SEASONAL_EVENTS.find((event) => {
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();
    return now >= start && now <= end;
  }) || null;
};

export const SeasonalEventBanner: React.FC<{
  event: SeasonalEvent;
  onPress: () => void;
}> = ({ event, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={event.theme.colors}
        style={styles.banner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.bannerIcon}>{event.icon}</Text>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>{event.name}</Text>
          <Text style={styles.bannerSubtitle}>Limited Time Event!</Text>
        </View>
        <View style={[styles.bannerBadge, { backgroundColor: event.theme.accentColor }]}>
          <Text style={styles.bannerBadgeText}>NEW</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    maxHeight: '85%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  eventIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  eventName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  timerBadge: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  timerText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  description: {
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 8,
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
  progressText: {
    color: '#fff',
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  rewardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  rewardBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  rewardAmount: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  rewardType: {
    color: '#9ca3af',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  levelsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 8,
  },
  levelBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  levelNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttons: {
    padding: 16,
    gap: 12,
  },
  playButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  playText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 12,
    alignItems: 'center',
  },
  closeText: {
    color: '#9ca3af',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  bannerIcon: {
    fontSize: 32,
  },
  bannerContent: {
    flex: 1,
    marginLeft: 12,
  },
  bannerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  bannerBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bannerBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SeasonalEventModal;
