import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export interface MusicTheme {
  id: string;
  name: string;
  icon: string;
  description: string;
  wonderId: string;
  color: string[];
}

export const MUSIC_THEMES: MusicTheme[] = [
  {
    id: 'pyramid',
    name: 'Egyptian Mystique',
    icon: '🎺',
    description: 'Ancient melodies of the Nile',
    wonderId: 'pyramid',
    color: ['#d4a574', '#a67c52'],
  },
  {
    id: 'gardens',
    name: 'Garden Serenity',
    icon: '🎶',
    description: 'Peaceful nature sounds',
    wonderId: 'gardens',
    color: ['#228b22', '#32cd32'],
  },
  {
    id: 'colossus',
    name: 'Greek Epic',
    icon: '🎻',
    description: 'Heroic orchestral themes',
    wonderId: 'colossus',
    color: ['#cd7f32', '#8b4513'],
  },
  {
    id: 'lighthouse',
    name: 'Ocean Waves',
    icon: '🌊',
    description: 'Calming sea sounds',
    wonderId: 'lighthouse',
    color: ['#4169e1', '#87ceeb'],
  },
  {
    id: 'ambient',
    name: 'Focus Mode',
    icon: '🧠',
    description: 'Concentration-boosting ambient',
    wonderId: 'any',
    color: ['#8b5cf6', '#a855f7'],
  },
  {
    id: 'silent',
    name: 'Silent Mode',
    icon: '🔇',
    description: 'No background music',
    wonderId: 'any',
    color: ['#6b7280', '#4b5563'],
  },
];

interface MusicThemeModalProps {
  visible: boolean;
  onClose: () => void;
  currentTheme: string;
  onSelectTheme: (theme: MusicTheme) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const MusicThemeModal: React.FC<MusicThemeModalProps> = ({
  visible,
  onClose,
  currentTheme,
  onSelectTheme,
  volume,
  onVolumeChange,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>🎵 Background Music</Text>
          </View>

          {/* Volume Control */}
          <View style={styles.volumeSection}>
            <Text style={styles.volumeLabel}>Volume</Text>
            <View style={styles.volumeRow}>
              <TouchableOpacity onPress={() => onVolumeChange(Math.max(0, volume - 0.1))}>
                <Text style={styles.volumeButton}>🔉</Text>
              </TouchableOpacity>
              <View style={styles.volumeBar}>
                <View style={[styles.volumeFill, { width: `${volume * 100}%` }]} />
              </View>
              <TouchableOpacity onPress={() => onVolumeChange(Math.min(1, volume + 0.1))}>
                <Text style={styles.volumeButton}>🔊</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Theme Selection */}
          <View style={styles.themesGrid}>
            {MUSIC_THEMES.map((theme) => {
              const isActive = currentTheme === theme.id;

              return (
                <TouchableOpacity
                  key={theme.id}
                  style={styles.themeCard}
                  onPress={() => onSelectTheme(theme)}
                >
                  <LinearGradient
                    colors={theme.color}
                    style={[
                      styles.themeGradient,
                      isActive && styles.themeActive,
                    ]}
                  >
                    <Text style={styles.themeIcon}>{theme.icon}</Text>
                    <Text style={styles.themeName}>{theme.name}</Text>
                    <Text style={styles.themeDesc}>{theme.description}</Text>
                    {isActive && (
                      <View style={styles.playingIndicator}>
                        <Text style={styles.playingIcon}>▶</Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Music Player Hook
export const useMusicPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('silent');
  const [volume, setVolume] = useState(0.5);

  const playTheme = async (themeId: string) => {
    // Stop current sound
    if (sound) {
      await sound.unloadAsync();
    }

    if (themeId === 'silent') {
      setCurrentTheme('silent');
      setIsPlaying(false);
      return;
    }

    // In production, load actual audio files
    // const { sound: newSound } = await Audio.Sound.createAsync(
    //   require(`./assets/music/${themeId}.mp3`)
    // );
    // setSound(newSound);
    // await newSound.setIsLoopingAsync(true);
    // await newSound.setVolumeAsync(volume);
    // await newSound.playAsync();

    setCurrentTheme(themeId);
    setIsPlaying(true);
  };

  const setMusicVolume = async (newVolume: number) => {
    setVolume(newVolume);
    if (sound) {
      await sound.setVolumeAsync(newVolume);
    }
  };

  const cleanup = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
  };

  return {
    playTheme,
    setMusicVolume,
    cleanup,
    isPlaying,
    currentTheme,
    volume,
  };
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  volumeSection: {
    marginBottom: 20,
  },
  volumeLabel: {
    color: '#9ca3af',
    marginBottom: 8,
  },
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  volumeButton: {
    fontSize: 24,
  },
  volumeBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  volumeFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
  },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  themeGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
  },
  themeActive: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  themeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  themeName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  themeDesc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
  playingIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#22c55e',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playingIcon: {
    color: '#fff',
    fontSize: 10,
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  closeText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MusicThemeModal;
