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
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
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
import AchievementsModal from '../src/components/AchievementsModal';
import DailyChallengeModal from '../src/components/DailyChallengeModal';
import WordOfDayModal from '../src/components/WordOfDayModal';
import StatsModal from '../src/components/StatsModal';
import { ThemeSelectorModal, Theme } from '../src/components/ThemeSelectorModal';
import { BannerAdComponent } from '../src/components/BannerAdComponent';
import { FeaturesHub } from '../src/components/FeaturesHub';
import { MysteryBoxModal } from '../src/components/MysteryBox';
import { ScratchCardModal } from '../src/components/ScratchCard';
import { DailyLoginCalendar } from '../src/components/DailyLoginCalendar';
import { LevelSkipModal, FreeHintsModal } from '../src/components/AdRewardModals';

// NEW: Enhanced game components
import WordFormingDisplay from '../src/components/WordFormingDisplay';
import ComboCounter from '../src/components/ComboCounter';
import StarRating from '../src/components/StarRating';
import FoundWordsPanel from '../src/components/FoundWordsPanel';
import ParticleEffect from '../src/components/ParticleEffect';
import MiniStatsBar from '../src/components/MiniStatsBar';
import { soundManager } from '../src/utils/sounds';
import { notificationService } from '../src/services/notificationService';
import { privacyService } from '../src/services/privacyService';

// NEW: Import improvement components
import ComboToast from '../src/components/ComboToast';
import InteractiveTutorial from '../src/components/InteractiveTutorial';
import ErrorBoundary from '../src/components/ErrorBoundary';
import ShareButton from '../src/components/ShareButton';
import HintPreview from '../src/components/HintPreview';
import { useComboSystem } from '../src/hooks/useComboSystem';
import { useHaptics } from '../src/hooks/useHaptics';

// Import web stub for adManager (native modules don't work on web preview)
// Native builds will use the real adManager through the components
import { adManager } from '../src/utils/adManager.web';

// NEW: Import themed components and settings
import { ThemedBackground } from '../src/components/ThemedBackground';
import { AnimatedLetterWheel } from '../src/components/AnimatedLetterWheel';
import { PremiumLetterWheel } from '../src/components/PremiumLetterWheel';
import { LanguageSelector } from '../src/components/LanguageSelector';
import { useGameSettings } from '../src/stores/gameSettingsStore';
import { getThemeForLevel, getBackgroundForLevel, getWheelForLevel } from '../src/utils/gameThemes';

// NEW: Import level clues and backgrounds
import { getThemeForLevel as getGameTheme, getCategoryForLevel } from '../src/data/gameThemes';
import { getCluesForLevel, getCategoryForLevel as getClueCategory, getRandomFeedback } from '../src/data/originalClues';

// NEW: Import game modes
import GameModeSelector from '../src/components/GameModeSelector';

// NEW: Import puzzle modes
import {
  PuzzleModesMenu,
  MirrorWordsGame,
  MissingHeartsGame,
  LoveInLayersGame,
  EmotionChainGame,
  WordPairGame,
  FlipSolveGame,
  CrossedEmotionsGame,
} from '../src/components/puzzleModes';
import MatchMode from '../src/components/MatchMode';
import { GameModeType } from '../src/data/gameModes';

// NEW: Import puzzle modes service
import { puzzleModesService } from '../src/services/puzzleModesService';

// NEW: Clean UI components
import PauseMenu from '../src/components/PauseMenu';
import ProgressToast from '../src/components/ProgressToast';
import WordPlaceholders from '../src/components/WordPlaceholders';
import ToolsButton from '../src/components/ToolsButton';
import DialOverlay from '../src/components/DialOverlay';

// NEW: Contextual Hint Hook
import { useContextualHint } from '../src/hooks/useContextualHint';

// NEW: Clean Home Screen (decluttered)
import { CleanHomeScreen } from '../src/components/CleanHomeScreen';

// NEW: Import feature modals
import { PowerUpsModal } from '../src/components/PowerUpsModal';
import { CombosModal } from '../src/components/CombosModal';
import { TimeChallengeModal } from '../src/components/TimeChallengeModal';
import { ProfileModal } from '../src/components/ProfileModal';

// NEW: Import enhanced UI components
import LoadingSplash from '../src/components/LoadingSplash';
import RateAppModal, { shouldShowRateModal } from '../src/components/RateAppModal';
import OfflineIndicator from '../src/components/OfflineIndicator';
import EnhancedConfetti from '../src/components/EnhancedConfetti';
import SoundToggle from '../src/components/SoundToggle';
import StreakFlame from '../src/components/StreakFlame';

