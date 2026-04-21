import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface ShuffleButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const ShuffleButton: React.FC<ShuffleButtonProps> = ({ onPress, disabled = false }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled) return;
    
    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Rotation animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(() => {
      rotateAnim.setValue(0);
    });
    
    onPress();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { rotate: rotation },
            { scale: scaleAnim },
          ],
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.icon}>🔀</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  icon: {
    fontSize: 24,
  },
});

export default ShuffleButton;
