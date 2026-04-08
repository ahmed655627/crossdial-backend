import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LevelTheme } from '../../data/levelThemes';

interface GameHeaderProps {
  levelId: number;
  coins: number;
  hints: number;
  canSpin: boolean;
  soundEnabled: boolean;
  theme?: LevelTheme;
  onHome: () => void;
  onLevelSelect: () => void;
  onAchievements: () => void;
  onLeaderboard: () => void;
  onDailyWheel: () => void;
  onMenu: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  levelId,
  coins,
  hints,
  canSpin,
  soundEnabled,
  theme,
  onHome,
  onLevelSelect,
  onAchievements,
  onLeaderboard,
  onDailyWheel,
  onMenu,
}) => {
  const themeColor = theme?.primaryColor || '#4fc3f7';

  return (
    <View style={styles.header}>
      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={onHome}>
        <LinearGradient
          colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
          style={styles.buttonGradient}
        >
          <Ionicons name="home" size={22} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Level Button */}
      <TouchableOpacity style={styles.levelButton} onPress={onLevelSelect}>
        <LinearGradient
          colors={[themeColor + '40', themeColor + '20']}
          style={styles.levelGradient}
        >
          <Ionicons name="map" size={18} color="#fff" />
          <Text style={styles.levelText}>Level {levelId}</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.headerRight}>
        {/* Achievements */}
        <TouchableOpacity style={styles.iconButton} onPress={onAchievements}>
          <Ionicons name="medal" size={20} color="#f39c12" />
        </TouchableOpacity>

        {/* Leaderboard */}
        <TouchableOpacity style={styles.iconButton} onPress={onLeaderboard}>
          <Ionicons name="trophy" size={20} color="#FFD700" />
        </TouchableOpacity>

        {/* Daily Wheel */}
        <TouchableOpacity
          style={[styles.iconButton, canSpin && styles.iconButtonGlow]}
          onPress={onDailyWheel}
        >
          <Ionicons name="gift" size={20} color={canSpin ? '#FFD700' : '#fff'} />
          {canSpin && <View style={styles.notificationDot} />}
        </TouchableOpacity>

        {/* Menu */}
        <TouchableOpacity style={styles.iconButton} onPress={onMenu}>
          <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Coins */}
        <View style={styles.coinContainer}>
          <Ionicons name="diamond" size={16} color="#FFD700" />
          <Text style={styles.coinText}>{coins}</Text>
        </View>

        {/* Hints */}
        <View style={styles.hintContainer}>
          <Ionicons name="bulb" size={16} color="#9b59b6" />
          <Text style={styles.hintText}>{hints}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? 35 : 5,
    paddingBottom: 8,
  },
  homeButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  levelGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    // gap: 6, // REMOVED
  },
  levelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 6, // REMOVED
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonGlow: {
    backgroundColor: 'rgba(255, 215, 0, 0.25)',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e74c3c',
    borderWidth: 1.5,
    borderColor: '#1a1a2e',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    // gap: 4, // REMOVED
  },
  coinText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: 'bold',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(155, 89, 182, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    // gap: 4, // REMOVED
  },
  hintText: {
    color: '#9b59b6',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
