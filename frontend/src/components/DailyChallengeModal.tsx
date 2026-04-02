import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface DailyChallengeModalProps {
  visible: boolean;
  onClose: () => void;
  onPlay: () => void;
  dailyChallenge: {
    date: string;
    bonus: number;
    difficulty: string;
    completed: boolean;
    streak: number;
  } | null;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  visible,
  onClose,
  onPlay,
  dailyChallenge,
}) => {
  const [scaleAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
    }
  }, [visible]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!dailyChallenge) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.header}>
            <Animated.Text style={[styles.calendarIcon, { transform: [{ rotate: spin }] }]}>
              📅
            </Animated.Text>
            <Text style={styles.title}>Daily Challenge</Text>
            <Text style={styles.date}>{dailyChallenge.date}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.streakContainer}>
              <Text style={styles.streakIcon}>🔥</Text>
              <Text style={styles.streakText}>{dailyChallenge.streak} Day Streak!</Text>
            </View>

            <View style={styles.rewardBox}>
              <Text style={styles.rewardTitle}>Today's Reward</Text>
              <View style={styles.rewardRow}>
                <Text style={styles.coinIcon}>🪙</Text>
                <Text style={styles.rewardAmount}>+{dailyChallenge.bonus}</Text>
              </View>
              <Text style={styles.difficulty}>Difficulty: {dailyChallenge.difficulty}</Text>
            </View>

            {dailyChallenge.completed ? (
              <View style={styles.completedBadge}>
                <Text style={styles.completedIcon}>✅</Text>
                <Text style={styles.completedText}>Completed Today!</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.playButton} onPress={onPlay}>
                <Text style={styles.playButtonText}>Play Challenge</Text>
              </TouchableOpacity>
            )}
          </View>

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
    width: width * 0.85,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  header: {
    backgroundColor: '#fbbf24',
    padding: 20,
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  date: {
    fontSize: 16,
    color: '#1a1a2e',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  streakIcon: {
    fontSize: 32,
    marginRight: 8,
  },
  streakText: {
    fontSize: 20,
    color: '#ff6b35',
    fontWeight: 'bold',
  },
  rewardBox: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  rewardTitle: {
    color: '#fbbf24',
    fontSize: 14,
    marginBottom: 8,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  rewardAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  difficulty: {
    color: '#9ca3af',
    marginTop: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    padding: 16,
    borderRadius: 12,
  },
  completedIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  completedText: {
    color: '#22c55e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playButton: {
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeButtonText: {
    color: '#9ca3af',
    fontSize: 16,
  },
});

export default DailyChallengeModal;
