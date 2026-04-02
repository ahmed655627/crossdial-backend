import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WORLD_WONDERS, WorldWonder } from './AnimatedBackground';

const { width } = Dimensions.get('window');

export interface Postcard {
  wonderId: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface PostcardsModalProps {
  visible: boolean;
  onClose: () => void;
  postcards: Postcard[];
  onSelectPostcard: (wonder: WorldWonder) => void;
}

export const PostcardsModal: React.FC<PostcardsModalProps> = ({
  visible,
  onClose,
  postcards,
  onSelectPostcard,
}) => {
  const [selectedPostcard, setSelectedPostcard] = useState<WorldWonder | null>(null);

  const getPostcardStatus = (wonderId: string) => {
    return postcards.find(p => p.wonderId === wonderId);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>🏷️ Postcards Collection</Text>
            <Text style={styles.subtitle}>
              {postcards.filter(p => p.unlocked).length} / {WORLD_WONDERS.length} collected
            </Text>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              {WORLD_WONDERS.map((wonder) => {
                const status = getPostcardStatus(wonder.id);
                const isUnlocked = status?.unlocked;

                return (
                  <TouchableOpacity
                    key={wonder.id}
                    style={styles.postcardCard}
                    onPress={() => isUnlocked && setSelectedPostcard(wonder)}
                    disabled={!isUnlocked}
                  >
                    <LinearGradient
                      colors={isUnlocked ? wonder.colors : ['#333', '#444']}
                      style={styles.postcardGradient}
                    >
                      <Text style={styles.postcardIcon}>
                        {isUnlocked ? wonder.icon : '🔒'}
                      </Text>
                      <Text style={[
                        styles.postcardName,
                        !isUnlocked && styles.lockedText
                      ]}>
                        {wonder.name}
                      </Text>
                      {isUnlocked && (
                        <View style={styles.collectedBadge}>
                          <Text style={styles.collectedText}>✓</Text>
                        </View>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        {/* Postcard Detail Modal */}
        {selectedPostcard && (
          <Modal visible={true} transparent animationType="fade">
            <View style={styles.detailOverlay}>
              <View style={styles.detailCard}>
                <LinearGradient
                  colors={selectedPostcard.colors}
                  style={styles.detailGradient}
                >
                  <Text style={styles.detailIcon}>{selectedPostcard.icon}</Text>
                  <Text style={styles.detailName}>{selectedPostcard.name}</Text>
                  <Text style={styles.detailDesc}>{selectedPostcard.description}</Text>
                  
                  <View style={styles.stampArea}>
                    <Text style={styles.stampText}>✓ VISITED</Text>
                  </View>
                </LinearGradient>
                
                <TouchableOpacity
                  style={styles.detailClose}
                  onPress={() => setSelectedPostcard(null)}
                >
                  <Text style={styles.detailCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

export const PostcardsButton: React.FC<{
  collected: number;
  total: number;
  onPress: () => void;
}> = ({ collected, total, onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Text style={styles.floatingIcon}>🏷️</Text>
      <View style={styles.countBadge}>
        <Text style={styles.countText}>{collected}/{total}</Text>
      </View>
    </TouchableOpacity>
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
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postcardCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  postcardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  postcardIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  postcardName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  lockedText: {
    opacity: 0.5,
  },
  collectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#22c55e',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  detailOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCard: {
    width: width * 0.85,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  detailGradient: {
    padding: 32,
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  detailDesc: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 24,
  },
  stampArea: {
    borderWidth: 3,
    borderColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    transform: [{ rotate: '-5deg' }],
  },
  stampText: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 18,
  },
  detailClose: {
    padding: 16,
    alignItems: 'center',
  },
  detailCloseText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  floatingIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  countBadge: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PostcardsModal;
