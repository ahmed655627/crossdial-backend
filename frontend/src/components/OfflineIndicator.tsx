/**
 * Offline Indicator
 * Shows when playing in offline mode
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';

interface OfflineIndicatorProps {
  style?: any;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ style }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-50));

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const offline = !state.isConnected;
      setIsOffline(offline);
      
      Animated.spring(slideAnim, {
        toValue: offline ? 0 : -50,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }).start();
    });

    return () => unsubscribe();
  }, []);

  if (!isOffline) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Ionicons name="cloud-offline" size={16} color="#fff" />
      <Text style={styles.text}>Offline Mode</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f59e0b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    zIndex: 9999,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default OfflineIndicator;
