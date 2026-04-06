/**
 * Game Feature Modals
 * All additional feature modals in one place
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ============ SPIN WHEEL MODAL ============
interface SpinWheelModalProps {
  visible: boolean;
  onClose: () => void;
  onSpin: (reward: string) => void;
}

export const SpinWheelModal: React.FC<SpinWheelModalProps> = ({ visible, onClose, onSpin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const rewards = ['50 Coins', '100 Coins', '1 Hint', '3 Hints', '2x Bonus', 'Try Again'];
  
  const handleSpin = () => {
    setIsSpinning(true);
    setResult(null);
    setTimeout(() => {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      setResult(reward);
      setIsSpinning(false);
      onSpin(reward);
    }, 2000);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <LinearGradient colors={['#9b59b6', '#8e44ad']} style={styles.modalHeader}>
            <Text style={styles.modalTitle}>🎰 Lucky Spin</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <View style={styles.modalContent}>
            <View style={styles.wheelContainer}>
              <Text style={styles.wheelEmoji}>{isSpinning ? '🎡' : '🎰'}</Text>
              {result && (
                <View style={styles.resultBox}>
                  <Text style={styles.resultText}>🎉 {result}!</Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity 
              style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]}
              onPress={handleSpin}
              disabled={isSpinning}
            >
              <LinearGradient colors={['#f39c12', '#e67e22']} style={styles.spinGradient}>
                <Text style={styles.spinText}>{isSpinning ? 'Spinning...' : 'SPIN!'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ============ STATISTICS MODAL ============
interface StatisticsModalProps {
  visible: boolean;
  onClose: () => void;
  stats: {
    totalWordsFound: number;
    totalPlayTime: number;
    accuracy: number;
    longestStreak: number;
    levelsCompleted: number;
  };
}

export const StatisticsModal: React.FC<StatisticsModalProps> = ({ visible, onClose, stats }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <LinearGradient colors={['#3498db', '#2980b9']} style={styles.modalHeader}>
            <Text style={styles.modalTitle}>📊 Statistics</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <View style={styles.modalContent}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalWordsFound}</Text>
                <Text style={styles.statLabel}>Words Found</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.levelsCompleted}</Text>
                <Text style={styles.statLabel}>Levels Done</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.accuracy}%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.longestStreak}</Text>
                <Text style={styles.statLabel}>Best Streak</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ============ ACHIEVEMENTS MODAL ============
interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

interface AchievementsModalProps {
  visible: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ visible, onClose, achievements }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <LinearGradient colors={['#f1c40f', '#f39c12']} style={styles.modalHeader}>
            <Text style={styles.modalTitle}>🏅 Achievements</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <ScrollView style={styles.modalContent}>
            {achievements.map((ach) => (
              <View key={ach.id} style={[styles.achievementRow, !ach.unlocked && styles.achievementLocked]}>
                <Text style={styles.achievementIcon}>{ach.unlocked ? ach.icon : '🔒'}</Text>
                <Text style={[styles.achievementName, !ach.unlocked && styles.achievementNameLocked]}>
                  {ach.name}
                </Text>
                {ach.unlocked && <Ionicons name="checkmark-circle" size={24} color="#27ae60" />}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ============ PROGRESS MAP MODAL ============
interface ProgressMapModalProps {
  visible: boolean;
  onClose: () => void;
  currentLevel: number;
}

export const ProgressMapModal: React.FC<ProgressMapModalProps> = ({ visible, onClose, currentLevel }) => {
  const wonders = [
    { name: 'Giza Pyramids', levels: '1-10', unlocked: currentLevel >= 1 },
    { name: 'Machu Picchu', levels: '11-20', unlocked: currentLevel >= 11 },
    { name: 'Colosseum', levels: '21-30', unlocked: currentLevel >= 21 },
    { name: 'Taj Mahal', levels: '31-40', unlocked: currentLevel >= 31 },
    { name: 'Great Wall', levels: '41-50', unlocked: currentLevel >= 41 },
    { name: 'Eiffel Tower', levels: '51-60', unlocked: currentLevel >= 51 },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <LinearGradient colors={['#27ae60', '#2ecc71']} style={styles.modalHeader}>
            <Text style={styles.modalTitle}>🗺️ World Map</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <ScrollView style={styles.modalContent}>
            {wonders.map((wonder, idx) => (
              <View key={idx} style={[styles.mapItem, !wonder.unlocked && styles.mapItemLocked]}>
                <View style={styles.mapIcon}>
                  <Text style={styles.mapEmoji}>{wonder.unlocked ? '🏛️' : '🔒'}</Text>
                </View>
                <View style={styles.mapInfo}>
                  <Text style={styles.mapName}>{wonder.name}</Text>
                  <Text style={styles.mapLevels}>Levels {wonder.levels}</Text>
                </View>
                {wonder.unlocked && <Ionicons name="checkmark-circle" size={24} color="#27ae60" />}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ============ LEADERBOARD MODAL ============
interface LeaderboardModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ visible, onClose }) => {
  const players = [
    { rank: 1, name: 'WordMaster', score: 15420, avatar: '🦊' },
    { rank: 2, name: 'PuzzleKing', score: 12350, avatar: '🦁' },
    { rank: 3, name: 'LexiconPro', score: 11200, avatar: '🐼' },
    { rank: 4, name: 'You', score: 8500, avatar: '🦉', isYou: true },
    { rank: 5, name: 'WordNinja', score: 7800, avatar: '🐯' },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <LinearGradient colors={['#e74c3c', '#c0392b']} style={styles.modalHeader}>
            <Text style={styles.modalTitle}>🏆 Leaderboard</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <ScrollView style={styles.modalContent}>
            {players.map((player) => (
              <View key={player.rank} style={[styles.leaderRow, player.isYou && styles.leaderRowYou]}>
                <Text style={styles.leaderRank}>#{player.rank}</Text>
                <Text style={styles.leaderAvatar}>{player.avatar}</Text>
                <Text style={[styles.leaderName, player.isYou && styles.leaderNameYou]}>{player.name}</Text>
                <Text style={styles.leaderScore}>{player.score.toLocaleString()}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ============ FRIEND CHALLENGE MODAL ============
interface FriendChallengeModalProps {
  visible: boolean;
  onClose: () => void;
}

export const FriendChallengeModal: React.FC<FriendChallengeModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <LinearGradient colors={['#9b59b6', '#8e44ad']} style={styles.modalHeader}>
            <Text style={styles.modalTitle}>👥 Challenge Friends</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <View style={styles.modalContent}>
            <Text style={styles.challengeText}>Challenge a friend to beat your score!</Text>
            
            <TouchableOpacity style={styles.shareButton}>
              <LinearGradient colors={['#3498db', '#2980b9']} style={styles.shareGradient}>
                <Ionicons name="share-social" size={20} color="#fff" />
                <Text style={styles.shareText}>Share Challenge Link</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton}>
              <LinearGradient colors={['#27ae60', '#2ecc71']} style={styles.shareGradient}>
                <Ionicons name="copy" size={20} color="#fff" />
                <Text style={styles.shareText}>Copy Invite Code</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ============ WORD DEFINITION MODAL ============
interface WordDefinitionModalProps {
  visible: boolean;
  onClose: () => void;
  word: string;
  definition: string;
}

export const WordDefinitionModal: React.FC<WordDefinitionModalProps> = ({ visible, onClose, word, definition }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.definitionCard}>
          <Text style={styles.definitionWord}>{word}</Text>
          <Text style={styles.definitionText}>{definition}</Text>
          <TouchableOpacity style={styles.definitionClose} onPress={onClose}>
            <Text style={styles.definitionCloseText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxWidth: 350,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeBtn: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  modalContent: {
    padding: 20,
  },
  // Spin Wheel
  wheelContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  wheelEmoji: {
    fontSize: 80,
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: '#27ae60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  spinButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  spinButtonDisabled: {
    opacity: 0.6,
  },
  spinGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  spinText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  // Statistics
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  // Achievements
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 10,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  achievementName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  achievementNameLocked: {
    color: '#95a5a6',
  },
  // Map
  mapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 10,
  },
  mapItemLocked: {
    opacity: 0.5,
  },
  mapIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mapEmoji: {
    fontSize: 24,
  },
  mapInfo: {
    flex: 1,
  },
  mapName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  mapLevels: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  // Leaderboard
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 8,
  },
  leaderRowYou: {
    backgroundColor: '#e8f4f8',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  leaderRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7f8c8d',
    width: 35,
  },
  leaderAvatar: {
    fontSize: 24,
    marginRight: 10,
  },
  leaderName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  leaderNameYou: {
    color: '#3498db',
  },
  leaderScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  // Friend Challenge
  challengeText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  shareButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  shareGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 10,
  },
  shareText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  // Word Definition
  definitionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  definitionWord: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  definitionText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  definitionClose: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },
  definitionCloseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default {
  SpinWheelModal,
  StatisticsModal,
  AchievementsModal,
  ProgressMapModal,
  LeaderboardModal,
  FriendChallengeModal,
  WordDefinitionModal,
};
