/**
 * Profile Modal
 * Shows user's game profile and stats
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AVATARS = ['👤', '🦊', '🐼', '🦁', '🐯', '🐻', '🐨', '🐸', '🦉', '🐙', '🦄', '🐲'];

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  username: string;
  avatar: string;
  stats: {
    levelsCompleted: number;
    wordsFound: number;
    totalCoins: number;
    playTime: number;
    currentStreak: number;
  };
  onUpdateProfile: (username: string, avatar: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  visible,
  onClose,
  username,
  avatar,
  stats,
  onUpdateProfile,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(username);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar || '👤');

  const handleSave = () => {
    if (newName.trim().length < 2) {
      Alert.alert('Invalid Name', 'Username must be at least 2 characters.');
      return;
    }
    onUpdateProfile(newName.trim(), selectedAvatar);
    setEditingName(false);
  };

  const formatPlayTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#34495e', '#2c3e50']}
            style={styles.header}
          >
            <Text style={styles.title}>👤 Profile</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Avatar Selection */}
            <View style={styles.avatarSection}>
              <View style={styles.currentAvatar}>
                <Text style={styles.avatarLarge}>{selectedAvatar}</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarList}>
                {AVATARS.map((av, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === av && styles.avatarSelected,
                    ]}
                    onPress={() => setSelectedAvatar(av)}
                  >
                    <Text style={styles.avatarEmoji}>{av}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Username */}
            <View style={styles.nameSection}>
              {editingName ? (
                <View style={styles.nameEditRow}>
                  <TextInput
                    style={styles.nameInput}
                    value={newName}
                    onChangeText={setNewName}
                    maxLength={15}
                    autoFocus
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Ionicons name="checkmark" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.nameRow} onPress={() => setEditingName(true)}>
                  <Text style={styles.userName}>{username}</Text>
                  <Ionicons name="pencil" size={18} color="#95a5a6" />
                </TouchableOpacity>
              )}
            </View>

            {/* Stats Grid */}
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Ionicons name="trophy" size={28} color="#f1c40f" />
                <Text style={styles.statValue}>{stats.levelsCompleted}</Text>
                <Text style={styles.statLabel}>Levels</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="text" size={28} color="#3498db" />
                <Text style={styles.statValue}>{stats.wordsFound}</Text>
                <Text style={styles.statLabel}>Words</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="diamond" size={28} color="#FFD700" />
                <Text style={styles.statValue}>{stats.totalCoins}</Text>
                <Text style={styles.statLabel}>Coins</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="time" size={28} color="#9b59b6" />
                <Text style={styles.statValue}>{formatPlayTime(stats.playTime)}</Text>
                <Text style={styles.statLabel}>Play Time</Text>
              </View>
            </View>

            {/* Current Streak */}
            <View style={styles.streakBox}>
              <Text style={styles.streakIcon}>🔥</Text>
              <View style={styles.streakInfo}>
                <Text style={styles.streakValue}>{stats.currentStreak} Day Streak</Text>
                <Text style={styles.streakDesc}>Keep playing daily to maintain your streak!</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.updateGradient}
              >
                <Text style={styles.updateText}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
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
    maxHeight: '90%',
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#667eea',
  },
  avatarLarge: {
    fontSize: 50,
  },
  avatarList: {
    flexDirection: 'row',
  },
  avatarOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarSelected: {
    borderColor: '#667eea',
    backgroundColor: '#e8ecff',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  nameSection: {
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  nameEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  nameInput: {
    borderWidth: 2,
    borderColor: '#667eea',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 150,
    textAlign: 'center',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
  streakBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
  },
  streakIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  streakInfo: {
    flex: 1,
  },
  streakValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
  },
  streakDesc: {
    fontSize: 12,
    color: '#856404',
    marginTop: 4,
  },
  updateButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 30,
  },
  updateGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  updateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileModal;
