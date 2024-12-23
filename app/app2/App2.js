import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import VideoScreen from './VideoScreen';

const coins = [
  { imageSource: require('./assest/Coin (1).png') },
  { imageSource: require('./assest/Coin (1).png') },
  { imageSource: require('./assest/Coin (1).png') },
  { imageSource: require('./assest/Coin (1).png') },
  { imageSource: require('./assest/Coin (1).png') },  // Add more coins as needed
];

const App2 = () => {
  const [trigger, setTrigger] = useState(false);

  const handlePress = () => {
    setTrigger(!trigger); // Toggle the trigger state
  };

  return (
    <View style={styles.container}>
      <VideoScreen coins={coins} trigger={trigger} />
      {/* <View style={styles.buttonContainer}>
        <Button title="Trigger Animation" onPress={handlePress} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -75 }],
    width: 150,
  },
});

export default App2;
