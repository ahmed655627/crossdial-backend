/**
 * Contextual Hint Component
 * Shows a subtle glow on tiles when player is stuck for 20+ seconds
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useGameStore } from '../store/gameStore';

interface ContextualHintProps {
  targetWords: string[];
  foundWords: string[];
  onHintWord?: (word: string) => void;
}

const STUCK_THRESHOLD_MS = 20000; // 20 seconds

const ContextualHint: React.FC<ContextualHintProps> = ({
  targetWords,
  foundWords,
  onHintWord,
}) => {
  const [hintWord, setHintWord] = useState<string | null>(null);
  const [isGlowing, setIsGlowing] = useState(false);
  const glowAnim = useRef(new Animated.Value(0)).current;
  const stuckTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastWordFoundTimeRef = useRef<number>(Date.now());

  // Reset timer when a word is found
  useEffect(() => {
    lastWordFoundTimeRef.current = Date.now();
    setHintWord(null);
    setIsGlowing(false);
    
    // Clear any existing timer
    if (stuckTimerRef.current) {
      clearTimeout(stuckTimerRef.current);
    }

    // Start new timer
    stuckTimerRef.current = setTimeout(() => {
      // Find a word they haven't found yet
      const unfoundWords = targetWords.filter(
        (w) => !foundWords.includes(w.toUpperCase())
      );
      
      if (unfoundWords.length > 0) {
        // Pick the shortest unfound word as hint
        const sortedByLength = [...unfoundWords].sort((a, b) => a.length - b.length);
        const wordToHint = sortedByLength[0];
        setHintWord(wordToHint);
        setIsGlowing(true);
        if (onHintWord) {
          onHintWord(wordToHint);
        }
      }
    }, STUCK_THRESHOLD_MS);

    return () => {
      if (stuckTimerRef.current) {
        clearTimeout(stuckTimerRef.current);
      }
    };
  }, [foundWords.length, targetWords]);

  // Glow animation
  useEffect(() => {
    if (isGlowing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [isGlowing]);

  // This component doesn't render anything visible
  // It just manages the hint state and calls onHintWord
  return null;
};

export default ContextualHint;
