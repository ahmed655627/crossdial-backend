/**
 * Clean Home Screen - Enhanced Version
 * Features: Animated Background, Seasonal Themes, Global Stats, 
 * Challenge Friends, Spin Countdown, Level Preview
 */

import React, { useEffect, useState, useRef } from 'react';
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

// ============================================
// SEASONAL THEMES - Auto-changes based on date
// ============================================
const getSeasonalTheme = () => {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  // Christmas (Dec 15 - Jan 5)
  if ((month === 11 && day >= 15) || (month === 0 && day <= 5)) {
    return {
      name: 'christmas',
      primary: ['#1a472a', '#2d5a3d', '#165B33'],
      accent: '#c41e3a',
      secondary: '#FFD700',
      emoji: '🎄',
      particles: ['❄️', '🎁', '⭐', '🔔'],
    };
  }
  
  // Halloween (Oct 15 - Nov 1)
  if ((month === 9 && day >= 15) || (month === 10 && day <= 1)) {
    return {
      name: 'halloween',
      primary: ['#1a1a2e', '#2d1f3d', '#0f0f23'],
      accent: '#ff6600',
      secondary: '#9b59b6',
      emoji: '🎃',
      particles: ['🎃', '👻', '🦇', '🕷️'],
    };
  }
  
  // Valentine's (Feb 1-15)
  if (month === 1 && day <= 15) {
    return {
      name: 'valentine',
      primary: ['#2d1a2e', '#3d1f3d', '#1a0f1a'],
      accent: '#ff6b9d',
      secondary: '#ff4081',
      emoji: '💕',
      particles: ['💝', '💖', '💗', '❤️'],
    };
  }
  
  // Easter (March 15 - April 20)
  if ((month === 2 && day >= 15) || (month === 3 && day <= 20)) {
    return {
      name: 'easter',
      primary: ['#1a2e2a', '#1f3d35', '#0f2320'],
      accent: '#98d8c8',
      secondary: '#f7dc6f',
      emoji: '🐰',
      particles: ['🥚', '🐣', '🌸', '🐰'],
    };
  }
  
  // Summer (June - August)
  if (month >= 5 && month <= 7) {
    return {
      name: 'summer',
      primary: ['#1a2e3e', '#1f3d4d', '#0f2330'],
      accent: '#00bcd4',
      secondary: '#ffeb3b',
      emoji: '☀️',
      particles: ['☀️', '🌊', '🏖️', '🌴'],
    };
  }
  
  // Default theme
  return {
    name: 'default',
    primary: ['#1a1a2e', '#16213e', '#0f0f23'],
    accent: '#667eea',
    secondary: '#764ba2',
    emoji: '🌍',
    particles: ['✨', '⭐', '💫', '🌟'],
  };
};

