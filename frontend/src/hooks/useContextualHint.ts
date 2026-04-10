/**
 * useContextualHint Hook
 * Tracks when player is stuck and suggests hints
 */

import { useState, useEffect, useRef, useCallback } from 'react';

const STUCK_THRESHOLD_MS = 20000; // 20 seconds

interface UseContextualHintProps {
  targetWords: string[];
  foundWords: string[];
  enabled?: boolean;
}

interface UseContextualHintReturn {
  hintWord: string | null;
  hintLetterIndex: number | null;
  isShowingHint: boolean;
  dismissHint: () => void;
  resetTimer: () => void;
}

export const useContextualHint = ({
  targetWords,
  foundWords,
  enabled = true,
}: UseContextualHintProps): UseContextualHintReturn => {
  const [hintWord, setHintWord] = useState<string | null>(null);
  const [hintLetterIndex, setHintLetterIndex] = useState<number | null>(null);
  const [isShowingHint, setIsShowingHint] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const dismissHint = useCallback(() => {
    setHintWord(null);
    setHintLetterIndex(null);
    setIsShowingHint(false);
  }, []);

  const resetTimer = useCallback(() => {
    dismissHint();
    clearTimer();
    
    if (!enabled) return;
    
    // Start new timer
    timerRef.current = setTimeout(() => {
      // Find unfound words
      const unfoundWords = targetWords.filter(
        (w) => !foundWords.map(f => f.toUpperCase()).includes(w.toUpperCase())
      );
      
      if (unfoundWords.length > 0) {
        // Pick the shortest unfound word
        const sortedByLength = [...unfoundWords].sort((a, b) => a.length - b.length);
        const wordToHint = sortedByLength[0].toUpperCase();
        setHintWord(wordToHint);
        setHintLetterIndex(0); // First letter
        setIsShowingHint(true);
      }
    }, STUCK_THRESHOLD_MS);
  }, [targetWords, foundWords, enabled, dismissHint, clearTimer]);

  // Reset timer when words found changes
  useEffect(() => {
    resetTimer();
    return clearTimer;
  }, [foundWords.length]);

  // Reset when level changes
  useEffect(() => {
    resetTimer();
    return clearTimer;
  }, [targetWords]);

  return {
    hintWord,
    hintLetterIndex,
    isShowingHint,
    dismissHint,
    resetTimer,
  };
};

export default useContextualHint;
