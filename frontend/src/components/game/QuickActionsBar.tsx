import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface QuickActionsBarProps {
  onShuffle: () => void;
  onHint: () => void;
  onUndo: () => void;
  onPowerUps: () => void;
  hintsAvailable: number;
  canUndo: boolean;
}

export const QuickActionsBar: React.FC<QuickActionsBarProps> = ({
  onShuffle,
  onHint,
  onUndo,
  onPowerUps,
  hintsAvailable,
  canUndo,
}) => {
  return (
    <View style={styles.container}>
      {/* Shuffle */}
      <TouchableOpacity style={styles.actionButton} onPress={onShuffle}>
        <LinearGradient
          colors={['rgba(52, 152, 219, 0.3)', 'rgba(41, 128, 185, 0.3)']}
          style={styles.buttonGradient}
        >
          <Ionicons name="shuffle" size={22} color="#3498db" />
        </LinearGradient>
        <Text style={styles.actionLabel}>Shuffle</Text>
      </TouchableOpacity>

      {/* Hint */}
      <TouchableOpacity style={styles.actionButton} onPress={onHint}>
        <LinearGradient
          colors={['rgba(241, 196, 15, 0.3)', 'rgba(243, 156, 18, 0.3)']}
          style={styles.buttonGradient}
        >
          <Ionicons name="bulb" size={22} color="#f39c12" />
          {hintsAvailable > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{hintsAvailable}</Text>
            </View>
          )}
        </LinearGradient>
        <Text style={styles.actionLabel}>Hint</Text>
      </TouchableOpacity>

      {/* Undo */}
      <TouchableOpacity
        style={[styles.actionButton, !canUndo && styles.disabledButton]}
        onPress={onUndo}
        disabled={!canUndo}
      >
        <LinearGradient
          colors={canUndo ? ['rgba(155, 89, 182, 0.3)', 'rgba(142, 68, 173, 0.3)'] : ['rgba(100,100,100,0.2)', 'rgba(100,100,100,0.2)']}
          style={styles.buttonGradient}
        >
          <Ionicons name="arrow-undo" size={22} color={canUndo ? '#9b59b6' : '#666'} />
        </LinearGradient>
        <Text style={[styles.actionLabel, !canUndo && styles.disabledLabel]}>Undo</Text>
      </TouchableOpacity>

      {/* Power-ups */}
      <TouchableOpacity style={styles.actionButton} onPress={onPowerUps}>
        <LinearGradient
          colors={['rgba(231, 76, 60, 0.3)', 'rgba(192, 57, 43, 0.3)']}
          style={styles.buttonGradient}
        >
          <Ionicons name="flash" size={22} color="#e74c3c" />
        </LinearGradient>
        <Text style={styles.actionLabel}>Power</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    gap: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  buttonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  actionLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#e74c3c',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
