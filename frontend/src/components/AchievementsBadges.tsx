import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'words' | 'levels' | 'streak' | 'speed' | 'special';
  requirement: number;
  reward: number;
  color: string[];
}

export const ACHIEVEMENTS: Achievement[] = [
  // Words Achievements
  { id: 'first_word', name: 'First Steps', description: 'Find your first word', icon: '🌟', category: 'words', requirement: 1, reward: 10, color: ['#FFE66D', '#F7DC6F'] },
  { id: 'word_10', name: 'Word Hunter', description: 'Find 10 words', icon: '📝', category: 'words', requirement: 10, reward: 25, color: ['#4ECDC4', '#45B7D1'] },
  { id: 'word_50', name: 'Vocabulary Builder', description: 'Find 50 words', icon: '📚', category: 'words', requirement: 50, reward: 50, color: ['#A29BFE', '#8B82FD'] },
  { id: 'word_100', name: 'Word Master', description: 'Find 100 words', icon: '🏅', category: 'words', requirement: 100, reward: 100, color: ['#FF6B6B', '#EE5A5A'] },
  { id: 'word_500', name: 'Lexicon Legend', description: 'Find 500 words', icon: '👑', category: 'words', requirement: 500, reward: 250, color: ['#FFD700', '#FFA500'] },
  
  // Levels Achievements
  { id: 'level_5', name: 'Getting Started', description: 'Complete 5 levels', icon: '🎮', category: 'levels', requirement: 5, reward: 30, color: ['#4ECDC4', '#45B7D1'] },
  { id: 'level_25', name: 'Rising Star', description: 'Complete 25 levels', icon: '⭐', category: 'levels', requirement: 25, reward: 75, color: ['#FFE66D', '#F7DC6F'] },
  { id: 'level_50', name: 'Puzzle Pro', description: 'Complete 50 levels', icon: '🧩', category: 'levels', requirement: 50, reward: 150, color: ['#A29BFE', '#8B82FD'] },
  { id: 'level_100', name: 'Century Champion', description: 'Complete 100 levels', icon: '🏆', category: 'levels', requirement: 100, reward: 300, color: ['#FFD700', '#FFA500'] },
  
  // Streak Achievements
  { id: 'streak_3', name: 'Consistent', description: 'Play 3 days in a row', icon: '🔥', category: 'streak', requirement: 3, reward: 50, color: ['#FF6B6B', '#EE5A5A'] },
  { id: 'streak_7', name: 'Weekly Warrior', description: 'Play 7 days in a row', icon: '💪', category: 'streak', requirement: 7, reward: 100, color: ['#FF6B6B', '#D35F44'] },
  { id: 'streak_30', name: 'Dedicated Player', description: 'Play 30 days in a row', icon: '🎯', category: 'streak', requirement: 30, reward: 500, color: ['#FFD700', '#FFA500'] },
  
  // Speed Achievements
  { id: 'speed_30', name: 'Quick Thinker', description: 'Complete a level in under 30 seconds', icon: '⚡', category: 'speed', requirement: 30, reward: 75, color: ['#45B7D1', '#34A7C1'] },
  { id: 'speed_15', name: 'Lightning Fast', description: 'Complete a level in under 15 seconds', icon: '🚀', category: 'speed', requirement: 15, reward: 150, color: ['#FF6B6B', '#EE5A5A'] },
  
  // Special Achievements
  { id: 'no_hints', name: 'Brain Power', description: 'Complete a level without hints', icon: '🧠', category: 'special', requirement: 1, reward: 50, color: ['#A29BFE', '#8B82FD'] },
  { id: 'perfect_10', name: 'Perfect 10', description: 'Complete 10 levels without hints', icon: '💎', category: 'special', requirement: 10, reward: 200, color: ['#4ECDC4', '#45B7D1'] },
];

interface AchievementsBadgesProps {
  visible: boolean;
  onClose: () => void;
  unlockedIds: string[];
  stats: {
    wordsFound: number;
    levelsCompleted: number;
    currentStreak: number;
    fastestTime: number;
    levelsWithoutHints: number;
  };
}

