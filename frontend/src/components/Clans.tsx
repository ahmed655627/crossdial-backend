import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export interface Clan {
  id: string;
  name: string;
  icon: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  totalScore: number;
  rank: number;
  isOpen: boolean;
  createdAt: string;
  leader: {
    id: string;
    username: string;
    avatar: string;
  };
}

export interface ClanMember {
  id: string;
  username: string;
  avatar: string;
  role: 'leader' | 'officer' | 'member';
  contribution: number;
  joinedAt: string;
}

const CLAN_ICONS = ['👑', '⚔️', '🛡️', '🔥', '⚡', '🌟', '💎', '🌿', '🌊', '🌙'];

interface ClansModalProps {
  visible: boolean;
  onClose: () => void;
  currentClan?: Clan | null;
  clanMembers?: ClanMember[];
  searchResults?: Clan[];
  onJoinClan: (clanId: string) => void;
  onLeaveClan: () => void;
  onCreateClan: (name: string, icon: string, description: string) => void;
  onSearch: (query: string) => void;
}

export const ClansModal: React.FC<ClansModalProps> = ({
  visible,
  onClose,
  currentClan,
  clanMembers = [],
  searchResults = [],
  onJoinClan,
  onLeaveClan,
  onCreateClan,
  onSearch,
}) => {
  const [activeTab, setActiveTab] = useState<'clan' | 'search' | 'create'>(
    currentClan ? 'clan' : 'search'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [newClanName, setNewClanName] = useState('');
  const [newClanIcon, setNewClanIcon] = useState('👑');
  const [newClanDesc, setNewClanDesc] = useState('');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'leader': return '#fbbf24';
      case 'officer': return '#8b5cf6';
      default: return '#9ca3af';
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleCreate = () => {
    if (newClanName.trim()) {
      onCreateClan(newClanName, newClanIcon, newClanDesc);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>⚔️ Clans</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {currentClan && (
              <TouchableOpacity
                style={[styles.tab, activeTab === 'clan' && styles.tabActive]}
                onPress={() => setActiveTab('clan')}
              >
                <Text style={[styles.tabText, activeTab === 'clan' && styles.tabTextActive]}>
                  My Clan
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.tab, activeTab === 'search' && styles.tabActive]}
              onPress={() => setActiveTab('search')}
            >
              <Text style={[styles.tabText, activeTab === 'search' && styles.tabTextActive]}>
                Find Clan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'create' && styles.tabActive]}
              onPress={() => setActiveTab('create')}
            >
              <Text style={[styles.tabText, activeTab === 'create' && styles.tabTextActive]}>
                Create
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* My Clan Tab */}
            {activeTab === 'clan' && currentClan && (
              <>
                <LinearGradient
                  colors={['#8b5cf6', '#7c3aed']}
                  style={styles.clanHeader}
                >
                  <Text style={styles.clanIcon}>{currentClan.icon}</Text>
                  <Text style={styles.clanName}>{currentClan.name}</Text>
                  <Text style={styles.clanRank}>Rank #{currentClan.rank}</Text>
                  <View style={styles.clanStats}>
                    <View style={styles.clanStat}>
                      <Text style={styles.clanStatValue}>{currentClan.memberCount}/{currentClan.maxMembers}</Text>
                      <Text style={styles.clanStatLabel}>Members</Text>
                    </View>
                    <View style={styles.clanStat}>
                      <Text style={styles.clanStatValue}>{currentClan.totalScore}</Text>
                      <Text style={styles.clanStatLabel}>Score</Text>
                    </View>
                  </View>
                </LinearGradient>

                <Text style={styles.sectionTitle}>Members</Text>
                {clanMembers.map((member) => (
                  <View key={member.id} style={styles.memberRow}>
                    <Text style={styles.memberAvatar}>{member.avatar}</Text>
                    <View style={styles.memberInfo}>
                      <Text style={styles.memberName}>{member.username}</Text>
                      <Text style={[styles.memberRole, { color: getRoleColor(member.role) }]}>
                        {member.role}
                      </Text>
                    </View>
                    <Text style={styles.memberScore}>+{member.contribution}</Text>
                  </View>
                ))}

                <TouchableOpacity style={styles.leaveButton} onPress={onLeaveClan}>
                  <Text style={styles.leaveText}>Leave Clan</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Search Tab */}
            {activeTab === 'search' && (
              <>
                <View style={styles.searchRow}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search clans..."
                    placeholderTextColor="#666"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchIcon}>🔍</Text>
                  </TouchableOpacity>
                </View>

                {searchResults.map((clan) => (
                  <View key={clan.id} style={styles.clanCard}>
                    <Text style={styles.cardIcon}>{clan.icon}</Text>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardName}>{clan.name}</Text>
                      <Text style={styles.cardDesc}>{clan.memberCount}/{clan.maxMembers} members</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.joinButton, !clan.isOpen && styles.joinButtonDisabled]}
                      onPress={() => onJoinClan(clan.id)}
                      disabled={!clan.isOpen}
                    >
                      <Text style={styles.joinText}>{clan.isOpen ? 'Join' : 'Full'}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}

            {/* Create Tab */}
            {activeTab === 'create' && (
              <>
                <Text style={styles.createLabel}>Clan Icon</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconPicker}>
                  {CLAN_ICONS.map((icon) => (
                    <TouchableOpacity
                      key={icon}
                      style={[
                        styles.iconOption,
                        newClanIcon === icon && styles.iconSelected,
                      ]}
                      onPress={() => setNewClanIcon(icon)}
                    >
                      <Text style={styles.iconEmoji}>{icon}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.createLabel}>Clan Name</Text>
                <TextInput
                  style={styles.createInput}
                  placeholder="Enter clan name"
                  placeholderTextColor="#666"
                  value={newClanName}
                  onChangeText={setNewClanName}
                  maxLength={20}
                />

                <Text style={styles.createLabel}>Description</Text>
                <TextInput
                  style={[styles.createInput, styles.createDesc]}
                  placeholder="Describe your clan"
                  placeholderTextColor="#666"
                  value={newClanDesc}
                  onChangeText={setNewClanDesc}
                  multiline
                  maxLength={100}
                />

                <TouchableOpacity
                  style={[styles.createButton, !newClanName && styles.createButtonDisabled]}
                  onPress={handleCreate}
                  disabled={!newClanName}
                >
                  <Text style={styles.createButtonText}>Create Clan (🪙 500)</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
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
    maxHeight: '90%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#8b5cf6',
  },
  tabText: {
    color: '#9ca3af',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#8b5cf6',
  },
  content: {
    padding: 16,
    maxHeight: 400,
  },
  clanHeader: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  clanIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  clanName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  clanRank: {
    color: '#fbbf24',
    marginTop: 4,
  },
  clanStats: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 32,
  },
  clanStat: {
    alignItems: 'center',
  },
  clanStatValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  clanStatLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 8,
  },
  memberAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    color: '#fff',
    fontWeight: '600',
  },
  memberRole: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  memberScore: {
    color: '#22c55e',
    fontWeight: 'bold',
  },
  leaveButton: {
    marginTop: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 12,
  },
  leaveText: {
    color: '#ef4444',
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#8b5cf6',
    width: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  clanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    color: '#fff',
    fontWeight: '600',
  },
  cardDesc: {
    color: '#9ca3af',
    fontSize: 12,
  },
  joinButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonDisabled: {
    backgroundColor: '#6b7280',
  },
  joinText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createLabel: {
    color: '#9ca3af',
    marginBottom: 8,
    marginTop: 16,
  },
  iconPicker: {
    marginBottom: 8,
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconSelected: {
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  iconEmoji: {
    fontSize: 28,
  },
  createInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    color: '#fff',
  },
  createDesc: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeText: {
    color: '#9ca3af',
  },
});

export default ClansModal;
