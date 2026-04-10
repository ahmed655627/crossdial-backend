/**
 * Clean Home Screen
 * Decluttered version with fewer buttons and better hierarchy
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface CleanHomeScreenProps {
  onPlay: () => void;
  onDailyRewards: () => void;
  onDailyChallenge: () => void;
  onLeaderboard: () => void;
  onAchievements: () => void;
  onSettings: () => void;
  onPuzzleModes?: () => void;
  // Grouped into "More" section
  onTimedChallenge?: () => void;
  onPhrasePuzzles?: () => void;
  onThemes?: () => void;
  onWordOfDay?: () => void;
  onStats?: () => void;
  onWatchAdForCoins?: () => void;
}

export const CleanHomeScreen: React.FC<CleanHomeScreenProps> = ({
  onPlay,
  onDailyRewards,
  onDailyChallenge,
  onLeaderboard,
  onAchievements,
  onSettings,
  onPuzzleModes,
  onTimedChallenge,
  onPhrasePuzzles,
  onThemes,
  onWordOfDay,
  onStats,
  onWatchAdForCoins,
}) => {
  const { progress, levels, canSpinWheel, spinsRemaining } = useGameStore();
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Pulse animation for play button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const currentLevel = progress?.current_level || 1;
  const totalLevels = levels?.length || 150;
  const completedLevels = progress?.completed_levels?.length || 0;
  const coins = progress?.coins || 0;
  const hints = progress?.hints_remaining || 3;
  const canSpin = canSpinWheel?.() || false;

  // Get category name based on level
  const getCategoryName = () => {
    if (currentLevel <= 20) return 'Basics';
    if (currentLevel <= 40) return 'Nature';
    if (currentLevel <= 60) return 'Travel';
    if (currentLevel <= 80) return 'Food';
    if (currentLevel <= 100) return 'Science';
    if (currentLevel <= 120) return 'Culture';
    if (currentLevel <= 140) return 'Advanced';
    return 'Master';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f0f23']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Bar - Minimal */}
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.settingsBtn} onPress={onSettings}>
            <Ionicons name="settings-outline" size={24} color="#8892b0" />
          </TouchableOpacity>
          
          <View style={styles.resourcesRow}>
            <View style={styles.resourceItem}>
              <Ionicons name="bulb" size={18} color="#a855f7" />
              <Text style={styles.resourceText}>{hints}</Text>
            </View>
            <View style={styles.resourceDivider} />
            <View style={styles.resourceItem}>
              <Ionicons name="diamond" size={18} color="#fbbf24" />
              <Text style={styles.resourceText}>{coins}</Text>
            </View>
          </View>
        </View>

        {/* Logo & Title */}
        <View style={styles.logoSection}>
          <Text style={styles.logoEmoji}>🌍</Text>
          <Text style={styles.appTitle}>CrossDial</Text>
          <Text style={styles.appSubtitle}>PUZZLES</Text>
        </View>

        {/* Current Level Card */}
        <View style={styles.levelCard}>
          <LinearGradient
            colors={['rgba(102, 126, 234, 0.15)', 'rgba(118, 75, 162, 0.1)']}
            style={styles.levelCardGradient}
          >
            <View style={styles.levelInfo}>
              <Text style={styles.categoryLabel}>{getCategoryName()}</Text>
              <Text style={styles.levelNumber}>Level {currentLevel}</Text>
            </View>
            <View style={styles.progressMini}>
              <View style={styles.progressBarMini}>
                <View 
                  style={[
                    styles.progressFillMini, 
                    { width: `${Math.max(3, (completedLevels / totalLevels) * 100)}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{completedLevels}/{totalLevels}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Big Play Button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity onPress={onPlay} activeOpacity={0.9}>
            <LinearGradient
              colors={['#00b894', '#00cec9']}
              style={styles.playButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="play" size={40} color="#fff" />
              <Text style={styles.playText}>PLAY</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Primary Actions - Only 2 */}
        <View style={styles.primaryActions}>
          <TouchableOpacity style={styles.primaryAction} onPress={onDailyChallenge}>
            <LinearGradient
              colors={['#ff6b6b', '#ee5a5a']}
              style={styles.primaryActionGradient}
            >
              <Ionicons name="flame" size={24} color="#fff" />
              <Text style={styles.primaryActionText}>Daily</Text>
              <Text style={styles.primaryActionSub}>Challenge</Text>
            </LinearGradient>
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>!</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryAction} onPress={onDailyRewards}>
            <LinearGradient
              colors={['#a855f7', '#9333ea']}
              style={styles.primaryActionGradient}
            >
              <Ionicons name="gift" size={24} color="#fff" />
              <Text style={styles.primaryActionText}>Daily</Text>
              <Text style={styles.primaryActionSub}>Rewards</Text>
            </LinearGradient>
            {canSpin && spinsRemaining > 0 && (
              <View style={[styles.newBadge, styles.spinBadge]}>
                <Text style={styles.newBadgeText}>{spinsRemaining}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Secondary Actions Row */}
        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryAction} onPress={onAchievements}>
            <Ionicons name="trophy" size={22} color="#f59e0b" />
            <Text style={styles.secondaryActionText}>Achievements</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction} onPress={onLeaderboard}>
            <Ionicons name="podium" size={22} color="#3b82f6" />
            <Text style={styles.secondaryActionText}>Leaderboard</Text>
          </TouchableOpacity>
        </View>

        {/* Puzzle Modes - Special Feature */}
        {onPuzzleModes && (
          <TouchableOpacity style={styles.puzzleModesBtn} onPress={onPuzzleModes}>
            <LinearGradient
              colors={['rgba(236, 72, 153, 0.2)', 'rgba(168, 85, 247, 0.15)']}
              style={styles.puzzleModesGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.puzzleModesIcon}>🧩</Text>
              <View style={styles.puzzleModesInfo}>
                <Text style={styles.puzzleModesTitle}>Puzzle Modes</Text>
                <Text style={styles.puzzleModesSub}>7 unique game modes</Text>
              </View>
              <View style={styles.puzzleModesNew}>
                <Text style={styles.puzzleModesNewText}>NEW</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* More Features - Expandable */}
        <TouchableOpacity 
          style={styles.moreToggle}
          onPress={() => setShowMoreFeatures(!showMoreFeatures)}
        >
          <Text style={styles.moreToggleText}>
            {showMoreFeatures ? 'Less Features' : 'More Features'}
          </Text>
          <Ionicons 
            name={showMoreFeatures ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color="#8892b0" 
          />
        </TouchableOpacity>

        {showMoreFeatures && (
          <Animated.View style={[styles.moreFeatures, { opacity: fadeAnim }]}>
            <View style={styles.moreGrid}>
              {onTimedChallenge && (
                <TouchableOpacity style={styles.moreItem} onPress={onTimedChallenge}>
                  <Ionicons name="timer" size={20} color="#ef4444" />
                  <Text style={styles.moreItemText}>Timed</Text>
                </TouchableOpacity>
              )}
              {onPhrasePuzzles && (
                <TouchableOpacity style={styles.moreItem} onPress={onPhrasePuzzles}>
                  <Ionicons name="chatbubble-ellipses" size={20} color="#8b5cf6" />
                  <Text style={styles.moreItemText}>Phrases</Text>
                </TouchableOpacity>
              )}
              {onThemes && (
                <TouchableOpacity style={styles.moreItem} onPress={onThemes}>
                  <Ionicons name="color-palette" size={20} color="#ec4899" />
                  <Text style={styles.moreItemText}>Themes</Text>
                </TouchableOpacity>
              )}
              {onWordOfDay && (
                <TouchableOpacity style={styles.moreItem} onPress={onWordOfDay}>
                  <Ionicons name="book" size={20} color="#8b5cf6" />
                  <Text style={styles.moreItemText}>Word of Day</Text>
                </TouchableOpacity>
              )}
              {onStats && (
                <TouchableOpacity style={styles.moreItem} onPress={onStats}>
                  <Ionicons name="stats-chart" size={20} color="#3b82f6" />
                  <Text style={styles.moreItemText}>Statistics</Text>
                </TouchableOpacity>
              )}
              {onWatchAdForCoins && (
                <TouchableOpacity style={styles.moreItem} onPress={onWatchAdForCoins}>
                  <Ionicons name="play-circle" size={20} color="#10b981" />
                  <Text style={styles.moreItemText}>Free Coins</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>150+ Levels • 8 Categories</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourcesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  resourceDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 12,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  logoEmoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    letterSpacing: 4,
    marginTop: 4,
  },
  levelCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  levelCardGradient: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelInfo: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#8892b0',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  levelNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  progressMini: {
    alignItems: 'flex-end',
  },
  progressBarMini: {
    width: 80,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFillMini: {
    height: '100%',
    backgroundColor: '#00b894',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#8892b0',
    marginTop: 4,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 24,
  },
  playText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginLeft: 12,
    letterSpacing: 2,
  },
  primaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  primaryAction: {
    flex: 1,
    marginHorizontal: 6,
    position: 'relative',
  },
  primaryActionGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  primaryActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  primaryActionSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  newBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinBadge: {
    backgroundColor: '#10b981',
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
  },
  secondaryAction: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  secondaryActionText: {
    fontSize: 12,
    color: '#8892b0',
    marginTop: 4,
  },
  puzzleModesBtn: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  puzzleModesGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  puzzleModesIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  puzzleModesInfo: {
    flex: 1,
  },
  puzzleModesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ec4899',
  },
  puzzleModesSub: {
    fontSize: 12,
    color: '#8892b0',
    marginTop: 2,
  },
  puzzleModesNew: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  puzzleModesNewText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  moreToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  moreToggleText: {
    fontSize: 14,
    color: '#8892b0',
    marginRight: 8,
  },
  moreFeatures: {
    marginBottom: 20,
  },
  moreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moreItem: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    marginBottom: 10,
  },
  moreItemText: {
    fontSize: 11,
    color: '#8892b0',
    marginTop: 6,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#4a5568',
  },
});

export default CleanHomeScreen;
