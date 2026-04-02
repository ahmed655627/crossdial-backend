import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { WORLD_WONDERS, WorldWonder } from './AnimatedBackground';

const { width } = Dimensions.get('window');

export interface WonderFact {
  wonderId: string;
  facts: string[];
}

const WONDER_FACTS: WonderFact[] = [
  {
    wonderId: 'pyramid',
    facts: [
      'Built around 2560 BCE, it was the tallest man-made structure for over 3,800 years!',
      'The pyramid contains about 2.3 million stone blocks.',
      'It was originally covered in white limestone that would shine in the sun.',
      'The four sides of the pyramid face the four cardinal directions.',
    ],
  },
  {
    wonderId: 'gardens',
    facts: [
      'Said to be built by King Nebuchadnezzar II for his wife who missed her homeland.',
      'They were reportedly 75 feet high with terraces full of trees and plants.',
      'Some historians believe they may never have existed!',
      'Water was brought up using chain pumps.',
    ],
  },
  {
    wonderId: 'colossus',
    facts: [
      'Stood over 100 feet tall - as high as the Statue of Liberty!',
      'Took 12 years to build and stood for only 54 years.',
      'Was destroyed by an earthquake around 226 BCE.',
      'Made of bronze and iron, it was sold as scrap after collapse.',
    ],
  },
  {
    wonderId: 'lighthouse',
    facts: [
      'One of the tallest man-made structures at 330-450 feet high.',
      'Its light could be seen from 35 miles away!',
      'Stood for over 1,500 years before earthquakes destroyed it.',
      'Used mirrors to reflect sunlight during the day.',
    ],
  },
  {
    wonderId: 'mausoleum',
    facts: [
      'Built for Mausolus, a satrap of the Persian Empire.',
      'The word "mausoleum" comes from his name!',
      'Stood approximately 148 feet high.',
      'Featured sculptures by four famous Greek sculptors.',
    ],
  },
  {
    wonderId: 'temple',
    facts: [
      'Was rebuilt three times before its final destruction.',
      'Featured 127 marble columns, each 60 feet high.',
      'Took 120 years to build the third version.',
      'Was set on fire by Herostratus who wanted to be famous.',
    ],
  },
  {
    wonderId: 'zeus',
    facts: [
      'Made of ivory and gold-plated bronze panels.',
      'Stood about 40 feet tall inside the temple.',
      'Zeus held a figure of Nike (Victory) in his right hand.',
      'Was destroyed in a fire in the 5th century CE.',
    ],
  },
];

interface WonderFactModalProps {
  visible: boolean;
  onClose: () => void;
  wonder: WorldWonder;
}

export const WonderFactModal: React.FC<WonderFactModalProps> = ({
  visible,
  onClose,
  wonder,
}) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const wonderFacts = WONDER_FACTS.find(wf => wf.wonderId === wonder.id)?.facts || [];

  const nextFact = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentFactIndex((prev) => (prev + 1) % wonderFacts.length);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    setCurrentFactIndex(0);
  }, [wonder.id]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: wonder.colors[0] }]}>
          <View style={styles.header}>
            <Text style={styles.icon}>{wonder.icon}</Text>
            <Text style={styles.title}>{wonder.name}</Text>
          </View>

          <View style={styles.factCard}>
            <Text style={styles.didYouKnow}>💡 Did You Know?</Text>
            <Animated.Text style={[styles.factText, { opacity: fadeAnim }]}>
              {wonderFacts[currentFactIndex]}
            </Animated.Text>
            
            <View style={styles.pagination}>
              {wonderFacts.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentFactIndex && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.nextButton} onPress={nextFact}>
              <Text style={styles.nextText}>Next Fact →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const WonderFactButton: React.FC<{
  onPress: () => void;
}> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Text style={styles.floatingIcon}>💡</Text>
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
    width: width * 0.9,
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  factCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  didYouKnow: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  factText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dotActive: {
    backgroundColor: '#8b5cf6',
    width: 20,
  },
  buttons: {
    gap: 12,
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 12,
    alignItems: 'center',
  },
  closeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  floatingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,215,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingIcon: {
    fontSize: 24,
  },
});

export default WonderFactModal;
