import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Share,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Challenge {
  id: string;
  challengerId: string;
  challengerName: string;
  challengedId?: string;
  level: number;
  challengerScore: number;
  challengerTime: number;
  status: 'pending' | 'accepted' | 'completed';
  createdAt: string;
}

interface FriendChallengesModalProps {
  visible: boolean;
  onClose: () => void;
  pendingChallenges: Challenge[];
  onAcceptChallenge: (challenge: Challenge) => void;
  onCreateChallenge: (friendCode: string) => void;
  currentLevel: number;
  currentScore: number;
}

export const FriendChallengesModal: React.FC<FriendChallengesModalProps> = ({
  visible,
  onClose,
  pendingChallenges,
  onAcceptChallenge,
  onCreateChallenge,
  currentLevel,
  currentScore,
}) => {
  const [friendCode, setFriendCode] = useState('');
  const [activeTab, setActiveTab] = useState<'received' | 'create'>('received');

  const handleShareChallenge = async () => {
    try {
      await Share.share({
        message: `🎮 Challenge me in Wonder Words Quest!\n\nI just scored ${currentScore} points on Level ${currentLevel}. Can you beat me?\n\nDownload: [App Link]\nMy Code: ABC123`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>🤜 Friend Challenges</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'received' && styles.activeTab]}
              onPress={() => setActiveTab('received')}
            >
              <Text style={[styles.tabText, activeTab === 'received' && styles.activeTabText]}>
                Received ({pendingChallenges.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'create' && styles.activeTab]}
              onPress={() => setActiveTab('create')}
            >
              <Text style={[styles.tabText, activeTab === 'create' && styles.activeTabText]}>
                Create
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'received' ? (
            <View style={styles.content}>
              {pendingChallenges.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>📬</Text>
                  <Text style={styles.emptyText}>No pending challenges</Text>
                  <Text style={styles.emptySubtext}>Challenge a friend to get started!</Text>
                </View>
              ) : (
                pendingChallenges.map((challenge) => (
                  <View key={challenge.id} style={styles.challengeCard}>
                    <View style={styles.challengeInfo}>
                      <Text style={styles.challengerName}>{challenge.challengerName}</Text>
                      <Text style={styles.challengeDetails}>
                        Level {challenge.level} • {challenge.challengerScore} pts
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => onAcceptChallenge(challenge)}
                    >
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          ) : (
            <View style={styles.content}>
              <View style={styles.createSection}>
                <Text style={styles.createTitle}>📤 Challenge a Friend</Text>
                
                <TextInput
                  style={styles.input}
                  placeholder="Enter friend's code"
                  placeholderTextColor="#666"
                  value={friendCode}
                  onChangeText={setFriendCode}
                  autoCapitalize="characters"
                />

                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    !friendCode && styles.sendButtonDisabled,
                  ]}
                  onPress={() => onCreateChallenge(friendCode)}
                  disabled={!friendCode}
                >
                  <Text style={styles.sendText}>Send Challenge</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={handleShareChallenge}
                >
                  <Text style={styles.shareIcon}>📤</Text>
                  <Text style={styles.shareText}>Share Challenge Link</Text>
                </TouchableOpacity>

                <View style={styles.myCodeBox}>
                  <Text style={styles.myCodeLabel}>Your Code</Text>
                  <Text style={styles.myCode}>ABC123</Text>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const ChallengeButton: React.FC<{
  pendingCount: number;
  onPress: () => void;
}> = ({ pendingCount, onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Text style={styles.floatingIcon}>🤜</Text>
      {pendingCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{pendingCount}</Text>
        </View>
      )}
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
    maxHeight: '80%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 22,
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
    padding: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8b5cf6',
  },
  tabText: {
    color: '#9ca3af',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#8b5cf6',
  },
  content: {
    padding: 16,
    minHeight: 200,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubtext: {
    color: '#9ca3af',
    marginTop: 8,
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengerName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  challengeDetails: {
    color: '#9ca3af',
    marginTop: 4,
  },
  acceptButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createSection: {
    alignItems: 'center',
  },
  createTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
  },
  sendButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    color: '#9ca3af',
    marginHorizontal: 16,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shareIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  shareText: {
    color: '#fff',
    fontWeight: '600',
  },
  myCodeBox: {
    marginTop: 24,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  myCodeLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
  },
  myCode: {
    color: '#8b5cf6',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  floatingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default FriendChallengesModal;
