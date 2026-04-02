import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Share,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

interface WordOfDayModalProps {
  visible: boolean;
  onClose: () => void;
  word: {
    word: string;
    definition: string;
    pronunciation?: string;
    example?: string;
    origin?: string;
  } | null;
}

const WORDS_DATABASE = [
  {
    word: 'Serendipity',
    definition: 'The occurrence of events by chance in a happy way.',
    pronunciation: 'ser-uhn-DIP-i-tee',
    example: 'Finding that book was pure serendipity.',
    origin: 'Coined in 1754 from a Persian fairy tale.',
  },
  {
    word: 'Ephemeral',
    definition: 'Lasting for a very short time.',
    pronunciation: 'ih-FEM-er-uhl',
    example: 'The beauty of cherry blossoms is ephemeral.',
    origin: 'From Greek ephemeros meaning "lasting only a day".',
  },
  {
    word: 'Petrichor',
    definition: 'The pleasant smell that comes after rain.',
    pronunciation: 'PET-ri-kor',
    example: 'I love the petrichor after a summer storm.',
    origin: 'From Greek petra (stone) and ichor (blood of gods).',
  },
  {
    word: 'Luminous',
    definition: 'Full of or giving off light; bright or shining.',
    pronunciation: 'LOO-muh-nuhs',
    example: 'The luminous stars lit up the night sky.',
    origin: 'From Latin luminosus meaning "full of light".',
  },
  {
    word: 'Eloquent',
    definition: 'Fluent or persuasive in speaking or writing.',
    pronunciation: 'EL-uh-kwuhnt',
    example: 'She gave an eloquent speech that moved everyone.',
    origin: 'From Latin eloquens meaning "speaking out".',
  },
];

export const WordOfDayModal: React.FC<WordOfDayModalProps> = ({
  visible,
  onClose,
  word: propWord,
}) => {
  const [scaleAnim] = useState(new Animated.Value(0));
  
  // Use prop word or get random word based on date
  const getTodaysWord = () => {
    if (propWord) return propWord;
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return WORDS_DATABASE[dayOfYear % WORDS_DATABASE.length];
  };
  
  const word = getTodaysWord();

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📚 Word of the Day: ${word.word}\n\n${word.definition}\n\nExample: "${word.example}"\n\nLearn more words with Wonder Words Quest!`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  if (!word) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.header}>
            <Text style={styles.headerIcon}>📚</Text>
            <Text style={styles.title}>Word of the Day</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.word}>{word.word}</Text>
            {word.pronunciation && (
              <Text style={styles.pronunciation}>/{word.pronunciation}/</Text>
            )}
            
            <View style={styles.definitionBox}>
              <Text style={styles.definitionLabel}>Definition</Text>
              <Text style={styles.definition}>{word.definition}</Text>
            </View>

            {word.example && (
              <View style={styles.exampleBox}>
                <Text style={styles.exampleLabel}>Example</Text>
                <Text style={styles.example}>"{word.example}"</Text>
              </View>
            )}

            {word.origin && (
              <View style={styles.originBox}>
                <Text style={styles.originIcon}>📜</Text>
                <Text style={styles.origin}>{word.origin}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareIcon}>📤</Text>
              <Text style={styles.shareText}>Share this word</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Got it!</Text>
          </TouchableOpacity>
        </Animated.View>
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
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  header: {
    backgroundColor: '#8b5cf6',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 24,
  },
  word: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fbbf24',
    textAlign: 'center',
    marginBottom: 8,
  },
  pronunciation: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  definitionBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  definitionLabel: {
    color: '#8b5cf6',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  definition: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  exampleBox: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#22c55e',
  },
  exampleLabel: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  example: {
    color: '#d1d5db',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  originBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  originIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  origin: {
    color: '#9ca3af',
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  shareIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  shareText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  closeButtonText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WordOfDayModal;
