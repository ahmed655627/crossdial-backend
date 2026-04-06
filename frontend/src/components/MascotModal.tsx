/**
 * Mascot Selection Modal
 * Choose your game buddy
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

interface Mascot {
  id: string;
  emoji: string;
  name: string;
  personality: string;
  unlockLevel: number;
  color: string;
}

const MASCOTS: Mascot[] = [
  { id: 'owl', emoji: '🦉', name: 'Owlbert', personality: 'Wise & Helpful', unlockLevel: 1, color: '#8e44ad' },
  { id: 'fox', emoji: '🦊', name: 'Foxy', personality: 'Quick & Clever', unlockLevel: 5, color: '#e67e22' },
  { id: 'panda', emoji: '🐼', name: 'Pandy', personality: 'Calm & Friendly', unlockLevel: 10, color: '#2c3e50' },
  { id: 'lion', emoji: '🦁', name: 'Leo', personality: 'Brave & Strong', unlockLevel: 20, color: '#f39c12' },
  { id: 'dragon', emoji: '🐲', name: 'Draco', personality: 'Fierce & Loyal', unlockLevel: 30, color: '#27ae60' },
  { id: 'unicorn', emoji: '🦄', name: 'Sparkle', personality: 'Magical & Kind', unlockLevel: 50, color: '#e91e63' },
];

interface MascotModalProps {
  visible: boolean;
  onClose: () => void;
  currentMascot: string;
  currentLevel: number;
  onSelectMascot: (mascotId: string) => void;
}

export const MascotModal: React.FC<MascotModalProps> = ({
  visible,
  onClose,
  currentMascot,
  currentLevel,
  onSelectMascot,
}) => {
  const currentMascotData = MASCOTS.find(m => m.id === currentMascot) || MASCOTS[0];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#8e44ad', '#9b59b6']}
            style={styles.header}
          >
            <Text style={styles.title}>🦉 Choose Mascot</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Current Mascot */}
          <View style={styles.currentSection}>
            <View style={[styles.currentMascot, { backgroundColor: currentMascotData.color }]}>
              <Text style={styles.currentEmoji}>{currentMascotData.emoji}</Text>
            </View>
            <Text style={styles.currentName}>{currentMascotData.name}</Text>
            <Text style={styles.currentPersonality}>{currentMascotData.personality}</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Available Mascots</Text>
            <View style={styles.grid}>
              {MASCOTS.map((mascot) => {
                const isUnlocked = currentLevel >= mascot.unlockLevel;
                const isSelected = currentMascot === mascot.id;

                return (
                  <TouchableOpacity
                    key={mascot.id}
                    style={[
                      styles.mascotCard,
                      isSelected && styles.selectedCard,
                      !isUnlocked && styles.lockedCard,
                    ]}
                    onPress={() => isUnlocked && onSelectMascot(mascot.id)}
                    disabled={!isUnlocked}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.mascotIcon, { backgroundColor: isUnlocked ? mascot.color : '#bdc3c7' }]}>
                      <Text style={styles.mascotEmoji}>
                        {isUnlocked ? mascot.emoji : '🔒'}
                      </Text>
                    </View>
                    <Text style={[styles.mascotName, !isUnlocked && styles.lockedText]}>
                      {mascot.name}
                    </Text>
                    {!isUnlocked && (
                      <Text style={styles.unlockText}>Lvl {mascot.unlockLevel}</Text>
                    )}
                    {isSelected && (
                      <View style={styles.selectedBadge}>
                        <Ionicons name="checkmark" size={12} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>💡 About Mascots</Text>
              <Text style={styles.infoText}>
                Your mascot appears during gameplay to cheer you on! Unlock more mascots by completing levels.
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
  currentSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
  },
  currentMascot: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  currentEmoji: {
    fontSize: 40,
  },
  currentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  currentPersonality: {
    fontSize: 14,
    color: '#95a5a6',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mascotCard: {
    width: (width - 60) / 3,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  selectedCard: {
    borderColor: '#667eea',
    backgroundColor: '#f0f4ff',
  },
  lockedCard: {
    opacity: 0.6,
  },
  mascotIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  mascotEmoji: {
    fontSize: 24,
  },
  mascotName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  lockedText: {
    color: '#95a5a6',
  },
  unlockText: {
    fontSize: 10,
    color: '#e74c3c',
    marginTop: 2,
  },
  selectedBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox: {
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
  },
});

export default MascotModal;
