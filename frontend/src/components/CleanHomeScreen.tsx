/**
 * Clean Home Screen - Premium Professional Design
 * Ultra-clean, modern UI with subtle animations
 */

import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  Share,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import StreakFlame from './StreakFlame';
import SoundToggle from './SoundToggle';
import OfflineIndicator from './OfflineIndicator';

const { width, height } = Dimensions.get('window');

// Brand colors
const BRAND_PURPLE = '#7B61FF';

// ============================================
// SEASONAL THEMES
// ============================================
const getSeasonalTheme = () => {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  if ((month === 11 && day >= 15) || (month === 0 && day <= 5)) {
    return {
      name: 'Christmas',
      gradient: ['#0d1f12', '#1a2f1c', '#0a1a0d'],
      accent: '#e74c3c',
      glow: '#27ae60',
      icon: '🎄',
    };
  }
  
  if ((month === 9 && day >= 15) || (month === 10 && day <= 1)) {
    return {
      name: 'Halloween',
      gradient: ['#1a0f1f', '#2d1a2e', '#0f0a12'],
      accent: '#f39c12',
      glow: '#9b59b6',
      icon: '🎃',
    };
  }
  
  if (month === 1 && day <= 15) {
    return {
      name: 'Valentine',
      gradient: ['#1f0f15', '#2e1a22', '#120a0d'],
      accent: '#e91e63',
      glow: '#ec407a',
      icon: '💕',
    };
  }
  
  if ((month === 2 && day >= 15) || (month === 3 && day <= 20)) {
    return {
      name: 'Spring',
      gradient: ['#0f1f1a', '#1a2e28', '#0a1512'],
      accent: '#26a69a',
      glow: '#4db6ac',
      icon: '🌸',
    };
  }
  
  if (month >= 5 && month <= 7) {
    return {
      name: 'Summer',
      gradient: ['#0f1a1f', '#1a282e', '#0a1215'],
      accent: '#00bcd4',
      glow: '#4dd0e1',
      icon: '☀️',
    };
  }
  
  return {
    name: null,
    gradient: ['#0a0e1a', '#111827', '#0a0e14'],
    accent: '#6366f1',
    glow: '#818cf8',
    icon: '✨',
  };
};