export const AchievementsBadges: React.FC<AchievementsBadgesProps> = ({
  visible,
  onClose,
  unlockedIds,
  stats,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All', icon: '🏆' },
    { id: 'words', name: 'Words', icon: '📝' },
    { id: 'levels', name: 'Levels', icon: '🎮' },
    { id: 'streak', name: 'Streak', icon: '🔥' },
    { id: 'speed', name: 'Speed', icon: '⚡' },
    { id: 'special', name: 'Special', icon: '💎' },
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? ACHIEVEMENTS 
    : ACHIEVEMENTS.filter(a => a.category === selectedCategory);

  const getProgress = (achievement: Achievement): number => {
    switch (achievement.category) {
      case 'words':
        return Math.min(stats.wordsFound / achievement.requirement, 1);
      case 'levels':
        return Math.min(stats.levelsCompleted / achievement.requirement, 1);
      case 'streak':
        return Math.min(stats.currentStreak / achievement.requirement, 1);
      case 'speed':
        return stats.fastestTime <= achievement.requirement ? 1 : 0;
      case 'special':
        return Math.min(stats.levelsWithoutHints / achievement.requirement, 1);
      default:
        return 0;
    }
  };

  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS.length;

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
            <Text style={styles.title}>🏆 Achievements</Text>
            <View style={styles.progressBadge}>
              <Text style={styles.progressText}>{unlockedCount}/{totalCount}</Text>
            </View>
          </View>

          {/* Category Tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
            contentContainerStyle={styles.tabsContent}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.tab, selectedCategory === cat.id && styles.tabActive]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={styles.tabIcon}>{cat.icon}</Text>
                <Text style={[styles.tabText, selectedCategory === cat.id && styles.tabTextActive]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Achievements Grid */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.achievementsGrid}>
              {filteredAchievements.map((achievement) => {
                const isUnlocked = unlockedIds.includes(achievement.id);
                const progress = getProgress(achievement);
                
                return (
                  <View key={achievement.id} style={styles.achievementCard}>
                    <LinearGradient
                      colors={isUnlocked ? achievement.color : ['#333', '#222']}
                      style={styles.achievementGradient}
                    >
                      {!isUnlocked && (
                        <View style={styles.lockedOverlay}>
                          <Text style={styles.lockIcon}>🔒</Text>
                        </View>
                      )}
                      <Text style={[styles.achievementIcon, !isUnlocked && styles.iconLocked]}>
                        {achievement.icon}
                      </Text>
                      <Text style={[styles.achievementName, !isUnlocked && styles.textLocked]}>
                        {achievement.name}
                      </Text>
                      <Text style={[styles.achievementDesc, !isUnlocked && styles.textLocked]}>
                        {achievement.description}
                      </Text>
                      
                      {/* Progress Bar */}
                      {!isUnlocked && (
                        <View style={styles.progressBar}>
                          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                        </View>
                      )}
                      
                      {/* Reward */}
                      <View style={styles.rewardBadge}>
                        <Text style={styles.rewardIcon}>🪙</Text>
                        <Text style={[styles.rewardText, !isUnlocked && styles.textLocked]}>
                          {achievement.reward}
                        </Text>
                      </View>
                      
                      {isUnlocked && (
                        <View style={styles.checkmark}>
                          <Text style={styles.checkmarkText}>✓</Text>
                        </View>
                      )}
                    </LinearGradient>
                  </View>
                );
              })}
            </View>
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
  progressBadge: {
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  progressText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '700',
  },
  tabsContainer: {
    maxHeight: 50,
  },
  tabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabActive: {
    backgroundColor: '#4ECDC4',
  },
  tabIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: (width - 48) / 2,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  achievementGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 160,
    position: 'relative',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  lockIcon: {
    fontSize: 32,
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  iconLocked: {
    opacity: 0.4,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 8,
  },
  textLocked: {
    opacity: 0.5,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  rewardIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AchievementsBadges;
