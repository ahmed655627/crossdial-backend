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
import { adManager } from '../src/utils/adManager';
import { soundManager } from '../src/utils/sounds';
import { notificationService } from '../src/services/notificationService';

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

  useEffect(() => {
    initialize();
  }, []);

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

  // Handle hint with ad
  const handleHint = async () => {
    setAdMessage('Watch ad for hint...');
    setShowAdLoading(true);
    await adManager.showRewardedAd();
    setShowAdLoading(false);
    await useHint();
  };

  // Handle reset with ad
  const handleReset = async () => {
    Alert.alert(
      'Reset Level',
      'Watch an ad to reset your progress for this level?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Watch Ad & Reset',
          onPress: async () => {
            setAdMessage('Loading reset ad...');
            setShowAdLoading(true);
            await adManager.showInterstitialAd();
            setShowAdLoading(false);
            resetLevel();
            setShowMenu(false);
          },
        },
      ]
    );
  };

  // Handle restart with ad
  const handleRestart = async () => {
    Alert.alert(
      'Restart Level',
      'Watch an ad to restart this level?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Watch Ad & Restart',
          onPress: async () => {
            setAdMessage('Loading restart ad...');
            setShowAdLoading(true);
            await adManager.showInterstitialAd();
            setShowAdLoading(false);
            restartLevel();
            setShowMenu(false);
          },
        },
      ]
    );
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
          <TouchableOpacity
            style={styles.levelButton}
            onPress={() => setShowLevelSelect(true)}
          >
            <Ionicons name="map" size={20} color="#fff" />
            <Text style={styles.levelText}>Level {currentLevel.id}</Text>
          </TouchableOpacity>

          <View style={styles.headerRight}>
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
              <Ionicons name="refresh" size={20} color="#e74c3c" />
              <Text style={styles.menuItemText}>Reset Level</Text>
              <Ionicons name="play-circle" size={16} color="#95a5a6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleRestart}>
              <Ionicons name="reload" size={20} color="#f39c12" />
              <Text style={styles.menuItemText}>Restart Level</Text>
              <Ionicons name="play-circle" size={16} color="#95a5a6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={toggleSound}>
              <Ionicons name={soundEnabled ? 'volume-high' : 'volume-mute'} size={20} color="#3498db" />
              <Text style={styles.menuItemText}>Sound {soundEnabled ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => setShowMenu(false)}>
              <Ionicons name="close" size={20} color="#95a5a6" />
              <Text style={styles.menuItemText}>Close</Text>
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
          <TouchableOpacity style={styles.actionButton} onPress={shuffleLetters}>
            <Ionicons name="shuffle" size={24} color="#fff" />
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
        <AdLoadingModal visible={showAdLoading} message={adMessage} />
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
    top: Platform.OS === 'android' ? 85 : 55,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
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
