/**
 * Rate App Modal
 * Prompts user to rate the app after Level 10
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RATE_KEY = 'has_rated_app';
const RATE_LATER_KEY = 'rate_later_timestamp';
const RATE_THRESHOLD_LEVEL = 10;

interface RateAppModalProps {
  visible: boolean;
  onClose: () => void;
  currentLevel: number;
}

const RateAppModal: React.FC<RateAppModalProps> = ({
  visible,
  onClose,
  currentLevel,
}) => {
  const [selectedStars, setSelectedStars] = useState(0);
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

  const handleRate = async () => {
    await AsyncStorage.setItem(RATE_KEY, 'true');
    
    // Open app store
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/app/id123456789', // Replace with real ID
      android: 'https://play.google.com/store/apps/details?id=com.crossdial.puzzles',
      default: '',
    });
    
    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
    onClose();
  };

  const handleLater = async () => {
    // Don't show again for 3 days
    await AsyncStorage.setItem(RATE_LATER_KEY, String(Date.now()));
    onClose();
  };

  const handleNever = async () => {
    await AsyncStorage.setItem(RATE_KEY, 'declined');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modal,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.emoji}>⭐</Text>
          <Text style={styles.title}>Enjoying WonderWordQuest?</Text>
          <Text style={styles.subtitle}>
            You've completed {currentLevel} levels! Would you mind rating us?
          </Text>

          {/* Star Rating */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setSelectedStars(star)}
              >
                <Ionicons
                  name={star <= selectedStars ? 'star' : 'star-outline'}
                  size={36}
                  color={star <= selectedStars ? '#fbbf24' : '#4a5568'}
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Buttons */}
          <TouchableOpacity
            style={[
              styles.rateButton,
              selectedStars === 0 && styles.buttonDisabled,
            ]}
            onPress={handleRate}
            disabled={selectedStars === 0}
          >
            <Text style={styles.rateButtonText}>Rate Now</Text>
          </TouchableOpacity>

          <View style={styles.secondaryButtons}>
            <TouchableOpacity style={styles.laterButton} onPress={handleLater}>
              <Text style={styles.laterText}>Maybe Later</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.neverButton} onPress={handleNever}>
              <Text style={styles.neverText}>Don't Ask Again</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Helper to check if should show rate modal
export const shouldShowRateModal = async (level: number): Promise<boolean> => {
  try {
    const hasRated = await AsyncStorage.getItem(RATE_KEY);
    if (hasRated) return false;

    const laterTimestamp = await AsyncStorage.getItem(RATE_LATER_KEY);
    if (laterTimestamp) {
      const threeDays = 3 * 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(laterTimestamp) < threeDays) {
        return false;
      }
    }

    return level >= RATE_THRESHOLD_LEVEL && level % 10 === 0;
  } catch {
    return false;
  }
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
    padding: 30,
    marginHorizontal: 30,
    alignItems: 'center',
    maxWidth: 340,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  star: {
    marginHorizontal: 4,
  },
  rateButton: {
    backgroundColor: '#00b894',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  rateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButtons: {
    flexDirection: 'row',
  },
  laterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  laterText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  neverButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  neverText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 14,
  },
});

export default RateAppModal;
