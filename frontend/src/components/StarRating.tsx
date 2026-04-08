import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

interface StarRatingProps {
  stars: number; // 0, 1, 2, or 3
  showAnimation?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({
  stars,
  showAnimation = false,
  size = 'medium',
}) => {
  const starAnims = [
    useRef(new Animated.Value(stars >= 1 ? 1 : 0)).current,
    useRef(new Animated.Value(stars >= 2 ? 1 : 0)).current,
    useRef(new Animated.Value(stars >= 3 ? 1 : 0)).current,
  ];

  useEffect(() => {
    if (showAnimation) {
      // Animate stars one by one
      const animations = starAnims.map((anim, index) => {
        if (index < stars) {
          return Animated.sequence([
            Animated.delay(index * 300),
            Animated.spring(anim, {
              toValue: 1,
              friction: 3,
              tension: 100,
              useNativeDriver: true,
            }),
          ]);
        }
        return Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true });
      });
      Animated.parallel(animations).start();
    } else {
      starAnims.forEach((anim, index) => {
        anim.setValue(index < stars ? 1 : 0);
      });
    }
  }, [stars, showAnimation]);

  const getSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 32;
      default: return 22;
    }
  };

  const starSize = getSize();

  return (
    <View style={styles.container}>
      {[0, 1, 2].map((index) => (
        <Animated.View
          key={index}
          style={[
            styles.starContainer,
            {
              transform: [
                {
                  scale: starAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
                {
                  rotate: starAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.star,
              { fontSize: starSize },
              {
                opacity: starAnims[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
              },
            ]}
          >
            {index < stars ? '⭐' : '☆'}
          </Animated.Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 2, // REMOVED
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default StarRating;
