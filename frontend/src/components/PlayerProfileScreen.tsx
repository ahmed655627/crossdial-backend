import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// Avatar options
const AVATARS = [
  { id: 'owl', icon: '🦉', name: 'Wise Owl', unlocked: true },
  { id: 'fox', icon: '🦊', name: 'Clever Fox', unlocked: true },
  { id: 'cat', icon: '🐱', name: 'Curious Cat', unlocked: true },
  { id: 'dog', icon: '🐕', name: 'Loyal Dog', unlocked: true },
  { id: 'rabbit', icon: '🐰', name: 'Quick Rabbit', unlocked: false },
  { id: 'panda', icon: '🐼', name: 'Zen Panda', unlocked: false },
  { id: 'lion', icon: '🦁', name: 'Brave Lion', unlocked: false },
  { id: 'unicorn', icon: '🦄', name: 'Magic Unicorn', unlocked: false },
];

// Frames for avatars
const FRAMES = [
  { id: 'default', name: 'Default', color: ['#4ECDC4', '#45B7D1'], unlocked: true },
  { id: 'gold', name: 'Gold', color: ['#FFD700', '#FFA500'], unlocked: false },
  { id: 'diamond', name: 'Diamond', color: ['#A29BFE', '#8B82FD'], unlocked: false },
  { id: 'fire', name: 'Fire', color: ['#FF6B6B', '#EE5A5A'], unlocked: false },
];

interface PlayerProfile {
  username: string;
  avatar: string;
  frame: string;
  title: string;
  level: number;
  totalWords: number;
  totalCoins: number;
  streak: number;
  joinDate: string;
}

interface PlayerProfileScreenProps {
  visible: boolean;
  onClose: () => void;
  currentStats: {
    level: number;
    totalWords: number;
    totalCoins: number;
    streak: number;
  };
  onUpdateProfile: (profile: Partial<PlayerProfile>) => void;
}

