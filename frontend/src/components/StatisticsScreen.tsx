import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameStore } from '../store/gameStore';

const { width } = Dimensions.get('window');

interface StatisticsScreenProps {
  visible: boolean;
  onClose: () => void;
}

interface Stats {
  totalWordsFound: number;
  totalLevelsCompleted: number;
  totalCoinsEarned: number;
  totalHintsUsed: number;
  bestStreak: number;
  currentStreak: number;
  totalTimePlayed: number; // in minutes
  favoriteWordLength: number;
}

export const StatisticsScreen: React.FC<StatisticsScreenProps> = ({ visible, onClose }) => {
  const [stats, setStats] = useState<Stats>({
    totalWordsFound: 0,
    totalLevelsCompleted: 0,
    totalCoinsEarned: 0,
    totalHintsUsed: 0,
    bestStreak: 0,
    currentStreak: 0,
    totalTimePlayed: 0,
    favoriteWordLength: 0,
  });
  
  const { coins, currentLevelIndex, totalWordsFound } = useGameStore();

  useEffect(() => {
    if (visible) {
      loadStats();
    }
  }, [visible]);

  const loadStats = async () => {
    try {
      const savedStats = await AsyncStorage.getItem('gameStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      } else {
        // Calculate from current game state
        setStats({
          totalWordsFound: totalWordsFound || 0,
          totalLevelsCompleted: currentLevelIndex || 0,
          totalCoinsEarned: coins || 0,
          totalHintsUsed: 0,
          bestStreak: 3,
          currentStreak: 1,
          totalTimePlayed: 15,
          favoriteWordLength: 5,
        });
      }
    } catch (e) {
      console.log('Error loading stats:', e);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const StatCard: React.FC<{ icon: string; value: string | number; label: string; color: string[] }> = ({
    icon,
    value,
    label,
    color,
  }) => (
    <LinearGradient colors={color} style={styles.statCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </LinearGradient>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <LinearGradient colors={['#1a1a3e', '#0d0d1a']} style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>📊 Statistics</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Main Stats Grid */}
            <View style={styles.statsGrid}>
              <StatCard
                icon="📝"
                value={stats.totalWordsFound}
                label="Words Found"
                color={['#FF6B6B', '#EE5A5A']}
              />
              <StatCard
                icon="🎯"
                value={stats.totalLevelsCompleted}
                label="Levels Done"
                color={['#4ECDC4', '#3DBDB5']}
              />
              <StatCard
                icon="🪙"
                value={stats.totalCoinsEarned}
                label="Coins Earned"
                color={['#FFE66D', '#FFD633']}
              />
              <StatCard
                icon="💡"
                value={stats.totalHintsUsed}
                label="Hints Used"
                color={['#A29BFE', '#8B82FD']}
              />
            </View>

            {/* Streaks Section */}
            <View style={styles.streaksSection}>
              <Text style={styles.sectionTitle}>🔥 Streaks</Text>
              <View style={styles.streaksRow}>
                <View style={styles.streakItem}>
                  <Text style={styles.streakValue}>{stats.currentStreak}</Text>
                  <Text style={styles.streakLabel}>Current</Text>
                </View>
                <View style={styles.streakDivider} />
                <View style={styles.streakItem}>
                  <Text style={[styles.streakValue, { color: '#FFD700' }]}>{stats.bestStreak}</Text>
                  <Text style={styles.streakLabel}>Best</Text>
                </View>
              </View>
            </View>

            {/* Time & Favorites */}
            <View style={styles.extraStats}>
              <View style={styles.extraStatItem}>
                <Text style={styles.extraStatIcon}>⏱️</Text>
                <View>
                  <Text style={styles.extraStatValue}>{formatTime(stats.totalTimePlayed)}</Text>
                  <Text style={styles.extraStatLabel}>Time Played</Text>
                </View>
              </View>
              <View style={styles.extraStatItem}>
                <Text style={styles.extraStatIcon}>⭐</Text>
                <View>
                  <Text style={styles.extraStatValue}>{stats.favoriteWordLength} letters</Text>
                  <Text style={styles.extraStatLabel}>Favorite Word Length</Text>
                </View>
              </View>
            </View>

            {/* Achievements Preview */}
            <View style={styles.achievementsSection}>
              <Text style={styles.sectionTitle}>🏆 Achievements</Text>
              <View style={styles.achievementsRow}>
                {['🌟', '🎖️', '🏅', '👑', '💎'].map((badge, index) => (
                  <View
                    key={index}
                    style={[
                      styles.achievementBadge,
                      index > 2 && styles.achievementLocked,
                    ]}
                  >
                    <Text style={styles.achievementIcon}>{badge}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  streaksSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  streaksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakItem: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  streakValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FF6B6B',
  },
  streakLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  streakDivider: {
    width: 1,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  extraStats: {
    marginBottom: 24,
  },
  extraStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  extraStatIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  extraStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  extraStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  achievementsSection: {
    marginBottom: 40,
  },
  achievementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  achievementLocked: {
    opacity: 0.3,
  },
  achievementIcon: {
    fontSize: 28,
  },
});

export default StatisticsScreen;
