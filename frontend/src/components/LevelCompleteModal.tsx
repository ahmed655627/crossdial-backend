import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';
import { adManager } from '../utils/adManager';

const { width, height } = Dimensions.get('window');

// Show ads every N levels (better user experience)
const AD_FREQUENCY = 3;

export const LevelCompleteModal: React.FC = () => {
  const { showLevelComplete, currentLevel, progress, completeLevel, bonusWordsFound } = useGameStore();
  const [showingAd, setShowingAd] = useState(false);
  const [doubleRewards, setDoubleRewards] = useState(false);
  const [gettingDoubleRewards, setGettingDoubleRewards] = useState(false);
  
  if (!showLevelComplete || !currentLevel) return null;

  // Check if we should show an ad (every 3 levels)
  const completedLevels = progress?.completed_levels?.length || 0;
  const shouldShowAd = (completedLevels + 1) % AD_FREQUENCY === 0;

  const handleDoubleRewards = async () => {
    setGettingDoubleRewards(true);
    const rewarded = await adManager.showVideoRewardedAd();
    if (rewarded) {
      setDoubleRewards(true);
    }
    setGettingDoubleRewards(false);
  };

  const handleContinue = async () => {
    if (shouldShowAd) {
      // Show interstitial ad every 3 levels (Play Store compliant)
      setShowingAd(true);
      await adManager.showInterstitialAd();
      setShowingAd(false);
    }
    // Track level completion for ad frequency
    await adManager.onLevelComplete();
    completeLevel();
    setDoubleRewards(false);
  };
  
  return (
    <Modal
      visible={showLevelComplete}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {showingAd ? (
            <View style={styles.adContainer}>
              <ActivityIndicator size="large" color="#3498db" />
              <Text style={styles.adText}>Loading...</Text>
            </View>
          ) : (
            <>
              {/* Stars */}
              <View style={styles.starsContainer}>
                <Ionicons name="star" size={40} color="#FFD700" />
                <Ionicons name="star" size={56} color="#FFD700" style={styles.centerStar} />
                <Ionicons name="star" size={40} color="#FFD700" />
              </View>
              
              {/* Title */}
              <Text style={styles.title}>Level Complete!</Text>
              
              {/* Wonder info */}
              <Text style={styles.wonderName}>{currentLevel.wonder}</Text>
              <Text style={styles.location}>{currentLevel.location}</Text>
              
              {/* Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
                  <Text style={styles.statValue}>{currentLevel.targetWords.length}</Text>
                  <Text style={styles.statLabel}>Words Found</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="diamond" size={24} color="#9b59b6" />
                  <Text style={styles.statValue}>{bonusWordsFound.length}</Text>
                  <Text style={styles.statLabel}>Bonus Words</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="cash" size={24} color="#f1c40f" />
                  <Text style={styles.statValue}>{doubleRewards ? '+100' : '+50'}</Text>
                  <Text style={styles.statLabel}>{doubleRewards ? '2x Coins!' : 'Coins'}</Text>
                </View>
              </View>
              
              {/* Double Rewards Button */}
              {!doubleRewards && (
                <TouchableOpacity 
                  style={styles.doubleRewardsButton} 
                  onPress={handleDoubleRewards}
                  disabled={gettingDoubleRewards}
                >
                  <Ionicons name="play-circle" size={18} color="#fff" />
                  <Text style={styles.doubleRewardsText}>
                    {gettingDoubleRewards ? 'Loading...' : 'Watch Ad for 2x Coins!'}
                  </Text>
                </TouchableOpacity>
              )}
              
              {/* Continue button */}
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    width: width * 0.85,
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  adContainer: {
    padding: 40,
    alignItems: 'center',
  },
  adText: {
    marginTop: 15,
    fontSize: 16,
    color: '#7f8c8d',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  centerStar: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  wonderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3498db',
    textAlign: 'center',
  },
  location: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ecf0f1',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 11,
    color: '#95a5a6',
    marginTop: 2,
  },
  doubleRewardsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
    gap: 8,
  },
  doubleRewardsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    gap: 10,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