export const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = ({
  visible,
  onClose,
  currentStats,
  onUpdateProfile,
}) => {
  const [profile, setProfile] = useState<PlayerProfile>({
    username: 'WordMaster',
    avatar: 'owl',
    frame: 'default',
    title: 'Beginner',
    level: 1,
    totalWords: 0,
    totalCoins: 0,
    streak: 0,
    joinDate: new Date().toISOString(),
  });
  const [editingName, setEditingName] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  useEffect(() => {
    if (visible) {
      loadProfile();
    }
  }, [visible]);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('playerProfile');
      if (savedProfile) {
        setProfile({ ...JSON.parse(savedProfile), ...currentStats });
      } else {
        setProfile(prev => ({ ...prev, ...currentStats }));
      }
    } catch (e) {
      console.log('Error loading profile:', e);
    }
  };

  const saveProfile = async (updates: Partial<PlayerProfile>) => {
    try {
      const newProfile = { ...profile, ...updates };
      setProfile(newProfile);
      await AsyncStorage.setItem('playerProfile', JSON.stringify(newProfile));
      onUpdateProfile(updates);
    } catch (e) {
      console.log('Error saving profile:', e);
    }
  };

  const getTitle = (level: number): string => {
    if (level >= 100) return '👑 Word Legend';
    if (level >= 50) return '🏆 Word Champion';
    if (level >= 25) return '⭐ Word Expert';
    if (level >= 10) return '📚 Word Learner';
    return '🌱 Beginner';
  };

  const selectedAvatar = AVATARS.find(a => a.id === profile.avatar) || AVATARS[0];
  const selectedFrame = FRAMES.find(f => f.id === profile.frame) || FRAMES[0];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#1a1a3e', '#0d0d1a']}
          style={styles.container}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>👤 Profile</Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              <TouchableOpacity onPress={() => setShowAvatarPicker(true)}>
                <LinearGradient
                  colors={selectedFrame.color}
                  style={styles.avatarFrame}
                >
                  <View style={styles.avatarInner}>
                    <Text style={styles.avatarIcon}>{selectedAvatar.icon}</Text>
                  </View>
                </LinearGradient>
                <View style={styles.editBadge}>
                  <Text style={styles.editBadgeText}>✏️</Text>
                </View>
              </TouchableOpacity>
              
              <Text style={styles.username}>{profile.username}</Text>
              <Text style={styles.userTitle}>{getTitle(currentStats.level)}</Text>
            </View>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>🎮</Text>
                <Text style={styles.statValue}>{currentStats.level}</Text>
                <Text style={styles.statLabel}>Level</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>📝</Text>
                <Text style={styles.statValue}>{currentStats.totalWords}</Text>
                <Text style={styles.statLabel}>Words</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>🪙</Text>
                <Text style={styles.statValue}>{currentStats.totalCoins}</Text>
                <Text style={styles.statLabel}>Coins</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>🔥</Text>
                <Text style={styles.statValue}>{currentStats.streak}</Text>
                <Text style={styles.statLabel}>Streak</Text>
              </View>
            </View>

            {/* Achievements Preview */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🏆 Achievements</Text>
              <View style={styles.achievementsRow}>
                {['🌟', '📚', '🔥', '⚡', '🧠'].map((badge, index) => (
                  <View
                    key={index}
                    style={[styles.achievementBadge, index > 2 && styles.badgeLocked]}
                  >
                    <Text style={styles.achievementIcon}>{badge}</Text>
                  </View>
                ))}
                <TouchableOpacity style={styles.viewAllBtn}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Unlocked Items */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎨 Customization</Text>
              <View style={styles.customRow}>
                <View style={styles.customItem}>
                  <Text style={styles.customLabel}>Avatars</Text>
                  <Text style={styles.customValue}>4/8</Text>
                </View>
                <View style={styles.customItem}>
                  <Text style={styles.customLabel}>Frames</Text>
                  <Text style={styles.customValue}>1/4</Text>
                </View>
                <View style={styles.customItem}>
                  <Text style={styles.customLabel}>Themes</Text>
                  <Text style={styles.customValue}>2/6</Text>
                </View>
              </View>
            </View>

            {/* Member Since */}
            <View style={styles.memberSection}>
              <Text style={styles.memberText}>
                Member since {new Date(profile.joinDate).toLocaleDateString()}
              </Text>
            </View>
          </ScrollView>

          {/* Avatar Picker Modal */}
          <Modal visible={showAvatarPicker} transparent animationType="fade">
            <View style={styles.pickerOverlay}>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerTitle}>Choose Avatar</Text>
                <View style={styles.avatarsGrid}>
                  {AVATARS.map((avatar) => (
                    <TouchableOpacity
                      key={avatar.id}
                      style={[
                        styles.avatarOption,
                        profile.avatar === avatar.id && styles.avatarSelected,
                        !avatar.unlocked && styles.avatarLocked,
                      ]}
                      onPress={() => {
                        if (avatar.unlocked) {
                          saveProfile({ avatar: avatar.id });
                        }
                      }}
                      disabled={!avatar.unlocked}
                    >
                      <Text style={styles.avatarOptionIcon}>{avatar.icon}</Text>
                      {!avatar.unlocked && (
                        <View style={styles.lockOverlay}>
                          <Text style={styles.lockIcon}>🔒</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.pickerCloseBtn}
                  onPress={() => setShowAvatarPicker(false)}
                >
                  <Text style={styles.pickerCloseBtnText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarFrame: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 4,
  },
  avatarInner: {
    flex: 1,
    backgroundColor: '#1a1a3e',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 48,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadgeText: {
    fontSize: 14,
  },
  username: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 12,
  },
  userTitle: {
    fontSize: 14,
    color: '#4ECDC4',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  achievementsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  badgeLocked: {
    opacity: 0.3,
  },
  achievementIcon: {
    fontSize: 22,
  },
  viewAllBtn: {
    marginLeft: 'auto',
  },
  viewAllText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '600',
  },
  customRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  customLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  customValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
  },
  memberSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  memberText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    width: width * 0.85,
    backgroundColor: '#1a1a3e',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  pickerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  avatarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatarOption: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    position: 'relative',
  },
  avatarSelected: {
    borderWidth: 3,
    borderColor: '#4ECDC4',
  },
  avatarLocked: {
    opacity: 0.4,
  },
  avatarOptionIcon: {
    fontSize: 32,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 20,
  },
  pickerCloseBtn: {
    marginTop: 20,
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  pickerCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default PlayerProfileScreen;
