import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface EndlessModeProps {
  visible: boolean;
  onClose: () => void;
  onStart: () => void;
  highScore: number;
  currentScore?: number;
  isPlaying?: boolean;
  lives?: number;
  level?: number;
}

export const EndlessModeModal: React.FC<EndlessModeProps> = ({
  visible,
  onClose,
  onStart,
  highScore,
  currentScore = 0,
  isPlaying = false,
  lives = 3,
  level = 1,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible && !isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [visible, isPlaying]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient colors={['#ef4444', '#dc2626']} style={styles.header}>
            <Text style={styles.headerIcon}>♾️</Text>
            <Text style={styles.title}>Endless Mode</Text>
            <Text style={styles.subtitle}>How far can you go?</Text>
          </LinearGradient>

          {!isPlaying ? (
            // Start Screen
            <View style={styles.content}>
              <View style={styles.rulesBox}>
                <Text style={styles.rulesTitle}>📋 Rules</Text>
                <Text style={styles.ruleItem}>• Words get harder each level</Text>
                <Text style={styles.ruleItem}>• You have 3 lives ❤️</Text>
                <Text style={styles.ruleItem}>• Wrong guess = lose 1 life</Text>
                <Text style={styles.ruleItem}>• No hints available</Text>
                <Text style={styles.ruleItem}>• Beat your high score!</Text>
              </View>

              <View style={styles.highScoreBox}>
                <Text style={styles.highScoreLabel}>🏆 High Score</Text>
                <Text style={styles.highScoreValue}>{highScore}</Text>
              </View>

              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity style={styles.startButton} onPress={onStart}>
                  <Text style={styles.startText}>Start Challenge</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          ) : (
            // In-Game Stats
            <View style={styles.content}>
              <View style={styles.gameStats}>
                <View style={styles.gameStat}>
                  <Text style={styles.gameStatIcon}>🎯</Text>
                  <Text style={styles.gameStatValue}>Level {level}</Text>
                </View>
                <View style={styles.gameStat}>
                  <Text style={styles.gameStatIcon}>📝</Text>
                  <Text style={styles.gameStatValue}>{currentScore} pts</Text>
                </View>
              </View>

              <View style={styles.livesRow}>
                {Array(3).fill(0).map((_, i) => (
                  <Text key={i} style={styles.lifeHeart}>
                    {i < lives ? '❤️' : '🦤'}
                  </Text>
                ))}
              </View>

              {lives === 0 && (
                <View style={styles.gameOver}>
                  <Text style={styles.gameOverTitle}>Game Over!</Text>
                  <Text style={styles.finalScore}>Score: {currentScore}</Text>
                  {currentScore > highScore && (
                    <Text style={styles.newRecord}>🎉 New High Score!</Text>
                  )}
                </View>
              )}
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>{isPlaying && lives === 0 ? 'Try Again' : 'Close'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Speed Run Mode
export const SpeedRunModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onStart: () => void;
  bestTime: number; // in seconds
  targetLevels: number;
}> = ({ visible, onClose, onStart, bestTime, targetLevels }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.header}>
            <Text style={styles.headerIcon}>⚡</Text>
            <Text style={styles.title}>Speed Run</Text>
            <Text style={styles.subtitle}>Complete {targetLevels} levels FAST!</Text>
          </LinearGradient>

          <View style={styles.content}>
            <View style={styles.speedStats}>
              <View style={styles.speedStatBox}>
                <Text style={styles.speedStatIcon}>🏁</Text>
                <Text style={styles.speedStatLabel}>Levels</Text>
                <Text style={styles.speedStatValue}>{targetLevels}</Text>
              </View>
              <View style={styles.speedStatBox}>
                <Text style={styles.speedStatIcon}>⏱️</Text>
                <Text style={styles.speedStatLabel}>Best Time</Text>
                <Text style={styles.speedStatValue}>
                  {bestTime > 0 ? formatTime(bestTime) : '--:--'}
                </Text>
              </View>
            </View>

            <View style={styles.tipsBox}>
              <Text style={styles.tipsTitle}>💡 Tips</Text>
              <Text style={styles.tipItem}>• Each level has 3-4 words</Text>
              <Text style={styles.tipItem}>• Timer starts immediately</Text>
              <Text style={styles.tipItem}>• Hints add 15 seconds penalty</Text>
            </View>

            <TouchableOpacity style={styles.speedStartButton} onPress={onStart}>
              <Text style={styles.speedStartText}>🚀 Start Speed Run</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    width: width * 0.9,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  rulesBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  rulesTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ruleItem: {
    color: '#9ca3af',
    marginBottom: 8,
    lineHeight: 22,
  },
  highScoreBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  highScoreLabel: {
    color: '#9ca3af',
    marginBottom: 8,
  },
  highScoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  startButton: {
    backgroundColor: '#22c55e',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  gameStat: {
    alignItems: 'center',
  },
  gameStatIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  gameStatValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  livesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  lifeHeart: {
    fontSize: 36,
  },
  gameOver: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 16,
  },
  gameOverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 8,
  },
  finalScore: {
    fontSize: 24,
    color: '#fff',
  },
  newRecord: {
    fontSize: 20,
    color: '#22c55e',
    fontWeight: 'bold',
    marginTop: 12,
  },
  speedStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  speedStatBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 16,
    flex: 1,
    marginHorizontal: 8,
  },
  speedStatIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  speedStatLabel: {
    color: '#9ca3af',
    marginBottom: 4,
  },
  speedStatValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tipsBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  tipsTitle: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  tipItem: {
    color: '#9ca3af',
    marginBottom: 6,
  },
  speedStartButton: {
    backgroundColor: '#f59e0b',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  speedStartText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 16,
  },
});

export default EndlessModeModal;
