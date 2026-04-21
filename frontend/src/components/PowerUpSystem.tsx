import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface PowerUp {
  id: string;
  name: string;
  icon: string;
  description: string;
  cost: number;
  color: string[];
}

const POWER_UPS: PowerUp[] = [
  {
    id: 'bomb',
    name: 'Bomb',
    icon: '💣',
    description: 'Reveals a random letter on the grid',
    cost: 30,
    color: ['#FF6B6B', '#EE5A5A'],
  },
  {
    id: 'magnifier',
    name: 'Magnifier',
    icon: '🔍',
    description: 'Highlights one word position',
    cost: 25,
    color: ['#4ECDC4', '#3DBDB5'],
  },
  {
    id: 'timeFreeze',
    name: 'Time Freeze',
    icon: '⏰',
    description: 'Pauses timer for 30 seconds',
    cost: 40,
    color: ['#45B7D1', '#34A7C1'],
  },
  {
    id: 'doubleCoins',
    name: 'Double Coins',
    icon: '💫',
    description: '2x coins for next 3 words',
    cost: 50,
    color: ['#FFE66D', '#FFD633'],
  },
];

interface PowerUpSystemProps {
  visible: boolean;
  onClose: () => void;
  coins: number;
  onUsePowerUp: (powerUpId: string) => void;
}

export const PowerUpSystem: React.FC<PowerUpSystemProps> = ({
  visible,
  onClose,
  coins,
  onUsePowerUp,
}) => {
  const [selectedPowerUp, setSelectedPowerUp] = useState<string | null>(null);

  const handleUsePowerUp = (powerUp: PowerUp) => {
    if (coins >= powerUp.cost) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onUsePowerUp(powerUp.id);
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
              <Text style={styles.title}>⚡ Power-Ups</Text>
              <View style={styles.coinDisplay}>
                <Text style={styles.coinIcon}>🪙</Text>
                <Text style={styles.coinText}>{coins}</Text>
              </View>
            </View>

            {/* Power-ups Grid */}
            <View style={styles.powerUpsGrid}>
              {POWER_UPS.map((powerUp) => {
                const canAfford = coins >= powerUp.cost;
                return (
                  <TouchableOpacity
                    key={powerUp.id}
                    style={[styles.powerUpCard, !canAfford && styles.powerUpDisabled]}
                    onPress={() => handleUsePowerUp(powerUp)}
                    activeOpacity={canAfford ? 0.8 : 1}
                  >
                    <LinearGradient
                      colors={canAfford ? powerUp.color : ['#444', '#333']}
                      style={styles.powerUpGradient}
                    >
                      <Text style={styles.powerUpIcon}>{powerUp.icon}</Text>
                      <Text style={styles.powerUpName}>{powerUp.name}</Text>
                      <Text style={styles.powerUpDesc}>{powerUp.description}</Text>
                      <View style={styles.costBadge}>
                        <Text style={styles.costIcon}>🪙</Text>
                        <Text style={[styles.costText, !canAfford && styles.costTextRed]}>
                          {powerUp.cost}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
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
    width: width * 0.9,
    maxWidth: 400,
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
  coinDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  coinIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  coinText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFD700',
  },
  powerUpsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  powerUpCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  powerUpDisabled: {
    opacity: 0.6,
  },
  powerUpGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 140,
  },
  powerUpIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  powerUpName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  powerUpDesc: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 8,
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
  costTextRed: {
    color: '#FF6B6B',
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PowerUpSystem;
