import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export interface TournamentPlayer {
  id: string;
  username: string;
  score: number;
  wordsFound: number;
  rank: number;
  isCurrentUser?: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  prizes: { rank: number; coins: number }[];
  participants: TournamentPlayer[];
  status: 'upcoming' | 'active' | 'ended';
}

interface WeeklyTournamentModalProps {
  visible: boolean;
  onClose: () => void;
  tournament: Tournament | null;
  currentUserRank?: number;
  onJoin: () => void;
}

export const WeeklyTournamentModal: React.FC<WeeklyTournamentModalProps> = ({
  visible,
  onClose,
  tournament,
  currentUserRank,
  onJoin,
}) => {
  const getTimeRemaining = () => {
    if (!tournament) return '';
    const end = new Date(tournament.endDate).getTime();
    const now = Date.now();
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  if (!tournament) {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#8b5cf6" />
            <Text style={styles.loadingText}>Loading tournament...</Text>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            style={styles.header}
          >
            <Text style={styles.headerIcon}>🏆</Text>
            <Text style={styles.title}>{tournament.name}</Text>
            <View style={styles.timerBadge}>
              <Text style={styles.timerText}>⏰ {getTimeRemaining()}</Text>
            </View>
          </LinearGradient>

          {/* Prizes */}
          <View style={styles.prizesSection}>
            <Text style={styles.sectionTitle}>Prizes</Text>
            <View style={styles.prizesRow}>
              {tournament.prizes.slice(0, 3).map((prize, index) => (
                <View key={index} style={styles.prizeBox}>
                  <Text style={styles.prizeRank}>{getRankIcon(prize.rank)}</Text>
                  <Text style={styles.prizeAmount}>🪙 {prize.coins}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Your Rank */}
          {currentUserRank && (
            <View style={styles.yourRank}>
              <Text style={styles.yourRankLabel}>Your Rank</Text>
              <Text style={styles.yourRankValue}>#{currentUserRank}</Text>
            </View>
          )}

          {/* Leaderboard */}
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          <ScrollView style={styles.leaderboard} showsVerticalScrollIndicator={false}>
            {tournament.participants.slice(0, 20).map((player, index) => (
              <View
                key={player.id}
                style={[
                  styles.playerRow,
                  player.isCurrentUser && styles.currentUserRow,
                ]}
              >
                <Text style={styles.playerRank}>{getRankIcon(index + 1)}</Text>
                <Text style={styles.playerName}>
                  {player.username}
                  {player.isCurrentUser && ' (You)'}
                </Text>
                <Text style={styles.playerScore}>{player.score} pts</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.buttons}>
            {tournament.status === 'active' && !currentUserRank && (
              <TouchableOpacity style={styles.joinButton} onPress={onJoin}>
                <Text style={styles.joinText}>Join Tournament</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const TournamentBanner: React.FC<{
  onPress: () => void;
  timeRemaining: string;
}> = ({ onPress, timeRemaining }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#8b5cf6', '#7c3aed']}
        style={styles.banner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.bannerIcon}>🏆</Text>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Weekly Tournament</Text>
          <Text style={styles.bannerTime}>{timeRemaining}</Text>
        </View>
        <Text style={styles.bannerArrow}>›</Text>
      </LinearGradient>
    </TouchableOpacity>
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
    padding: 20,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  timerBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  timerText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingText: {
    color: '#fff',
    marginTop: 16,
  },
  prizesSection: {
    padding: 16,
  },
  sectionTitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  prizesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  prizeBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
  },
  prizeRank: {
    fontSize: 28,
    marginBottom: 8,
  },
  prizeAmount: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  yourRank: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  yourRankLabel: {
    color: '#9ca3af',
  },
  yourRankValue: {
    color: '#8b5cf6',
    fontSize: 24,
    fontWeight: 'bold',
  },
  leaderboard: {
    maxHeight: 200,
    paddingHorizontal: 16,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  currentUserRow: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  playerRank: {
    fontSize: 18,
    width: 40,
    textAlign: 'center',
  },
  playerName: {
    color: '#fff',
    flex: 1,
    marginLeft: 8,
  },
  playerScore: {
    color: '#ffd700',
    fontWeight: '600',
  },
  buttons: {
    padding: 16,
    gap: 12,
  },
  joinButton: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 12,
    alignItems: 'center',
  },
  closeText: {
    color: '#9ca3af',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  bannerIcon: {
    fontSize: 28,
  },
  bannerContent: {
    flex: 1,
    marginLeft: 12,
  },
  bannerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bannerTime: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  bannerArrow: {
    color: '#fff',
    fontSize: 24,
  },
});

export default WeeklyTournamentModal;
