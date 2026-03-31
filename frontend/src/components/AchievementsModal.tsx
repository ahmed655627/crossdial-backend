import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '../store/gameStore';

const { width } = Dimensions.get('window');

interface AchievementsModalProps {
  visible: boolean;
  onClose: () => void;
}

// Achievement definitions
const ACHIEVEMENTS = [
  {
    id: 'first_word',
    title: 'First Discovery',
    description: 'Find your first word',
    icon: 'star',
    color: ['#f1c40f', '#f39c12'],
    requirement: (progress: any) => (progress?.found_words && Object.keys(progress.found_words).length > 0),
  },
  {
    id: 'level_5',
    title: 'Getting Started',
    description: 'Complete 5 levels',
    icon: 'rocket',
    color: ['#3498db', '#2980b9'],
    requirement: (progress: any) => (progress?.completed_levels?.length || 0) >= 5,
  },
  {
    id: 'level_10',
    title: 'Explorer',
    description: 'Complete 10 levels',
    icon: 'compass',
    color: ['#9b59b6', '#8e44ad'],
    requirement: (progress: any) => (progress?.completed_levels?.length || 0) >= 10,
  },
  {
    id: 'level_25',
    title: 'Adventurer',
    description: 'Complete 25 levels',
    icon: 'map',
    color: ['#e74c3c', '#c0392b'],
    requirement: (progress: any) => (progress?.completed_levels?.length || 0) >= 25,
  },
  {
    id: 'level_50',
    title: 'World Traveler',
    description: 'Complete 50 levels',
    icon: 'airplane',
    color: ['#1abc9c', '#16a085'],
    requirement: (progress: any) => (progress?.completed_levels?.length || 0) >= 50,
  },
  {
    id: 'level_100',
    title: 'Wonder Seeker',
    description: 'Complete 100 levels',
    icon: 'trophy',
    color: ['#FFD700', '#FFA500'],
    requirement: (progress: any) => (progress?.completed_levels?.length || 0) >= 100,
  },
  {
    id: 'level_150',
    title: 'Master Explorer',
    description: 'Complete all 150 levels',
    icon: 'medal',
    color: ['#e74c3c', '#c0392b'],
    requirement: (progress: any) => (progress?.completed_levels?.length || 0) >= 150,
  },
  {
    id: 'bonus_10',
    title: 'Word Hunter',
    description: 'Find 10 bonus words',
    icon: 'diamond',
    color: ['#9b59b6', '#8e44ad'],
    requirement: (progress: any) => (progress?.total_bonus_words || 0) >= 10,
  },
  {
    id: 'bonus_50',
    title: 'Bonus Master',
    description: 'Find 50 bonus words',
    icon: 'sparkles',
    color: ['#e67e22', '#d35400'],
    requirement: (progress: any) => (progress?.total_bonus_words || 0) >= 50,
  },
  {
    id: 'coins_500',
    title: 'Coin Collector',
    description: 'Collect 500 coins',
    icon: 'cash',
    color: ['#f1c40f', '#f39c12'],
    requirement: (progress: any) => (progress?.coins || 0) >= 500,
  },
  {
    id: 'coins_1000',
    title: 'Rich Explorer',
    description: 'Collect 1000 coins',
    icon: 'wallet',
    color: ['#27ae60', '#2ecc71'],
    requirement: (progress: any) => (progress?.coins || 0) >= 1000,
  },
  {
    id: 'hints_0',
    title: 'No Help Needed',
    description: 'Complete a level without hints',
    icon: 'bulb',
    color: ['#3498db', '#2980b9'],
    requirement: (progress: any) => (progress?.completed_levels?.length || 0) > 0 && (progress?.hints_used || 0) === 0,
  },
];

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ visible, onClose }) => {
  const { progress } = useGameStore();
  
  const unlockedCount = ACHIEVEMENTS.filter(a => a.requirement(progress)).length;
  
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <LinearGradient
            colors={['#f39c12', '#e67e22']}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <Ionicons name="trophy" size={28} color="#fff" />
              <Text style={styles.title}>Achievements</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close-circle" size={32} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Progress Summary */}
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              {unlockedCount} / {ACHIEVEMENTS.length} Unlocked
            </Text>
            <View style={styles.summaryBar}>
              <View 
                style={[
                  styles.summaryBarFill, 
                  { width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%` }
                ]} 
              />
            </View>
          </View>

          {/* Achievements List */}
          <ScrollView 
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {ACHIEVEMENTS.map((achievement) => {
              const isUnlocked = achievement.requirement(progress);
              
              return (
                <View 
                  key={achievement.id} 
                  style={[
                    styles.achievementCard,
                    !isUnlocked && styles.achievementLocked,
                  ]}
                >
                  <LinearGradient
                    colors={isUnlocked ? achievement.color : ['#95a5a6', '#7f8c8d']}
                    style={styles.achievementIcon}
                  >
                    <Ionicons 
                      name={achievement.icon as any} 
                      size={28} 
                      color="#fff" 
                    />
                  </LinearGradient>
                  
                  <View style={styles.achievementInfo}>
                    <Text style={[
                      styles.achievementTitle,
                      !isUnlocked && styles.textLocked,
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={[
                      styles.achievementDesc,
                      !isUnlocked && styles.textLocked,
                    ]}>
                      {achievement.description}
                    </Text>
                  </View>
                  
                  {isUnlocked ? (
                    <Ionicons name="checkmark-circle" size={28} color="#27ae60" />
                  ) : (
                    <Ionicons name="lock-closed" size={24} color="#bdc3c7" />
                  )}
                </View>
              );
            })}
          </ScrollView>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },
  summary: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  summaryBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  summaryBarFill: {
    height: '100%',
    backgroundColor: '#f39c12',
    borderRadius: 4,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  achievementLocked: {
    opacity: 0.7,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 3,
  },
  achievementDesc: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  textLocked: {
    color: '#95a5a6',
  },
});
