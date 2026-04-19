/**
 * Sound Toggle Button
 * Quick mute/unmute in game header
 */

import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { soundManager } from '../utils/sounds';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SoundToggleProps {
  size?: number;
  style?: any;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ size = 24, style }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Load saved state
    AsyncStorage.getItem('sound_muted').then((value) => {
      if (value === 'true') {
        setIsMuted(true);
        soundManager.setEnabled(false);
      }
    });
  }, []);

  const handleToggle = async () => {
    // Animate
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setEnabled(!newMuted);
    await AsyncStorage.setItem('sound_muted', String(newMuted));
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isMuted ? 'volume-mute' : 'volume-high'}
          size={size}
          color={isMuted ? 'rgba(255, 255, 255, 0.4)' : '#fff'}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SoundToggle;
