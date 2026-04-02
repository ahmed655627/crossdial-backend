import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useGameStore } from '../src/store/gameStore';
import { useAuth } from '../src/contexts/AuthContext';
import { LetterWheel } from '../src/components/LetterWheel';
import { CrosswordGrid } from '../src/components/CrosswordGrid';
import { LevelCompleteModal } from '../src/components/LevelCompleteModal';
import { LevelSelectModal } from '../src/components/LevelSelectModal';
import { DailyRewardsWheel } from '../src/components/DailyRewardsWheel';
import { LeaderboardModal } from '../src/components/LeaderboardModal';
import { AdLoadingModal } from '../src/components/AdLoadingModal';
import { PrivacyPolicyModal } from '../src/components/PrivacyPolicyModal';
import { ConsentModal } from '../src/components/ConsentModal';
import { HomeScreen } from '../src/components/HomeScreen';
import { AchievementsModal } from '../src/components/AchievementsModal';
import { DailyChallengeModal } from '../src/components/DailyChallengeModal';
import { WordOfDayModal } from '../src/components/WordOfDayModal';
import { StatsModal } from '../src/components/StatsModal';
import { ThemeSelectorModal, Theme, THEMES } from '../src/components/ThemeSelectorModal';
import { adManager } from '../src/utils/adManager';
import { soundManager } from '../src/utils/sounds';
import { notificationService } from '../src/services/notificationService';
import { privacyService } from '../src/services/privacyService';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const {
    initialize,
    loading,
    error,
    currentLevel,
    progress,
    foundWords,
    bonusWordsFound,
    shuffleLetters,
    useHint,
    lastWordResult,
    clearSelection,
    resetLevel,
    restartLevel,
    canSpinWheel,
    soundEnabled,
    toggleSound,
  } = useGameStore();

  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [showDailyWheel, setShowDailyWheel] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showWordFeedback, setShowWordFeedback] = useState(false);
  const [showAdLoading, setShowAdLoading] = useState(false);
  const [adMessage, setAdMessage] = useState('Loading ad...');
  const [showMenu, setShowMenu] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [showWordOfDay, setShowWordOfDay] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [unlockedThemes, setUnlockedThemes] = useState(['default', 'ocean', 'forest']);
  const [levelsCompletedSinceAd, setLevelsCompletedSinceAd] = useState(0);

  // Check for privacy consent on first load
  useEffect(() => {
    const checkConsent = async () => {
      const hasConsent = await privacyService.hasConsent();
      if (!hasConsent) {
        setShowConsentModal(true);
      }
      setConsentChecked(true);
    };
    checkConsent();
  }, []);

  useEffect(() => {
    if (consentChecked) {
      initialize();
      
      // Initialize ad manager
      const initAds = async () => {
        try {
          await adManager.initialize();
          console.log('AdManager initialized');
        } catch (error) {
          console.log('AdManager init error:', error);
        }
      };
      initAds();
      
      // Register for push notifications
      const setupNotifications = async () => {
        try {
          await notificationService.registerForPushNotifications();
          
          // Schedule daily reward reminder
          await notificationService.scheduleDailyRewardReminder();
        } catch (error) {
          console.log('Notification setup error:', error);
        }
      };
      setupNotifications();
      
      // Set up notification listeners
      const cleanup = notificationService.addNotificationListeners(
        (notification) => {
          // Handle notification received while app is open
          console.log('Notification received:', notification);
        },
        (response) => {
          // Handle notification tap
          const data = response.notification.request.content.data;
          if (data?.type === 'daily_reward') {
            setShowDailyRewards(true);
          }
        }
      );
      
      return cleanup;
    }
  }, [consentChecked]);

  // Handle consent acceptance - ads are always enabled
  const handleConsentAccept = async () => {
    await privacyService.saveConsent(true); // Always enable ads
    setShowConsentModal(false);
  };

  // Show word feedback animation
  useEffect(() => {
    if (lastWordResult) {
      setShowWordFeedback(true);
      const timer = setTimeout(() => {
        setShowWordFeedback(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [lastWordResult]);

  // Handle hint with ad (REWARDED - user chooses)
  const handleHint = async () => {
    Alert.alert(
      'Use Hint',
      'Watch a short video to get a hint?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Watch & Get Hint',
          onPress: async () => {
            setAdMessage('Watch ad for hint...');
            setShowAdLoading(true);
            await adManager.showRewardedAd();
            setShowAdLoading(false);
            await useHint();
          },
        },
      ]
    );
  };

  // Handle reset - NO AD (free action)
  const handleReset = async () => {
    Alert.alert(
      'Reset Level',
      'Reset your progress for this level?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: () => {
            resetLevel();
            setShowMenu(false);
          },
        },
      ]
    );
  };

  // Handle restart - NO AD (free action)
  const handleRestart = async () => {
    Alert.alert(
      'Restart Level',
      'Restart this level from the beginning?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restart',
          onPress: () => {
            restartLevel();
            setShowMenu(false);
          },
        },
      ]
    );
  };

  // Handle shuffle - NO AD (free action)
  const handleShuffle = () => {
    shuffleLetters();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={StyleSheet.absoluteFill}
        />
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading Wonders...</Text>
      </View>
    );
  }

  if (!currentLevel) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.errorText}>{error || 'Failed to load game'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={initialize}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const targetWordsCount = currentLevel.targetWords.length;
  const foundWordsCount = foundWords.length;
  const progressPercent = (foundWordsCount / targetWordsCount) * 100;
  const canSpin = canSpinWheel();

  // Helper function to get daily challenge data
  const getDailyChallengeData = () => {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const dayOfWeek = today.getDay();
    return {
      date: dateStr,
      bonus: 50 + (dayOfWeek * 10),
      difficulty: difficulties[dayOfWeek % 3],
      completed: false,
      streak: progress?.daily_streak || 1,
    };
  };

  // Helper function to get stats
  const getStats = () => ({
    totalWordsFound: progress?.total_words_found || 0,
    totalLevelsCompleted: progress?.completed_levels?.length || 0,
    totalCoinsEarned: progress?.total_coins_earned || 0,
    totalTimePlayed: progress?.total_time_played || 0,
    currentStreak: progress?.daily_streak || 0,
    bestStreak: progress?.best_streak || 0,
    hintsUsed: progress?.hints_used || 0,
    perfectLevels: progress?.perfect_levels || 0,
  });

  // Handle theme selection
  const handleSelectTheme = (theme: Theme) => {
    setCurrentTheme(theme.id);
  };

  // Handle theme unlock
  const handleUnlockTheme = (theme: Theme) => {
    if (progress?.coins >= (theme.unlockCoins || 0)) {
      setUnlockedThemes([...unlockedThemes, theme.id]);
      setCurrentTheme(theme.id);
      // Deduct coins (would need to call backend in real implementation)
    }
  };

  // Show Home Screen if user hasn't started playing
  if (showHomeScreen) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <HomeScreen
          onPlay={() => setShowHomeScreen(false)}
          onDailyRewards={() => setShowDailyWheel(true)}
          onLeaderboard={() => setShowLeaderboard(true)}
          onSettings={() => setShowPrivacyPolicy(true)}
          onAchievements={() => setShowAchievements(true)}
          onDailyChallenge={() => setShowDailyChallenge(true)}
          onWordOfDay={() => setShowWordOfDay(true)}
          onStats={() => setShowStats(true)}
          onThemes={() => setShowThemes(true)}
        />
        
        {/* Modals accessible from Home */}
        <DailyRewardsWheel
          visible={showDailyWheel}
          onClose={() => setShowDailyWheel(false)}
        />
        <LeaderboardModal
          visible={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
        <PrivacyPolicyModal
          visible={showPrivacyPolicy}
          onClose={() => setShowPrivacyPolicy(false)}
        />
        <AchievementsModal
          visible={showAchievements}
          onClose={() => setShowAchievements(false)}
        />
        <DailyChallengeModal
          visible={showDailyChallenge}
          onClose={() => setShowDailyChallenge(false)}
          onPlay={() => {
            setShowDailyChallenge(false);
            setShowHomeScreen(false);
          }}
          dailyChallenge={getDailyChallengeData()}
        />
        <WordOfDayModal
          visible={showWordOfDay}
          onClose={() => setShowWordOfDay(false)}
          word={null}
        />
        <StatsModal
          visible={showStats}
          onClose={() => setShowStats(false)}
          stats={getStats()}
        />
        <ThemeSelectorModal
          visible={showThemes}
          onClose={() => setShowThemes(false)}
          currentTheme={currentTheme}
          onSelectTheme={handleSelectTheme}
          coins={progress?.coins || 0}
          unlockedThemes={unlockedThemes}
          onUnlockTheme={handleUnlockTheme}
        />
        <ConsentModal
          visible={showConsentModal}
          onAccept={handleConsentAccept}
        />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={StyleSheet.absoluteFill}
        />

        {/* Header */}
        <View style={styles.header}>
          {/* Home Button */}
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => setShowHomeScreen(true)}
          >
            <Ionicons name="home" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.levelButton}
            onPress={() => setShowLevelSelect(true)}
          >
            <Ionicons name="map" size={20} color="#fff" />
            <Text style={styles.levelText}>Level {currentLevel.id}</Text>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            {/* Achievements Button */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowAchievements(true)}
            >
              <Ionicons name="medal" size={22} color="#f39c12" />
            </TouchableOpacity>

            {/* Leaderboard Button */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowLeaderboard(true)}
            >
              <Ionicons name="trophy" size={22} color="#FFD700" />
            </TouchableOpacity>

            {/* Daily Wheel Button */}
            <TouchableOpacity
              style={[styles.iconButton, canSpin && styles.iconButtonGlow]}
              onPress={() => setShowDailyWheel(true)}
            >
              <Ionicons name="gift" size={22} color={canSpin ? '#FFD700' : '#fff'} />
              {canSpin && <View style={styles.notificationDot} />}
            </TouchableOpacity>

            {/* Menu Button */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowMenu(!showMenu)}
            >
              <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
            </TouchableOpacity>

            {/* Coins & Hints */}
            <View style={styles.coinContainer}>
              <Ionicons name="diamond" size={18} color="#FFD700" />
              <Text style={styles.coinText}>{progress?.coins || 0}</Text>
            </View>
            
            <View style={styles.hintContainer}>
              <Ionicons name="bulb" size={18} color="#9b59b6" />
              <Text style={styles.hintText}>{progress?.hints || 0}</Text>
            </View>
          </View>
        </View>

        {/* Dropdown Menu */}
        {showMenu && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleReset}>
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(231, 76, 60, 0.15)' }]}>
                <Ionicons name="refresh" size={22} color="#e74c3c" />
              </View>
              <Text style={styles.menuItemText}>Reset Level</Text>
              <Ionicons name="play-circle" size={18} color="#bdc3c7" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleRestart}>
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(243, 156, 18, 0.15)' }]}>
                <Ionicons name="reload" size={22} color="#f39c12" />
              </View>
              <Text style={styles.menuItemText}>Restart Level</Text>
              <Ionicons name="play-circle" size={18} color="#bdc3c7" />
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={toggleSound}>
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(52, 152, 219, 0.15)' }]}>
                <Ionicons name={soundEnabled ? 'volume-high' : 'volume-mute'} size={22} color="#3498db" />
              </View>
              <Text style={styles.menuItemText}>Sound {soundEnabled ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setShowMenu(false);
                setShowPrivacyPolicy(true);
              }}
            >
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(39, 174, 96, 0.15)' }]}>
                <Ionicons name="shield-checkmark" size={22} color="#27ae60" />
              </View>
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={[styles.menuItem, styles.menuItemClose]} onPress={() => setShowMenu(false)}>
              <View style={[styles.menuIconBg, { backgroundColor: 'rgba(149, 165, 166, 0.15)' }]}>
                <Ionicons name="close" size={22} color="#7f8c8d" />
              </View>
              <Text style={[styles.menuItemText, { color: '#7f8c8d' }]}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Wonder Name */}
        <View style={styles.wonderInfo}>
          <Text style={styles.wonderName}>{currentLevel.wonder}</Text>
          <Text style={styles.wonderLocation}>{currentLevel.location}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {foundWordsCount}/{targetWordsCount}
          </Text>
        </View>

        {/* Crossword Grid */}
        <View style={styles.gridContainer}>
          <CrosswordGrid />
        </View>

        {/* Word feedback */}
        {showWordFeedback && lastWordResult && (
          <View
            style={[
              styles.wordFeedback,
              lastWordResult.isValid
                ? lastWordResult.isBonus
                  ? styles.bonusWordFeedback
                  : styles.correctWordFeedback
                : styles.wrongWordFeedback,
            ]}
          >
            <Text style={styles.wordFeedbackText}>
              {lastWordResult.isValid
                ? lastWordResult.isBonus
                  ? `${lastWordResult.word} +5 BONUS!`
                  : `${lastWordResult.word} ✓`
                : `${lastWordResult.word} ✗`}
            </Text>
          </View>
        )}

        {/* Bonus Words Counter */}
        {bonusWordsFound.length > 0 && (
          <View style={styles.bonusContainer}>
            <Ionicons name="gift" size={16} color="#9b59b6" />
            <Text style={styles.bonusText}>
              {bonusWordsFound.length} bonus word
              {bonusWordsFound.length > 1 ? 's' : ''}
            </Text>
          </View>
        )}

        {/* Letter Wheel */}
        <View style={styles.wheelContainer}>
          <LetterWheel />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.shuffleButton]} onPress={handleShuffle}>
            <Ionicons name="shuffle" size={24} color="#fff" />
            <View style={styles.adBadge}>
              <Ionicons name="play" size={10} color="#fff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.hintButton]}
            onPress={handleHint}
          >
            <Ionicons name="bulb" size={24} color="#fff" />
            <View style={styles.adBadge}>
              <Ionicons name="play" size={10} color="#fff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={clearSelection}>
            <Ionicons name="backspace" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Error message */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error}</Text>
          </View>
        )}

        {/* Modals */}
        <LevelCompleteModal />
        <LevelSelectModal
          visible={showLevelSelect}
          onClose={() => setShowLevelSelect(false)}
        />
        <DailyRewardsWheel
          visible={showDailyWheel}
          onClose={() => setShowDailyWheel(false)}
        />
        <LeaderboardModal
          visible={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
        <AchievementsModal
          visible={showAchievements}
          onClose={() => setShowAchievements(false)}
        />
        <AdLoadingModal visible={showAdLoading} message={adMessage} />
        <PrivacyPolicyModal
          visible={showPrivacyPolicy}
          onClose={() => setShowPrivacyPolicy(false)}
        />
        <ConsentModal
          visible={showConsentModal}
          onAccept={handleConsentAccept}
          onViewPrivacyPolicy={() => {
            setShowConsentModal(false);
            setShowPrivacyPolicy(true);
          }}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 35 : 5,
    paddingBottom: 8,
  },
  homeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  levelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    gap: 6,
  },
  levelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonGlow: {
    backgroundColor: 'rgba(255, 215, 0, 0.25)',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e74c3c',
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 4,
  },
  coinText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(155, 89, 182, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 4,
  },
  hintText: {
    color: '#9b59b6',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropdownMenu: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 90 : 60,
    right: 10,
    left: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
    borderRadius: 10,
    marginVertical: 2,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  menuItemText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#2c3e50',
    letterSpacing: 0.4,
    textAlign: 'left',
  },
  menuIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: 6,
    marginHorizontal: 10,
  },
  menuItemClose: {
    backgroundColor: 'transparent',
  },
  wonderInfo: {
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8,
  },
  wonderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  wonderLocation: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    minWidth: 35,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
  },
  wordFeedback: {
    position: 'absolute',
    top: height * 0.32,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 100,
  },
  correctWordFeedback: {
    backgroundColor: '#27ae60',
  },
  bonusWordFeedback: {
    backgroundColor: '#9b59b6',
  },
  wrongWordFeedback: {
    backgroundColor: '#e74c3c',
  },
  wordFeedbackText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bonusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 8,
  },
  bonusText: {
    color: '#9b59b6',
    fontSize: 12,
    fontWeight: '600',
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintButton: {
    backgroundColor: 'rgba(241, 196, 15, 0.3)',
  },
  shuffleButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.3)',
  },
  adBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBanner: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(231, 76, 60, 0.9)',
    padding: 12,
    borderRadius: 10,
    zIndex: 200,
  },
  errorBannerText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
