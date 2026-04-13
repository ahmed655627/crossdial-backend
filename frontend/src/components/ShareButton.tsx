/**
 * Share Button Component
 * Minimal share functionality
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ShareButtonProps {
  level: number;
  wordsFound: number;
  totalWords: number;
  timeSpent?: number;
  style?: any;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  level,
  wordsFound,
  totalWords,
  timeSpent,
  style,
}) => {
  const handleShare = async () => {
    const stars = wordsFound === totalWords ? '⭐⭐⭐' : wordsFound >= totalWords * 0.6 ? '⭐⭐' : '⭐';
    const timeText = timeSpent ? `in ${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s` : '';
    
    const message = `🌍 CrossDial Puzzles\n\n` +
      `I completed Level ${level} ${timeText}!\n` +
      `${stars} ${wordsFound}/${totalWords} words found\n\n` +
      `Can you beat my score? 🎯`;

    try {
      await Share.share({
        message,
        title: 'CrossDial Puzzles',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handleShare}>
      <Ionicons name="share-outline" size={18} color="#fff" />
      <Text style={styles.text}>Share</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default ShareButton;
