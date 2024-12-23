import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const Coin = ({ imageSource, delay, trigger, index }) => {
  const translateX = useSharedValue(-50); // Start from left
  const translateY = useSharedValue(height / 2 - 25); // Center Y-axis
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withTiming(width / 2 - 25, { duration: 1500 }) // Move to center X-axis
    );
    translateY.value = withDelay(
      delay,
      // withTiming(height - 50, { duration: 2000 }) // Move to bottom
      withTiming(height + 20, { duration: 2500 })
    );




  }, [trigger]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  // Determine size based on index using switch case
  let size;
  switch (index) {
    case 0:
      size = 75; // First coin larger
      break;
    case 1:
      size = 50; // Second coin medium size
      break;
    case 2:
      size = 40; // Third coin smaller size
      break;
    case 3:
      size = 30; // Third coin smaller size
      break;
    case 4:
      size = 20; // Third coin smaller size
      break;
    default:
      size = 10; // Default size for other coins
      break;
  }

  return (
    <Animated.View style={[styles.coin, animatedStyle]}>
      <Image source={imageSource} style={[styles.image, { width: size, height: size }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  coin: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Coin;
