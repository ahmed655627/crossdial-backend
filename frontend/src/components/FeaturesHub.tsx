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
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

interface FeatureItem {
  id: string;
  name: string;
  icon: string;
  ionicon: string;
  color: string;
  description: string;
  category: 'rewards' | 'gameplay' | 'collection' | 'extras';
}

const FEATURES: FeatureItem[] = [
  // Rewards Category
  { id: 'mystery_box', name: 'Mystery Box', icon: '📦', ionicon: 'cube', color: '#9b59b6', description: 'Open surprise rewards!', category: 'rewards' },
  { id: 'scratch_card', name: 'Scratch Card', icon: '🎫', ionicon: 'ticket', color: '#e74c3c', description: 'Scratch to win prizes', category: 'rewards' },
  { id: 'piggy_bank', name: 'Piggy Bank', icon: '🐷', ionicon: 'wallet', color: '#e91e63', description: 'Save coins for bonus', category: 'rewards' },
  
  // Gameplay Category
  { id: 'power_ups', name: 'Power-Ups', icon: '⚡', ionicon: 'flash', color: '#f39c12', description: 'Boost your gameplay', category: 'gameplay' },
  { id: 'combos', name: 'Combos', icon: '🔥', ionicon: 'flame', color: '#e74c3c', description: 'Chain words for bonus', category: 'gameplay' },
  { id: 'game_modes', name: 'Game Modes', icon: '🎮', ionicon: 'game-controller', color: '#3498db', description: 'Different ways to play', category: 'gameplay' },
  { id: 'time_challenge', name: 'Time Challenge', icon: '⏱️', ionicon: 'timer', color: '#e67e22', description: 'Race against time', category: 'gameplay' },
  
  // Collection Category
  { id: 'postcards', name: 'Postcards', icon: '🏛️', ionicon: 'images', color: '#1abc9c', description: 'Collect wonder cards', category: 'collection' },
  { id: 'vocabulary', name: 'Vocabulary', icon: '📚', ionicon: 'book', color: '#9b59b6', description: 'Words you learned', category: 'collection' },
  { id: 'word_packs', name: 'Word Packs', icon: '📦', ionicon: 'layers', color: '#2ecc71', description: 'Extra word themes', category: 'collection' },
  { id: 'wonder_facts', name: 'Wonder Facts', icon: '🌍', ionicon: 'earth', color: '#3498db', description: 'Learn about wonders', category: 'collection' },
  
  // Extras Category
  { id: 'player_profile', name: 'Profile', icon: '👤', ionicon: 'person', color: '#34495e', description: 'Your game profile', category: 'extras' },
  { id: 'music_themes', name: 'Music', icon: '🎵', ionicon: 'musical-notes', color: '#e91e63', description: 'Background music', category: 'extras' },
  { id: 'celebrations', name: 'Celebrations', icon: '🎉', ionicon: 'sparkles', color: '#f1c40f', description: 'Victory effects', category: 'extras' },
  { id: 'mascot', name: 'Mascot', icon: '🦉', ionicon: 'paw', color: '#8e44ad', description: 'Your game buddy', category: 'extras' },
  { id: 'seasonal', name: 'Events', icon: '🎄', ionicon: 'calendar', color: '#27ae60', description: 'Seasonal content', category: 'extras' },
];

const CATEGORIES = [
  { id: 'rewards', name: 'Rewards', icon: 'gift' },
  { id: 'gameplay', name: 'Gameplay', icon: 'game-controller' },
  { id: 'collection', name: 'Collection', icon: 'albums' },
  { id: 'extras', name: 'Extras', icon: 'apps' },
];

interface FeaturesHubProps {
  visible: boolean;
  onClose: () => void;
  onSelectFeature: (featureId: string) => void;
}

export const FeaturesHub: React.FC<FeaturesHubProps> = ({
  visible,
  onClose,
  onSelectFeature,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('rewards');

  const filteredFeatures = FEATURES.filter(f => f.category === selectedCategory);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.title}>Features Hub</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Category Tabs */}
          <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.tab,
                    selectedCategory === cat.id && styles.tabActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={18}
                    color={selectedCategory === cat.id ? '#667eea' : '#95a5a6'}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      selectedCategory === cat.id && styles.tabTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Features Grid */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              {filteredFeatures.map((feature) => (
                <TouchableOpacity
                  key={feature.id}
                  style={styles.featureCard}
                  onPress={() => onSelectFeature(feature.id)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                  </View>
                  <Text style={styles.featureName}>{feature.name}</Text>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: height * 0.75,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  tabsContainer: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#fff',
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#e8ecff',
  },
  tabText: {
    fontSize: 13,
    color: '#95a5a6',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#667eea',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 11,
    color: '#95a5a6',
    textAlign: 'center',
  },
});

export default FeaturesHub;
