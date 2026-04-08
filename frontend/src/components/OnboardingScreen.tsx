/**
 * Onboarding Screen
 * Professional intro/tutorial for new users
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string[];
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to CrossDial',
    description: 'Discover the world through words! Explore famous landmarks while solving fun crossword puzzles.',
    icon: '🌍',
    gradient: ['#667eea', '#764ba2'],
  },
  {
    id: '2',
    title: 'Swipe to Select',
    description: 'Swipe across letters on the wheel to form words. Connect letters in any direction to spell words!',
    icon: '👆',
    gradient: ['#f093fb', '#f5576c'],
  },
  {
    id: '3',
    title: 'Fill the Grid',
    description: 'Find all the words to complete each level. Some words are hidden as bonus words for extra coins!',
    icon: '✨',
    gradient: ['#4facfe', '#00f2fe'],
  },
  {
    id: '4',
    title: 'Use Power-Ups',
    description: 'Stuck? Use hints and power-ups to reveal letters. Watch ads or spend coins to get help!',
    icon: '⚡',
    gradient: ['#f39c12', '#e74c3c'],
  },
  {
    id: '5',
    title: 'Explore Wonders',
    description: 'Travel to 300+ levels featuring world wonders. From pyramids to modern marvels!',
    icon: '🏛️',
    gradient: ['#11998e', '#38ef7d'],
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onComplete();
    }
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index });
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <LinearGradient colors={item.gradient} style={styles.slideGradient}>
        <View style={styles.slideContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.slideIcon}>{item.icon}</Text>
          </View>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideDescription}>{item.description}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {SLIDES.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return (
          <TouchableOpacity key={index} onPress={() => scrollToIndex(index)}>
            <Animated.View
              style={[
                styles.dot,
                { width: dotWidth, opacity },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
      />

      <View style={styles.bottomContainer}>
        {renderDots()}

        <View style={styles.buttonRow}>
          {currentIndex > 0 && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={onComplete}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={scrollToNext}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={SLIDES[currentIndex].gradient}
              style={styles.nextGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.nextText}>
                {currentIndex === SLIDES.length - 1 ? "Let's Play!" : 'Next'}
              </Text>
              <Ionicons
                name={currentIndex === SLIDES.length - 1 ? 'game-controller' : 'arrow-forward'}
                size={20}
                color="#fff"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  slide: {
    width,
    height: height * 0.75,
  },
  slideGradient: {
    flex: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  slideIcon: {
    fontSize: 70,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  slideDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // gap: 8, // REMOVED
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  nextButton: {
    flex: 1,
    marginLeft: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  nextGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    // gap: 10, // REMOVED
  },
  nextText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OnboardingScreen;
