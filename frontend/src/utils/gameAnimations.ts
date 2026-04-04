/**
 * Game Animations System
 * All game animations using React Native Reanimated
 */

import { 
  withSpring, 
  withTiming, 
  withSequence, 
  withDelay,
  withRepeat,
  Easing,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';

// Animation configuration types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: typeof Easing.linear;
}

// Spring configuration for bouncy animations
export const springConfig = {
  damping: 10,
  stiffness: 100,
  mass: 1,
};

export const bouncySpring = {
  damping: 8,
  stiffness: 150,
  mass: 0.8,
};

export const gentleSpring = {
  damping: 15,
  stiffness: 80,
  mass: 1.2,
};

// ============================================
// 1. LETTER SELECTION ANIMATION
// Bounce and glow when selecting letters
// ============================================
export const createLetterSelectAnimation = () => {
  const scale = useSharedValue(1);
  const glow = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    shadowOpacity: interpolate(glow.value, [0, 1], [0.2, 0.8]),
    shadowRadius: interpolate(glow.value, [0, 1], [2, 15]),
    shadowColor: '#FFD700',
  }));

  const animate = () => {
    // Bounce up
    scale.value = withSequence(
      withSpring(1.2, bouncySpring),
      withSpring(1, gentleSpring)
    );
    // Glow effect
    glow.value = withSequence(
      withTiming(1, { duration: 150 }),
      withTiming(0.3, { duration: 300 })
    );
    // Slight rotation
    rotation.value = withSequence(
      withTiming(-5, { duration: 50 }),
      withTiming(5, { duration: 100 }),
      withTiming(0, { duration: 50 })
    );
  };

  const reset = () => {
    scale.value = withTiming(1, { duration: 200 });
    glow.value = withTiming(0, { duration: 200 });
    rotation.value = withTiming(0, { duration: 100 });
  };

  return { animatedStyle, animate, reset, scale, glow };
};

// ============================================
// 2. WORD FOUND ANIMATION
// Celebration with confetti effect
// ============================================
export const createWordFoundAnimation = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const rotation = useSharedValue(-10);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const animate = (onComplete?: () => void) => {
    // Pop in with bounce
    scale.value = withSequence(
      withSpring(1.3, bouncySpring),
      withSpring(1, gentleSpring)
    );
    
    // Fade in and float up
    opacity.value = withTiming(1, { duration: 200 });
    translateY.value = withSequence(
      withSpring(-20, bouncySpring),
      withDelay(800, withTiming(50, { duration: 300 }))
    );
    
    // Wiggle rotation
    rotation.value = withSequence(
      withTiming(10, { duration: 100 }),
      withTiming(-10, { duration: 100 }),
      withTiming(5, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );

    // Fade out after delay
    opacity.value = withDelay(1000, withTiming(0, { duration: 300 }, () => {
      if (onComplete) runOnJS(onComplete)();
    }));
  };

  const reset = () => {
    scale.value = 0;
    opacity.value = 0;
    translateY.value = 50;
    rotation.value = -10;
  };

  return { animatedStyle, animate, reset };
};

