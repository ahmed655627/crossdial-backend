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

const { width } = Dimensions.get('window');

export interface WordPack {
  id: string;
  name: string;
  icon: string;
  description: string;
  wordCount: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  price: number; // 0 = free, -1 = premium subscription
  category: 'free' | 'premium' | 'educational';
  color: string[];
  sample: string[];
}

export const WORD_PACKS: WordPack[] = [
  {
    id: 'basic',
    name: 'Basic Words',
    icon: '📚',
    description: 'Common everyday words',
    wordCount: 500,
    difficulty: 'easy',
    price: 0,
    category: 'free',
    color: ['#22c55e', '#16a34a'],
    sample: ['HELLO', 'WORLD', 'HAPPY', 'SMILE'],
  },
  {
    id: 'sat',
    name: 'SAT Prep',
    icon: '🎓',
    description: 'Top SAT vocabulary words',
    wordCount: 1000,
    difficulty: 'hard',
    price: 299,
    category: 'educational',
    color: ['#3b82f6', '#1d4ed8'],
    sample: ['ELOQUENT', 'PRAGMATIC', 'AMBIGUOUS', 'VERBOSE'],
  },
  {
    id: 'gre',
    name: 'GRE Master',
    icon: '🏆',
    description: 'Advanced GRE vocabulary',
    wordCount: 1500,
    difficulty: 'expert',
    price: 499,
    category: 'educational',
    color: ['#8b5cf6', '#7c3aed'],
    sample: ['PERFUNCTORY', 'OBSEQUIOUS', 'TRUCULENT', 'PERSPICACIOUS'],
  },
  {
    id: 'toefl',
    name: 'TOEFL Ready',
    icon: '✈️',
    description: 'Essential TOEFL words',
    wordCount: 800,
    difficulty: 'medium',
    price: 249,
    category: 'educational',
    color: ['#06b6d4', '#0891b2'],
    sample: ['ACADEMIC', 'ANALYSIS', 'RESEARCH', 'THEORY'],
  },
  {
    id: 'business',
    name: 'Business English',
    icon: '💼',
    description: 'Corporate vocabulary',
    wordCount: 600,
    difficulty: 'medium',
    price: 199,
    category: 'premium',
    color: ['#f59e0b', '#d97706'],
    sample: ['SYNERGY', 'LEVERAGE', 'PARADIGM', 'METRICS'],
  },
  {
    id: 'medical',
    name: 'Medical Terms',
    icon: '🩺',
    description: 'Healthcare vocabulary',
    wordCount: 700,
    difficulty: 'expert',
    price: 399,
    category: 'premium',
    color: ['#ef4444', '#dc2626'],
    sample: ['DIAGNOSIS', 'SYMPTOM', 'THERAPY', 'CHRONIC'],
  },
  {
    id: 'legal',
    name: 'Legal Terms',
    icon: '⚖️',
    description: 'Law vocabulary',
    wordCount: 500,
    difficulty: 'expert',
    price: 349,
    category: 'premium',
    color: ['#64748b', '#475569'],
    sample: ['PLAINTIFF', 'VERDICT', 'STATUTE', 'LIABILITY'],
  },
  {
    id: 'science',
    name: 'Science Words',
    icon: '🔬',
    description: 'Scientific terminology',
    wordCount: 800,
    difficulty: 'hard',
    price: 299,
    category: 'educational',
    color: ['#10b981', '#059669'],
    sample: ['HYPOTHESIS', 'MOLECULE', 'QUANTUM', 'GENOME'],
  },
];

interface WordPacksModalProps {
  visible: boolean;
  onClose: () => void;
  ownedPacks: string[];
  coins: number;
  onPurchase: (pack: WordPack) => void;
  onSelect: (pack: WordPack) => void;
  activePack: string;
}

export const WordPacksModal: React.FC<WordPacksModalProps> = ({
  visible,
  onClose,
  ownedPacks,
  coins,
  onPurchase,
  onSelect,
  activePack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'free' | 'premium' | 'educational'>('all');

  const filteredPacks = WORD_PACKS.filter(
    pack => selectedCategory === 'all' || pack.category === selectedCategory
  );

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      case 'expert': return '#8b5cf6';
      default: return '#9ca3af';
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>📦 Word Packs</Text>
            <View style={styles.coinBadge}>
              <Text style={styles.coinIcon}>🪙</Text>
              <Text style={styles.coinText}>{coins}</Text>
            </View>
          </View>

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {(['all', 'free', 'educational', 'premium'] as const).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.filterButton, selectedCategory === cat && styles.filterActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Packs List */}
          <ScrollView style={styles.packsList} showsVerticalScrollIndicator={false}>
            {filteredPacks.map((pack) => {
              const isOwned = ownedPacks.includes(pack.id) || pack.price === 0;
              const isActive = activePack === pack.id;
              const canAfford = coins >= pack.price;

              return (
                <TouchableOpacity
                  key={pack.id}
                  style={styles.packCard}
                  onPress={() => isOwned ? onSelect(pack) : canAfford && onPurchase(pack)}
                >
                  <LinearGradient
                    colors={pack.color}
                    style={styles.packGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.packHeader}>
                      <Text style={styles.packIcon}>{pack.icon}</Text>
                      <View style={styles.packInfo}>
                        <Text style={styles.packName}>{pack.name}</Text>
                        <Text style={styles.packDesc}>{pack.description}</Text>
                      </View>
                      {isActive && (
                        <View style={styles.activeBadge}>
                          <Text style={styles.activeText}>✓</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.packStats}>
                      <View style={[styles.diffBadge, { backgroundColor: getDifficultyColor(pack.difficulty) }]}>
                        <Text style={styles.diffText}>{pack.difficulty}</Text>
                      </View>
                      <Text style={styles.wordCount}>{pack.wordCount} words</Text>
                    </View>

                    <View style={styles.sampleWords}>
                      {pack.sample.map((word, i) => (
                        <View key={i} style={styles.sampleWord}>
                          <Text style={styles.sampleText}>{word}</Text>
                        </View>
                      ))}
                    </View>

                    {!isOwned && (
                      <View style={[styles.priceTag, !canAfford && styles.priceDisabled]}>
                        <Text style={styles.priceIcon}>🪙</Text>
                        <Text style={styles.priceText}>{pack.price}</Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
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
    maxHeight: '90%',
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  coinIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  coinText: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: '#8b5cf6',
  },
  filterText: {
    color: '#9ca3af',
  },
  filterTextActive: {
    color: '#fff',
  },
  packsList: {
    padding: 16,
    maxHeight: 400,
  },
  packCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  packGradient: {
    padding: 16,
  },
  packHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  packIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  packInfo: {
    flex: 1,
  },
  packName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  packDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  activeBadge: {
    backgroundColor: '#22c55e',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  packStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  diffText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  wordCount: {
    color: 'rgba(255,255,255,0.8)',
  },
  sampleWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  sampleWord: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sampleText: {
    color: '#fff',
    fontSize: 12,
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 12,
  },
  priceDisabled: {
    opacity: 0.5,
  },
  priceIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  priceText: {
    color: '#ffd700',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  closeText: {
    color: '#9ca3af',
    fontSize: 16,
  },
});

export default WordPacksModal;
