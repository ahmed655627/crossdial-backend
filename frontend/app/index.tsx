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
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '../src/store/gameStore';
import { LetterWheel } from '../src/components/LetterWheel';
import { CrosswordGrid } from '../src/components/CrosswordGrid';
import { LevelCompleteModal } from '../src/components/LevelCompleteModal';
import { LevelSelectModal } from '../src/components/LevelSelectModal';

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
  } = useGameStore();

  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [showWordFeedback, setShowWordFeedback] = useState(false);

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
            <Ionicons name="map" size={22} color="#fff" />
            <Text style={styles.levelText}>Level {currentLevel.id}</Text>
          </TouchableOpacity>

          <View style={styles.coinContainer}>
            <Ionicons name="diamond" size={20} color="#FFD700" />
            <Text style={styles.coinText}>{progress?.coins || 0}</Text>
          </View>
        </View>

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
            <Ionicons name="gift" size={18} color="#9b59b6" />
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
            <Ionicons name="shuffle" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.hintButton]}
            onPress={useHint}
          >
            <Ionicons name="bulb" size={26} color="#fff" />
            <Text style={styles.hintCost}>20</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={clearSelection}>
            <Ionicons name="backspace" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Error message */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error}</Text>
          </View>
        )}

        {/* Level Complete Modal */}
        <LevelCompleteModal />

        {/* Level Select Modal */}
        <LevelSelectModal
          visible={showLevelSelect}
          onClose={() => setShowLevelSelect(false)}
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 10,
  },
  levelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  levelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  coinText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wonderInfo: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  wonderName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  wonderLocation: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    minWidth: 40,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 180,
  },
  wordFeedback: {
    position: 'absolute',
    top: height * 0.35,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
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
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bonusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  bonusText: {
    color: '#9b59b6',
    fontSize: 14,
    fontWeight: '600',
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintButton: {
    backgroundColor: 'rgba(241, 196, 15, 0.3)',
  },
  hintCost: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#f1c40f',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
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
