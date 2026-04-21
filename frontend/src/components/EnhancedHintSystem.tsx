import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface HintOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  color: string[];
}

const HINT_OPTIONS: HintOption[] = [
  {
    id: 'single_letter',
    name: 'Reveal Letter',
    description: 'Shows one letter in a random word',
    icon: '💡',
    cost: 20,
    color: ['#4ECDC4', '#45B7D1'],
  },
  {
    id: 'word_outline',
    name: 'Word Outline',
    description: 'Highlights a word position on the grid',
    icon: '🔍',
    cost: 35,
    color: ['#FFE66D', '#F7DC6F'],
  },
  {
    id: 'full_word',
    name: 'Full Word',
    description: 'Reveals an entire word instantly',
    icon: '📝',
    cost: 75,
    color: ['#FF6B6B', '#EE5A5A'],
  },
  {
    id: 'word_meaning',
    name: 'Word Meaning',
    description: 'Shows a clue about one of the words',
    icon: '🔮',
    cost: 15,
    color: ['#A29BFE', '#8B82FD'],
  },
];

interface EnhancedHintSystemProps {
  visible: boolean;
  onClose: () => void;
  coins: number;
  hints: number;
  onUseHint: (hintType: string, cost: number) => void;
  onWatchAd: () => void;
}

export const EnhancedHintSystem: React.FC<EnhancedHintSystemProps> = ({
  visible,
  onClose,
  coins,
  hints,
  onUseHint,
  onWatchAd,
}) => {
  const [selectedHint, setSelectedHint] = useState<string | null>(null);

  const handleUseHint = (hint: HintOption) => {
    if (coins >= hint.cost || hints > 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onUseHint(hint.id, hints > 0 ? 0 : hint.cost);
      onClose();
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#1a1a3e', '#2d2d5a', '#1a1a3e']}
            style={styles.content}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>💡 Hints</Text>
              <View style={styles.balances}>
                <View style={styles.balanceItem}>
                  <Text style={styles.balanceIcon}>🪙</Text>
                  <Text style={styles.balanceText}>{coins}</Text>
                </View>
                <View style={styles.balanceItem}>
                  <Text style={styles.balanceIcon}>💡</Text>
                  <Text style={styles.balanceText}>{hints}</Text>
                </View>
              </View>
            </View>

            {/* Hint Options */}
            <View style={styles.hintsGrid}>
              {HINT_OPTIONS.map((hint) => {
                const canAfford = coins >= hint.cost || hints > 0;
                return (
                  <TouchableOpacity
                    key={hint.id}
                    style={[styles.hintCard, !canAfford && styles.hintDisabled]}
                    onPress={() => handleUseHint(hint)}
                    activeOpacity={canAfford ? 0.8 : 1}
                  >
                    <LinearGradient
                      colors={canAfford ? hint.color : ['#333', '#222']}
                      style={styles.hintGradient}
                    >
                      <Text style={styles.hintIcon}>{hint.icon}</Text>
                      <Text style={styles.hintName}>{hint.name}</Text>
                      <Text style={styles.hintDesc}>{hint.description}</Text>
                      <View style={styles.costBadge}>
                        <Text style={styles.costIcon}>🪙</Text>
                        <Text style={[styles.costText, !canAfford && styles.costRed]}>
                          {hints > 0 ? 'FREE' : hint.cost}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Free Hints Section */}
            <View style={styles.freeSection}>
              <Text style={styles.freeSectionTitle}>Need more hints?</Text>
              <TouchableOpacity style={styles.watchAdBtn} onPress={onWatchAd}>
                <LinearGradient
                  colors={['#4ECDC4', '#45B7D1']}
                  style={styles.watchAdGradient}
                >
                  <Text style={styles.watchAdIcon}>🎬</Text>
                  <Text style={styles.watchAdText}>Watch Ad for Free Hint</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
  container: {
    width: width * 0.92,
    maxWidth: 420,
  },
  content: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  balances: {
    flexDirection: 'row',
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 8,
  },
  balanceIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  balanceText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  hintsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  hintCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  hintDisabled: {
    opacity: 0.6,
  },
  hintGradient: {
    padding: 14,
    alignItems: 'center',
    minHeight: 130,
  },
  hintIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  hintName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  hintDesc: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 14,
  },
  costBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  costIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  costText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  costRed: {
    color: '#FF6B6B',
  },
  freeSection: {
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  freeSectionTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 12,
  },
  watchAdBtn: {
    width: '100%',
  },
  watchAdGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 25,
  },
  watchAdIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  watchAdText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  closeBtn: {
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EnhancedHintSystem;
