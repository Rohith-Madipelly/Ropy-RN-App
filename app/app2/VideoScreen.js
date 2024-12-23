import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import Coin from './Coin';

const { height } = Dimensions.get('window');

const VideoScreen = ({ coins, trigger }) => {
  return (
    <View style={styles.container}>
      {/* <Video
        source={require('./assest/Test.mp4')} // Replace with your video URL
        style={{ height: height, width: '100%' }}
        resizeMode="cover"
        shouldPlay
        isLooping={true}
      /> */}
      {coins.map((coin, index) => (
        <>
  
        {trigger&&<Coin
          key={index}
          imageSource={coin.imageSource}
          delay={index * 100} // Delay each coin's animation by 300ms
          trigger={trigger}
          index={index} // Pass the index to adjust the size
        />}
              </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

export default VideoScreen;
