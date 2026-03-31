import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  onPlay: () => void;
  onDailyRewards: () => void;
  onLeaderboard: () => void;
  onSettings: () => void;
  onAchievements: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onPlay,
  onDailyRewards,
  onLeaderboard,
  onSettings,
  onAchievements,
}) => {
  const { progress, levels, canSpinWheel, spinsRemaining } = useGameStore();
  const [titleAnim] = useState(new Animated.Value(0));
  const [buttonAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Title animation
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Button animation
    Animated.spring(buttonAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Pulse animation for play button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const currentLevel = progress?.current_level || 1;
  const totalLevels = levels.length || 150;
  const completedLevels = progress?.completed_levels?.length || 0;
  const coins = progress?.coins || 0;
  const canSpin = canSpinWheel();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={StyleSheet.absoluteFill}
      />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.settingsButton} onPress={onSettings}>
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.coinContainer}>
          <Ionicons name="cash" size={20} color="#FFD700" />
          <Text style={styles.coinText}>{coins}</Text>
        </View>
      </View>

      {/* Logo/Title Section */}
      <Animated.View 
        style={[
          styles.titleSection,
          {
            opacity: titleAnim,
            transform: [
              {
                translateY: titleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.logoGradient}
          >
            <Ionicons name="globe" size={60} color="#fff" />
          </LinearGradient>
        </View>
        <Text style={styles.title}>Wonder Words</Text>
        <Text style={styles.subtitle}>Quest</Text>
        <Text style={styles.tagline}>Explore World Wonders Through Words</Text>
      </Animated.View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>Your Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={['#27ae60', '#2ecc71']}
                style={[
                  styles.progressBarFill,
                  { width: `${(completedLevels / totalLevels) * 100}%` },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={styles.progressText}>
              {completedLevels} / {totalLevels} Levels
            </Text>
          </View>
        </View>
      </View>

      {/* Play Button */}
      <Animated.View
        style={[
          styles.playButtonContainer,
          {
            transform: [
              { scale: Animated.multiply(buttonAnim, pulseAnim) },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPlay} activeOpacity={0.9}>
          <LinearGradient
            colors={['#27ae60', '#2ecc71', '#27ae60']}
            style={styles.playButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="play" size={40} color="#fff" />
            <Text style={styles.playButtonText}>PLAY</Text>
            <Text style={styles.levelText}>Level {currentLevel}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Quick Actions */}
      <Animated.View
        style={[
          styles.quickActions,
          {
            opacity: buttonAnim,
            transform: [
              {
                translateY: buttonAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        {/* Daily Rewards */}
        <TouchableOpacity style={styles.actionButton} onPress={onDailyRewards}>
          <LinearGradient
            colors={['#9b59b6', '#8e44ad']}
            style={styles.actionGradient}
          >
            <Ionicons name="gift" size={28} color="#fff" />
            {canSpin && spinsRemaining > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{spinsRemaining}</Text>
              </View>
            )}
          </LinearGradient>
          <Text style={styles.actionLabel}>Daily</Text>
        </TouchableOpacity>

        {/* Achievements */}
        <TouchableOpacity style={styles.actionButton} onPress={onAchievements}>
          <LinearGradient
            colors={['#f39c12', '#e67e22']}
            style={styles.actionGradient}
          >
            <Ionicons name="trophy" size={28} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionLabel}>Badges</Text>
        </TouchableOpacity>

        {/* Leaderboard */}
        <TouchableOpacity style={styles.actionButton} onPress={onLeaderboard}>
          <LinearGradient
            colors={['#3498db', '#2980b9']}
            style={styles.actionGradient}
          >
            <Ionicons name="podium" size={28} color="#fff" />
          </LinearGradient>
          <Text style={styles.actionLabel}>Ranks</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>150 Levels • 7 World Wonders</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  settingsButton: {
    padding: 8,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  coinText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    marginBottom: 15,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 36,
    fontWeight: '300',
    color: '#FFD700',
    marginTop: -5,
    letterSpacing: 8,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 10,
    letterSpacing: 1,
  },
  progressSection: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  progressCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 15,
  },
  progressLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  playButtonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  playButton: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
    letterSpacing: 4,
  },
  levelText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 30,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e74c3c',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});
