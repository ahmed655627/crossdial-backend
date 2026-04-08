/**
 * Match Mode Component
 * Swipe to match words with their corresponding wonders/locations
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { MATCH_PUZZLES } from '../data/gameModes';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.4;
const CARD_HEIGHT = 70;

interface MatchModeProps {
  puzzleId?: number;
  onComplete: (reward: number) => void;
  onClose: () => void;
}

interface MatchPair {
  word: string;
  match: string;
  hint: string;
  isMatched: boolean;
}

const MatchMode: React.FC<MatchModeProps> = ({ puzzleId = 1, onComplete, onClose }) => {
  const puzzle = MATCH_PUZZLES.find(p => p.id === puzzleId) || MATCH_PUZZLES[0];
  
  const [pairs, setPairs] = useState<MatchPair[]>(
    puzzle.pairs.map(p => ({ ...p, isMatched: false }))
  );
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Shuffled lists
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [shuffledMatches, setShuffledMatches] = useState<string[]>([]);
  
  useEffect(() => {
    // Shuffle words and matches separately
    setShuffledWords([...puzzle.pairs.map(p => p.word)].sort(() => Math.random() - 0.5));
    setShuffledMatches([...puzzle.pairs.map(p => p.match)].sort(() => Math.random() - 0.5));
  }, [puzzle]);
  
  const handleWordSelect = useCallback((word: string) => {
    if (pairs.find(p => p.word === word)?.isMatched) return;
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setSelectedWord(word);
    
    // Show hint for selected word
    const pair = pairs.find(p => p.word === word);
    if (pair) {
      setShowHint(pair.hint);
    }
    
    // Check if we have a match
    if (selectedMatch) {
      checkMatch(word, selectedMatch);
    }
  }, [selectedMatch, pairs]);
  
  const handleMatchSelect = useCallback((match: string) => {
    if (pairs.find(p => p.match === match)?.isMatched) return;
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setSelectedMatch(match);
    
    // Check if we have a match
    if (selectedWord) {
      checkMatch(selectedWord, match);
    }
  }, [selectedWord, pairs]);
  
  const checkMatch = useCallback((word: string, match: string) => {
    const pair = pairs.find(p => p.word === word && p.match === match);
    
    if (pair) {
      // Correct match!
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      setPairs(prev => prev.map(p => 
        p.word === word ? { ...p, isMatched: true } : p
      ));
      setScore(prev => prev + 10);
      
      // Check if all matched
      const remainingPairs = pairs.filter(p => !p.isMatched && p.word !== word);
      if (remainingPairs.length === 0) {
        setIsComplete(true);
        const finalReward = Math.max(puzzle.reward - (mistakes * 5), 10);
        setTimeout(() => onComplete(finalReward), 1500);
      }
    } else {
      // Wrong match
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      setMistakes(prev => prev + 1);
    }
    
    // Reset selections
    setSelectedWord(null);
    setSelectedMatch(null);
    setShowHint(null);
  }, [pairs, mistakes, puzzle.reward, onComplete]);
  
  const renderWordCard = (word: string, index: number) => {
    const pair = pairs.find(p => p.word === word);
    const isMatched = pair?.isMatched || false;
    const isSelected = selectedWord === word;
    
    return (
      <TouchableOpacity
        key={`word-${index}`}
        onPress={() => handleWordSelect(word)}
        disabled={isMatched}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            isMatched 
              ? ['#2ecc71', '#27ae60'] 
              : isSelected 
                ? ['#FFD700', '#FFA500']
                : ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']
          }
          style={[
            styles.card,
            isMatched && styles.matchedCard,
            isSelected && styles.selectedCard,
          ]}
        >
          <Text style={[
            styles.cardText,
            isMatched && styles.matchedText,
          ]}>
            {word}
          </Text>
          {isMatched && <Text style={styles.checkMark}>✓</Text>}
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  
  const renderMatchCard = (match: string, index: number) => {
    const pair = pairs.find(p => p.match === match);
    const isMatched = pair?.isMatched || false;
    const isSelected = selectedMatch === match;
    
    return (
      <TouchableOpacity
        key={`match-${index}`}
        onPress={() => handleMatchSelect(match)}
        disabled={isMatched}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            isMatched 
              ? ['#2ecc71', '#27ae60'] 
              : isSelected 
                ? ['#FF6B6B', '#ee5a5a']
                : ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']
          }
          style={[
            styles.card,
            isMatched && styles.matchedCard,
            isSelected && styles.selectedCard,
          ]}
        >
          <Text style={[
            styles.cardText,
            isMatched && styles.matchedText,
          ]}>
            📍 {match}
          </Text>
          {isMatched && <Text style={styles.checkMark}>✓</Text>}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🔗 {puzzle.theme}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>⭐ {score}</Text>
        </View>
      </View>
      
      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Match words with their locations!
        </Text>
        {showHint && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>Hint: {showHint}</Text>
          </View>
        )}
      </View>
      
      {/* Game Area */}
      <View style={styles.gameArea}>
        {/* Words Column */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>WORDS</Text>
          {shuffledWords.map((word, index) => renderWordCard(word, index))}
        </View>
        
        {/* Connection Line Visual */}
        <View style={styles.connectionArea}>
          {selectedWord && selectedMatch && (
            <View style={styles.connectionLine} />
          )}
        </View>
        
        {/* Matches Column */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>LOCATIONS</Text>
          {shuffledMatches.map((match, index) => renderMatchCard(match, index))}
        </View>
      </View>
      
      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Matched: {pairs.filter(p => p.isMatched).length} / {pairs.length}
        </Text>
        {mistakes > 0 && (
          <Text style={styles.mistakesText}>
            Mistakes: {mistakes}
          </Text>
        )}
      </View>
      
      {/* Complete Overlay */}
      {isComplete && (
        <View style={styles.completeOverlay}>
          <LinearGradient
            colors={['rgba(46, 204, 113, 0.95)', 'rgba(39, 174, 96, 0.95)']}
            style={styles.completeCard}
          >
            <Text style={styles.completeEmoji}>🎉</Text>
            <Text style={styles.completeTitle}>Perfect Match!</Text>
            <Text style={styles.completeScore}>
              +{Math.max(puzzle.reward - (mistakes * 5), 10)} Coins
            </Text>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scoreContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  instructions: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  instructionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  hintContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  hintText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
  },
  gameArea: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  columnTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 15,
    letterSpacing: 2,
  },
  connectionArea: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionLine: {
    width: 3,
    height: '80%',
    backgroundColor: 'rgba(255, 215, 0, 0.5)',
    borderRadius: 2,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
  },
  selectedCard: {
    borderColor: '#FFD700',
    transform: [{ scale: 1.05 }],
  },
  matchedCard: {
    opacity: 0.7,
    borderColor: '#2ecc71',
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  matchedText: {
    textDecorationLine: 'line-through',
    opacity: 0.8,
  },
  checkMark: {
    fontSize: 18,
    color: '#FFF',
    marginLeft: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    // gap: 20, // REMOVED
  },
  progressText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  mistakesText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  completeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeCard: {
    width: SCREEN_WIDTH * 0.8,
    padding: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  completeEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  completeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  completeScore: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default MatchMode;
