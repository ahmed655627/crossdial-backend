/**
 * Celebrations Modal
 * Settings for victory effects and animations
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface CelebrationsModalProps {
  visible: boolean;
  onClose: () => void;
  confettiEnabled: boolean;
  screenShakeEnabled: boolean;
  particlesEnabled: boolean;
  onToggleConfetti: (enabled: boolean) => void;
  onToggleScreenShake: (enabled: boolean) => void;
  onToggleParticles: (enabled: boolean) => void;
}

export const CelebrationsModal: React.FC<CelebrationsModalProps> = ({
  visible,
  onClose,
  confettiEnabled,
  screenShakeEnabled,
  particlesEnabled,
  onToggleConfetti,
  onToggleScreenShake,
  onToggleParticles,
}) => {
  const SettingRow = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
    color,
  }: {
    icon: string;
    title: string;
    subtitle: string;
    value: boolean;
    onValueChange: (val: boolean) => void;
    color: string;
  }) => (
    <View style={styles.settingRow}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Text style={styles.settingIcon}>{icon}</Text>
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#ddd', true: color + '80' }}
        thumbColor={value ? color : '#f4f3f4'}
      />
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#f1c40f', '#f39c12']}
            style={styles.header}
          >
            <Text style={styles.title}>🎉 Celebrations</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.content}>
            <Text style={styles.description}>
              Customize your victory celebrations! These effects play when you complete levels or find bonus words.
            </Text>

            <SettingRow
              icon="🎊"
              title="Confetti"
              subtitle="Colorful confetti on level complete"
              value={confettiEnabled}
              onValueChange={onToggleConfetti}
              color="#e74c3c"
            />

            <SettingRow
              icon="📳"
              title="Screen Shake"
              subtitle="Shake effect on big wins"
              value={screenShakeEnabled}
              onValueChange={onToggleScreenShake}
              color="#9b59b6"
            />

            <SettingRow
              icon="✨"
              title="Particle Effects"
              subtitle="Sparkles and glow effects"
              value={particlesEnabled}
              onValueChange={onToggleParticles}
              color="#f1c40f"
            />

            <View style={styles.previewBox}>
              <Text style={styles.previewTitle}>Preview</Text>
              <View style={styles.previewContent}>
                <Text style={styles.previewEmoji}>
                  {confettiEnabled ? '🎊' : ''}
                  {particlesEnabled ? '✨' : ''}
                  🏆
                  {particlesEnabled ? '✨' : ''}
                  {confettiEnabled ? '🎉' : ''}
                </Text>
                <Text style={styles.previewText}>Level Complete!</Text>
              </View>
            </View>
          </View>
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
  content: {
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 2,
  },
  previewBox: {
    backgroundColor: '#2c3e50',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 10,
  },
  previewContent: {
    alignItems: 'center',
  },
  previewEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  previewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default CelebrationsModal;
