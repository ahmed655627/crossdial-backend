import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore, LeaderboardEntry } from '../store/gameStore';

const { width, height } = Dimensions.get('window');

interface LeaderboardModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ visible, onClose }) => {
  const { leaderboard, loadLeaderboard, progress } = useGameStore();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchLeaderboard();
    }
  }, [visible]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    await loadLeaderboard();
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLeaderboard();
    setRefreshing(false);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return { icon: 'trophy', color: '#FFD700' };
      case 2:
        return { icon: 'medal', color: '#C0C0C0' };
      case 3:
        return { icon: 'medal', color: '#CD7F32' };
      default:
        return null;
    }
  };

  const renderLeaderboardItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
    const rankInfo = getRankIcon(item.rank);
    const isCurrentUser = progress?.username === item.username;

    return (
      <View style={[styles.leaderboardItem, isCurrentUser && styles.currentUserItem]}>
        {/* Rank */}
        <View style={styles.rankContainer}>
          {rankInfo ? (
            <Ionicons name={rankInfo.icon as any} size={24} color={rankInfo.color} />
          ) : (
            <Text style={styles.rankText}>{item.rank}</Text>
          )}
        </View>

        {/* Player Info */}
        <View style={styles.playerInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {item.username.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.playerDetails}>
            <Text style={[styles.playerName, isCurrentUser && styles.currentUserText]}>
              {item.username} {isCurrentUser && '(You)'}
            </Text>
            <Text style={styles.levelsText}>
              {item.levels_completed} level{item.levels_completed !== 1 ? 's' : ''} completed
            </Text>
          </View>
        </View>

        {/* Score */}
        <View style={styles.scoreContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.scoreText}>{item.score}</Text>
        </View>
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="podium-outline" size={60} color="#95a5a6" />
      <Text style={styles.emptyTitle}>No Players Yet</Text>
      <Text style={styles.emptyText}>Be the first to climb the leaderboard!</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <LinearGradient
            colors={['#2c3e50', '#34495e']}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <Ionicons name="trophy" size={28} color="#FFD700" />
              <Text style={styles.title}>Leaderboard</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close-circle" size={32} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Top 3 Podium */}
          {leaderboard.length >= 3 && (
            <View style={styles.podiumContainer}>
              {/* 2nd Place */}
              <View style={[styles.podiumItem, styles.secondPlace]}>
                <View style={[styles.podiumAvatar, styles.silverAvatar]}>
                  <Text style={styles.podiumAvatarText}>
                    {leaderboard[1]?.username.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.podiumMedal}>
                  <Ionicons name="medal" size={24} color="#C0C0C0" />
                </View>
                <Text style={styles.podiumName} numberOfLines={1}>
                  {leaderboard[1]?.username}
                </Text>
                <Text style={styles.podiumScore}>{leaderboard[1]?.score}</Text>
              </View>

              {/* 1st Place */}
              <View style={[styles.podiumItem, styles.firstPlace]}>
                <View style={styles.crownContainer}>
                  <Ionicons name="trophy" size={32} color="#FFD700" />
                </View>
                <View style={[styles.podiumAvatar, styles.goldAvatar]}>
                  <Text style={styles.podiumAvatarText}>
                    {leaderboard[0]?.username.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.podiumName} numberOfLines={1}>
                  {leaderboard[0]?.username}
                </Text>
                <Text style={styles.podiumScore}>{leaderboard[0]?.score}</Text>
              </View>

              {/* 3rd Place */}
              <View style={[styles.podiumItem, styles.thirdPlace]}>
                <View style={[styles.podiumAvatar, styles.bronzeAvatar]}>
                  <Text style={styles.podiumAvatarText}>
                    {leaderboard[2]?.username.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.podiumMedal}>
                  <Ionicons name="medal" size={24} color="#CD7F32" />
                </View>
                <Text style={styles.podiumName} numberOfLines={1}>
                  {leaderboard[2]?.username}
                </Text>
                <Text style={styles.podiumScore}>{leaderboard[2]?.score}</Text>
              </View>
            </View>
          )}

          {/* Leaderboard List */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3498db" />
              <Text style={styles.loadingText}>Loading leaderboard...</Text>
            </View>
          ) : (
            <FlatList
              data={leaderboard.slice(3)}
              keyExtractor={(item, index) => `${item.username}-${index}`}
              renderItem={({ item, index }) => renderLeaderboardItem({ item, index: index + 3 })}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={leaderboard.length === 0 ? renderEmptyList : null}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#3498db"
                />
              }
            />
          )}

          {/* Current User Stats */}
          {progress && (
            <View style={styles.userStatsContainer}>
              <LinearGradient
                colors={['#3498db', '#2980b9']}
                style={styles.userStats}
              >
                <View style={styles.userStatItem}>
                  <Ionicons name="person" size={20} color="#fff" />
                  <Text style={styles.userStatLabel}>{progress.username}</Text>
                </View>
                <View style={styles.userStatItem}>
                  <Ionicons name="star" size={20} color="#FFD700" />
                  <Text style={styles.userStatValue}>{progress.total_score}</Text>
                </View>
                <View style={styles.userStatItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#2ecc71" />
                  <Text style={styles.userStatValue}>{progress.completed_levels?.length || 0}</Text>
                </View>
              </LinearGradient>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modal: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    marginTop: 50,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ecf0f1',
  },
  podiumItem: {
    alignItems: 'center',
    width: width * 0.28,
  },
  firstPlace: {
    marginBottom: 20,
  },
  secondPlace: {
    marginBottom: 0,
  },
  thirdPlace: {
    marginBottom: 0,
  },
  crownContainer: {
    marginBottom: 5,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    borderWidth: 3,
  },
  goldAvatar: {
    backgroundColor: '#f39c12',
    borderColor: '#FFD700',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  silverAvatar: {
    backgroundColor: '#95a5a6',
    borderColor: '#C0C0C0',
  },
  bronzeAvatar: {
    backgroundColor: '#d35400',
    borderColor: '#CD7F32',
  },
  podiumAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  podiumMedal: {
    marginBottom: 5,
  },
  podiumName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    maxWidth: 80,
  },
  podiumScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3498db',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#7f8c8d',
  },
  listContent: {
    padding: 15,
    paddingBottom: 100,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentUserItem: {
    backgroundColor: '#e8f6ff',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f8c8d',
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerDetails: {
    marginLeft: 12,
    flex: 1,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  currentUserText: {
    color: '#3498db',
  },
  levelsText: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingLeft: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 15,
  },
  emptyText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
    textAlign: 'center',
  },
  userStatsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  userStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userStatLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  userStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
