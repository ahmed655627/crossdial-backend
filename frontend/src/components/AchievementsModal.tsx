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
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORIES,
  RARITY_COLORS,
  checkAchievementProgress,
  Achievement,
} from '../data/achievements';

const { width, height } = Dimensions.get('window');

interface AchievementsModalProps {
  visible: boolean;
  onClose: () => void;
  unlockedAchievements: string[];
  stats: {
    wordsFound: number;
    levelsCompleted: number;
    streakDays: number;
    fastestTime: number;
    bonusWords: number;
    hintsUnused: number;
    perfectLevels: number;
    dailyCompleted: number;
    coinsEarned: number;
  };
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({
  visible,
  onClose,
  unlockedAchievements,
  stats,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('words');

  const filteredAchievements = ACHIEVEMENTS.filter(
    (a) => a.category === selectedCategory
  );

  const totalUnlocked = unlockedAchievements.length;
  const totalAchievements = ACHIEVEMENTS.length;
  const progressPercent = (totalUnlocked / totalAchievements) * 100;

  const renderAchievementCard = (achievement: Achievement) => {
    const { unlocked, progress, max } = checkAchievementProgress(achievement, stats);
    const isUnlocked = unlockedAchievements.includes(achievement.id) || unlocked;

    return (
      <View
        key={achievement.id}
        style={[
          styles.achievementCard,
          isUnlocked && styles.achievementCardUnlocked,
          { borderLeftColor: RARITY_COLORS[achievement.rarity] },
        ]}
      >
        <View style={styles.achievementIcon}>
          <Text style={[styles.iconText, !isUnlocked && styles.iconLocked]}>
            {isUnlocked ? achievement.icon : '🔒'}
          </Text>
        </View>
        <View style={styles.achievementInfo}>
          <View style={styles.achievementHeader}>
            <Text style={[styles.achievementName, !isUnlocked && styles.textLocked]}>
              {achievement.name}
            </Text>
            <View
              style={[
                styles.rarityBadge,
                { backgroundColor: RARITY_COLORS[achievement.rarity] },
              ]}
            >
              <Text style={styles.rarityText}>
                {achievement.rarity.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={[styles.achievementDesc, !isUnlocked && styles.textLocked]}>
            {achievement.description}
          </Text>
          
          {/* Progress bar */}
          {!isUnlocked && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(progress / max) * 100}%`,
                      backgroundColor: RARITY_COLORS[achievement.rarity],
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {progress}/{max}
              </Text>
            </View>
          )}

          {/* Rewards */}
          <View style={styles.rewardsRow}>
            <Text style={styles.rewardItem}>🪙 {achievement.rewards.coins}</Text>
            <Text style={styles.rewardItem}>💡 {achievement.rewards.hints}</Text>
          </View>
        </View>
      </View>
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
              <Text style={styles.title}>🏆 Achievements</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Overall Progress */}
            <View style={styles.overallProgress}>
              <Text style={styles.progressLabel}>
                {totalUnlocked} / {totalAchievements} Unlocked
              </Text>
              <View style={styles.overallProgressBar}>
                <View
                  style={[
                    styles.overallProgressFill,
                    { width: `${progressPercent}%` },
                  ]}
                />
              </View>
            </View>

            {/* Category Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryTabs}
            >
              {ACHIEVEMENT_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryTab,
                    selectedCategory === cat.id && styles.categoryTabActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      styles.categoryName,
                      selectedCategory === cat.id && styles.categoryNameActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Achievements List */}
            <ScrollView style={styles.achievementsList}>
              {filteredAchievements.map(renderAchievementCard)}
            </ScrollView>
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
    width: width * 0.95,
    height: height * 0.85,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  overallProgress: {
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  overallProgressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: '#f39c12',
    borderRadius: 4,
  },
  categoryTabs: {
    marginBottom: 15,
    maxHeight: 60,
  },
  categoryTab: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  categoryTabActive: {
    backgroundColor: 'rgba(102,126,234,0.3)',
    borderColor: '#667eea',
    borderWidth: 1,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  categoryNameActive: {
    color: '#fff',
  },
  achievementsList: {
    flex: 1,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  achievementCardUnlocked: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  iconLocked: {
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  textLocked: {
    color: '#666',
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  rarityText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fff',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#888',
  },
  rewardsRow: {
    flexDirection: 'row',
  },
  rewardItem: {
    fontSize: 12,
    color: '#f39c12',
    marginRight: 15,
  },
});

export default AchievementsModal;
