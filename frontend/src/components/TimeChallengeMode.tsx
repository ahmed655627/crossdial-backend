import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface TimerProps {
  timeLeft: number;
  maxTime: number;
  isPaused: boolean;
  isFrozen: boolean;
}

export const GameTimer: React.FC<TimerProps> = ({
  timeLeft,
  maxTime,
  isPaused,
  isFrozen,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const isLowTime = timeLeft <= 30;

  useEffect(() => {
    if (isLowTime && !isPaused) {
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
    } else {
      pulseAnim.setValue(1);
    }
  }, [isLowTime, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (isFrozen) return ['#00d4ff', '#0099cc'];
    if (timeLeft <= 10) return ['#ff0000', '#cc0000'];
    if (timeLeft <= 30) return ['#ff6b00', '#cc5500'];
    return ['#22c55e', '#16a34a'];
  };

  const percentage = (timeLeft / maxTime) * 100;

  return (
    <Animated.View
      style={[
        styles.timerContainer,
        { transform: [{ scale: pulseAnim }] },
      ]}
    >
      <LinearGradient
        colors={getTimeColor()}
        style={styles.timerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {isFrozen && <Text style={styles.frozenIcon}>❄️</Text>}
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </LinearGradient>
      <View style={styles.timerBarBg}>
        <View
          style={[
            styles.timerBarFill,
            {
              width: `${percentage}%`,
              backgroundColor: isFrozen ? '#00d4ff' : isLowTime ? '#ff6b00' : '#22c55e',
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

export const TimeChallengeStartModal: React.FC<{
  visible: boolean;
  onStart: (difficulty: 'easy' | 'normal' | 'hard') => void;
  onClose: () => void;
}> = ({ visible, onStart, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>⏱️ Time Challenge</Text>
          <Text style={styles.subtitle}>Race against the clock!</Text>

          <View style={styles.difficultyOptions}>
            <TouchableOpacity
              style={styles.difficultyCard}
              onPress={() => onStart('easy')}
            >
              <LinearGradient
                colors={['#22c55e', '#16a34a']}
                style={styles.difficultyGradient}
              >
                <Text style={styles.difficultyIcon}>🐢</Text>
                <Text style={styles.difficultyName}>Easy</Text>
                <Text style={styles.difficultyTime}>5:00</Text>
                <Text style={styles.difficultyReward}>+50% coins</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.difficultyCard}
              onPress={() => onStart('normal')}
            >
              <LinearGradient
                colors={['#f59e0b', '#d97706']}
                style={styles.difficultyGradient}
              >
                <Text style={styles.difficultyIcon}>🐇</Text>
                <Text style={styles.difficultyName}>Normal</Text>
                <Text style={styles.difficultyTime}>3:00</Text>
                <Text style={styles.difficultyReward}>+100% coins</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.difficultyCard}
              onPress={() => onStart('hard')}
            >
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                style={styles.difficultyGradient}
              >
                <Text style={styles.difficultyIcon}>🚀</Text>
                <Text style={styles.difficultyName}>Hard</Text>
                <Text style={styles.difficultyTime}>1:30</Text>
                <Text style={styles.difficultyReward}>+200% coins</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Play Normal Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const TimeUpModal: React.FC<{
  visible: boolean;
  wordsFound: number;
  totalWords: number;
  coinsEarned: number;
  onRetry: () => void;
  onExit: () => void;
}> = ({ visible, wordsFound, totalWords, coinsEarned, onRetry, onExit }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.timeUpIcon}>⏰</Text>
          <Text style={styles.timeUpTitle}>Time's Up!</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{wordsFound}/{totalWords}</Text>
              <Text style={styles.statLabel}>Words Found</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>🪙 {coinsEarned}</Text>
              <Text style={styles.statLabel}>Coins Earned</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRetry}
          >
            <Text style={styles.retryText}>🔄 Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exitButton} onPress={onExit}>
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  timerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  frozenIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  timerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  timerBarBg: {
    width: width * 0.6,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  timerBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9ca3af',
    marginBottom: 24,
  },
  difficultyOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  difficultyCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  difficultyGradient: {
    padding: 16,
    alignItems: 'center',
  },
  difficultyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  difficultyName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  difficultyTime: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  difficultyReward: {
    color: '#ffd700',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,
    padding: 16,
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  timeUpIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  timeUpTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    color: '#9ca3af',
    marginTop: 4,
  },
  retryButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  retryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exitButton: {
    padding: 12,
  },
  exitText: {
    color: '#9ca3af',
    fontSize: 16,
  },
});

export default GameTimer;
