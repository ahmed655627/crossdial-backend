import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  ImageBackground,
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
  onDailyChallenge?: () => void;
  onWordOfDay?: () => void;
  onStats?: () => void;
  onThemes?: () => void;
  onWatchAdForCoins?: () => void;
  onFeaturesHub?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onPlay,
  onDailyRewards,
  onLeaderboard,
  onSettings,
  onAchievements,
  onDailyChallenge,
  onWordOfDay,
  onStats,
  onThemes,
  onWatchAdForCoins,
  onFeaturesHub,
}) => {
  const { progress, levels, canSpinWheel, spinsRemaining } = useGameStore();
  const [titleAnim] = useState(new Animated.Value(0));
  const [buttonAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [cardAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Staggered animations
    Animated.sequence([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(buttonAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

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
  const totalLevels = levels.length || 150;
  const completedLevels = progress?.completed_levels?.length || 0;
  const coins = progress?.coins || 0;
  const hints = progress?.hints_remaining || 3;
  const canSpin = canSpinWheel();
  const dailyStreak = progress?.daily_streak || 0;

  // Get current category based on level - Copyright Free
  const getCurrentCategory = () => {
    if (currentLevel <= 20) return { name: 'Basics', emoji: '📚' };
    if (currentLevel <= 40) return { name: 'Everyday Life', emoji: '🏠' };
    if (currentLevel <= 60) return { name: 'Nature & Animals', emoji: '🌿' };
    if (currentLevel <= 80) return { name: 'Food & Kitchen', emoji: '🍳' };
    if (currentLevel <= 100) return { name: 'Travel & Places', emoji: '✈️' };
    if (currentLevel <= 120) return { name: 'Sports & Games', emoji: '⚽' };
    if (currentLevel <= 140) return { name: 'Science & Tech', emoji: '🔬' };
    return { name: 'Expert', emoji: '🏆' };
  };

  const category = getCurrentCategory();

  return (
    <SafeAreaView style={styles.container}>
      {/* Background */}
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Decorative elements */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
      <View style={styles.decorCircle3} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} onPress={onSettings}>
            <Ionicons name="settings-outline" size={24} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
          
          <View style={styles.topBarRight}>
            {/* Hints */}
            <View style={styles.resourceBadge}>
              <Ionicons name="bulb" size={16} color="#a855f7" />
              <Text style={styles.resourceText}>{hints}</Text>
            </View>
            
            {/* Coins */}
            <TouchableOpacity style={styles.coinBadge} onPress={onWatchAdForCoins}>
              <Ionicons name="diamond" size={16} color="#fbbf24" />
              <Text style={styles.coinText}>{coins}</Text>
              <View style={styles.plusIcon}>
                <Ionicons name="add" size={10} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logo Section */}
        <Animated.View 
          style={[
            styles.logoSection,
            {
              opacity: titleAnim,
              transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [-30, 0] }) }],
            },
          ]}
        >
          <View style={styles.logoWrapper}>
            <LinearGradient
              colors={['#667eea', '#764ba2', '#f093fb']}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.logoEmoji}>🌍</Text>
            </LinearGradient>
            <View style={styles.logoGlow} />
          </View>
          <Text style={styles.title}>CrossDial</Text>
          <Text style={styles.subtitle}>PUZZLES</Text>
        </Animated.View>

        {/* Current Category Card - Copyright Free */}
        <Animated.View style={[styles.wonderCard, { opacity: cardAnim }]}>
          <LinearGradient
            colors={['rgba(103, 126, 234, 0.3)', 'rgba(118, 75, 162, 0.3)']}
            style={styles.wonderCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.wonderCardContent}>
              <Text style={styles.wonderEmoji}>{category.emoji}</Text>
              <View style={styles.wonderInfo}>
                <Text style={styles.wonderLabel}>CURRENT CATEGORY</Text>
                <Text style={styles.wonderName}>{category.name}</Text>
              </View>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>Level {currentLevel}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Play Button */}
        <Animated.View
          style={[
            styles.playButtonWrapper,
            { transform: [{ scale: Animated.multiply(buttonAnim, pulseAnim) }] },
          ]}
        >
          <TouchableOpacity onPress={onPlay} activeOpacity={0.9}>
            <LinearGradient
              colors={['#00b894', '#00cec9', '#00b894']}
              style={styles.playButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.playButtonInner}>
                <Ionicons name="play" size={36} color="#fff" />
                <Text style={styles.playText}>PLAY</Text>
              </View>
              <View style={styles.playButtonShine} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressValue}>{completedLevels}/{totalLevels}</Text>
          </View>
          <View style={styles.progressBarBg}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={[styles.progressBarFill, { width: `${Math.max(5, (completedLevels / totalLevels) * 100)}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
        </View>

        {/* Quick Actions Grid */}
        <Animated.View style={[styles.actionsGrid, { opacity: cardAnim }]}>
          {/* Daily Challenge */}
          <TouchableOpacity style={styles.actionCard} onPress={onDailyChallenge}>
            <LinearGradient colors={['#ff6b6b', '#ee5a5a']} style={styles.actionCardGradient}>
              <Ionicons name="flame" size={28} color="#fff" />
              <Text style={styles.actionCardLabel}>Daily</Text>
              <Text style={styles.actionCardSub}>Challenge</Text>
            </LinearGradient>
            <View style={styles.actionBadge}>
              <Text style={styles.actionBadgeText}>NEW</Text>
            </View>
          </TouchableOpacity>

          {/* Daily Spin */}
          <TouchableOpacity style={styles.actionCard} onPress={onDailyRewards}>
            <LinearGradient colors={['#a855f7', '#9333ea']} style={styles.actionCardGradient}>
              <Ionicons name="gift" size={28} color="#fff" />
              <Text style={styles.actionCardLabel}>Daily</Text>
              <Text style={styles.actionCardSub}>Rewards</Text>
            </LinearGradient>
            {canSpin && spinsRemaining > 0 && (
              <View style={[styles.actionBadge, styles.spinBadge]}>
                <Text style={styles.actionBadgeText}>{spinsRemaining}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Achievements */}
          <TouchableOpacity style={styles.actionCard} onPress={onAchievements}>
            <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.actionCardGradient}>
              <Ionicons name="trophy" size={28} color="#fff" />
              <Text style={styles.actionCardLabel}>Achieve</Text>
              <Text style={styles.actionCardSub}>ments</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Leaderboard */}
          <TouchableOpacity style={styles.actionCard} onPress={onLeaderboard}>
            <LinearGradient colors={['#3b82f6', '#2563eb']} style={styles.actionCardGradient}>
              <Ionicons name="podium" size={28} color="#fff" />
              <Text style={styles.actionCardLabel}>Leader</Text>
              <Text style={styles.actionCardSub}>board</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Feature Cards Row */}
        <View style={styles.featureRow}>
          {/* Word of Day */}
          <TouchableOpacity style={styles.featureCard} onPress={onWordOfDay}>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.1)']}
              style={styles.featureCardGradient}
            >
              <Ionicons name="book" size={22} color="#8b5cf6" />
              <Text style={styles.featureCardText}>Word of Day</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Stats */}
          <TouchableOpacity style={styles.featureCard} onPress={onStats}>
            <LinearGradient
              colors={['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.1)']}
              style={styles.featureCardGradient}
            >
              <Ionicons name="stats-chart" size={22} color="#3b82f6" />
              <Text style={styles.featureCardText}>Statistics</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* More Features */}
          <TouchableOpacity style={styles.featureCard} onPress={onFeaturesHub}>
            <LinearGradient
              colors={['rgba(245, 158, 11, 0.2)', 'rgba(245, 158, 11, 0.1)']}
              style={styles.featureCardGradient}
            >
              <Ionicons name="apps" size={22} color="#f59e0b" />
              <Text style={styles.featureCardText}>More</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Daily Streak Banner */}
        {dailyStreak > 0 && (
          <View style={styles.streakBanner}>
            <LinearGradient
              colors={['rgba(251, 191, 36, 0.2)', 'rgba(245, 158, 11, 0.1)']}
              style={styles.streakGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.streakEmoji}>🔥</Text>
              <View style={styles.streakInfo}>
                <Text style={styles.streakDays}>{dailyStreak} Day Streak!</Text>
                <Text style={styles.streakSub}>Keep playing daily for bonuses</Text>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Watch Ad Button */}
        <TouchableOpacity style={styles.watchAdBtn} onPress={onWatchAdForCoins}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.watchAdGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.watchAdLeft}>
              <Ionicons name="play-circle" size={24} color="#fff" />
              <Text style={styles.watchAdText}>Watch Ad</Text>
            </View>
            <View style={styles.watchAdReward}>
              <Ionicons name="diamond" size={16} color="#fbbf24" />
              <Text style={styles.watchAdCoins}>+50</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>150+ Levels • 8 Categories • Daily Challenges</Text>
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
    paddingBottom: 100,
  },
  decorCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    top: -100,
    right: -100,
  },
  decorCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(118, 75, 162, 0.08)',
    bottom: 100,
    left: -80,
  },
  decorCircle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(240, 147, 251, 0.06)',
    top: '40%',
    right: -50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  resourceText: {
    color: '#a855f7',
    fontSize: 14,
    fontWeight: '700',
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  coinText: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '700',
  },
  plusIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  logoGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoEmoji: {
    fontSize: 44,
  },
  logoGlow: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    top: -10,
    left: -10,
    zIndex: -1,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(102, 126, 234, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 8,
    marginTop: 2,
  },
  wonderCard: {
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  wonderCardGradient: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  wonderCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wonderEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  wonderInfo: {
    flex: 1,
  },
  wonderLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1,
  },
  wonderName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 2,
  },
  levelBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 184, 148, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelBadgeText: {
    color: '#00b894',
    fontSize: 12,
    fontWeight: '700',
  },
  playButtonWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  playButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00b894',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    overflow: 'hidden',
  },
  playButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginTop: 5,
    letterSpacing: 3,
  },
  playButtonShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  progressSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  progressValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: 15,
    gap: 8,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 54) / 4,
    aspectRatio: 0.85,
    borderRadius: 14,
    overflow: 'hidden',
  },
  actionCardGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  actionCardLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 5,
    textAlign: 'center',
  },
  actionCardSub: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 9,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  spinBadge: {
    backgroundColor: '#a855f7',
  },
  actionBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  featureRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 15,
  },
  featureCard: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  featureCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
  },
  featureCardText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  streakBanner: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  streakGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  streakEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  streakInfo: {
    flex: 1,
  },
  streakDays: {
    color: '#fbbf24',
    fontSize: 16,
    fontWeight: '700',
  },
  streakSub: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    marginTop: 2,
  },
  watchAdBtn: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 14,
    overflow: 'hidden',
  },
  watchAdGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  watchAdLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  watchAdText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  watchAdReward: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  watchAdCoins: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default HomeScreen;
