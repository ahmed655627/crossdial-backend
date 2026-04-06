/**
 * Combos Modal
 * Shows combo system explanation and current streak
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ComboLevel {
  streak: number;
  multiplier: string;
  bonus: string;
  color: string;
}

const COMBO_LEVELS: ComboLevel[] = [
  { streak: 2, multiplier: '1.5x', bonus: '+5 coins', color: '#3498db' },
  { streak: 3, multiplier: '2x', bonus: '+10 coins', color: '#2ecc71' },
  { streak: 5, multiplier: '3x', bonus: '+20 coins', color: '#f39c12' },
  { streak: 7, multiplier: '4x', bonus: '+35 coins', color: '#e74c3c' },
  { streak: 10, multiplier: '5x', bonus: '+50 coins', color: '#9b59b6' },
];

interface CombosModalProps {
  visible: boolean;
  onClose: () => void;
  currentStreak: number;
  bestStreak: number;
}

export const CombosModal: React.FC<CombosModalProps> = ({
  visible,
  onClose,
  currentStreak,
  bestStreak,
}) => {
  const getCurrentMultiplier = () => {
    const level = [...COMBO_LEVELS].reverse().find(l => currentStreak >= l.streak);
    return level?.multiplier || '1x';
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#e74c3c', '#c0392b']}
            style={styles.header}
          >
            <Text style={styles.title}>🔥 Combo System</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{currentStreak}</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{getCurrentMultiplier()}</Text>
              <Text style={styles.statLabel}>Multiplier</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{bestStreak}</Text>
              <Text style={styles.statLabel}>Best Streak</Text>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>How Combos Work</Text>
            <Text style={styles.description}>
              Find words in succession without mistakes to build your combo! The higher your streak, the bigger your rewards.
            </Text>

            <Text style={styles.sectionTitle}>Combo Levels</Text>
            {COMBO_LEVELS.map((level, index) => (
              <View 
                key={level.streak} 
                style={[
                  styles.levelRow,
                  currentStreak >= level.streak && styles.levelRowActive
                ]}
              >
                <View style={[styles.levelBadge, { backgroundColor: level.color }]}>
                  <Text style={styles.levelStreak}>{level.streak}+</Text>
                </View>
                <View style={styles.levelInfo}>
                  <Text style={styles.levelMultiplier}>{level.multiplier} Points</Text>
                  <Text style={styles.levelBonus}>{level.bonus}</Text>
                </View>
                {currentStreak >= level.streak && (
                  <Ionicons name="checkmark-circle" size={24} color="#2ecc71" />
                )}
              </View>
            ))}

            <View style={styles.tipBox}>
              <Text style={styles.tipTitle}>💡 Pro Tip</Text>
              <Text style={styles.tipText}>
                Wrong guesses reset your combo! Think carefully before submitting each word.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 8,
  },
  levelRowActive: {
    backgroundColor: '#e8f8f5',
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  levelBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  levelStreak: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  levelInfo: {
    flex: 1,
  },
  levelMultiplier: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  levelBonus: {
    fontSize: 12,
    color: '#27ae60',
  },
  tipBox: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },
});

export default CombosModal;
