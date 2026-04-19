/**
 * Enhanced Confetti Animation
 * Beautiful celebration when completing levels
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ConfettiPiece {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  scale: Animated.Value;
  color: string;
  size: number;
}

interface EnhancedConfettiProps {
  trigger: number;
  duration?: number;
  pieceCount?: number;
}

const COLORS = [
  '#fbbf24', // Yellow
  '#ef4444', // Red
  '#10b981', // Green
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#f97316', // Orange
  '#00b894', // Teal
];

const EnhancedConfetti: React.FC<EnhancedConfettiProps> = ({
  trigger,
  duration = 3000,
  pieceCount = 50,
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger > 0) {
      startAnimation();
    }
  }, [trigger]);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newPieces: ConfettiPiece[] = [];

    for (let i = 0; i < pieceCount; i++) {
      const startX = Math.random() * width;
      const startY = -20 - Math.random() * 100;

      newPieces.push({
        id: i,
        x: new Animated.Value(startX),
        y: new Animated.Value(startY),
        rotate: new Animated.Value(0),
        scale: new Animated.Value(1),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 8 + Math.random() * 8,
      });
    }

    setPieces(newPieces);

    // Animate each piece
    newPieces.forEach((piece, index) => {
      const delay = index * 30;
      const fallDuration = duration + Math.random() * 1000;
      const horizontalDrift = (Math.random() - 0.5) * 100;

      setTimeout(() => {
        Animated.parallel([
          // Fall down
          Animated.timing(piece.y, {
            toValue: height + 50,
            duration: fallDuration,
            useNativeDriver: true,
          }),
          // Drift horizontally
          Animated.timing(piece.x, {
            toValue: piece.x._value + horizontalDrift,
            duration: fallDuration,
            useNativeDriver: true,
          }),
          // Rotate
          Animated.timing(piece.rotate, {
            toValue: 360 * (2 + Math.random() * 3),
            duration: fallDuration,
            useNativeDriver: true,
          }),
          // Scale down at end
          Animated.sequence([
            Animated.delay(fallDuration * 0.7),
            Animated.timing(piece.scale, {
              toValue: 0,
              duration: fallDuration * 0.3,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      }, delay);
    });

    // Clean up
    setTimeout(() => {
      setPieces([]);
      setIsAnimating(false);
    }, duration + 2000);
  };

  if (pieces.length === 0) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((piece) => (
        <Animated.View
          key={piece.id}
          style={[
            styles.piece,
            {
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              transform: [
                { translateX: piece.x },
                { translateY: piece.y },
                {
                  rotate: piece.rotate.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                { scale: piece.scale },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  piece: {
    position: 'absolute',
    borderRadius: 2,
  },
});

export default EnhancedConfetti;
