/**
 * Events Modal
 * Shows seasonal events and special challenges
 */

import React from 'react';
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

const { width } = Dimensions.get('window');

interface Event {
  id: string;
  name: string;
  icon: string;
  description: string;
  rewards: string;
  daysLeft: number;
  progress: number;
  color: string;
  isActive: boolean;
}

const EVENTS: Event[] = [
  {
    id: 'summer',
    name: 'Summer Adventure',
    icon: '🏖️',
    description: 'Complete beach-themed levels',
    rewards: '500 coins + Summer Badge',
    daysLeft: 14,
    progress: 35,
    color: '#f39c12',
    isActive: true,
  },
  {
    id: 'wordmaster',
    name: 'Word Master Week',
    icon: '📚',
    description: 'Find 100 bonus words',
    rewards: '200 coins + 5 Hints',
    daysLeft: 5,
    progress: 62,
    color: '#3498db',
    isActive: true,
  },
  {
    id: 'weekend',
    name: 'Weekend Challenge',
    icon: '🎯',
    description: 'Complete 10 levels this weekend',
    rewards: '100 coins',
    daysLeft: 2,
    progress: 40,
    color: '#e74c3c',
    isActive: true,
  },
  {
    id: 'explorer',
    name: 'World Explorer',
    icon: '🌍',
    description: 'Visit all wonder locations',
    rewards: 'Explorer Badge',
    daysLeft: 30,
    progress: 20,
    color: '#27ae60',
    isActive: false,
  },
];

interface EventsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const EventsModal: React.FC<EventsModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#27ae60', '#2ecc71']}
            style={styles.header}
          >
            <Text style={styles.title}>🎄 Events</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>🔥 Active Events</Text>
            {EVENTS.filter(e => e.isActive).map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={[styles.eventIcon, { backgroundColor: event.color }]}>
                  <Text style={styles.eventEmoji}>{event.icon}</Text>
                </View>
                <View style={styles.eventInfo}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventName}>{event.name}</Text>
                    <View style={styles.daysLeftBadge}>
                      <Text style={styles.daysLeftText}>{event.daysLeft}d left</Text>
                    </View>
                  </View>
                  <Text style={styles.eventDesc}>{event.description}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${event.progress}%`, backgroundColor: event.color }]} />
                  </View>
                  <View style={styles.rewardRow}>
                    <Text style={styles.rewardLabel}>Reward:</Text>
                    <Text style={styles.rewardValue}>{event.rewards}</Text>
                  </View>
                </View>
              </View>
            ))}

            <Text style={styles.sectionTitle}>📅 Upcoming Events</Text>
            {EVENTS.filter(e => !e.isActive).map((event) => (
              <View key={event.id} style={[styles.eventCard, styles.upcomingCard]}>
                <View style={[styles.eventIcon, { backgroundColor: '#bdc3c7' }]}>
                  <Text style={styles.eventEmoji}>{event.icon}</Text>
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventDesc}>{event.description}</Text>
                  <Text style={styles.comingSoonText}>Coming Soon!</Text>
                </View>
              </View>
            ))}

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>💡 Event Tips</Text>
              <Text style={styles.infoText}>
                • Complete events for exclusive rewards{"\n"}
                • Events refresh weekly or monthly{"\n"}
                • Some events have limited-time badges
              </Text>
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
    maxHeight: '85%',
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
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },
  upcomingCard: {
    opacity: 0.7,
  },
  eventIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventEmoji: {
    fontSize: 24,
  },
  eventInfo: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  daysLeftBadge: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  daysLeftText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventDesc: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  rewardRow: {
    flexDirection: 'row',
  },
  rewardLabel: {
    fontSize: 11,
    color: '#95a5a6',
  },
  rewardValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#27ae60',
    marginLeft: 5,
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3498db',
    marginTop: 5,
  },
  infoBox: {
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});

export default EventsModal;
