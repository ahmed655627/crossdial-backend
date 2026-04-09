import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export interface PuzzleMode {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: [string, string];
  unlocked: boolean;
}

const puzzleModes: PuzzleMode[] = [
  {
    id: 'mirror',
    name: 'Mirror Words',
    icon: '🪞',
    description: 'Unscramble reflected letters',
    color: ['#667eea', '#764ba2'],
    unlocked: true,
  },
  {
    id: 'layers',
    name: 'Love in Layers',
    icon: '🧅',
    description: 'Solve anagrams within anagrams',
    color: ['#f093fb', '#f5576c'],
    unlocked: true,
  },
  {
    id: 'chain',
    name: 'Emotion Chain',
    icon: '🔗',
    description: 'Words connect in a chain',
    color: ['#4facfe', '#00f2fe'],
    unlocked: true,
  },
  {
    id: 'hearts',
    name: 'Missing Hearts',
    icon: '💔',
    description: 'Fill in the missing letters',
    color: ['#fa709a', '#fee140'],
    unlocked: true,
  },
  {
    id: 'pair',
    name: 'Word Pair',
    icon: '👯',
    description: 'Two words, one clue',
    color: ['#a8edea', '#fed6e3'],
    unlocked: true,
  },
  {
    id: 'flip',
    name: 'Flip & Solve',
    icon: '🔄',
    description: 'Flip letters to reveal the word',
    color: ['#d299c2', '#fef9d7'],
    unlocked: true,
  },
  {
    id: 'crossed',
    name: 'Crossed Emotions',
    icon: '➕',
    description: 'Mini crossword puzzles',
    color: ['#89f7fe', '#66a6ff'],
    unlocked: true,
  },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectMode: (modeId: string) => void;
}

const PuzzleModesMenu: React.FC<Props> = ({ visible, onClose, onSelectMode }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.gradient}
          >
            <View style={styles.header}>
              <Text style={styles.title}>🎮 Puzzle Modes</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.modesGrid}
              showsVerticalScrollIndicator={false}
            >
              {puzzleModes.map((mode) => (
                <TouchableOpacity
                  key={mode.id}
                  style={styles.modeCard}
                  onPress={() => onSelectMode(mode.id)}
                  disabled={!mode.unlocked}
                >
                  <LinearGradient
                    colors={mode.unlocked ? mode.color : ['#444', '#333']}
                    style={styles.modeGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.modeIcon}>{mode.icon}</Text>
                    <Text style={styles.modeName}>{mode.name}</Text>
                    <Text style={styles.modeDesc}>{mode.description}</Text>
                    {!mode.unlocked && (
                      <View style={styles.lockedOverlay}>
                        <Text style={styles.lockIcon}>🔒</Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
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
  container: {
    width: '95%',
    maxHeight: '85%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 18,
  },
  scrollView: {
    maxHeight: 500,
  },
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  modeCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modeGradient: {
    padding: 16,
    minHeight: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  modeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  modeDesc: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 32,
  },
});

export default PuzzleModesMenu;
