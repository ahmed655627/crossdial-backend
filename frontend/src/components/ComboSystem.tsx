import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface ComboSystemProps {
  comboCount: number;
  onComboBonus: (bonus: number) => void;
}

export const ComboSystem: React.FC<ComboSystemProps> = ({
  comboCount,
  onComboBonus,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [showCombo, setShowCombo] = useState(false);

  useEffect(() => {
    if (comboCount >= 2) {
      setShowCombo(true);
      
      // Calculate bonus
      const bonus = Math.floor(comboCount * 5);
      onComboBonus(bonus);

      // Animate
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1.3,
            friction: 3,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(1000),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => setShowCombo(false));
    }
  }, [comboCount]);

  const getComboColor = () => {
    if (comboCount >= 10) return '#ff0000';
    if (comboCount >= 7) return '#ff6b00';
    if (comboCount >= 5) return '#ffd700';
    if (comboCount >= 3) return '#00ff00';
    return '#00bfff';
  };

  const getComboText = () => {
    if (comboCount >= 10) return 'LEGENDARY!';
    if (comboCount >= 7) return 'AMAZING!';
    if (comboCount >= 5) return 'GREAT!';
    if (comboCount >= 3) return 'GOOD!';
    return 'COMBO!';
  };

  if (!showCombo || comboCount < 2) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={[styles.comboText, { color: getComboColor() }]}>
        {getComboText()}
      </Text>
      <Text style={styles.comboCount}>x{comboCount}</Text>
      <Text style={styles.bonusText}>+{comboCount * 5} coins</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  comboText: {
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  comboCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  bonusText: {
    fontSize: 18,
    color: '#ffd700',
    fontWeight: 'bold',
  },
});

export default ComboSystem;
