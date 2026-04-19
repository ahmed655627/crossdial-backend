/**
 * Level Category Card
 * Shows category with beautiful preview image
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface LevelCategoryCardProps {
  id: string;
  name: string;
  icon: string;
  levelsRange: string;
  completedLevels: number;
  totalLevels: number;
  isUnlocked: boolean;
  previewImage?: string;
  onPress: () => void;
}

// Default preview images for categories
const CATEGORY_IMAGES: { [key: string]: string } = {
  basics: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
  food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
  science: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400',
  culture: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
  advanced: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
  master: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400',
};

const LevelCategoryCard: React.FC<LevelCategoryCardProps> = ({
  id,
  name,
  icon,
  levelsRange,
  completedLevels,
  totalLevels,
  isUnlocked,
  previewImage,
  onPress,
}) => {
  const progress = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;
  const imageUrl = previewImage || CATEGORY_IMAGES[id.toLowerCase()] || CATEGORY_IMAGES.basics;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!isUnlocked}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.1)',
            'rgba(0, 0, 0, 0.7)',
          ]}
          style={styles.gradient}
        >
          {/* Lock overlay for locked categories */}
          {!isUnlocked && (
            <View style={styles.lockOverlay}>
              <Ionicons name="lock-closed" size={32} color="#fff" />
            </View>
          )}

          {/* Icon */}
          <Text style={styles.icon}>{icon}</Text>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.range}>{levelsRange}</Text>

            {/* Progress bar */}
            {isUnlocked && (
              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${Math.max(3, progress)}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {completedLevels}/{totalLevels}
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.2,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 12,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
  },
  infoContainer: {
    // Bottom of card
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  range: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00b894',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
});

export default LevelCategoryCard;
