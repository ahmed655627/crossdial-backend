import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export interface PlayerProfile {
  id: string;
  username: string;
  avatar: string;
  level: number;
  totalWordsFound: number;
  levelsCompleted: number;
  currentStreak: number;
  bestStreak: number;
  totalCoins: number;
  achievements: string[];
  joinedAt: string;
  country?: string;
  title?: string;
}

const AVATARS = [
  { id: 'owl', emoji: '🦉', name: 'Wise Owl' },
  { id: 'fox', emoji: '🦊', name: 'Clever Fox' },
  { id: 'cat', emoji: '🐱', name: 'Curious Cat' },
  { id: 'dog', emoji: '🐶', name: 'Loyal Dog' },
  { id: 'lion', emoji: '🦁', name: 'Brave Lion' },
  { id: 'panda', emoji: '🐼', name: 'Chill Panda' },
  { id: 'unicorn', emoji: '🦄', name: 'Magic Unicorn' },
  { id: 'dragon', emoji: '🐲', name: 'Mighty Dragon' },
  { id: 'robot', emoji: '🤖', name: 'Smart Robot' },
  { id: 'alien', emoji: '👽', name: 'Mystery Alien' },
];

const TITLES = [
  { id: 'newbie', name: 'Word Newbie', requirement: 0 },
  { id: 'learner', name: 'Word Learner', requirement: 100 },
  { id: 'finder', name: 'Word Finder', requirement: 500 },
  { id: 'hunter', name: 'Word Hunter', requirement: 1000 },
  { id: 'master', name: 'Word Master', requirement: 2500 },
  { id: 'champion', name: 'Word Champion', requirement: 5000 },
  { id: 'legend', name: 'Word Legend', requirement: 10000 },
  { id: 'god', name: 'Word God', requirement: 25000 },
];

interface PlayerProfileModalProps {
  visible: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  isOwnProfile: boolean;
  onEditAvatar?: () => void;
  onSelectAvatar?: (avatarId: string) => void;
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  visible,
  onClose,
  profile,
  isOwnProfile,
  onEditAvatar,
  onSelectAvatar,
}) => {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const getTitle = (wordsFound: number) => {
    const title = [...TITLES].reverse().find(t => wordsFound >= t.requirement);
    return title?.name || 'Word Newbie';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Profile Header */}
          <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.header}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => isOwnProfile && setShowAvatarPicker(true)}
              disabled={!isOwnProfile}
            >
              <Text style={styles.avatar}>{profile.avatar}</Text>
              {isOwnProfile && (
                <View style={styles.editBadge}>
                  <Text style={styles.editIcon}>✏️</Text>
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.username}>{profile.username}</Text>
            <View style={styles.titleBadge}>
              <Text style={styles.titleText}>{getTitle(profile.totalWordsFound)}</Text>
            </View>
            <Text style={styles.memberSince}>Member since {formatDate(profile.joinedAt)}</Text>
          </LinearGradient>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>📝</Text>
                <Text style={styles.statValue}>{profile.totalWordsFound}</Text>
                <Text style={styles.statLabel}>Words Found</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>🏆</Text>
                <Text style={styles.statValue}>{profile.levelsCompleted}</Text>
                <Text style={styles.statLabel}>Levels Done</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>🔥</Text>
                <Text style={styles.statValue}>{profile.currentStreak}</Text>
                <Text style={styles.statLabel}>Streak</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>🏅</Text>
                <Text style={styles.statValue}>{profile.bestStreak}</Text>
                <Text style={styles.statLabel}>Best Streak</Text>
              </View>
            </View>

            {/* Achievements */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🏅 Achievements</Text>
              <View style={styles.achievementsRow}>
                {profile.achievements.slice(0, 8).map((ach, index) => (
                  <View key={index} style={styles.achievementBadge}>
                    <Text style={styles.achievementIcon}>{ach}</Text>
                  </View>
                ))}
                {profile.achievements.length > 8 && (
                  <View style={styles.moreBadge}>
                    <Text style={styles.moreText}>+{profile.achievements.length - 8}</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar Picker */}
        {showAvatarPicker && (
          <Modal visible={true} transparent animationType="fade">
            <View style={styles.pickerOverlay}>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerTitle}>Choose Avatar</Text>
                <View style={styles.avatarGrid}>
                  {AVATARS.map((av) => (
                    <TouchableOpacity
                      key={av.id}
                      style={[
                        styles.avatarOption,
                        profile.avatar === av.emoji && styles.avatarSelected,
                      ]}
                      onPress={() => {
                        onSelectAvatar?.(av.emoji);
                        setShowAvatarPicker(false);
                      }}
                    >
                      <Text style={styles.avatarOptionEmoji}>{av.emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.pickerClose}
                  onPress={() => setShowAvatarPicker(false)}
                >
                  <Text style={styles.pickerCloseText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    maxHeight: '85%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    fontSize: 80,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#fff',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 14,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  titleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  titleText: {
    color: '#fbbf24',
    fontWeight: '600',
  },
  memberSince: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  achievementsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achievementBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,215,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIcon: {
    fontSize: 24,
  },
  moreBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '600',
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    width: width * 0.85,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 24,
  },
  pickerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSelected: {
    borderWidth: 3,
    borderColor: '#22c55e',
  },
  avatarOptionEmoji: {
    fontSize: 36,
  },
  pickerClose: {
    marginTop: 20,
    padding: 12,
    alignItems: 'center',
  },
  pickerCloseText: {
    color: '#9ca3af',
  },
});

export default PlayerProfileModal;
