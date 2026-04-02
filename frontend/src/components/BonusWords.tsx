import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
} from 'react-native';

interface BonusWordsProps {
  levelWords: string[];
  foundBonusWords: string[];
  onBonusWordFound: (word: string, coins: number) => void;
}

// Generate bonus words that can be made from level letters
const BONUS_WORD_LISTS: { [key: number]: string[] } = {
  3: ['ace', 'ice', 'tea', 'sea', 'bee', 'see', 'fee', 'pea'],
  4: ['able', 'area', 'back', 'ball', 'bank', 'base', 'bear', 'beat'],
  5: ['about', 'above', 'abuse', 'actor', 'acute', 'admit', 'adopt', 'adult'],
};

export const BonusWordNotification: React.FC<{
  word: string;
  coins: number;
  visible: boolean;
}> = ({ word, coins, visible }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 20,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, 2000);
    }
  }, [visible, word]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.notification,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <Text style={styles.notificationIcon}>🎁</Text>
      <View>
        <Text style={styles.notificationTitle}>Bonus Word!</Text>
        <Text style={styles.notificationWord}>{word.toUpperCase()}</Text>
      </View>
      <Text style={styles.notificationCoins}>+{coins} 🪙</Text>
    </Animated.View>
  );
};

export const BonusWordsModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  foundWords: string[];
  totalPossible: number;
}> = ({ visible, onClose, foundWords, totalPossible }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>🎁 Bonus Words</Text>
            <Text style={styles.subtitle}>
              {foundWords.length} / {totalPossible} found
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(foundWords.length / totalPossible) * 100}%` },
              ]}
            />
          </View>

          <ScrollView style={styles.wordList}>
            <View style={styles.wordGrid}>
              {foundWords.map((word, index) => (
                <View key={index} style={styles.wordChip}>
                  <Text style={styles.wordText}>{word.toUpperCase()}</Text>
                </View>
              ))}
            </View>
            {foundWords.length === 0 && (
              <Text style={styles.emptyText}>
                Find words not in the puzzle for bonus coins!
              </Text>
            )}
          </ScrollView>

          <View style={styles.rewardInfo}>
            <Text style={styles.rewardText}>🪙 +10 coins per bonus word</Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const BonusWordsButton: React.FC<{
  count: number;
  onPress: () => void;
}> = ({ count, onPress }) => {
  return (
    <TouchableOpacity style={styles.bonusButton} onPress={onPress}>
      <Text style={styles.bonusIcon}>🎁</Text>
      {count > 0 && (
        <View style={styles.bonusBadge}>
          <Text style={styles.bonusBadgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    backgroundColor: '#22c55e',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  notificationIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  notificationTitle: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
  notificationWord: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationCoins: {
    marginLeft: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 20,
    maxHeight: '70%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  wordList: {
    maxHeight: 200,
  },
  wordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordChip: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  wordText: {
    color: '#22c55e',
    fontWeight: '600',
  },
  emptyText: {
    color: '#9ca3af',
    textAlign: 'center',
    padding: 20,
  },
  rewardInfo: {
    backgroundColor: 'rgba(255,215,0,0.1)',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  rewardText: {
    color: '#ffd700',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  bonusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bonusIcon: {
    fontSize: 24,
  },
  bonusBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#22c55e',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bonusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BonusWordsModal;
