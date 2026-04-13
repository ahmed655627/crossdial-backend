/**
 * Hint Preview Component
 * Shows first letter hint instead of random reveal
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HintPreviewProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  word: string;
  hintsRemaining: number;
  hintCost: number;
}

const HintPreview: React.FC<HintPreviewProps> = ({
  visible,
  onClose,
  onConfirm,
  word,
  hintsRemaining,
  hintCost,
}) => {
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  const firstLetter = word.charAt(0).toUpperCase();
  const wordLength = word.length;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modal, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.title}>💡 Hint Preview</Text>
          
          <View style={styles.previewBox}>
            <Text style={styles.firstLetter}>{firstLetter}</Text>
            <View style={styles.blanks}>
              {Array(wordLength - 1).fill(0).map((_, i) => (
                <View key={i} style={styles.blank} />
              ))}
            </View>
          </View>
          
          <Text style={styles.info}>
            This word starts with "{firstLetter}" and has {wordLength} letters
          </Text>
          
          <View style={styles.costRow}>
            <Ionicons name="bulb" size={18} color="#a855f7" />
            <Text style={styles.costText}>
              Cost: {hintCost} hint ({hintsRemaining} remaining)
            </Text>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.confirmButton, hintsRemaining < hintCost && styles.disabled]}
              onPress={onConfirm}
              disabled={hintsRemaining < hintCost}
            >
              <Text style={styles.confirmText}>Reveal Letter</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1e1e3f',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
  },
  previewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  firstLetter: {
    fontSize: 36,
    fontWeight: '800',
    color: '#00b894',
    marginRight: 8,
  },
  blanks: {
    flexDirection: 'row',
  },
  blank: {
    width: 20,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  info: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 16,
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  costText: {
    fontSize: 14,
    color: '#a855f7',
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  cancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  cancelText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#00b894',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default HintPreview;
