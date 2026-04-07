import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  TimedChallenge,
  TIMED_CHALLENGES,
  DIFFICULTY_COLORS,
  calculateStars,
  getUnlockedTimedChallenges,
} from '../data/timedChallenges';

const { width } = Dimensions.get('window');

interface TimedChallengeModalProps {
  visible: boolean;
  onClose: () => void;
  onStartChallenge: (challenge: TimedChallenge) => void;
  currentLevel: number;
  completedChallenges: { [id: number]: { stars: number; bestTime: number } };
}

const TimedChallengeModal: React.FC<TimedChallengeModalProps> = ({
  visible,
  onClose,
  onStartChallenge,
  currentLevel,
  completedChallenges,
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<TimedChallenge | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const unlockedChallenges = getUnlockedTimedChallenges(currentLevel);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const renderStars = (count: number, size: number = 20) => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3].map((star) => (
          <Text
            key={star}
            style={[styles.star, { fontSize: size, opacity: star <= count ? 1 : 0.3 }]}
          >
            ⭐
          </Text>
        ))}
      </View>
    );
  };

  const renderChallengeCard = (challenge: TimedChallenge) => {
    const isUnlocked = challenge.unlockLevel <= currentLevel;
    const completed = completedChallenges[challenge.id];
    const stars = completed?.stars || 0;

    return (
      <TouchableOpacity
        key={challenge.id}
        style={[
          styles.challengeCard,
          !isUnlocked && styles.challengeCardLocked,
        ]}
        onPress={() => isUnlocked && setSelectedChallenge(challenge)}
        disabled={!isUnlocked}
      >
        <View
          style={[
            styles.difficultyStripe,
            { backgroundColor: DIFFICULTY_COLORS[challenge.difficulty] },
          ]}
        />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.challengeName, !isUnlocked && styles.textLocked]}>
              {challenge.name}
            </Text>
            {!isUnlocked ? (
              <Text style={styles.lockIcon}>🔒</Text>
            ) : (
              renderStars(stars, 16)
            )}
          </View>
          <Text style={[styles.challengeDesc, !isUnlocked && styles.textLocked]} numberOfLines={1}>
            {isUnlocked ? challenge.description : `Unlock at Level ${challenge.unlockLevel}`}
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeIcon}>⏱</Text>
              <Text style={styles.timeText}>{challenge.timeLimit}s</Text>
            </View>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: DIFFICULTY_COLORS[challenge.difficulty] },
              ]}
            >
              <Text style={styles.difficultyText}>
                {challenge.difficulty.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>⏱ Timed Challenges</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Challenge List */}
            {!selectedChallenge ? (
              <View style={styles.challengeList}>
                {TIMED_CHALLENGES.map(renderChallengeCard)}
              </View>
            ) : (
              /* Challenge Details */
              <View style={styles.detailsContainer}>
                <Animated.View
                  style={[styles.timerCircle, { transform: [{ scale: pulseAnim }] }]}
                >
                  <LinearGradient
                    colors={[DIFFICULTY_COLORS[selectedChallenge.difficulty], '#1a1a2e']}
                    style={styles.timerGradient}
                  >
                    <Text style={styles.timerNumber}>{selectedChallenge.timeLimit}</Text>
                    <Text style={styles.timerLabel}>seconds</Text>
                  </LinearGradient>
                </Animated.View>

                <Text style={styles.detailName}>{selectedChallenge.name}</Text>
                <Text style={styles.detailDesc}>{selectedChallenge.description}</Text>

                {/* Star Thresholds */}
                <View style={styles.thresholdsContainer}>
                  <Text style={styles.thresholdsTitle}>Star Thresholds</Text>
                  <View style={styles.thresholdRow}>
                    <Text style={styles.thresholdStars}>⭐⭐⭐</Text>
                    <Text style={styles.thresholdTime}>
                      Under {selectedChallenge.starThresholds.three}s
                    </Text>
                    <Text style={styles.thresholdReward}>
                      🪙 {selectedChallenge.rewards.threeStars.coins}
                    </Text>
                  </View>
                  <View style={styles.thresholdRow}>
                    <Text style={styles.thresholdStars}>⭐⭐</Text>
                    <Text style={styles.thresholdTime}>
                      Under {selectedChallenge.starThresholds.two}s
                    </Text>
                    <Text style={styles.thresholdReward}>
                      🪙 {selectedChallenge.rewards.twoStars.coins}
                    </Text>
                  </View>
                  <View style={styles.thresholdRow}>
                    <Text style={styles.thresholdStars}>⭐</Text>
                    <Text style={styles.thresholdTime}>
                      Under {selectedChallenge.starThresholds.one}s
                    </Text>
                    <Text style={styles.thresholdReward}>
                      🪙 {selectedChallenge.rewards.oneStar.coins}
                    </Text>
                  </View>
                </View>

                {/* Best Time */}
                {completedChallenges[selectedChallenge.id] && (
                  <View style={styles.bestTimeContainer}>
                    <Text style={styles.bestTimeLabel}>Your Best:</Text>
                    <Text style={styles.bestTimeValue}>
                      {completedChallenges[selectedChallenge.id].bestTime}s
                    </Text>
                    {renderStars(completedChallenges[selectedChallenge.id].stars, 24)}
                  </View>
                )}

                {/* Buttons */}
                <View style={styles.detailButtons}>
                  <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => setSelectedChallenge(null)}
                  >
                    <Text style={styles.backText}>← Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.startBtn}
                    onPress={() => {
                      onStartChallenge(selectedChallenge);
                      onClose();
                    }}
                  >
                    <LinearGradient
                      colors={[DIFFICULTY_COLORS[selectedChallenge.difficulty], '#1a1a2e']}
                      style={styles.startGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.startText}>▶ Start Challenge</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </LinearGradient>
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
  modal: {
    width: width * 0.9,
    maxHeight: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: '#888',
  },
  challengeList: {},
  challengeCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  challengeCardLocked: {
    opacity: 0.5,
  },
  difficultyStripe: {
    width: 6,
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  textLocked: {
    color: '#666',
  },
  lockIcon: {
    fontSize: 18,
  },
  starsRow: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 1,
  },
  challengeDesc: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    alignItems: 'center',
  },
  timerCircle: {
    marginBottom: 20,
  },
  timerGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  timerLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  detailDesc: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  thresholdsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  thresholdsTitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  thresholdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  thresholdStars: {
    fontSize: 14,
    width: 60,
  },
  thresholdTime: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  thresholdReward: {
    fontSize: 14,
    color: '#f39c12',
    width: 60,
    textAlign: 'right',
  },
  bestTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46,204,113,0.2)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  bestTimeLabel: {
    fontSize: 14,
    color: '#888',
    marginRight: 8,
  },
  bestTimeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginRight: 10,
  },
  detailButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    marginRight: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  startBtn: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  startGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TimedChallengeModal;
