import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ToolsButtonProps {
  wordsFound: number;
  onShuffle: () => void;
  onHint: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

const ToolsButton: React.FC<ToolsButtonProps> = ({
  wordsFound,
  onShuffle,
  onHint,
  onUndo,
  canUndo,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Progressive disclosure - only show after 2 words found
  const shouldShow = wordsFound >= 2;

  useEffect(() => {
    if (shouldShow) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [shouldShow]);

  useEffect(() => {
    Animated.spring(expandAnim, {
      toValue: isExpanded ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [isExpanded]);

  if (!shouldShow) {
    return null;
  }

  const toolsTranslateY = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  const toolsOpacity = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Expanded Tools */}
      <Animated.View
        style={[
          styles.toolsPanel,
          {
            transform: [{ translateY: toolsTranslateY }],
            opacity: toolsOpacity,
          },
        ]}
      >
        <TouchableOpacity style={styles.toolItem} onPress={onShuffle}>
          <Ionicons name="shuffle" size={20} color="#4fc3f7" />
          <Text style={styles.toolLabel}>Shuffle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolItem} onPress={onHint}>
          <Ionicons name="bulb" size={20} color="#FFD700" />
          <Text style={styles.toolLabel}>Hint</Text>
        </TouchableOpacity>

        {canUndo && (
          <TouchableOpacity style={styles.toolItem} onPress={onUndo}>
            <Ionicons name="arrow-undo" size={20} color="#9b59b6" />
            <Text style={styles.toolLabel}>Undo</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Main Tools Button */}
      <TouchableOpacity
        style={[styles.mainButton, isExpanded && styles.mainButtonActive]}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isExpanded ? "close" : "construct"}
          size={22}
          color="#fff"
        />
        <Text style={styles.mainButtonText}>
          {isExpanded ? '' : 'Tools'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 180,
    left: 16,
    zIndex: 100,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  mainButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  toolsPanel: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    backgroundColor: 'rgba(30, 30, 50, 0.95)',
    borderRadius: 16,
    padding: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  toolItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  toolLabel: {
    color: '#fff',
    fontSize: 10,
    marginTop: 4,
    opacity: 0.8,
  },
});

export default ToolsButton;
