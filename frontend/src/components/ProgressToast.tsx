import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

interface ProgressToastProps {
  visible: boolean;
  wordsFound: number;
  totalWords: number;
  lastWord?: string;
  onHide: () => void;
}

const ProgressToast: React.FC<ProgressToastProps> = ({
  visible,
  wordsFound,
  totalWords,
  lastWord,
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after 2 seconds
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const isComplete = wordsFound >= totalWords;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={[styles.toast, isComplete && styles.toastComplete]}>
        {lastWord && (
          <Text style={styles.wordText}>✓ {lastWord}</Text>
        )}
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            {wordsFound}/{totalWords} Words
          </Text>
          {isComplete && (
            <Text style={styles.completeText}>🎉 Level Complete!</Text>
          )}
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${(wordsFound / totalWords) * 100}%` },
              isComplete && styles.progressFillComplete,
            ]} 
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    zIndex: 1000,
    alignItems: 'center',
  },
  toast: {
    backgroundColor: 'rgba(30, 30, 50, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    minWidth: 200,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  toastComplete: {
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  wordText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  completeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4fc3f7',
    borderRadius: 2,
  },
  progressFillComplete: {
    backgroundColor: '#fff',
  },
});

export default ProgressToast;