// ============================================
// FLOATING PARTICLES COMPONENT
// ============================================
const FloatingParticles: React.FC<{ particles: string[] }> = ({ particles }) => {
  const particleAnims = useRef(
    Array.from({ length: 12 }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      opacity: new Animated.Value(Math.random() * 0.5 + 0.2),
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
    }))
  ).current;

  useEffect(() => {
    particleAnims.forEach((anim, index) => {
      const animateParticle = () => {
        const duration = 8000 + Math.random() * 4000;
        Animated.parallel([
          Animated.timing(anim.y, {
            toValue: -50,
            duration,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(anim.opacity, {
              toValue: 0.6,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          anim.x.setValue(Math.random() * width);
          anim.y.setValue(height + 50);
          anim.opacity.setValue(0.2);
          animateParticle();
        });
      };
      
      setTimeout(animateParticle, index * 600);
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particleAnims.map((anim, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.particle,
            {
              transform: [
                { translateX: anim.x },
                { translateY: anim.y },
                { scale: anim.scale },
              ],
              opacity: anim.opacity,
            },
          ]}
        >
          {particles[index % particles.length]}
        </Animated.Text>
      ))}
    </View>
  );
};

// ============================================
// SPIN COUNTDOWN COMPONENT
// ============================================
const SpinCountdown: React.FC<{ nextSpinTime?: Date; onPress: () => void }> = ({ 
  nextSpinTime, 
  onPress 
}) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [canSpin, setCanSpin] = useState(true);

  useEffect(() => {
    if (!nextSpinTime) {
      setCanSpin(true);
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const diff = nextSpinTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCanSpin(true);
        setTimeLeft('');
        return;
      }
      
      setCanSpin(false);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nextSpinTime]);

  return (
    <TouchableOpacity 
      style={[styles.spinCountdown, canSpin && styles.spinCountdownReady]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.spinIconContainer}>
        <Ionicons 
          name={canSpin ? "gift" : "time-outline"} 
          size={20} 
          color={canSpin ? "#FFD700" : "#8892b0"} 
        />
      </View>
      <View style={styles.spinTextContainer}>
        <Text style={[styles.spinLabel, canSpin && styles.spinLabelReady]}>
          {canSpin ? 'Free Spin!' : 'Next Spin'}
        </Text>
        {!canSpin && timeLeft && (
          <Text style={styles.spinTimer}>{timeLeft}</Text>
        )}
      </View>
      {canSpin && (
        <View style={styles.spinBadge}>
          <Text style={styles.spinBadgeText}>1</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// ============================================
// GLOBAL STATS COMPONENT
// ============================================
const GlobalStats: React.FC = () => {
  const [stats, setStats] = useState({
    wordsFoundToday: 1247893,
    playersOnline: 12453,
    puzzlesSolved: 89234,
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        wordsFoundToday: prev.wordsFoundToday + Math.floor(Math.random() * 50),
        playersOnline: Math.max(10000, prev.playersOnline + Math.floor(Math.random() * 100) - 50),
        puzzlesSolved: prev.puzzlesSolved + Math.floor(Math.random() * 5),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <View style={styles.globalStats}>
      <View style={styles.globalStatsHeader}>
        <View style={styles.liveDot} />
        <Text style={styles.globalStatsTitle}>Live Stats</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatNumber(stats.wordsFoundToday)}</Text>
          <Text style={styles.statLabel}>Words Today</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatNumber(stats.playersOnline)}</Text>
          <Text style={styles.statLabel}>Playing Now</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatNumber(stats.puzzlesSolved)}</Text>
          <Text style={styles.statLabel}>Puzzles Solved</Text>
        </View>
      </View>
    </View>
  );
};

// ============================================
// LEVEL PREVIEW COMPONENT
// ============================================
const LevelPreview: React.FC<{ level: number; theme: any }> = ({ level, theme }) => {
  const getNextLevelInfo = () => {
    const themes = [
      { range: [1, 20], name: 'Basics', icon: '📚', difficulty: 'Easy' },
      { range: [21, 40], name: 'Nature', icon: '🌿', difficulty: 'Easy' },
      { range: [41, 60], name: 'Travel', icon: '✈️', difficulty: 'Medium' },
      { range: [61, 80], name: 'Food', icon: '🍕', difficulty: 'Medium' },
      { range: [81, 100], name: 'Science', icon: '🔬', difficulty: 'Hard' },
      { range: [101, 120], name: 'Culture', icon: '🎭', difficulty: 'Hard' },
      { range: [121, 140], name: 'Advanced', icon: '🎓', difficulty: 'Expert' },
      { range: [141, 160], name: 'Master', icon: '👑', difficulty: 'Master' },
    ];
    
    const nextLevel = level + 1;
    for (const t of themes) {
      if (nextLevel >= t.range[0] && nextLevel <= t.range[1]) {
        return { ...t, level: nextLevel };
      }
    }
    return { name: 'Bonus', icon: '🌟', difficulty: 'Special', level: nextLevel };
  };

  const nextInfo = getNextLevelInfo();
  const isNewTheme = level % 20 === 0;

  return (
    <View style={styles.levelPreview}>
      <View style={styles.levelPreviewHeader}>
        <Text style={styles.levelPreviewTitle}>Next Up</Text>
        {isNewTheme && (
          <View style={styles.newThemeBadge}>
            <Text style={styles.newThemeText}>NEW THEME!</Text>
          </View>
        )}
      </View>
      <View style={styles.levelPreviewContent}>
        <Text style={styles.levelPreviewIcon}>{nextInfo.icon}</Text>
        <View style={styles.levelPreviewInfo}>
          <Text style={styles.levelPreviewName}>
            Level {nextInfo.level}: {nextInfo.name}
          </Text>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{nextInfo.difficulty}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.accent} />
      </View>
    </View>
  );
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
  const { progress, levels, canSpinWheel, spinsRemaining } = useGameStore();
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  
  // Get seasonal theme
  const theme = getSeasonalTheme();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

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

  // Challenge Friend handler
  const handleChallengePress = async () => {
    try {
      const message = `🎮 I challenge you to beat my score on CrossDial Puzzles!\n\n` +
        `📊 I'm on Level ${currentLevel} with ${coins} coins.\n\n` +
        `Can you beat that? Download now and let's play!\n` +
        `🔗 https://crossdial.app/challenge/${Date.now()}`;
      
      await Share.share({
        message,
        title: 'CrossDial Challenge',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={theme.primary as [string, string, string]}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Animated Floating Particles */}
      <FloatingParticles particles={theme.particles} />
      
      {/* Offline Indicator */}
      <OfflineIndicator />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Bar */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.settingsBtn} onPress={onSettings}>
              <Ionicons name="settings-outline" size={24} color="#8892b0" />
            </TouchableOpacity>
            <SoundToggle size={20} style={styles.soundToggle} />
          </View>
          
          <View style={styles.resourcesRow}>
            {streakDays > 0 && (
              <View style={styles.streakContainer}>
                <StreakFlame streakDays={streakDays} size="small" />
              </View>
            )}
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

        {/* Logo & Title with Seasonal Emoji */}
        <View style={styles.logoSection}>
          <Text style={styles.logoEmoji}>{theme.emoji}</Text>
          <Text style={styles.appTitle}>CrossDial</Text>
          <Text style={styles.appSubtitle}>PUZZLES</Text>
          {theme.name !== 'default' && (
            <View style={[styles.seasonalBadge, { backgroundColor: theme.accent + '30' }]}>
              <Text style={[styles.seasonalText, { color: theme.accent }]}>
                {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)} Edition
              </Text>
            </View>
          )}
        </View>

        {/* Global Stats */}
        <GlobalStats />

        {/* Current Level Card */}
        <View style={styles.levelCard}>
          <LinearGradient
            colors={[`${theme.accent}25`, `${theme.secondary}15`]}
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
                    { 
                      width: `${Math.max(3, (completedLevels / totalLevels) * 100)}%`,
                      backgroundColor: theme.accent,
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressTextMini}>{completedLevels}/{totalLevels}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Level Preview */}
        <LevelPreview level={currentLevel} theme={theme} />

        {/* Play Button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            style={[styles.playButton, { shadowColor: theme.accent }]} 
            onPress={onPlay}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[theme.accent, theme.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.playButtonGradient}
            >
              <Ionicons name="play" size={32} color="#fff" />
              <Text style={styles.playButtonText}>PLAY</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Actions Row */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.quickAction} onPress={onDailyRewards}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#fbbf2420' }]}>
              <Ionicons name="gift" size={22} color="#fbbf24" />
            </View>
            <Text style={styles.quickActionText}>Rewards</Text>
            {canSpin && <View style={styles.notificationDot} />}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={onDailyChallenge}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#10b98120' }]}>
              <Ionicons name="calendar" size={22} color="#10b981" />
            </View>
            <Text style={styles.quickActionText}>Daily</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={onAchievements}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#f59e0b20' }]}>
              <Ionicons name="trophy" size={22} color="#f59e0b" />
            </View>
            <Text style={styles.quickActionText}>Trophies</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={onLeaderboard}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#8b5cf620' }]}>
              <Ionicons name="podium" size={22} color="#8b5cf6" />
            </View>
            <Text style={styles.quickActionText}>Ranks</Text>
          </TouchableOpacity>
        </View>

        {/* Spin Countdown */}
        <SpinCountdown 
          nextSpinTime={canSpin ? undefined : new Date(Date.now() + 4 * 60 * 60 * 1000)} 
          onPress={onDailyRewards} 
        />

        {/* Challenge Friend Button */}
        <TouchableOpacity style={styles.challengeButton} onPress={handleChallengePress}>
          <LinearGradient
            colors={['#ec4899', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.challengeGradient}
          >
            <Ionicons name="paper-plane" size={20} color="#fff" />
            <Text style={styles.challengeText}>Challenge a Friend</Text>
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Puzzle Modes */}
        {onPuzzleModes && (
          <TouchableOpacity style={styles.puzzleModesBtn} onPress={onPuzzleModes}>
            <View style={styles.puzzleModesBtnContent}>
              <Ionicons name="grid-outline" size={22} color="#a855f7" />
              <Text style={styles.puzzleModesText}>Puzzle Modes</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        )}

        {/* More Features Toggle */}
        <TouchableOpacity 
          style={styles.moreToggle}
          onPress={() => setShowMoreFeatures(!showMoreFeatures)}
        >
          <Text style={styles.moreToggleText}>
            {showMoreFeatures ? 'Less Features' : 'More Features'}
          </Text>
          <Ionicons 
            name={showMoreFeatures ? 'chevron-up' : 'chevron-down'} 
            size={18} 
            color="#8892b0" 
          />
        </TouchableOpacity>

        {showMoreFeatures && (
          <Animated.View style={[styles.moreSection, { opacity: fadeAnim }]}>
            <View style={styles.moreGrid}>
              {onTimedChallenge && (
                <TouchableOpacity style={styles.moreItem} onPress={onTimedChallenge}>
                  <Ionicons name="timer-outline" size={20} color="#f97316" />
                  <Text style={styles.moreItemText}>Timed</Text>
                </TouchableOpacity>
              )}
              {onPhrasePuzzles && (
                <TouchableOpacity style={styles.moreItem} onPress={onPhrasePuzzles}>
                  <Ionicons name="chatbubble-outline" size={20} color="#06b6d4" />
                  <Text style={styles.moreItemText}>Phrases</Text>
                </TouchableOpacity>
              )}
              {onThemes && (
                <TouchableOpacity style={styles.moreItem} onPress={onThemes}>
                  <Ionicons name="color-palette-outline" size={20} color="#ec4899" />
                  <Text style={styles.moreItemText}>Themes</Text>
                </TouchableOpacity>
              )}
              {onWordOfDay && (
                <TouchableOpacity style={styles.moreItem} onPress={onWordOfDay}>
                  <Ionicons name="today-outline" size={20} color="#14b8a6" />
                  <Text style={styles.moreItemText}>Word of Day</Text>
                </TouchableOpacity>
              )}
              {onStats && (
                <TouchableOpacity style={styles.moreItem} onPress={onStats}>
                  <Ionicons name="stats-chart" size={20} color="#6366f1" />
                  <Text style={styles.moreItemText}>Statistics</Text>
                </TouchableOpacity>
              )}
              {onWatchAdForCoins && (
                <TouchableOpacity style={styles.moreItem} onPress={onWatchAdForCoins}>
                  <Ionicons name="play-circle" size={20} color="#10b981" />
                  <Text style={styles.moreItemText}>Free Coins</Text>
                </TouchableOpacity>
              )}
              {onLanguageSelect && (
                <TouchableOpacity style={styles.moreItem} onPress={onLanguageSelect}>
                  <Text style={styles.languageFlag}>
                    {currentLanguage === 'en' ? '🇺🇸' : 
                     currentLanguage === 'it' ? '🇮🇹' :
                     currentLanguage === 'es' ? '🇪🇸' :
                     currentLanguage === 'fr' ? '🇫🇷' :
                     currentLanguage === 'de' ? '🇩🇪' :
                     currentLanguage === 'pt' ? '🇧🇷' :
                     currentLanguage === 'nl' ? '🇳🇱' :
                     currentLanguage === 'ar' ? '🇸🇦' :
                     currentLanguage === 'hi' ? '🇮🇳' :
                     currentLanguage === 'ja' ? '🇯🇵' :
                     currentLanguage === 'ko' ? '🇰🇷' :
                     currentLanguage === 'zh' ? '🇨🇳' : '🌍'}
                  </Text>
                  <Text style={styles.moreItemText}>Language</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {theme.name !== 'default' ? `${theme.emoji} Happy ${theme.name}! ${theme.emoji}` : ''}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================================
// STYLES
// ============================================
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
  particle: {
    position: 'absolute',
    fontSize: 20,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundToggle: {
    marginLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  resourcesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  streakContainer: {
    marginRight: 8,
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
    marginTop: 10,
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8892b0',
    letterSpacing: 6,
    marginTop: 2,
  },
  seasonalBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seasonalText: {
    fontSize: 11,
    fontWeight: '600',
  },
  globalStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  globalStatsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  globalStatsTitle: {
    fontSize: 12,
    color: '#8892b0',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 10,
    color: '#8892b0',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  levelCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  levelCardGradient: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelInfo: {},
  categoryLabel: {
    fontSize: 12,
    color: '#8892b0',
    marginBottom: 2,
  },
  levelNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
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
    borderRadius: 3,
  },
  progressTextMini: {
    fontSize: 10,
    color: '#8892b0',
    marginTop: 4,
  },
  levelPreview: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  levelPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelPreviewTitle: {
    fontSize: 11,
    color: '#8892b0',
    fontWeight: '600',
  },
  newThemeBadge: {
    backgroundColor: '#10b98130',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newThemeText: {
    fontSize: 9,
    color: '#10b981',
    fontWeight: '700',
  },
  levelPreviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelPreviewIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  levelPreviewInfo: {
    flex: 1,
  },
  levelPreviewName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  difficultyText: {
    fontSize: 10,
    color: '#8892b0',
  },
  playButton: {
    borderRadius: 30,
    marginVertical: 16,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 30,
  },
  playButtonText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginLeft: 10,
    letterSpacing: 2,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickActionText: {
    fontSize: 11,
    color: '#8892b0',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
  spinCountdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  spinCountdownReady: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  spinIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  spinLabel: {
    fontSize: 14,
    color: '#8892b0',
    fontWeight: '600',
  },
  spinLabelReady: {
    color: '#fbbf24',
  },
  spinTimer: {
    fontSize: 12,
    color: '#667',
    marginTop: 2,
  },
  spinBadge: {
    backgroundColor: '#fbbf24',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  challengeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  challengeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  challengeText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  puzzleModesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  puzzleModesBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  puzzleModesText: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 12,
    fontWeight: '500',
  },
  moreToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  moreToggleText: {
    fontSize: 13,
    color: '#8892b0',
    marginRight: 4,
  },
  moreSection: {
    marginTop: 8,
  },
  moreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moreItem: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  moreItemText: {
    fontSize: 11,
    color: '#8892b0',
    marginTop: 6,
  },
  languageFlag: {
    fontSize: 20,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#8892b0',
  },
});

export default CleanHomeScreen;
