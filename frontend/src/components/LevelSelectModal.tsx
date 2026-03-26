import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';

const { width, height } = Dimensions.get('window');

interface LevelSelectModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({ visible, onClose }) => {
  const { levels, progress, setCurrentLevel, currentLevel } = useGameStore();
  
  const handleSelectLevel = (levelId: number) => {
    // Can only select completed levels or the current level
    if (progress?.completed_levels.includes(levelId) || levelId <= (progress?.current_level || 1)) {
      setCurrentLevel(levelId);
      onClose();
    }
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>World Wonders</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#2c3e50" />
            </TouchableOpacity>
          </View>
          
          {/* Level list */}
          <ScrollView style={styles.levelList} showsVerticalScrollIndicator={false}>
            {levels.map((level) => {
              const isCompleted = progress?.completed_levels.includes(level.id);
              const isCurrent = level.id === progress?.current_level;
              const isLocked = level.id > (progress?.current_level || 1);
              const isActive = currentLevel?.id === level.id;
              
              return (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.levelItem,
                    isCompleted && styles.levelCompleted,
                    isCurrent && styles.levelCurrent,
                    isLocked && styles.levelLocked,
                    isActive && styles.levelActive,
                  ]}
                  onPress={() => handleSelectLevel(level.id)}
                  disabled={isLocked}
                >
                  <View style={styles.levelInfo}>
                    <View style={styles.levelNumber}>
                      {isCompleted ? (
                        <Ionicons name="checkmark-circle" size={28} color="#27ae60" />
                      ) : isLocked ? (
                        <Ionicons name="lock-closed" size={24} color="#95a5a6" />
                      ) : (
                        <Text style={styles.levelNumberText}>{level.id}</Text>
                      )}
                    </View>
                    <View style={styles.levelDetails}>
                      <Text style={[
                        styles.wonderName,
                        isLocked && styles.textLocked
                      ]}>
                        {level.wonder}
                      </Text>
                      <Text style={[
                        styles.location,
                        isLocked && styles.textLocked
                      ]}>
                        {level.location}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.levelStats}>
                    <Text style={[
                      styles.wordCount,
                      isLocked && styles.textLocked
                    ]}>
                      {level.targetWords.length} words
                    </Text>
                    {isCurrent && !isCompleted && (
                      <View style={styles.currentBadge}>
                        <Text style={styles.currentBadgeText}>CURRENT</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.75,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 5,
  },
  levelList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  levelCompleted: {
    backgroundColor: '#e8f8f0',
    borderColor: '#27ae60',
  },
  levelCurrent: {
    backgroundColor: '#fff9e6',
    borderColor: '#f1c40f',
  },
  levelLocked: {
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
  levelActive: {
    borderColor: '#3498db',
    borderWidth: 3,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelNumber: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  levelDetails: {
    flex: 1,
  },
  wonderName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  textLocked: {
    color: '#bdc3c7',
  },
  levelStats: {
    alignItems: 'flex-end',
  },
  wordCount: {
    fontSize: 12,
    color: '#95a5a6',
  },
  currentBadge: {
    backgroundColor: '#f1c40f',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 5,
  },
  currentBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fff',
  },
});