// ============================================
// SUBTLE GLOW PARTICLES
// ============================================
const GlowParticles: React.FC<{ color: string }> = ({ color }) => {
  const particles = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${15 + Math.random() * 70}%`,
      size: 100 + Math.random() * 150,
      delay: i * 1500,
    })), []
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <View
          key={p.id}
          style={[
            styles.glowOrb,
            {
              left: p.left,
              top: `${20 + Math.random() * 60}%`,
              width: p.size,
              height: p.size,
              backgroundColor: color,
              opacity: 0.03,
            },
          ]}
        />
      ))}
    </View>
  );
};

// ============================================
// ANIMATED STAT COUNTER
// ============================================
const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDisplayValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return <Text style={styles.statValue}>{formatNumber(displayValue)}{suffix}</Text>;
};

// ============================================
// MAIN COMPONENT
// ============================================
interface CleanHomeScreenProps {
  onPlay: () => void;
  onDailyRewards: () => void;
  onDailyChallenge: () => void;
  onLeaderboard: () => void;
  onAchievements: () => void;
  onSettings: () => void;
  onPuzzleModes?: () => void;
  onTimedChallenge?: () => void;
  onPhrasePuzzles?: () => void;
  onThemes?: () => void;
  onWordOfDay?: () => void;
  onStats?: () => void;
  onWatchAdForCoins?: () => void;
  onLanguageSelect?: () => void;
  streakDays?: number;
  currentLanguage?: string;
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
  onLanguageSelect,
  streakDays = 0,
  currentLanguage = 'en',
}) => {
  const { progress, levels, canSpinWheel } = useGameStore();
  const [showMore, setShowMore] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const theme = getSeasonalTheme();
  
  // Live stats simulation
  const [stats, setStats] = useState({
    words: 1247893,
    players: 12453,
    puzzles: 89234,
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Update stats periodically
    const interval = setInterval(() => {
      setStats(prev => ({
        words: prev.words + Math.floor(Math.random() * 30),
        players: Math.max(10000, prev.players + Math.floor(Math.random() * 50) - 25),
        puzzles: prev.puzzles + Math.floor(Math.random() * 3),
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentLevel = progress?.current_level || 1;
  const totalLevels = levels?.length || 150;
  const completedLevels = progress?.completed_levels?.length || 0;
  const coins = progress?.coins || 0;
  const hints = progress?.hints_remaining || 3;
  const canSpin = canSpinWheel?.() || false;
  const progressPercent = Math.round((completedLevels / totalLevels) * 100);

  const getCategoryInfo = () => {
    const categories = [
      { max: 20, name: 'Basics', icon: '📚', next: 'Nature' },
      { max: 40, name: 'Nature', icon: '🌿', next: 'Travel' },
      { max: 60, name: 'Travel', icon: '✈️', next: 'Food' },
      { max: 80, name: 'Food', icon: '🍕', next: 'Science' },
      { max: 100, name: 'Science', icon: '🔬', next: 'Culture' },
      { max: 120, name: 'Culture', icon: '🎭', next: 'Advanced' },
      { max: 140, name: 'Advanced', icon: '🎓', next: 'Master' },
      { max: 999, name: 'Master', icon: '👑', next: null },
    ];
    return categories.find(c => currentLevel <= c.max) || categories[0];
  };

  const category = getCategoryInfo();

  const handleChallenge = async () => {
    try {
      await Share.share({
        message: `🎮 Beat my Level ${currentLevel} on WonderWordQuest!\n\n🏆 ${coins} coins collected\n\nDownload: https://wonderwordquest.app`,
        title: 'WonderWordQuest Challenge',
      });
    } catch (e) {}
  };

  const getLanguageFlag = () => {
    const flags: Record<string, string> = {
      en: '🇺🇸', it: '🇮🇹', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪',
      pt: '🇧🇷', nl: '🇳🇱', ar: '🇸🇦', hi: '🇮🇳', ja: '🇯🇵',
      ko: '🇰🇷', zh: '🇨🇳',
    };
    return flags[currentLanguage] || '🌍';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={theme.gradient as [string, string, string]}
        style={StyleSheet.absoluteFill}
      />
      
      <GlowParticles color={theme.glow} />
      <OfflineIndicator />

      <Animated.ScrollView 
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Minimal Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconBtn} onPress={onSettings}>
              <Ionicons name="settings-outline" size={22} color="#64748b" />
            </TouchableOpacity>
            <SoundToggle size={18} style={styles.soundBtn} />
          </View>
          
          <View style={styles.headerRight}>
            {streakDays > 0 && (
              <View style={styles.streakBadge}>
                <Text style={styles.streakIcon}>🔥</Text>
                <Text style={styles.streakText}>{streakDays}</Text>
              </View>
            )}
            <View style={styles.resourcePill}>
              <Ionicons name="bulb" size={14} color="#a855f7" />
              <Text style={styles.resourceValue}>{hints}</Text>
            </View>
            <View style={styles.resourcePill}>
              <Ionicons name="diamond" size={14} color="#fbbf24" />
              <Text style={styles.resourceValue}>{coins}</Text>
            </View>
          </View>
        </View>

        {/* Brand Section */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>{theme.icon}</Text>
          </View>
          <Text style={styles.brandName}>WonderWord</Text>
          <Text style={styles.brandTagline}>WORD PUZZLES</Text>
          {theme.name && (
            <View style={[styles.seasonBadge, { backgroundColor: theme.accent + '20' }]}>
              <Text style={[styles.seasonText, { color: theme.accent }]}>
                {theme.name} Edition
              </Text>
            </View>
          )}
        </View>

        {/* Live Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <AnimatedCounter value={stats.words} />
            <Text style={styles.statLabel}>Words Today</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AnimatedCounter value={stats.players} />
            <Text style={styles.statLabel}>Playing</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AnimatedCounter value={stats.puzzles} />
            <Text style={styles.statLabel}>Solved</Text>
          </View>
        </View>

        {/* Current Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.categoryName}>{category.icon} {category.name}</Text>
              <Text style={styles.levelText}>Level {currentLevel}</Text>
            </View>
            <View style={styles.progressRight}>
              <Text style={styles.progressPercent}>{progressPercent}%</Text>
              <Text style={styles.progressLabel}>{completedLevels}/{totalLevels}</Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={[theme.accent, theme.glow]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${Math.max(2, progressPercent)}%` }]}
              />
            </View>
          </View>
          {category.next && (
            <Text style={styles.nextCategory}>
              Next: {category.next} at Level {Math.ceil(currentLevel / 20) * 20 + 1}
            </Text>
          )}
        </View>

        {/* PLAY Button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity style={styles.playBtn} onPress={onPlay} activeOpacity={0.9}>
            <LinearGradient
              colors={[theme.accent, theme.glow]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.playBtnGradient}
            >
              <Ionicons name="play" size={28} color="#fff" />
              <Text style={styles.playBtnText}>PLAY</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickBtn} onPress={onDailyRewards}>
            <View style={[styles.quickIcon, { backgroundColor: 'rgba(251, 191, 36, 0.1)' }]}>
              <Ionicons name="gift" size={20} color="#fbbf24" />
            </View>
            <Text style={styles.quickLabel}>Rewards</Text>
            {canSpin && <View style={styles.quickDot} />}
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBtn} onPress={onDailyChallenge}>
            <View style={[styles.quickIcon, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <Ionicons name="calendar" size={20} color="#10b981" />
            </View>
            <Text style={styles.quickLabel}>Daily</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBtn} onPress={onAchievements}>
            <View style={[styles.quickIcon, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
              <Ionicons name="trophy" size={20} color="#f59e0b" />
            </View>
            <Text style={styles.quickLabel}>Awards</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickBtn} onPress={onLeaderboard}>
            <View style={[styles.quickIcon, { backgroundColor: 'rgba(139, 92, 246, 0.1)' }]}>
              <Ionicons name="podium" size={20} color="#8b5cf6" />
            </View>
            <Text style={styles.quickLabel}>Ranks</Text>
          </TouchableOpacity>
        </View>

        {/* Challenge Friend - Gradient bg */}
        <TouchableOpacity style={styles.challengeBtn} onPress={handleChallenge}>
          <LinearGradient
            colors={['#FF6B9D', '#C44DFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons name="paper-plane" size={18} color="#fff" />
          <Text style={styles.challengeText}>Challenge a Friend</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        {/* Puzzle Modes - with chevron and actual count */}
        {onPuzzleModes && (
          <TouchableOpacity style={styles.modesBtn} onPress={() => setShowMore(!showMore)}>
            <View style={styles.modesBtnLeft}>
              <Ionicons name="apps-outline" size={22} color={BRAND_PURPLE} />
              <Text style={styles.modesBtnText}>Puzzle Modes</Text>
            </View>
            <View style={styles.modesBadge}>
              <Text style={styles.modesBadgeText}>7</Text>
              <Ionicons 
                name={showMore ? 'chevron-up' : 'chevron-down'} 
                size={14} 
                color={BRAND_PURPLE} 
              />
            </View>
          </TouchableOpacity>
        )}

        {/* More Options Grid - shows when Puzzle Modes is expanded */}
        {showMore && (
          <View style={styles.moreGrid}>
            {onTimedChallenge && (
              <TouchableOpacity style={styles.moreItem} onPress={onTimedChallenge}>
                <Ionicons name="stopwatch-outline" size={18} color="#f97316" />
                <Text style={styles.moreItemText}>Timed</Text>
              </TouchableOpacity>
            )}
            {onPhrasePuzzles && (
              <TouchableOpacity style={styles.moreItem} onPress={onPhrasePuzzles}>
                <Ionicons name="chatbubble-ellipses-outline" size={18} color="#06b6d4" />
                <Text style={styles.moreItemText}>Phrases</Text>
              </TouchableOpacity>
            )}
            {onThemes && (
              <TouchableOpacity style={styles.moreItem} onPress={onThemes}>
                <Ionicons name="color-palette-outline" size={18} color="#ec4899" />
                <Text style={styles.moreItemText}>Themes</Text>
              </TouchableOpacity>
            )}
            {onWordOfDay && (
              <TouchableOpacity style={styles.moreItem} onPress={onWordOfDay}>
                <Ionicons name="today-outline" size={18} color="#14b8a6" />
                <Text style={styles.moreItemText}>Word</Text>
              </TouchableOpacity>
            )}
            {onStats && (
              <TouchableOpacity style={styles.moreItem} onPress={onStats}>
                <Ionicons name="bar-chart-outline" size={18} color="#6366f1" />
                <Text style={styles.moreItemText}>Stats</Text>
              </TouchableOpacity>
            )}
            {onWatchAdForCoins && (
              <TouchableOpacity style={styles.moreItem} onPress={onWatchAdForCoins}>
                <Ionicons name="videocam-outline" size={18} color="#22c55e" />
                <Text style={styles.moreItemText}>Bonus</Text>
              </TouchableOpacity>
            )}
            {onLanguageSelect && (
              <TouchableOpacity style={styles.moreItem} onPress={onLanguageSelect}>
                <Text style={styles.langFlag}>{getLanguageFlag()}</Text>
                <Text style={styles.moreItemText}>Lang</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.footer} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

// ============================================
// STYLES - Clean Professional Design (Polished)
// ============================================
const SAFE_MARGIN = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SAFE_MARGIN,
    paddingBottom: 30,
  },
  glowOrb: {
    position: 'absolute',
    borderRadius: 999,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundBtn: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 146, 60, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  streakIcon: {
    fontSize: 14,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fb923c',
  },
  resourcePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  resourceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
  },

  // Brand
  brandSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoIcon: {
    fontSize: 36,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 4,
    marginTop: 2,
  },
  seasonBadge: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  seasonText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Stats Bar with dividers
  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '400',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)', // 10% opacity divider
    marginVertical: 4,
  },

  // Progress Card - Level Card
  progressCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 2,
    fontWeight: '400',
  },
  levelText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#f8fafc',
  },
  progressRight: {
    alignItems: 'flex-end',
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
  },
  progressLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '400',
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 4, // 4px corner radius
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: BRAND_PURPLE, // Brand purple #7B61FF
  },
  nextCategory: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '400',
  },

  // Play Button - 28px corner radius
  playBtn: {
    marginBottom: 16,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: BRAND_PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  playBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  playBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
  },

  // Quick Actions - 56x56px icons, 11px labels
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickBtn: {
    alignItems: 'center',
    flex: 1,
    minHeight: 80,
  },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  quickDot: {
    position: 'absolute',
    top: 2,
    right: '20%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },

  // Challenge Button - Gradient bg #FF6B9D to #C44DFF
  challengeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 20, // 20px right padding
    marginBottom: 16,
    gap: 10,
    overflow: 'hidden',
  },
  challengeGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  challengeText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },

  // Puzzle Modes - with chevron and actual count
  modesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  modesBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modesBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  modesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(123, 97, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  modesBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: BRAND_PURPLE,
  },

  // More Toggle - removed, integrated into modes
  moreToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  moreToggleText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '400',
  },
  
  // More Grid - 24px icons, 11px labels, 2px stroke icons
  moreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moreItem: {
    width: '23%',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 8,
    minHeight: 70,
  },
  moreItemText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: 6,
  },
  langFlag: {
    fontSize: 24,
  },

  footer: {
    height: 20,
  },
});

export default CleanHomeScreen;
