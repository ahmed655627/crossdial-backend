/**
 * GameScreen Component
 * Extracted from index.tsx - handles the main game UI
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LetterWheel } from '../LetterWheel';
import { CrosswordGrid } from '../CrosswordGrid';
import WordFormingDisplay from '../WordFormingDisplay';
import WordPlaceholders from '../WordPlaceholders';
import ToolsButton from '../ToolsButton';
import DialOverlay from '../DialOverlay';
import ParticleEffect from '../ParticleEffect';
import StarRating from '../StarRating';
import { BannerAdComponent } from '../BannerAdComponent';

interface GameScreenProps {
  // Level data
  currentLevel: any;
  foundWords: string[];
  bonusWordsFound: string[];
  currentWord: string;
  selectedLetterIndices: number[];
  
  // UI state
  currentStars: number;
  progressPercent: number;
  foundWordsCount: number;
  targetWordsCount: number;
  particleTrigger: number;
  isWordValid: boolean;
  isWordInvalid: boolean;
  timeChallengeActive: boolean;
  timeRemaining: number;
  showWordFeedback: boolean;
  lastWordResult: any;
  error: string | null;
  
  // Theme
  gameTheme: { icon: string; name: string };
  clueText: string;
  language: string;
  
  // Handlers
  onPausePress: () => void;
  onShuffle: () => void;
  onHint: () => void;
  onUndo: () => void;
  onClearSelection: () => void;
  onCancelTimeChallenge: () => void;
  formatTimeDisplay: (time: number) => string;
  getRandomFeedback: (lang: string, type: string) => string;
  
  // Hint state
  hintWord?: string | null;
  isShowingHint?: boolean;
}

const { width } = Dimensions.get('window');

export const GameScreen: React.FC<GameScreenProps> = ({
  currentLevel,
  foundWords,
  bonusWordsFound,
  currentWord,
  selectedLetterIndices,
  currentStars,
  progressPercent,
  foundWordsCount,
  targetWordsCount,
  particleTrigger,
  isWordValid,
  isWordInvalid,
  timeChallengeActive,
  timeRemaining,
  showWordFeedback,
  lastWordResult,
  error,
  gameTheme,
  clueText,
  language,
  onPausePress,
  onShuffle,
  onHint,
  onUndo,
  onClearSelection,
  onCancelTimeChallenge,
  formatTimeDisplay,
  getRandomFeedback,
  hintWord,
  isShowingHint,
}) => {
  return (
    <View style={styles.container}>
      {/* Header with pause and resources */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.pauseBtn} onPress={onPausePress}>
          <Ionicons name="pause" size={24} color="#fff" />
        </TouchableOpacity>
        
        {/* This space intentionally left minimal for decluttered UI */}
      </View>

      {/* Particle Effect */}
      <ParticleEffect trigger={particleTrigger} type="confetti" />

      {/* Clue Card */}
      <View style={styles.clueCard}>
        <LinearGradient
          colors={['rgba(30, 30, 50, 0.85)', 'rgba(20, 20, 40, 0.9)']}
          style={styles.clueCardGradient}
        >
          <View style={styles.clueHeaderRow}>
            <Text style={styles.themeIcon}>{gameTheme.icon}</Text>
            <Text style={styles.clueText} numberOfLines={2}>{clueText}</Text>
            <StarRating stars={currentStars} size="small" />
          </View>
          
          <View style={styles.progressWrapper}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={['#00d4aa', '#00b894']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${Math.max(5, progressPercent)}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              {foundWordsCount}/{targetWordsCount}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Time Challenge Timer */}
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
            <TouchableOpacity style={styles.timerCancel} onPress={onCancelTimeChallenge}>
              <Ionicons name="close" size={16} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}

      {/* Crossword Grid */}
      <View style={styles.gridContainer}>
        <CrosswordGrid />
      </View>

      {/* Word Placeholders with hint glow */}
      <WordPlaceholders
        targetWords={currentLevel?.targetWords || []}
        foundWords={foundWords || []}
        hintWord={hintWord}
        isShowingHint={isShowingHint}
      />

      {/* Dial Overlay */}
      <DialOverlay isActive={currentWord && currentWord.length > 0} />

      {/* Tools Button - Progressive disclosure */}
      <ToolsButton
        wordsFound={foundWords?.length || 0}
        onShuffle={onShuffle}
        onHint={onHint}
        onUndo={onUndo}
        canUndo={selectedLetterIndices && selectedLetterIndices.length > 0}
      />

      {/* Word Being Formed */}
      {currentWord && currentWord.length > 0 && (
        <WordFormingDisplay
          letters={currentWord.split('')}
          isValid={isWordValid}
          isInvalid={isWordInvalid}
        />
      )}

      {/* Word Feedback */}
      {showWordFeedback && lastWordResult && (
        <View style={styles.feedbackContainer}>
          <Text style={[
            styles.feedbackText,
            lastWordResult.isValid ? styles.feedbackSuccess : styles.feedbackError
          ]}>
            {lastWordResult.isValid
              ? getRandomFeedback(language === 'it' ? 'it' : 'en', lastWordResult.isBonus ? 'bonus' : 'excellent')
              : lastWordResult.word + ' ✗'}
          </Text>
        </View>
      )}

      {/* Letter Wheel */}
      <View style={styles.wheelContainer}>
        <LetterWheel />
        {bonusWordsFound.length > 0 && (
          <View style={styles.bonusBadge}>
            <Text style={styles.bonusBadgeText}>+{bonusWordsFound.length}</Text>
          </View>
        )}
      </View>

      {/* Clear Button */}
      {currentWord && currentWord.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={onClearSelection}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      )}

      {/* Banner Ad */}
      <View style={styles.bannerContainer}>
        <BannerAdComponent />
      </View>

      {/* Error Banner */}
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  pauseBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clueCard: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  clueCardGradient: {
    padding: 12,
  },
  clueHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  clueText: {
    flex: 1,
    fontSize: 14,
    color: '#e2e8f0',
    fontStyle: 'italic',
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#8892b0',
    fontWeight: '600',
  },
  timerContainer: {
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  timerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 8,
  },
  timerUrgent: {
    color: '#ffeb3b',
  },
  timerCancel: {
    marginLeft: 12,
    padding: 4,
  },
  gridContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  feedbackContainer: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '700',
  },
  feedbackSuccess: {
    color: '#00d4aa',
  },
  feedbackError: {
    color: '#ef4444',
  },
  wheelContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  bonusBadge: {
    position: 'absolute',
    top: -8,
    right: width / 2 - 80,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bonusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  clearButton: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  clearButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  bannerContainer: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  errorBanner: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default GameScreen;
