import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface Friend {
  id: string;
  username: string;
  avatar: string;
  level: number;
  lastActive: string;
  isOnline: boolean;
}

// Mock friends data (would be from backend in production)
const MOCK_FRIENDS: Friend[] = [
  { id: '1', username: 'WordWizard', avatar: '🧙', level: 45, lastActive: '2 min ago', isOnline: true },
  { id: '2', username: 'PuzzleMaster', avatar: '🎯', level: 32, lastActive: '1 hour ago', isOnline: true },
  { id: '3', username: 'LexiconKing', avatar: '👑', level: 78, lastActive: '3 hours ago', isOnline: false },
  { id: '4', username: 'WordNinja', avatar: '🥷', level: 23, lastActive: 'Yesterday', isOnline: false },
  { id: '5', username: 'BrainStorm', avatar: '🧠', level: 56, lastActive: '2 days ago', isOnline: false },
];

interface FriendsSystemProps {
  visible: boolean;
  onClose: () => void;
  currentUserLevel: number;
  onChallengeFriend: (friendId: string) => void;
}

export const FriendsSystem: React.FC<FriendsSystemProps> = ({
  visible,
  onClose,
  currentUserLevel,
  onChallengeFriend,
}) => {
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'search'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [friendRequests] = useState([
    { id: 'req1', username: 'NewPlayer123', avatar: '🌟', level: 5 },
  ]);

  const filteredFriends = friends.filter(f => 
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFriendCard = (friend: Friend) => (
    <View key={friend.id} style={styles.friendCard}>
      <View style={styles.friendLeft}>
        <View style={styles.avatarContainer}>
          <Text style={styles.friendAvatar}>{friend.avatar}</Text>
          {friend.isOnline && <View style={styles.onlineDot} />}
        </View>
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{friend.username}</Text>
          <Text style={styles.friendMeta}>
            Level {friend.level} • {friend.lastActive}
          </Text>
        </View>
      </View>
      <View style={styles.friendActions}>
        <TouchableOpacity
          style={styles.challengeBtn}
          onPress={() => onChallengeFriend(friend.id)}
        >
          <Text style={styles.challengeBtnText}>⚔️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
            <Text style={styles.title}>👥 Friends</Text>
            <View style={styles.friendCount}>
              <Text style={styles.friendCountText}>{friends.length}</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {(['friends', 'requests', 'search'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab === 'friends' ? '👥 Friends' : tab === 'requests' ? '📩 Requests' : '🔍 Find'}
                </Text>
                {tab === 'requests' && friendRequests.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{friendRequests.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Friends List */}
            {activeTab === 'friends' && (
              <>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search friends..."
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
                
                {/* Online Friends */}
                <Text style={styles.sectionTitle}>Online ({friends.filter(f => f.isOnline).length})</Text>
                {filteredFriends.filter(f => f.isOnline).map(renderFriendCard)}
                
                {/* Offline Friends */}
                <Text style={styles.sectionTitle}>Offline</Text>
                {filteredFriends.filter(f => !f.isOnline).map(renderFriendCard)}
              </>
            )}

            {/* Friend Requests */}
            {activeTab === 'requests' && (
              <>
                {friendRequests.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>📭</Text>
                    <Text style={styles.emptyText}>No friend requests</Text>
                  </View>
                ) : (
                  friendRequests.map((req) => (
                    <View key={req.id} style={styles.requestCard}>
                      <View style={styles.friendLeft}>
                        <Text style={styles.requestAvatar}>{req.avatar}</Text>
                        <View style={styles.friendInfo}>
                          <Text style={styles.friendName}>{req.username}</Text>
                          <Text style={styles.friendMeta}>Level {req.level}</Text>
                        </View>
                      </View>
                      <View style={styles.requestActions}>
                        <TouchableOpacity style={styles.acceptBtn}>
                          <Text style={styles.acceptBtnText}>✓</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.declineBtn}>
                          <Text style={styles.declineBtnText}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}
              </>
            )}

            {/* Search Players */}
            {activeTab === 'search' && (
              <>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Enter username or code..."
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  />
                </View>
                
                <View style={styles.shareCode}>
                  <Text style={styles.shareCodeLabel}>Your Friend Code:</Text>
                  <View style={styles.codeContainer}>
                    <Text style={styles.codeText}>WWQ-{Math.random().toString(36).substring(2, 8).toUpperCase()}</Text>
                    <TouchableOpacity style={styles.copyBtn}>
                      <Text style={styles.copyBtnText}>📋 Copy</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inviteSection}>
                  <Text style={styles.inviteTitle}>Invite Friends</Text>
                  <TouchableOpacity style={styles.inviteBtn}>
                    <LinearGradient
                      colors={['#4ECDC4', '#45B7D1']}
                      style={styles.inviteGradient}
                    >
                      <Text style={styles.inviteBtnText}>📤 Share Invite Link</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
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
  friendCount: {
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  friendCountText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '700',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#4ECDC4',
  },
  badge: {
    backgroundColor: '#FF6B6B',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 14,
  },
  sectionTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  friendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  friendAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ECDC4',
    borderWidth: 2,
    borderColor: '#1a1a3e',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  friendMeta: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  friendActions: {
    flexDirection: 'row',
  },
  challengeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeBtnText: {
    fontSize: 18,
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  requestAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  requestActions: {
    flexDirection: 'row',
  },
  acceptBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  acceptBtnText: {
    color: '#4ECDC4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  declineBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineBtnText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  shareCode: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  shareCodeLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeText: {
    color: '#4ECDC4',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
  },
  copyBtn: {
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyBtnText: {
    color: '#4ECDC4',
    fontSize: 12,
    fontWeight: '700',
  },
  inviteSection: {
    alignItems: 'center',
  },
  inviteTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  inviteBtn: {
    width: '100%',
  },
  inviteGradient: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  inviteBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default FriendsSystem;
