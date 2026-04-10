import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

interface DialOverlayProps {
  isActive: boolean;
}

const { width, height } = Dimensions.get('window');

const DialOverlay: React.FC<DialOverlayProps> = ({ isActive }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.overlay,
        { opacity },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    zIndex: 5,
  },
});

export default DialOverlay;
