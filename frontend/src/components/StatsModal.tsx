import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

interface StatsModalProps {
  visible: boolean;
  onClose: () => void;
  stats: {
    totalWordsFound: number;
    totalLevelsCompleted: number;
    totalCoinsEarned: number;
    totalTimePlayed: number;
    currentStreak: number;
    bestStreak: number;
    hintsUsed: number;
    perfectLevels: number;
  };
}

export const StatsModal: React.FC<StatsModalProps> = ({
  visible,
  onClose,
  stats,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const StatItem = ({ icon, label, value, color = '#fbbf24' }: any) => (
    <View style={styles.statItem}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <Text style={styles.headerIcon}>📊</Text>
            <Text style={styles.title}>Your Statistics</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Progress</Text>
              <View style={styles.statGrid}>
                <StatItem icon="📝" label="Words Found" value={stats.totalWordsFound} />
                <StatItem icon="🏆" label="Levels Done" value={stats.totalLevelsCompleted} />
                <StatItem icon="⭐" label="Perfect Levels" value={stats.perfectLevels} color="#22c55e" />
                <StatItem icon="🪙" label="Coins Earned" value={stats.totalCoinsEarned} />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Streaks</Text>
              <View style={styles.streakRow}>
                <View style={styles.streakBox}>
                  <Text style={styles.streakIcon}>🔥</Text>
                  <Text style={styles.streakValue}>{stats.currentStreak}</Text>
                  <Text style={styles.streakLabel}>Current</Text>
                </View>
                <View style={styles.streakBox}>
                  <Text style={styles.streakIcon}>🏅</Text>
                  <Text style={[styles.streakValue, { color: '#8b5cf6' }]}>{stats.bestStreak}</Text>
                  <Text style={styles.streakLabel}>Best</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Activity</Text>
              <View style={styles.statGrid}>
                <StatItem icon="⏱️" label="Time Played" value={formatTime(stats.totalTimePlayed)} color="#3b82f6" />
                <StatItem icon="💡" label="Hints Used" value={stats.hintsUsed} color="#f59e0b" />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
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
    maxHeight: '80%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  header: {
    backgroundColor: '#3b82f6',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  streakBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '45%',
  },
  streakIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  streakValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff6b35',
  },
  streakLabel: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 4,
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StatsModal;
