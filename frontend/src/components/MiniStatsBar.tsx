import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MiniStatsBarProps {
  level: number;
  coins: number;
  streak: number;
  onSettingsPress?: () => void;
  onSoundToggle?: () => void;
  soundEnabled?: boolean;
}

const MiniStatsBar: React.FC<MiniStatsBarProps> = ({
  level,
  coins,
  streak,
  onSettingsPress,
  onSoundToggle,
  soundEnabled = true,
}) => {
  return (
    <View style={styles.container}>
      {/* Level Badge */}
      <View style={styles.statItem}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelNumber}>{level}</Text>
        </View>
        <Text style={styles.statLabel}>Level</Text>
      </View>

      {/* Coins */}
      <View style={styles.statItem}>
        <Text style={styles.coinIcon}>🪙</Text>
        <Text style={styles.coinValue}>{coins.toLocaleString()}</Text>
      </View>

      {/* Streak */}
      {streak > 0 && (
        <View style={styles.statItem}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakValue}>{streak}</Text>
        </View>
      )}

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Sound Toggle */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onSoundToggle}
      >
        <Ionicons
          name={soundEnabled ? 'volume-high' : 'volume-mute'}
          size={18}
          color={soundEnabled ? '#fff' : '#666'}
        />
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onSettingsPress}
      >
        <Ionicons name="settings-outline" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statItemInner: {
    marginRight: 4,
  },
  levelBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
  },
  coinIcon: {
    fontSize: 14,
  },
  coinValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  streakIcon: {
    fontSize: 14,
  },
  streakValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MiniStatsBar;
