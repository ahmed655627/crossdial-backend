/**
 * Music Settings Modal
 * Toggle background music and sound effects
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

interface MusicModalProps {
  visible: boolean;
  onClose: () => void;
  musicEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  onToggleMusic: (enabled: boolean) => void;
  onToggleSound: (enabled: boolean) => void;
  onToggleVibration: (enabled: boolean) => void;
}

export const MusicModal: React.FC<MusicModalProps> = ({
  visible,
  onClose,
  musicEnabled,
  soundEnabled,
  vibrationEnabled,
  onToggleMusic,
  onToggleSound,
  onToggleVibration,
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
            colors={['#e91e63', '#c2185b']}
            style={styles.header}
          >
            <Text style={styles.title}>🎵 Sound Settings</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.content}>
            <SettingRow
              icon="🎵"
              title="Background Music"
              subtitle="Play ambient music while playing"
              value={musicEnabled}
              onValueChange={onToggleMusic}
              color="#e91e63"
            />

            <SettingRow
              icon="🔊"
              title="Sound Effects"
              subtitle="Clicks, success, and error sounds"
              value={soundEnabled}
              onValueChange={onToggleSound}
              color="#3498db"
            />

            <SettingRow
              icon="📳"
              title="Vibration"
              subtitle="Haptic feedback on actions"
              value={vibrationEnabled}
              onValueChange={onToggleVibration}
              color="#9b59b6"
            />

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>🎧 Audio Tips</Text>
              <Text style={styles.infoText}>
                • Music creates a relaxing atmosphere{"\n"}
                • Sound effects help with feedback{"\n"}
                • Vibration provides tactile response
              </Text>
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
  infoBox: {
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});

export default MusicModal;
