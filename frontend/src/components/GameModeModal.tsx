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
import { GameMode, GAME_MODES, GameModeConfig } from '../data/gameModes';

const { width } = Dimensions.get('window');

interface GameModeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMode: (mode: GameMode) => void;
  currentMode: GameMode;
}

export const GameModeModal: React.FC<GameModeModalProps> = ({
  visible,
  onClose,
  onSelectMode,
  currentMode,
}) => {
  const modes = Object.values(GAME_MODES);

  const handleSelectMode = (mode: GameMode) => {
    onSelectMode(mode);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Select Game Mode</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Mode Options */}
            <View style={styles.modesContainer}>
              {modes.map((mode) => (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.modeCard,
                    currentMode === mode.id && styles.modeCardSelected,
                  ]}
                  onPress={() => handleSelectMode(mode.id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={mode.backgroundColor}
                    style={styles.modeGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.modeIcon}>{mode.icon}</Text>
                    <View style={styles.modeInfo}>
                      <Text style={styles.modeName}>{mode.name}</Text>
                      <Text style={styles.modeDesc}>{mode.description}</Text>
                    </View>
                    {mode.hasTimer && (
                      <View style={styles.timerBadge}>
                        <Ionicons name="timer" size={14} color="#fff" />
                        <Text style={styles.timerText}>{mode.defaultTime}s</Text>
                      </View>
                    )}
                    {mode.bonusMultiplier > 1 && (
                      <View style={styles.bonusBadge}>
                        <Text style={styles.bonusText}>{mode.bonusMultiplier}x</Text>
                      </View>
                    )}
                    {currentMode === mode.id && (
                      <View style={styles.selectedBadge}>
                        <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width - 40,
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modesContainer: {
    gap: 12,
  },
  modeCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modeCardSelected: {
    borderColor: '#10b981',
  },
  modeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  modeIcon: {
    fontSize: 32,
  },
  modeInfo: {
    flex: 1,
  },
  modeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  modeDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  timerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  bonusBadge: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  bonusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default GameModeModal;