// ============================================
// 3. LEVEL COMPLETE ANIMATION
// Stars flying, coins collecting
// ============================================
export const createLevelCompleteAnimation = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const starRotation = useSharedValue(0);
  const shimmer = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const starStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${starRotation.value}deg` }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 0.5, 1], [0.3, 1, 0.3]),
  }));

  const animate = (onComplete?: () => void) => {
    // Scale in with bounce
    scale.value = withSequence(
      withSpring(1.2, { damping: 6, stiffness: 200 }),
      withSpring(1, gentleSpring)
    );
    
    opacity.value = withTiming(1, { duration: 300 });
    
    // Continuous star rotation
    starRotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );
    
    // Shimmer effect
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  };

  const hide = (onComplete?: () => void) => {
    scale.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      if (onComplete) runOnJS(onComplete)();
    });
    cancelAnimation(starRotation);
    cancelAnimation(shimmer);
  };

  return { containerStyle, starStyle, shimmerStyle, animate, hide };
};

// ============================================
// 4. GRID FILL ANIMATION
// Letters slide/fade into grid
// ============================================
export const createGridFillAnimation = (index: number, totalCells: number) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  const animate = () => {
    const delay = index * 50; // Stagger animation
    
    scale.value = withDelay(delay, withSpring(1, bouncySpring));
    opacity.value = withDelay(delay, withTiming(1, { duration: 200 }));
    translateY.value = withDelay(delay, withSpring(0, gentleSpring));
  };

  const animateOut = () => {
    const delay = (totalCells - index) * 30;
    
    scale.value = withDelay(delay, withTiming(0, { duration: 200 }));
    opacity.value = withDelay(delay, withTiming(0, { duration: 200 }));
    translateY.value = withDelay(delay, withTiming(20, { duration: 200 }));
  };

  return { animatedStyle, animate, animateOut };
};

// ============================================
// 5. WHEEL SPIN ANIMATION
// Smooth rotation when shuffling
// ============================================
export const createWheelSpinAnimation = () => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const spin = (onComplete?: () => void) => {
    // Quick shrink
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withDelay(500, withSpring(1, gentleSpring))
    );
    
    // Fast spin with easing out
    rotation.value = withSequence(
      withTiming(rotation.value + 720, { 
        duration: 600, 
        easing: Easing.out(Easing.cubic) 
      }, () => {
        if (onComplete) runOnJS(onComplete)();
      })
    );
  };

  const gentleSpin = () => {
    rotation.value = withTiming(rotation.value + 360, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return { animatedStyle, spin, gentleSpin, rotation };
};

// ============================================
// 6. COMBO BONUS ANIMATION
// Fire/lightning effects for fast words
// ============================================
export const createComboAnimation = (comboCount: number) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const pulse = useSharedValue(1);
  const shake = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value * pulse.value },
      { translateX: shake.value },
    ],
    opacity: opacity.value,
  }));

  const animate = (onComplete?: () => void) => {
    const intensity = Math.min(comboCount / 5, 1); // Max intensity at 5 combo
    
    // Pop in
    scale.value = withSequence(
      withSpring(1.5 + intensity * 0.5, { damping: 5, stiffness: 300 }),
      withSpring(1, bouncySpring)
    );
    
    opacity.value = withTiming(1, { duration: 150 });
    
    // Pulsing effect
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 200 }),
        withTiming(1, { duration: 200 })
      ),
      3,
      true
    );
    
    // Screen shake for high combos
    if (comboCount >= 3) {
      shake.value = withRepeat(
        withSequence(
          withTiming(-5 * intensity, { duration: 30 }),
          withTiming(5 * intensity, { duration: 30 }),
          withTiming(0, { duration: 30 })
        ),
        3,
        true
      );
    }
    
    // Fade out
    opacity.value = withDelay(1200, withTiming(0, { duration: 300 }, () => {
      if (onComplete) runOnJS(onComplete)();
    }));
  };

  const reset = () => {
    scale.value = 0;
    opacity.value = 0;
    pulse.value = 1;
    shake.value = 0;
  };

  return { animatedStyle, animate, reset };
};

// ============================================
// 7. HINT REVEAL ANIMATION
// Magic sparkle when hint shows letter
// ============================================
export const createHintRevealAnimation = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const glow = useSharedValue(0);
  const sparkleRotation = useSharedValue(0);

  const cellStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: glow.value,
    shadowRadius: interpolate(glow.value, [0, 1], [0, 20]),
    shadowColor: '#FFD700',
  }));

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { rotate: `${sparkleRotation.value}deg` },
      { scale: interpolate(opacity.value, [0, 1], [0.5, 1.2]) },
    ],
  }));

  const animate = (onComplete?: () => void) => {
    // Initial glow burst
    glow.value = withSequence(
      withTiming(1, { duration: 200 }),
      withTiming(0.3, { duration: 500 })
    );
    
    // Scale pop
    scale.value = withSequence(
      withTiming(0, { duration: 0 }),
      withSpring(1.3, { damping: 5, stiffness: 200 }),
      withSpring(1, gentleSpring)
    );
    
    // Sparkle effect
    opacity.value = withSequence(
      withTiming(1, { duration: 100 }),
      withDelay(600, withTiming(0, { duration: 300 }))
    );
    
    sparkleRotation.value = withTiming(180, { 
      duration: 800, 
      easing: Easing.out(Easing.ease) 
    }, () => {
      if (onComplete) runOnJS(onComplete)();
    });
  };

  const reset = () => {
    scale.value = 1;
    opacity.value = 0;
    glow.value = 0;
    sparkleRotation.value = 0;
  };

  return { cellStyle, sparkleStyle, animate, reset };
};

// ============================================
// CONFETTI PARTICLE ANIMATION
// For celebrations
// ============================================
export const createConfettiParticle = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  delay: number
) => {
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const animate = () => {
    scale.value = withDelay(delay, withSpring(1, bouncySpring));
    
    translateX.value = withDelay(delay, withTiming(endX, {
      duration: 1500,
      easing: Easing.out(Easing.quad),
    }));
    
    translateY.value = withDelay(delay, withTiming(endY, {
      duration: 1500,
      easing: Easing.in(Easing.quad),
    }));
    
    rotation.value = withDelay(delay, withTiming(
      Math.random() > 0.5 ? 720 : -720,
      { duration: 1500 }
    ));
    
    opacity.value = withDelay(delay + 1000, withTiming(0, { duration: 500 }));
  };

  return { animatedStyle, animate };
};

// ============================================
// BUTTON PRESS ANIMATION
// General button press feedback
// ============================================
export const createButtonPressAnimation = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const pressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
    opacity.value = withTiming(0.8, { duration: 100 });
  };

  const pressOut = () => {
    scale.value = withSpring(1, bouncySpring);
    opacity.value = withTiming(1, { duration: 100 });
  };

  return { animatedStyle, pressIn, pressOut };
};

// ============================================
// FLOATING ANIMATION
// For UI elements that should float
// ============================================
export const createFloatingAnimation = () => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const startFloating = () => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  };

  const stopFloating = () => {
    cancelAnimation(translateY);
    translateY.value = withTiming(0, { duration: 300 });
  };

  return { animatedStyle, startFloating, stopFloating };
};

// ============================================
// PULSE ANIMATION
// For highlighting elements
// ============================================
export const createPulseAnimation = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const startPulsing = () => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  };

  const stopPulsing = () => {
    cancelAnimation(scale);
    cancelAnimation(opacity);
    scale.value = withTiming(1, { duration: 200 });
    opacity.value = withTiming(1, { duration: 200 });
  };

  return { animatedStyle, startPulsing, stopPulsing };
};

export default {
  createLetterSelectAnimation,
  createWordFoundAnimation,
  createLevelCompleteAnimation,
  createGridFillAnimation,
  createWheelSpinAnimation,
  createComboAnimation,
  createHintRevealAnimation,
  createConfettiParticle,
  createButtonPressAnimation,
  createFloatingAnimation,
  createPulseAnimation,
};
