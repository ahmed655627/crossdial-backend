import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface PauseMenuProps {
  visible: boolean;
  onClose: () => void;
  onResume: () => void;
  onHome: () => void;
  onShop: () => void;
  onAchievements: () => void;
  onSettings: () => void;
  onShuffle: () => void;
  onHint: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  focusMode: boolean;
  onToggleFocusMode: (value: boolean) => void;
  coins: number;
  hints: number;
  currentLevel: number;
}

const PauseMenu: React.FC<PauseMenuProps> = ({
  visible,
  onClose,
  onResume,
  onHome,
  onShop,
  onAchievements,
  onSettings,
  onShuffle,
  onHint,
  soundEnabled,
  onToggleSound,
  focusMode,
  onToggleFocusMode,
  coins,
  hints,
  currentLevel,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.menuContainer}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f0f23']}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.pauseTitle}>⏸️ Paused</Text>
              <Text style={styles.levelText}>Level {currentLevel}</Text>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>💎</Text>
                <Text style={styles.statValue}>{coins}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>💡</Text>
                <Text style={styles.statValue}>{hints}</Text>
              </View>
            </View>

            {/* Main Actions */}
            <TouchableOpacity style={styles.resumeButton} onPress={onResume}>
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.resumeGradient}
              >
                <Ionicons name="play" size={24} color="#fff" />
                <Text style={styles.resumeText}>Resume</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Quick Tools */}
            <View style={styles.toolsSection}>
              <Text style={styles.sectionTitle}>Quick Tools</Text>
              <View style={styles.toolsRow}>
                <TouchableOpacity style={styles.toolButton} onPress={onShuffle}>
                  <Ionicons name="shuffle" size={22} color="#fff" />
                  <Text style={styles.toolLabel}>Shuffle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolButton} onPress={onHint}>
                  <Ionicons name="bulb" size={22} color="#FFD700" />
                  <Text style={styles.toolLabel}>Hint</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuItems}>
              <TouchableOpacity style={styles.menuItem} onPress={onShop}>
                <Ionicons name="cart" size={20} color="#4fc3f7" />
                <Text style={styles.menuItemText}>Shop</Text>
                <Ionicons name="chevron-forward" size={18} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={onAchievements}>
                <Ionicons name="trophy" size={20} color="#FFD700" />
                <Text style={styles.menuItemText}>Achievements</Text>
                <Ionicons name="chevron-forward" size={18} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={onSettings}>
                <Ionicons name="settings" size={20} color="#9e9e9e" />
                <Text style={styles.menuItemText}>Settings</Text>
                <Ionicons name="chevron-forward" size={18} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Toggles */}
            <View style={styles.togglesSection}>
              <View style={styles.toggleRow}>
                <View style={styles.toggleLeft}>
                  <Ionicons name={soundEnabled ? "volume-high" : "volume-mute"} size={20} color="#fff" />
                  <Text style={styles.toggleLabel}>Sound</Text>
                </View>
                <Switch
                  value={soundEnabled}
                  onValueChange={onToggleSound}
                  trackColor={{ false: '#333', true: '#4CAF50' }}
                  thumbColor={soundEnabled ? '#fff' : '#888'}
                />
              </View>

              <View style={styles.toggleRow}>
                <View style={styles.toggleLeft}>
                  <Text style={styles.focusIcon}>🧘</Text>
                  <Text style={styles.toggleLabel}>Focus Mode</Text>
                </View>
                <Switch
                  value={focusMode}
                  onValueChange={onToggleFocusMode}
                  trackColor={{ false: '#333', true: '#9c27b0' }}
                  thumbColor={focusMode ? '#fff' : '#888'}
                />
              </View>
              {focusMode && (
                <Text style={styles.focusHint}>Hides gems & hints for zen play</Text>
              )}
            </View>

            {/* Home Button */}
            <TouchableOpacity style={styles.homeButton} onPress={onHome}>
              <Ionicons name="home" size={18} color="#ff6b6b" />
              <Text style={styles.homeText}>Exit to Home</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: '88%',
    maxWidth: 340,
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pauseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  levelText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resumeButton: {
    marginBottom: 24,
  },
  resumeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  resumeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  toolsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  toolButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 100,
  },
  toolLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  menuItems: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  togglesSection: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  focusIcon: {
    fontSize: 18,
  },
  focusHint: {
    color: 'rgba(156, 39, 176, 0.8)',
    fontSize: 11,
    marginTop: 4,
    fontStyle: 'italic',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  homeText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default PauseMenu;
