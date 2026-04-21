import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface GameMascotProps {
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'thinking';
  message?: string;
  position?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
}

export const GameMascot: React.FC<GameMascotProps> = ({
  mood,
  message,
  position = 'right',
  size = 'medium',
}) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const getMascotEmoji = () => {
    switch (mood) {
      case 'happy':
        return '🦉';
      case 'sad':
        return '😢';
      case 'excited':
        return '🎉';
      case 'thinking':
        return '🤔';
      default:
        return '🦉';
    }
  };

  const getMascotBackground = () => {
    switch (mood) {
      case 'happy':
        return ['#4ECDC4', '#45B7D1'];
      case 'sad':
        return ['#95A5A6', '#7F8C8D'];
      case 'excited':
        return ['#FFE66D', '#F7DC6F'];
      case 'thinking':
        return ['#A29BFE', '#8B82FD'];
      default:
        return ['#4ECDC4', '#45B7D1'];
    }
  };

  useEffect(() => {
    // Bounce animation
    if (mood === 'happy' || mood === 'excited') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -8,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (mood === 'sad') {
      bounceAnim.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      bounceAnim.setValue(0);
      scaleAnim.setValue(1);
    }
  }, [mood]);

  const sizeStyles = {
    small: { width: 44, height: 44, fontSize: 24 },
    medium: { width: 56, height: 56, fontSize: 32 },
    large: { width: 72, height: 72, fontSize: 44 },
  };

  const currentSize = sizeStyles[size];

  return (
    <View style={[styles.container, position === 'left' ? styles.positionLeft : styles.positionRight]}>
      {/* Speech bubble */}
      {message && (
        <View style={[styles.speechBubble, position === 'left' ? styles.bubbleRight : styles.bubbleLeft]}>
          <Text style={styles.speechText}>{message}</Text>
          <View style={[styles.bubbleArrow, position === 'left' ? styles.arrowRight : styles.arrowLeft]} />
        </View>
      )}
      
      {/* Mascot */}
      <Animated.View
        style={[
          styles.mascotContainer,
          {
            width: currentSize.width,
            height: currentSize.height,
            transform: [
              { translateY: bounceAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <View style={[styles.mascotBg, { backgroundColor: getMascotBackground()[0] }]}>
          <Text style={[styles.mascotEmoji, { fontSize: currentSize.fontSize }]}>
            {getMascotEmoji()}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 200,
    zIndex: 500,
  },
  positionLeft: {
    left: 16,
    flexDirection: 'row-reverse',
  },
  positionRight: {
    right: 16,
  },
  mascotContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  mascotBg: {
    flex: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  mascotEmoji: {
    textAlign: 'center',
  },
  speechBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: width * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  bubbleLeft: {
    marginRight: 8,
  },
  bubbleRight: {
    marginLeft: 8,
  },
  speechText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
  bubbleArrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'rgba(255, 255, 255, 0.95)',
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    bottom: -6,
  },
  arrowLeft: {
    right: 16,
  },
  arrowRight: {
    left: 16,
  },
});

export default GameMascot;