// NEW: Import enhanced game features
import TimedChallengeModal from '../src/components/TimedChallengeModal';
import PhrasePuzzleModal from '../src/components/PhrasePuzzleModal';
import ThemePacksModal from '../src/components/ThemePacksModal';
import WordDefinitionPopup from '../src/components/WordDefinitionPopup';
import { TimedChallenge } from '../src/data/timedChallenges';
import { PhrasePuzzle } from '../src/data/phrasePuzzles';
import { hasDefinition } from '../src/data/wordDefinitions';
import { OnboardingScreen } from '../src/components/OnboardingScreen';
import { MusicModal } from '../src/components/MusicModal';
import { CelebrationsModal } from '../src/components/CelebrationsModal';
import { MascotModal } from '../src/components/MascotModal';
import { EventsModal } from '../src/components/EventsModal';
import { 
  SpinWheelModal, 
  StatisticsModal, 
  ProgressMapModal, 
  LeaderboardModal as GameLeaderboardModal, 
  FriendChallengeModal,
  WordDefinitionModal 
} from '../src/components/GameFeatureModals';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const {
    initialize,
    loading,
    error,
    currentLevel,
    currentWord,
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
    selectedLetterIndices,
    selectLetter,
    deviceId,
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
  
  // Feature Hub modals state
  const [showFeaturesHub, setShowFeaturesHub] = useState(false);
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [showPiggyBank, setShowPiggyBank] = useState(false);
  const [showPostcards, setShowPostcards] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [showWonderFacts, setShowWonderFacts] = useState(false);
  const [showWordPacks, setShowWordPacks] = useState(false);
  const [mysteryBoxesAvailable, setMysteryBoxesAvailable] = useState(3);
  const [canScratch, setCanScratch] = useState(true);
  
  // New feature states
  const [showDailyLogin, setShowDailyLogin] = useState(false);
  const [showLevelSkip, setShowLevelSkip] = useState(false);
  const [showFreeHints, setShowFreeHints] = useState(false);
  const [loginStreak, setLoginStreak] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);
  
  // NEW: Language selector state
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  // NEW: Game mode states
  const [showGameModeSelector, setShowGameModeSelector] = useState(false);
  const [currentGameMode, setCurrentGameMode] = useState<GameModeType>('classic');
  const [showMatchMode, setShowMatchMode] = useState(false);
  const [matchPuzzleId, setMatchPuzzleId] = useState(1);
  
  // NEW: Feature modal states
  const [showPowerUps, setShowPowerUps] = useState(false);
  const [showCombos, setShowCombos] = useState(false);
  const [showTimeChallenge, setShowTimeChallenge] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showCelebrations, setShowCelebrations] = useState(false);
  const [showMascot, setShowMascot] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  
  // Profile and game stats
  const [userAvatar, setUserAvatar] = useState('🦉');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentMascot, setCurrentMascot] = useState('owl');
  
  // Celebration settings
  const [confettiEnabled, setConfettiEnabled] = useState(true);
  const [screenShakeEnabled, setScreenShakeEnabled] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  
  // Time Challenge state
  const [timeChallengeActive, setTimeChallengeActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [challengeDifficulty, setChallengeDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  
  // NEW: Puzzle Modes state
  const [showPuzzleModes, setShowPuzzleModes] = useState(false);
  const [activePuzzleMode, setActivePuzzleMode] = useState<string | null>(null);
  const [puzzleModesScore, setPuzzleModesScore] = useState(0);
  
  // NEW: Clean UI state
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [showProgressToast, setShowProgressToast] = useState(false);
  const [lastFoundWord, setLastFoundWord] = useState<string | null>(null);
  
  // NEW: Enhanced UI component states
  const [showAppSplash, setShowAppSplash] = useState(true);
  const [showRateApp, setShowRateApp] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  
  // NEW FEATURES: Game enhancements
  const [recentWordsFound, setRecentWordsFound] = useState<string[]>([]);
  const [comboCount, setComboCount] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [coinAnimationAmount, setCoinAnimationAmount] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'sad' | 'neutral' | 'excited'>('neutral');
  const [dailyChallengeActive, setDailyChallengeActive] = useState(true);
  const [dailyChallengeTimeLeft, setDailyChallengeTimeLeft] = useState('5h 30m');
  const [showHintPreview, setShowHintPreview] = useState(false);
  const [hintPreviewWord, setHintPreviewWord] = useState('');
  
  // NEW FEATURES BATCH 2
  const [wordOfTheDay, setWordOfTheDay] = useState('WONDER');
  const [wordOfTheDayFound, setWordOfTheDayFound] = useState(false);
  const [goldenLetterIndex, setGoldenLetterIndex] = useState<number | null>(null);
  const [showWordDefinition, setShowWordDefinition] = useState(false);
  const [lastWordDefinition, setLastWordDefinition] = useState({ word: '', definition: '' });
  const [levelStars, setLevelStars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  // Note: showLeaderboard already declared above (line 115)
  const [showFriendChallenge, setShowFriendChallenge] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  // Note: showAchievements already declared above (line 124)
  const [showProgressMap, setShowProgressMap] = useState(false);
  const [seasonalTheme, setSeasonalTheme] = useState<'default' | 'christmas' | 'halloween' | 'summer'>('default');
  
  // NEW: Enhanced Game Feature States
  const [showTimedChallenge, setShowTimedChallenge] = useState(false);
  const [showPhrasePuzzles, setShowPhrasePuzzles] = useState(false);
  const [showThemePacks, setShowThemePacks] = useState(false);
  const [activeTimedChallenge, setActiveTimedChallenge] = useState<TimedChallenge | null>(null);
  const [activePhrasePuzzle, setActivePhrasePuzzle] = useState<PhrasePuzzle | null>(null);
  const [completedTimedChallenges, setCompletedTimedChallenges] = useState<{ [id: number]: { stars: number; bestTime: number } }>({});
  const [completedPhrasePuzzles, setCompletedPhrasePuzzles] = useState<number[]>([]);
  const [selectedThemePack, setSelectedThemePack] = useState('default');
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<string[]>(['first_word']);
  const [showWordDefinitionPopup, setShowWordDefinitionPopup] = useState(false);
  // lastFoundWord already declared above in Clean UI state
  const [playerStats, setPlayerStats] = useState({
    wordsFound: 0,
    levelsCompleted: 0,
    streakDays: 0,
    fastestTime: 999,
    bonusWords: 0,
    hintsUnused: 0,
    perfectLevels: 0,
    dailyCompleted: 0,
    coinsEarned: 0,
  });
  
  const [achievements, setAchievements] = useState([
    { id: 'first_word', name: 'First Steps', icon: '👶', unlocked: true },
    { id: 'combo_5', name: 'Combo King', icon: '🔥', unlocked: false },
    { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', unlocked: false },
    { id: 'word_master', name: 'Word Master', icon: '📚', unlocked: false },
    { id: 'explorer', name: 'World Explorer', icon: '🌍', unlocked: false },
  ]);
  const [gameStats, setGameStats] = useState({
    totalWordsFound: 0,
    totalPlayTime: 0,
    accuracy: 85,
    longestStreak: 0,
    levelsCompleted: 0,
  });
  
  // NOTE: comboCount and comboMultiplier already declared above (lines 212-213)
  // NOTE: soundEnabled comes from useGameStore
  // Additional enhanced game states (non-duplicates only)
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [isWordValid, setIsWordValid] = useState(false);
  const [isWordInvalid, setIsWordInvalid] = useState(false);
  const [currentStars, setCurrentStars] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  
  // NEW: Get settings and translations
  const { t, language, animationsEnabled, usePremiumWheel, premiumWheelTheme } = useGameSettings();
  
  // NEW: Word found animation values
  const wordFoundScale = useSharedValue(0);
  const wordFoundOpacity = useSharedValue(0);
  
  // NEW: Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true);
  
  // NEW: Use decluttered home screen
  const [useCleanHomeScreen, setUseCleanHomeScreen] = useState(true);
  
  // NEW: Contextual Hint - shows glow on tiles after 20s of being stuck
  const { 
    hintWord, 
    isShowingHint, 
    dismissHint,
    resetTimer: resetHintTimer 
  } = useContextualHint({
    targetWords: currentLevel?.targetWords || [],
    foundWords: foundWords || [],
    enabled: !showHomeScreen && !showPauseMenu,
  });
  
  // NEW: Get current theme based on level
  const currentLevelNumber = progress?.current_level || 1;
  const levelTheme = getThemeForLevel(currentLevelNumber);
  const backgroundConfig = getBackgroundForLevel(currentLevelNumber);
  const wheelConfig = getWheelForLevel(currentLevelNumber);

  // NEW: Combo System Hook
  const {
    comboCount: hookComboCount,
    comboMultiplier: hookComboMultiplier,
    showComboToast,
    comboMessage,
    registerWordFound,
    resetCombo,
  } = useComboSystem();
  
  // NEW: Haptic Feedback Hook
  const { lightTap, successVibrate, errorVibrate } = useHaptics();
  
  // NEW: Interactive Tutorial State
  const [showTutorial, setShowTutorial] = useState(false);
  // hintPreviewWord already declared above

  // Check for tutorial on first load
  useEffect(() => {
    const checkTutorial = async () => {
      try {
        const completed = await AsyncStorage.getItem('tutorial_completed');
        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        // Show tutorial after onboarding is complete and tutorial not seen
        if (seen && !completed) {
          setShowTutorial(true);
        }
      } catch (e) {
        console.log('Error checking tutorial status');
      }
    };
    checkTutorial();
  }, [hasSeenOnboarding]);

  // Check for onboarding on first load
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        if (!seen) {
          setShowOnboarding(true);
          setHasSeenOnboarding(false);
        }
      } catch (e) {
        console.log('Error checking onboarding status');
      }
    };
    checkOnboarding();
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setShowOnboarding(false);
      setHasSeenOnboarding(true);
    } catch (e) {
      console.log('Error saving onboarding status');
    }
  };

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
            setShowDailyWheel(true);
          }
        }
      );
      
      return cleanup;
    }
  }, [consentChecked]);

  // Initialize puzzle modes service with device ID
  useEffect(() => {
    if (deviceId) {
      puzzleModesService.setDeviceId(deviceId);
      console.log('Puzzle modes service initialized with device ID');
    }
  }, [deviceId]);

  // Time Challenge timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timeChallengeActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up!
            setTimeChallengeActive(false);
            setChallengeDifficulty(null);
            Alert.alert(
              '⏰ Time\'s Up!',
              'You ran out of time! Try again?',
              [
                { text: 'OK', style: 'default' }
              ]
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeChallengeActive, timeRemaining]);

  // Start Time Challenge
  const startTimeChallenge = (difficulty: 'easy' | 'medium' | 'hard') => {
    const times = { easy: 180, medium: 120, hard: 60 };
    setTimeRemaining(times[difficulty]);
    setChallengeDifficulty(difficulty);
    setTimeChallengeActive(true);
    setShowTimeChallenge(false);
  };

  // Format time for display
  const formatTimeDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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

  // Handle word found - update combo, mascot, animations
  useEffect(() => {
    if (lastWordResult?.isValid && lastWordResult?.word) {
      // Update recent words
      setRecentWordsFound(prev => [lastWordResult.word, ...prev].slice(0, 5));
      
      // Register word found for combo system (uses hook)
      registerWordFound();
      
      // Also update local combo state for backward compatibility
      setComboCount(prev => {
        const newCount = prev + 1;
        // Set multiplier based on combo
        if (newCount >= 10) setComboMultiplier(5);
        else if (newCount >= 7) setComboMultiplier(4);
        else if (newCount >= 5) setComboMultiplier(3);
        else if (newCount >= 3) setComboMultiplier(2);
        else if (newCount >= 2) setComboMultiplier(1.5);
        else setComboMultiplier(1);
        return newCount;
      });
      
      // Haptic feedback on word found
      successVibrate();
      
      // Update mascot mood
      setMascotMood('happy');
      setTimeout(() => setMascotMood('neutral'), 2000);
      
      // Show coin animation
      const coinsEarned = 10 * comboMultiplier;
      setCoinAnimationAmount(coinsEarned);
      setShowCoinAnimation(true);
      setTimeout(() => setShowCoinAnimation(false), 1500);
    } else if (lastWordResult && !lastWordResult.isValid) {
      // Wrong word - reset combo, sad mascot
      setComboCount(0);
      setComboMultiplier(1);
      resetCombo();
      errorVibrate();
      setMascotMood('sad');
      setTimeout(() => setMascotMood('neutral'), 2000);
    }
  }, [lastWordResult]);

  // Check for level completion to trigger confetti and rate app
  useEffect(() => {
    const checkLevelComplete = async () => {
      if (currentLevel && foundWords && currentLevel.targetWords) {
        const allFound = currentLevel.targetWords.every(
          (word: string) => foundWords.includes(word)
        );
        if (allFound && foundWords.length === currentLevel.targetWords.length) {
          // Trigger confetti on level complete
          setConfettiTrigger(prev => prev + 1);
          
          // Check if should show rate app modal (at level 10, 20, 30, etc.)
          const currentLevelNum = progress?.current_level || 1;
          const shouldShowRate = await shouldShowRateModal(currentLevelNum);
          if (shouldShowRate) {
            setTimeout(() => setShowRateApp(true), 2000); // Delay to not interrupt celebration
          }
        }
      }
    };
    checkLevelComplete();
  }, [foundWords, currentLevel]);

  // Undo last letter
  const handleUndoLetter = () => {
    if (selectedLetterIndices && selectedLetterIndices.length > 0) {
      // Clear selection and reselect all but last
      const newIndices = selectedLetterIndices.slice(0, -1);
      clearSelection();
      newIndices.forEach(idx => selectLetter(idx));
    }
  };

  // Handle hint with preview
  const handleHintWithPreview = () => {
    // Find first unrevealed word from targetWords
    const foundWordsForLevel = progress?.found_words?.[currentLevelNumber] || [];
    const unrevealedWord = currentLevel?.targetWords?.find(
      (word: string) => !foundWordsForLevel.includes(word)
    );
    if (unrevealedWord) {
      setHintPreviewWord(unrevealedWord);
      setShowHintPreview(true);
    } else {
      Alert.alert('No Hints Available', 'All words have been found!');
    }
  };

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

  // Show LoadingSplash on app startup
  if (showAppSplash) {
    return (
      <LoadingSplash 
        onFinish={() => setShowAppSplash(false)} 
      />
    );
  }

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
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Connection Issue</Text>
          <Text style={styles.errorText}>{error || 'Unable to load game data'}</Text>
          <Text style={styles.errorHint}>Check your internet connection and try again</Text>
          <TouchableOpacity style={styles.retryButton} onPress={initialize}>
            <LinearGradient
              colors={['#4ECDC4', '#44A08D']}
              style={styles.retryButtonGradient}
            >
              <Text style={styles.retryButtonText}>🔄 Retry</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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

  // Handle watch ad for coins
  const handleWatchAdForCoins = async () => {
    setShowAdLoading(true);
    setAdMessage('Watch ad for +50 coins...');
    const rewarded = await adManager.showVideoRewardedAd();
    setShowAdLoading(false);
    if (rewarded) {
      // Add 50 coins through the game store
      // For now, just show the reward was given
      Alert.alert('Reward!', 'You earned 50 coins!');
    }
  };

  // Handle feature selection from Features Hub
  const handleFeatureSelect = (featureId: string) => {
    setShowFeaturesHub(false);
    switch (featureId) {
      case 'mystery_box':
        setShowMysteryBox(true);
        break;
      case 'scratch_card':
        setShowScratchCard(true);
        break;
      case 'daily_login':
        setShowDailyLogin(true);
        break;
      case 'free_hints':
        setShowFreeHints(true);
        break;
      case 'level_skip':
        setShowLevelSkip(true);
        break;
      case 'themes':
        setShowThemes(true);
        break;
      case 'power_ups':
        setShowPowerUps(true);
        break;
      case 'combos':
        setShowCombos(true);
        break;
      case 'game_modes':
        setShowGameModeSelector(true);
        break;
      case 'time_challenge':
        setShowTimeChallenge(true);
        break;
      case 'player_profile':
        setShowProfile(true);
        break;
      case 'music_themes':
        setShowMusic(true);
        break;
      case 'celebrations':
        setShowCelebrations(true);
        break;
      case 'mascot':
        setShowMascot(true);
        break;
      case 'seasonal':
        setShowEvents(true);
        break;
      case 'piggy_bank':
      case 'postcards':
      case 'vocabulary':
      case 'wonder_facts':
      case 'word_packs':
        // These features are coming soon
        Alert.alert('Coming Soon!', 'This feature will be available in a future update.');
        break;
      default:
        break;
    }
  };

  // Show Onboarding for first-time users
  if (showOnboarding) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </GestureHandlerRootView>
    );
  }

  // Show Home Screen if user hasn't started playing
  if (showHomeScreen) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        {useCleanHomeScreen ? (
          <CleanHomeScreen
            onPlay={() => {
              if (currentLevel) {
                setShowHomeScreen(false);
              } else {
                Alert.alert('Loading', 'Game is still loading, please wait a moment...');
              }
            }}
            onDailyRewards={() => setShowDailyWheel(true)}
            onDailyChallenge={() => setShowDailyChallenge(true)}
            onLeaderboard={() => setShowLeaderboard(true)}
            onAchievements={() => setShowAchievements(true)}
            onSettings={() => setShowPrivacyPolicy(true)}
            onPuzzleModes={() => setShowPuzzleModes(true)}
            onTimedChallenge={() => setShowTimedChallenge(true)}
            onPhrasePuzzles={() => setShowPhrasePuzzles(true)}
            onThemes={() => setShowThemePacks(true)}
            onWordOfDay={() => setShowWordOfDay(true)}
            onStats={() => setShowStats(true)}
            onWatchAdForCoins={handleWatchAdForCoins}
            streakDays={progress?.daily_streak || 0}
          />
        ) : (
          <HomeScreen
            onPlay={() => {
              // Safety check: Only allow play if currentLevel is loaded
              if (currentLevel) {
                setShowHomeScreen(false);
              } else {
                Alert.alert('Loading', 'Game is still loading, please wait a moment...');
              }
            }}
            onDailyRewards={() => setShowDailyWheel(true)}
            onLeaderboard={() => setShowLeaderboard(true)}
            onSettings={() => setShowPrivacyPolicy(true)}
            onAchievements={() => setShowAchievements(true)}
            onDailyChallenge={() => setShowDailyChallenge(true)}
            onWordOfDay={() => setShowWordOfDay(true)}
            onStats={() => setShowStats(true)}
            onThemes={() => setShowThemePacks(true)}
            onWatchAdForCoins={handleWatchAdForCoins}
            onFeaturesHub={() => setShowFeaturesHub(true)}
            onTimedChallenge={() => setShowTimedChallenge(true)}
            onPhrasePuzzles={() => setShowPhrasePuzzles(true)}
            onPuzzleModes={() => setShowPuzzleModes(true)}
          />
        )}
        
        {/* Banner Ad at bottom of Home Screen */}
        <View style={styles.bannerAdContainer}>
          <BannerAdComponent />
        </View>
        
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
          unlockedAchievements={unlockedAchievementIds}
          stats={playerStats}
        />
        
        {/* NEW: Enhanced Game Feature Modals */}
        <TimedChallengeModal
          visible={showTimedChallenge}
          onClose={() => setShowTimedChallenge(false)}
          onStartChallenge={(challenge) => {
            setActiveTimedChallenge(challenge);
            setShowTimedChallenge(false);
            setShowHomeScreen(false);
            // Start the actual timed challenge
            setTimeChallengeActive(true);
            setTimeRemaining(challenge.timeLimit);
            setChallengeDifficulty(challenge.difficulty);
          }}
          currentLevel={progress?.current_level || 1}
          completedChallenges={completedTimedChallenges}
        />
        
        <PhrasePuzzleModal
          visible={showPhrasePuzzles}
          onClose={() => setShowPhrasePuzzles(false)}
          onStartPuzzle={(puzzle) => {
            setActivePhrasePuzzle(puzzle);
            setShowPhrasePuzzles(false);
            setShowHomeScreen(false);
            // Start phrase puzzle mode - game will show the phrase puzzle
          }}
          completedPuzzles={completedPhrasePuzzles}
        />
        
        <ThemePacksModal
          visible={showThemePacks}
          onClose={() => setShowThemePacks(false)}
          onSelectTheme={(themeId) => {
            setSelectedThemePack(themeId);
            Alert.alert('Theme Applied!', `${themeId} theme is now active`);
          }}
          currentTheme={selectedThemePack}
          currentLevel={progress?.current_level || 1}
          currentCoins={progress?.coins || 0}
          unlockedAchievements={unlockedAchievementIds}
        />
        
        {/* Word Definition Popup */}
        <WordDefinitionPopup
          word={lastFoundWord}
          onDismiss={() => setLastFoundWord(null)}
        />
        
        <DailyChallengeModal
          visible={showDailyChallenge}
          onClose={() => setShowDailyChallenge(false)}
          onPlay={() => {
            setShowDailyChallenge(false);
            setShowHomeScreen(false);
            // Start daily challenge with time limit
            setTimeChallengeActive(true);
            setTimeRemaining(300); // 5 minutes for daily challenge
            setChallengeDifficulty('medium');
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
        
        {/* Features Hub */}
        <FeaturesHub
          visible={showFeaturesHub}
          onClose={() => setShowFeaturesHub(false)}
          onSelectFeature={handleFeatureSelect}
        />
        
        {/* Feature Modals */}
        <MysteryBoxModal
          visible={showMysteryBox}
          onClose={() => setShowMysteryBox(false)}
          onClaim={(reward) => {
            setMysteryBoxesAvailable(prev => prev - 1);
            Alert.alert('Reward!', `You got ${reward.name}!`);
          }}
          boxesAvailable={mysteryBoxesAvailable}
        />
        <ScratchCardModal
          visible={showScratchCard}
          onClose={() => setShowScratchCard(false)}
          onReveal={(reward) => {
            setCanScratch(false);
            if (reward.type !== 'nothing') {
              Alert.alert('Congratulations!', reward.message);
            }
          }}
          canScratch={canScratch}
        />
        
        {/* Note: Some feature modals temporarily disabled pending prop interface fixes */}
        
        {/* New Ad-integrated Features */}
        <DailyLoginCalendar
          visible={showDailyLogin}
          onClose={() => setShowDailyLogin(false)}
          onClaim={(day, doubled) => {
            const baseReward = day * 50;
            const finalReward = doubled ? baseReward * 2 : baseReward;
            Alert.alert('Reward!', `You claimed ${finalReward} coins!`);
            setLoginStreak(day);
            setLastLoginDate(new Date().toDateString());
          }}
          onWatchAd={() => adManager.showVideoRewardedAd()}
          currentStreak={loginStreak}
          lastClaimDate={lastLoginDate}
        />
        <LevelSkipModal
          visible={showLevelSkip}
          onClose={() => setShowLevelSkip(false)}
          onSkip={() => {
            setShowLevelSkip(false);
            Alert.alert('Skipped!', 'Moving to next level!');
          }}
          onWatchAd={() => adManager.showVideoRewardedAd()}
          currentLevel={progress?.current_level || 1}
          skipCost={100}
          coins={progress?.coins || 0}
        />
        <FreeHintsModal
          visible={showFreeHints}
          onClose={() => setShowFreeHints(false)}
          onGetHints={(amount) => {
            Alert.alert('Hints Added!', `You got ${amount} free hints!`);
          }}
          onWatchAd={() => adManager.showVideoRewardedAd()}
          currentHints={progress?.hints_remaining || 0}
        />
        
        {/* Puzzle Modes */}
        <PuzzleModesMenu
          visible={showPuzzleModes}
          onClose={() => setShowPuzzleModes(false)}
          onSelectMode={(modeId) => {
            setShowPuzzleModes(false);
            setActivePuzzleMode(modeId);
          }}
        />
        
        {/* Individual Puzzle Games */}
        <MirrorWordsGame
          visible={activePuzzleMode === 'mirror'}
          onClose={() => setActivePuzzleMode(null)}
          onComplete={async (score) => {
            setPuzzleModesScore(prev => prev + score);
            await puzzleModesService.updateProgress('mirror', 1, score);
            Alert.alert('Mode Complete!', `You earned ${score} points!`);
          }}
        />
        <MissingHeartsGame
          visible={activePuzzleMode === 'hearts'}
          onClose={() => setActivePuzzleMode(null)}
          onComplete={async (score) => {
            setPuzzleModesScore(prev => prev + score);
            await puzzleModesService.updateProgress('hearts', 1, score);
            Alert.alert('Mode Complete!', `You earned ${score} points!`);
          }}
        />
        <LoveInLayersGame
          visible={activePuzzleMode === 'layers'}
          onClose={() => setActivePuzzleMode(null)}
          onComplete={async (score) => {
            setPuzzleModesScore(prev => prev + score);
            await puzzleModesService.updateProgress('layers', 1, score);
            Alert.alert('Mode Complete!', `You earned ${score} points!`);
          }}
        />
        <EmotionChainGame
          visible={activePuzzleMode === 'chain'}
          onClose={() => setActivePuzzleMode(null)}
          onComplete={async (score) => {
            setPuzzleModesScore(prev => prev + score);
            await puzzleModesService.updateProgress('chain', 1, score);
            Alert.alert('Mode Complete!', `You earned ${score} points!`);
          }}
        />
        <WordPairGame
          visible={activePuzzleMode === 'pair'}
          onClose={() => setActivePuzzleMode(null)}
          onComplete={async (score) => {
            setPuzzleModesScore(prev => prev + score);
            await puzzleModesService.updateProgress('pair', 1, score);
            Alert.alert('Mode Complete!', `You earned ${score} points!`);
          }}
        />
        <FlipSolveGame
          visible={activePuzzleMode === 'flip'}
          onClose={() => setActivePuzzleMode(null)}
          onComplete={async (score) => {
            setPuzzleModesScore(prev => prev + score);
            await puzzleModesService.updateProgress('flip', 1, score);
            Alert.alert('Mode Complete!', `You earned ${score} points!`);
          }}
        />
        <CrossedEmotionsGame
          visible={activePuzzleMode === 'crossed'}
          onClose={() => setActivePuzzleMode(null)}
          onComplete={async (score) => {
            setPuzzleModesScore(prev => prev + score);
            await puzzleModesService.updateProgress('crossed', 1, score);
            Alert.alert('Mode Complete!', `You earned ${score} points!`);
          }}
        />
        
        <ConsentModal
          visible={showConsentModal}
          onAccept={handleConsentAccept}
          onViewPrivacyPolicy={() => setShowPrivacyPolicy(true)}
        />
      </GestureHandlerRootView>
    );
  }

  // Add safety check for currentLevel
  if (!currentLevel) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#4fc3f7" />
          <Text style={{ color: '#fff', marginTop: 20 }}>Loading game...</Text>
        </View>
      </GestureHandlerRootView>
    );
  }

  // Get theme safely with fallback
  const gameTheme = getGameTheme(currentLevel?.id || 1) || { colors: ['#1a1a2e', '#16213e'], icon: '🎯' };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Colorful Outer Frame */}
      <LinearGradient
        colors={gameTheme.colors}
        style={styles.outerFrame}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.innerFrame}>
          <ThemedBackground level={currentLevelNumber} showParticles={animationsEnabled}>
            <SafeAreaView style={styles.container}>
              <StatusBar barStyle="light-content" />

        {/* CLEAN UI: Minimal Header */}
        <View style={styles.cleanHeader}>
          {/* Left: Pause Button */}
          <TouchableOpacity
            style={styles.pauseButton}
            onPress={() => setShowPauseMenu(true)}
          >
            <Ionicons name="pause" size={20} color="#fff" />
          </TouchableOpacity>

          {/* Right: Coins & Hints (hidden in Focus Mode) */}
          {!focusMode && (
            <View style={styles.cleanHeaderRight}>
              <View style={styles.compactStat}>
                <Text style={styles.compactStatIcon}>💎</Text>
                <Text style={styles.compactStatText}>{progress?.coins || 0}</Text>
              </View>
              <View style={styles.compactStat}>
                <Text style={styles.compactStatIcon}>💡</Text>
                <Text style={styles.compactStatText}>{progress?.hints_remaining || 0}</Text>
              </View>
            </View>
          )}
          
          {/* Focus Mode Indicator */}
          {focusMode && (
            <View style={styles.focusModeIndicator}>
              <Text style={styles.focusModeText}>🧘 Focus</Text>
            </View>
          )}
        </View>

        {/* Progress Toast (appears when word found) */}
        <ProgressToast
          visible={showProgressToast}
          wordsFound={foundWords?.length || 0}
          totalWords={currentLevel?.targetWords?.length || 0}
          lastWord={lastFoundWord || undefined}
          onHide={() => setShowProgressToast(false)}
        />

        {/* Pause Menu */}
        <PauseMenu
          visible={showPauseMenu}
          onClose={() => setShowPauseMenu(false)}
          onResume={() => setShowPauseMenu(false)}
          onHome={() => {
            setShowPauseMenu(false);
            setShowHomeScreen(true);
          }}
          onAchievements={() => {
            setShowPauseMenu(false);
            setShowAchievements(true);
          }}
          onSettings={() => {
            setShowPauseMenu(false);
            setShowPrivacyPolicy(true);
          }}
          onShuffle={() => {
            setShowPauseMenu(false);
            handleShuffle();
          }}
          onHint={() => {
            setShowPauseMenu(false);
            handleHintWithPreview();
          }}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          focusMode={focusMode}
          onToggleFocusMode={setFocusMode}
          coins={progress?.coins || 0}
          hints={progress?.hints_remaining || 0}
          currentLevel={currentLevel?.id || 1}
        />

        {/* Offline Indicator - Shows at top when offline */}
        <OfflineIndicator />
        
        {/* Enhanced Confetti for level completion */}
        <EnhancedConfetti trigger={confettiTrigger} />

        {/* Particle Effect for word found */}
        <ParticleEffect trigger={particleTrigger} type="confetti" />

        {/* Theme Clue - with more breathing room */}

        {/* Clue Card with Progress + Stars - Compact */}
        <View style={styles.clueCard}>
          <LinearGradient
            colors={['rgba(30, 30, 50, 0.85)', 'rgba(20, 20, 40, 0.9)']}
            style={styles.clueCardGradient}
          >
            {/* Theme + Clue + Stars in one row */}
            <View style={styles.clueHeaderRow}>
              <Text style={styles.themeIcon}>{gameTheme.icon}</Text>
              <Text style={styles.clueText}>
                {getCluesForLevel(currentLevel.id, language === 'it' ? 'it' : 'en')[0]}
              </Text>
              <StarRating stars={currentStars} size="small" />
            </View>
            
            {/* Progress Bar inside card */}
            <View style={styles.progressWrapper}>
              <View style={styles.progressBarInner}>
                <LinearGradient
                  colors={['#00d4aa', '#00b894']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressFillGradient, { width: `${Math.max(5, progressPercent)}%` }]}
                />
              </View>
              <Text style={styles.progressTextInner}>
                {foundWordsCount}/{targetWordsCount}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Time Challenge Timer Display */}
        {timeChallengeActive && (
          <View style={styles.timerContainer}>
            <LinearGradient
              colors={timeRemaining <= 30 ? ['#e74c3c', '#c0392b'] : ['#3498db', '#2980b9']}
              style={styles.timerGradient}
            >
              <Ionicons name="timer" size={18} color="#fff" />
              <Text style={[
                styles.timerText,
                timeRemaining <= 30 && styles.timerUrgent
              ]}>
                {formatTimeDisplay(timeRemaining)}
              </Text>
              <TouchableOpacity 
                style={styles.timerCancel}
                onPress={() => {
                  Alert.alert(
                    'End Challenge?',
                    'Are you sure you want to end the time challenge?',
                    [
                      { text: 'Continue', style: 'cancel' },
                      { 
                        text: 'End', 
                        style: 'destructive',
                        onPress: () => {
                          setTimeChallengeActive(false);
                          setChallengeDifficulty(null);
                          setTimeRemaining(0);
                        }
                      }
                    ]
                  );
                }}
              >
                <Ionicons name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}

        {/* Crossword Grid */}
        <View style={styles.gridContainer}>
          <CrosswordGrid />
        </View>

        {/* Word Placeholders - Shows found words and locked placeholders with hint glow */}
        <WordPlaceholders
          targetWords={currentLevel?.targetWords || []}
          foundWords={foundWords || []}
          hintWord={hintWord}
          isShowingHint={isShowingHint}
        />

        {/* Dial Overlay - darkens background when dial is active */}
        <DialOverlay isActive={currentWord && currentWord.length > 0} />

        {/* Tools Button - Progressive disclosure after 2 words */}
        <ToolsButton
          wordsFound={foundWords?.length || 0}
          onShuffle={handleShuffle}
          onHint={handleHintWithPreview}
          onUndo={handleUndoLetter}
          canUndo={selectedLetterIndices && selectedLetterIndices.length > 0}
        />

        {/* Word Being Formed Display */}
        {currentWord && currentWord.length > 0 && (
          <WordFormingDisplay
            letters={currentWord.split('')}
            isValid={isWordValid}
            isInvalid={isWordInvalid}
          />
        )}

        {/* Fancy Word Feedback */}
        {showWordFeedback && lastWordResult && (
          <View style={styles.fancyFeedbackContainer}>
            <Text style={[
              styles.fancyFeedbackText,
              lastWordResult.isValid ? styles.fancyFeedbackSuccess : styles.fancyFeedbackError
            ]}>
              {lastWordResult.isValid
                ? getRandomFeedback(language === 'it' ? 'it' : 'en', lastWordResult.isBonus ? 'bonus' : 'excellent')
                : lastWordResult.word + ' ✗'}
            </Text>
          </View>
        )}

        {/* Letter Wheel - Clean, centered, bigger */}
        <View style={styles.cleanWheelContainer}>
          <LetterWheel />
          {/* Bonus Words Counter - small badge on wheel */}
          {bonusWordsFound.length > 0 && (
            <View style={styles.bonusBadge}>
              <Text style={styles.bonusBadgeText}>+{bonusWordsFound.length}</Text>
            </View>
          )}
        </View>

        {/* Clear Button - Ghost style, only visible when letters selected */}
        {currentWord && currentWord.length > 0 && (
          <TouchableOpacity style={styles.ghostClearButton} onPress={clearSelection}>
            <Text style={styles.ghostClearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}

        {/* Banner Ad in Game Screen */}
        <View style={styles.gameBannerAdContainer}>
          <BannerAdComponent />
        </View>

        {/* Error message */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error}</Text>
          </View>
        )}
        
        {/* Combo Toast - Minimal, non-intrusive */}
        <ComboToast visible={showComboToast} message={comboMessage} />
        
        {/* Interactive Tutorial Overlay */}
        <InteractiveTutorial 
          visible={showTutorial} 
          onComplete={() => setShowTutorial(false)} 
        />
        
        {/* Hint Preview Modal */}
        <HintPreview
          visible={showHintPreview}
          onClose={() => setShowHintPreview(false)}
          onConfirm={() => {
            setShowHintPreview(false);
            handleHintWithPreview();
          }}
          word={hintPreviewWord}
          hintsRemaining={progress?.hints_remaining || 0}
          hintCost={1}
        />

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
        {/* AchievementsModal is rendered in the Home Screen modals section */}
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
        {/* NEW: Language Selector Modal */}
        <LanguageSelector
          visible={showLanguageSelector}
          onClose={() => setShowLanguageSelector(false)}
        />
        
        {/* NEW: Game Mode Selector */}
        <GameModeSelector
          visible={showGameModeSelector}
          currentLevel={currentLevelNumber}
          onSelectMode={(mode) => {
            setCurrentGameMode(mode);
            setShowGameModeSelector(false);
            if (mode === 'match') {
              setShowMatchMode(true);
            }
          }}
          onClose={() => setShowGameModeSelector(false)}
        />
        
        {/* NEW: Match Mode Game */}
        {showMatchMode && (
          <Modal visible={showMatchMode} animationType="slide" transparent={false}>
            <MatchMode
              puzzleId={matchPuzzleId}
              onComplete={(reward) => {
                // Add coins reward
                setShowMatchMode(false);
                setMatchPuzzleId(prev => prev + 1);
              }}
              onClose={() => setShowMatchMode(false)}
            />
          </Modal>
        )}
        
        {/* Feature Hub Modals */}
        <PowerUpsModal
          visible={showPowerUps}
          onClose={() => setShowPowerUps(false)}
          coins={progress?.coins || 0}
          onUsePowerUp={(powerUpId, cost) => {
            // Deduct coins and apply power-up
            Alert.alert('Power-Up Activated!', `Using power-up: ${powerUpId}`);
          }}
        />
        
        <CombosModal
          visible={showCombos}
          onClose={() => setShowCombos(false)}
          currentStreak={currentStreak}
          bestStreak={bestStreak}
        />
        
        <TimeChallengeModal
          visible={showTimeChallenge}
          onClose={() => setShowTimeChallenge(false)}
          onStartChallenge={startTimeChallenge}
          bestTime={null}
        />
        
        <ProfileModal
          visible={showProfile}
          onClose={() => setShowProfile(false)}
          username={progress?.username || 'Player'}
          avatar={userAvatar}
          stats={{
            levelsCompleted: progress?.completed_levels?.length || 0,
            wordsFound: Object.values(progress?.found_words || {}).flat().length,
            totalCoins: progress?.coins || 0,
            playTime: 0,
            currentStreak: currentStreak,
          }}
          onUpdateProfile={(username, avatar) => {
            setUserAvatar(avatar);
            Alert.alert('Profile Updated!', `Welcome, ${username}!`);
          }}
        />
        
        <MusicModal
          visible={showMusic}
          onClose={() => setShowMusic(false)}
          musicEnabled={soundEnabled}
          soundEnabled={soundEnabled}
          vibrationEnabled={true}
          onToggleMusic={(enabled) => {
            soundManager.setEnabled(enabled);
          }}
          onToggleSound={(enabled) => {
            soundManager.setEnabled(enabled);
          }}
          onToggleVibration={(enabled) => {
            // Toggle vibration
          }}
        />
        
        <CelebrationsModal
          visible={showCelebrations}
          onClose={() => setShowCelebrations(false)}
          confettiEnabled={confettiEnabled}
          screenShakeEnabled={screenShakeEnabled}
          particlesEnabled={particlesEnabled}
          onToggleConfetti={setConfettiEnabled}
          onToggleScreenShake={setScreenShakeEnabled}
          onToggleParticles={setParticlesEnabled}
        />
        
        <MascotModal
          visible={showMascot}
          onClose={() => setShowMascot(false)}
          currentMascot={currentMascot}
          currentLevel={currentLevelNumber}
          onSelectMascot={(mascotId) => {
            setCurrentMascot(mascotId);
            setShowMascot(false);
          }}
        />
        
        <EventsModal
          visible={showEvents}
          onClose={() => setShowEvents(false)}
        />
        
        {/* Game Screen Modals - Level Skip */}
        <LevelSkipModal
          visible={showLevelSkip}
          onClose={() => setShowLevelSkip(false)}
          onSkip={() => {
            setShowLevelSkip(false);
            // Skip to next level
            const nextLevel = (progress?.current_level || 1) + 1;
            Alert.alert('Level Skipped!', `Moving to level ${nextLevel}!`);
          }}
          onWatchAd={() => adManager.showVideoRewardedAd()}
          currentLevel={progress?.current_level || 1}
          skipCost={100}
          coins={progress?.coins || 0}
        />
        
        {/* NEW: Hint Preview Modal */}
        <Modal visible={showHintPreview} transparent animationType="fade">
          <View style={styles.hintPreviewOverlay}>
            <View style={styles.hintPreviewCard}>
              <Text style={styles.hintPreviewTitle}>💡 Use Hint?</Text>
              <Text style={styles.hintPreviewText}>
                Reveal first letter of:
              </Text>
              <View style={styles.hintPreviewWordBox}>
                <Text style={styles.hintPreviewWord}>
                  {hintPreviewWord ? `${hintPreviewWord.charAt(0)}${'_'.repeat(Math.max(0, hintPreviewWord.length - 1))}` : '___'}
                </Text>
              </View>
              <View style={styles.hintPreviewButtons}>
                <TouchableOpacity 
                  style={styles.hintPreviewCancel}
                  onPress={() => setShowHintPreview(false)}
                >
                  <Text style={styles.hintPreviewCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.hintPreviewConfirm}
                  onPress={() => {
                    setShowHintPreview(false);
                    handleHint();
                  }}
                >
                  <LinearGradient
                    colors={['#f39c12', '#e67e22']}
                    style={styles.hintPreviewConfirmGradient}
                  >
                    <Ionicons name="play" size={16} color="#fff" />
                    <Text style={styles.hintPreviewConfirmText}>Watch Ad & Reveal</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        
        {/* NEW FEATURE MODALS */}
        <SpinWheelModal
          visible={showSpinWheel}
          onClose={() => setShowSpinWheel(false)}
          onSpin={(reward) => {
            Alert.alert('🎉 Reward!', `You won: ${reward}`);
          }}
        />
        
        <StatisticsModal
          visible={showStatistics}
          onClose={() => setShowStatistics(false)}
          stats={gameStats}
        />
        
        {/* AchievementsModal already rendered in Home Screen modals section */}
        
        <ProgressMapModal
          visible={showProgressMap}
          onClose={() => setShowProgressMap(false)}
          currentLevel={currentLevelNumber}
        />
        
        <LeaderboardModal
          visible={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
        
        <FriendChallengeModal
          visible={showFriendChallenge}
          onClose={() => setShowFriendChallenge(false)}
        />
        
        <WordDefinitionModal
          visible={showWordDefinition}
          onClose={() => setShowWordDefinition(false)}
          word={lastWordDefinition.word}
          definition={lastWordDefinition.definition}
        />
        
        {/* Rate App Modal - Subtle, only appears at level 10, 20, etc. */}
        <RateAppModal
          visible={showRateApp}
          onClose={() => setShowRateApp(false)}
          currentLevel={progress?.current_level || 1}
        />
        </SafeAreaView>
      </ThemedBackground>
        </View>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // Colorful outer frame
  outerFrame: {
    flex: 1,
    padding: 6,
  },
  innerFrame: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
  // CLEAN UI STYLES
  cleanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 4,
  },
  pauseButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cleanHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  compactStatIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  compactStatText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  focusModeIndicator: {
    backgroundColor: 'rgba(156, 39, 176, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  focusModeText: {
    color: '#ce93d8',
    fontSize: 12,
    fontWeight: '600',
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
  errorContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  errorIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  errorHint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  retryButtonGradient: {
    paddingHorizontal: 40,
    paddingVertical: 15,
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
    // gap: 6, // REMOVED - not supported on RN mobile
  },
  levelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 8, // REMOVED - not supported on RN mobile
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
    // gap: 4, // REMOVED - not supported on RN mobile
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
    // gap: 4, // REMOVED - not supported on RN mobile
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
    // gap: 14, // REMOVED - not supported on RN mobile
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
    marginBottom: 10,
    // gap: 12, // REMOVED - not supported on RN mobile
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 5,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    minWidth: 40,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    textAlign: 'center',
  },
  gridContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
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
  bonusBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#9b59b6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 2,
    borderColor: '#fff',
  },
  bonusBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cleanWheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    marginTop: 0,
  },
  wheelAndActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  sideActionButtons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  sideActionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 5,
  },
  clearButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // gap: 12, // REMOVED - not supported on RN mobile
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 2 : 8,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  hintButton: {
    backgroundColor: 'rgba(241, 196, 15, 0.35)',
    borderColor: 'rgba(241, 196, 15, 0.5)',
  },
  shuffleButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.35)',
    borderColor: 'rgba(52, 152, 219, 0.5)',
  },
  gameModeButton: {
    backgroundColor: 'rgba(155, 89, 182, 0.35)',
    borderColor: 'rgba(155, 89, 182, 0.5)',
  },
  gameModeIcon: {
    fontSize: 20,
  },
  adBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
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
  bannerAdContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  gameBannerAdContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 2,
  },
  floatingSidebar: {
    position: 'absolute',
    right: 8,
    top: '35%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    padding: 6,
    // gap: 8, // REMOVED - not supported on RN mobile
  },
  sidebarButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sidebarButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarEmoji: {
    fontSize: 18,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  timerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    // gap: 8, // REMOVED - not supported on RN mobile
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  timerUrgent: {
    color: '#fff',
  },
  timerCancel: {
    marginLeft: 8,
    padding: 4,
  },
  // NEW FEATURE STYLES
  wonderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
  },
  wonderCardLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  wonderEmoji: {
    fontSize: 20,
  },
  wonderCardInfo: {
    flex: 1,
  },
  wonderName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  wonderLocation: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  dailyBadge: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  dailyBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  comboMascotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginVertical: 4,
    // gap: 15, // REMOVED - not supported on RN mobile
  },
  mascotContainer: {
    alignItems: 'center',
  },
  mascotEmoji: {
    fontSize: 28,
  },
  mascotSpeech: {
    fontSize: 10,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 2,
  },
  comboContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  comboGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    // gap: 6, // REMOVED - not supported on RN mobile
  },
  comboText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  comboMultiplier: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  coinAnimation: {
    position: 'absolute',
    right: 20,
  },
  coinAnimationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  recentWordsContainer: {
    paddingHorizontal: 15,
    marginVertical: 4,
  },
  recentWordBadge: {
    backgroundColor: 'rgba(46, 204, 113, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  recentWordLatest: {
    backgroundColor: 'rgba(46, 204, 113, 0.6)',
  },
  recentWordText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  undoButton: {
    backgroundColor: 'rgba(149, 165, 166, 0.35)',
    borderColor: 'rgba(149, 165, 166, 0.5)',
  },
  hintPreviewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  hintPreviewCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  hintPreviewTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  hintPreviewText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  hintPreviewWordBox: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  hintPreviewWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    letterSpacing: 4,
  },
  hintPreviewButtons: {
    flexDirection: 'row',
    // gap: 12, // REMOVED - not supported on RN mobile
    width: '100%',
  },
  hintPreviewCancel: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  hintPreviewCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  hintPreviewConfirm: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  hintPreviewConfirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    // gap: 8, // REMOVED - not supported on RN mobile
  },
  hintPreviewConfirmText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  // NEW FEATURE STYLES
  featureQuickAccess: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 15,
    marginBottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
  },
  featureQuickBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureQuickEmoji: {
    fontSize: 18,
  },
  wordOfDayBanner: {
    backgroundColor: 'rgba(241, 196, 15, 0.2)',
    marginHorizontal: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  wordOfDayText: {
    fontSize: 11,
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: '600',
  },
  levelStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // gap: 4, // REMOVED - not supported on RN mobile
    marginVertical: 4,
  },
  levelStar: {
    fontSize: 16,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  confettiText: {
    fontSize: 80,
  },
  // Theme Header & Clue Card - Combined into one compact row
  themeIcon: {
    fontSize: 18,
  },
  clueCard: {
    marginHorizontal: 12,
    marginBottom: 4,
    marginTop: 2,
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 10,
  },
  clueCardGradient: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
  },
  clueHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // gap: 8, // REMOVED - not supported on RN mobile
    marginBottom: 6,
  },
  clueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 12, // REMOVED - not supported on RN mobile
  },
  progressBarInner: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFillGradient: {
    height: '100%',
    borderRadius: 3,
  },
  progressTextInner: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '700',
    minWidth: 35,
  },
  // Legacy styles (keep for compatibility)
  clueBox: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  clueGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
  },
  // Fancy Feedback - Cursive Style like reference image
  fancyFeedbackContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  fancyFeedbackText: {
    fontSize: 42,
    fontWeight: '300',
    fontStyle: 'italic',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
    letterSpacing: 1,
  },
  fancyFeedbackSuccess: {
    color: '#ffd700',
    textShadowColor: 'rgba(255, 215, 0, 0.8)',
  },
  fancyFeedbackError: {
    color: '#ff6b6b',
    textShadowColor: 'rgba(255, 107, 107, 0.8)',
  },
});
