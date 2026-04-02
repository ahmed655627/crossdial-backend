import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export interface PowerUp {
  id: string;
  name: string;
  icon: string;
  description: string;
  cost: number;
  color: string[];
}

export const POWER_UPS: PowerUp[] = [
  {
    id: 'freeze',
    name: 'Time Freeze',
    icon: '❄️',
    description: 'Freeze the timer for 30 seconds',
    cost: 50,
    color: ['#00d4ff', '#0099cc'],
  },
  {
    id: 'reveal_row',
    name: 'Reveal Row',
    icon: '👁️',
    description: 'Reveal all letters in one row',
    cost: 75,
    color: ['#9b59b6', '#8e44ad'],
  },
  {
    id: 'auto_word',
    name: 'Auto Word',
    icon: '✨',
    description: 'Automatically complete one word',
    cost: 100,
    color: ['#f39c12', '#e67e22'],
  },
  {
    id: 'shuffle_plus',
    name: 'Super Shuffle',
    icon: '🔄',
    description: 'Shuffle and highlight a valid word',
    cost: 40,
    color: ['#2ecc71', '#27ae60'],
  },
  {
    id: 'bomb',
    name: 'Letter Bomb',
    icon: '💣',
    description: 'Remove wrong letters from wheel',
    cost: 60,
    color: ['#e74c3c', '#c0392b'],
  },
];

interface PowerUpsModalProps {
  visible: boolean;
  onClose: () => void;
  onUsePowerUp: (powerUp: PowerUp) => void;
  coins: number;
  ownedPowerUps: { [key: string]: number };
}

export const PowerUpsModal: React.FC<PowerUpsModalProps> = ({
  visible,
  onClose,
  onUsePowerUp,
  coins,
  ownedPowerUps,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>⚡ Power-Ups</Text>
            <View style={styles.coinBadge}>
              <Text style={styles.coinIcon}>🪙</Text>
              <Text style={styles.coinText}>{coins}</Text>
            </View>
          </View>

          <View style={styles.powerUpGrid}>
            {POWER_UPS.map((powerUp) => {
              const owned = ownedPowerUps[powerUp.id] || 0;
              const canAfford = coins >= powerUp.cost;

              return (
                <TouchableOpacity
                  key={powerUp.id}
                  style={styles.powerUpCard}
                  onPress={() => onUsePowerUp(powerUp)}
                  disabled={!canAfford && owned === 0}
                >
                  <LinearGradient
                    colors={powerUp.color}
                    style={styles.powerUpGradient}
                  >
                    <Text style={styles.powerUpIcon}>{powerUp.icon}</Text>
                    <Text style={styles.powerUpName}>{powerUp.name}</Text>
                    <Text style={styles.powerUpDesc}>{powerUp.description}</Text>
                    
                    {owned > 0 ? (
                      <View style={styles.ownedBadge}>
                        <Text style={styles.ownedText}>x{owned}</Text>
                      </View>
                    ) : (
                      <View style={[styles.costBadge, !canAfford && styles.disabled]}>
                        <Text style={styles.costIcon}>🪙</Text>
                        <Text style={styles.costText}>{powerUp.cost}</Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

interface PowerUpButtonProps {
  onPress: () => void;
  activePowerUp?: string | null;
}

export const PowerUpButton: React.FC<PowerUpButtonProps> = ({ onPress, activePowerUp }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <LinearGradient
        colors={['#9b59b6', '#8e44ad']}
        style={styles.floatingGradient}
      >
        <Text style={styles.floatingIcon}>⚡</Text>
        {activePowerUp && (
          <View style={styles.activeDot} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  coinIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  coinText: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  powerUpGrid: {
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
  powerUpGradient: {
    padding: 16,
    alignItems: 'center',
  },
  powerUpIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  powerUpName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  powerUpDesc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 8,
  },
  ownedBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ownedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  costBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  costIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  costText: {
    color: '#fff',
    fontWeight: 'bold',
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
    fontWeight: '600',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    zIndex: 50,
  },
  floatingGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9b59b6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingIcon: {
    fontSize: 28,
  },
  activeDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default PowerUpsModal;
