/**
 * Power-Ups Modal
 * Shows available power-ups that players can use
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface PowerUp {
  id: string;
  name: string;
  icon: string;
  description: string;
  cost: number;
  color: string;
}

const POWER_UPS: PowerUp[] = [
  { id: 'reveal_letter', name: 'Reveal Letter', icon: '🔤', description: 'Reveals one letter in the grid', cost: 50, color: '#3498db' },
  { id: 'reveal_word', name: 'Reveal Word', icon: '📝', description: 'Reveals an entire word', cost: 150, color: '#9b59b6' },
  { id: 'shuffle_bonus', name: 'Super Shuffle', icon: '🔀', description: 'Shuffle + reveal hint', cost: 30, color: '#e67e22' },
  { id: 'time_freeze', name: 'Time Freeze', icon: '⏸️', description: 'Pause timer for 30 seconds', cost: 40, color: '#1abc9c' },
  { id: 'double_coins', name: '2X Coins', icon: '💰', description: 'Double coins for next word', cost: 25, color: '#f1c40f' },
  { id: 'hint_boost', name: 'Hint Boost', icon: '💡', description: 'Get 3 hints instantly', cost: 100, color: '#e74c3c' },
];

interface PowerUpsModalProps {
  visible: boolean;
  onClose: () => void;
  coins: number;
  onUsePowerUp: (powerUpId: string, cost: number) => void;
}

export const PowerUpsModal: React.FC<PowerUpsModalProps> = ({
  visible,
  onClose,
  coins,
  onUsePowerUp,
}) => {
  const handleUsePowerUp = (powerUp: PowerUp) => {
    if (coins >= powerUp.cost) {
      Alert.alert(
        'Use Power-Up',
        `Use ${powerUp.name} for ${powerUp.cost} coins?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Use',
            onPress: () => {
              onUsePowerUp(powerUp.id, powerUp.cost);
              onClose();
            },
          },
        ]
      );
    } else {
      Alert.alert('Not Enough Coins', `You need ${powerUp.cost - coins} more coins.`);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.header}
          >
            <Text style={styles.title}>⚡ Power-Ups</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.coinsBar}>
            <Ionicons name="diamond" size={20} color="#FFD700" />
            <Text style={styles.coinsText}>{coins} Coins</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              {POWER_UPS.map((powerUp) => (
                <TouchableOpacity
                  key={powerUp.id}
                  style={styles.powerUpCard}
                  onPress={() => handleUsePowerUp(powerUp)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.iconContainer, { backgroundColor: powerUp.color }]}>
                    <Text style={styles.powerUpIcon}>{powerUp.icon}</Text>
                  </View>
                  <Text style={styles.powerUpName}>{powerUp.name}</Text>
                  <Text style={styles.powerUpDesc}>{powerUp.description}</Text>
                  <View style={styles.costBadge}>
                    <Ionicons name="diamond" size={12} color="#FFD700" />
                    <Text style={styles.costText}>{powerUp.cost}</Text>
                  </View>
                </TouchableOpacity>
              ))}
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
    maxHeight: '80%',
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
  coinsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    // gap: 8, // REMOVED
  },
  coinsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  content: {
    padding: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  powerUpCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  powerUpIcon: {
    fontSize: 28,
  },
  powerUpName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  powerUpDesc: {
    fontSize: 11,
    color: '#95a5a6',
    textAlign: 'center',
    marginBottom: 8,
  },
  costBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    // gap: 4, // REMOVED
  },
  costText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default PowerUpsModal;
