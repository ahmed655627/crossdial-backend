import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// Word of the day data
const WORDS_OF_DAY = [
  { word: 'SERENITY', definition: 'The state of being calm and peaceful', example: 'She found serenity in the garden.' },
  { word: 'EPHEMERAL', definition: 'Lasting for a very short time', example: 'The ephemeral beauty of cherry blossoms.' },
  { word: 'RESILIENT', definition: 'Able to recover quickly from difficulties', example: 'Children are remarkably resilient.' },
  { word: 'LUMINOUS', definition: 'Bright or shining, especially in the dark', example: 'The luminous moon lit up the night.' },
  { word: 'WANDERLUST', definition: 'A strong desire to travel', example: 'Her wanderlust took her to many countries.' },
  { word: 'EUPHORIA', definition: 'A feeling of intense happiness', example: 'She felt euphoria after winning.' },
  { word: 'TRANQUIL', definition: 'Free from disturbance; calm', example: 'The tranquil lake reflected the mountains.' },
];

interface WordOfTheDayProps {
  visible: boolean;
  onClose: () => void;
  onReward: (coins: number) => void;
}

export const WordOfTheDay: React.FC<WordOfTheDayProps> = ({
  visible,
  onClose,
  onReward,
}) => {
  const [todayWord, setTodayWord] = useState(WORDS_OF_DAY[0]);
  const [hasClaimedToday, setHasClaimedToday] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);

  useEffect(() => {
    if (visible) {
      loadTodayWord();
    }
  }, [visible]);

  const loadTodayWord = async () => {
    try {
      const today = new Date().toDateString();
      const dayIndex = new Date().getDay();
      setTodayWord(WORDS_OF_DAY[dayIndex % WORDS_OF_DAY.length]);
      
      const lastClaimed = await AsyncStorage.getItem('wordOfDayLastClaimed');
      setHasClaimedToday(lastClaimed === today);
    } catch (e) {
      console.log('Error loading word of day:', e);
    }
  };

  const handleLearn = async () => {
    if (!hasClaimedToday) {
      const today = new Date().toDateString();
      await AsyncStorage.setItem('wordOfDayLastClaimed', today);
      setHasClaimedToday(true);
      onReward(15);
    }
    setShowDefinition(true);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📚 Word of the Day: ${todayWord.word}\n\n"${todayWord.definition}"\n\nExample: "${todayWord.example}"\n\nLearn more words with WonderWordQuest!`,
      });
    } catch (e) {
      console.log('Error sharing:', e);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#1a1a3e', '#2d2d5a', '#1a1a3e']}
            style={styles.content}
          >
            {/* Close button */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
            
            {/* Header */}
            <Text style={styles.title}>📚 Word of the Day</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
            
            {/* Word display */}
            <View style={styles.wordContainer}>
              <LinearGradient
                colors={['#4ECDC4', '#45B7D1']}
                style={styles.wordGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.word}>{todayWord.word}</Text>
              </LinearGradient>
            </View>
            
            {/* Definition (shown after learning) */}
            {showDefinition ? (
              <View style={styles.definitionContainer}>
                <Text style={styles.definitionLabel}>Definition:</Text>
                <Text style={styles.definition}>{todayWord.definition}</Text>
                
                <Text style={styles.exampleLabel}>Example:</Text>
                <Text style={styles.example}>"{todayWord.example}"</Text>
                
                {/* Share button */}
                <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                  <Text style={styles.shareBtnText}>📤 Share with Friends</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.learnContainer}>
                <Text style={styles.learnPrompt}>Tap to learn this word!</Text>
                <TouchableOpacity style={styles.learnBtn} onPress={handleLearn}>
                  <LinearGradient
                    colors={['#FFE66D', '#F7DC6F']}
                    style={styles.learnGradient}
                  >
                    <Text style={styles.learnBtnText}>
                      {hasClaimedToday ? '📖 Learn' : '📖 Learn (+15 🪙)'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
            
            {/* Streak info */}
            <View style={styles.streakInfo}>
              <Text style={styles.streakText}>🔥 Learn daily to build vocabulary!</Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    maxWidth: 400,
  },
  content: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 24,
  },
  wordContainer: {
    marginBottom: 24,
  },
  wordGradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  word: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  definitionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  definitionLabel: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  definition: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  exampleLabel: {
    fontSize: 12,
    color: '#FFE66D',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  example: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  shareBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  shareBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  learnContainer: {
    alignItems: 'center',
  },
  learnPrompt: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 16,
  },
  learnBtn: {
    shadowColor: '#FFE66D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  learnGradient: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  learnBtnText: {
    color: '#1a1a3e',
    fontSize: 16,
    fontWeight: '800',
  },
  streakInfo: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  streakText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default WordOfTheDay;
