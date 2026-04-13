/**
 * Combo System Hook
 * Tracks consecutive word finds for bonus multipliers
 */

import { useState, useCallback, useRef, useEffect } from 'react';

const COMBO_WINDOW_MS = 5000; // 5 seconds to maintain combo

interface ComboState {
  count: number;
  multiplier: number;
  isActive: boolean;
  lastWordTime: number;
}

export const useComboSystem = () => {
  const [combo, setCombo] = useState<ComboState>({
    count: 0,
    multiplier: 1,
    isActive: false,
    lastWordTime: 0,
  });
  
  const [showComboToast, setShowComboToast] = useState(false);
  const [comboMessage, setComboMessage] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear combo after timeout
  useEffect(() => {
    if (combo.isActive) {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      timerRef.current = setTimeout(() => {
        setCombo({
          count: 0,
          multiplier: 1,
          isActive: false,
          lastWordTime: 0,
        });
      }, COMBO_WINDOW_MS);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [combo.lastWordTime]);

  const registerWordFound = useCallback(() => {
    const now = Date.now();
    
    setCombo(prev => {
      const timeSinceLastWord = now - prev.lastWordTime;
      const maintainCombo = timeSinceLastWord < COMBO_WINDOW_MS;
      
      const newCount = maintainCombo ? prev.count + 1 : 1;
      const newMultiplier = Math.min(1 + (newCount - 1) * 0.25, 3); // Max 3x
      
      // Show toast for combos >= 2
      if (newCount >= 2) {
        const messages = [
          '',
          '',
          '🔥 2x Combo!',
          '⚡ 3x Combo!',
          '💫 4x Combo!',
          '🌟 5x SUPER!',
          '👑 6x MEGA!',
        ];
        setComboMessage(messages[Math.min(newCount, 6)]);
        setShowComboToast(true);
        setTimeout(() => setShowComboToast(false), 1500);
      }
      
      return {
        count: newCount,
        multiplier: newMultiplier,
        isActive: true,
        lastWordTime: now,
      };
    });
  }, []);

  const resetCombo = useCallback(() => {
    setCombo({
      count: 0,
      multiplier: 1,
      isActive: false,
      lastWordTime: 0,
    });
  }, []);

  return {
    comboCount: combo.count,
    comboMultiplier: combo.multiplier,
    isComboActive: combo.isActive,
    showComboToast,
    comboMessage,
    registerWordFound,
    resetCombo,
  };
};

export default useComboSystem;
