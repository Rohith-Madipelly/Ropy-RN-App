import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ReelsComponent from './ReelsComponent';

const Reels = () => {
  const windoWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  const [SetReelPageActive, setSetReelPageActive] = React.useState(true);



  let tokenn = useSelector((state) => state.login.token);






  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
    if (err.response.status === 500) {
      console.log("Internal Server Error", err.message)
    }
  }


  // Use useFocusEffect to set SetReelPageActive when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // setSetReelPageActive(true);
      console.log("nv")

      // Cleanup function when the component loses focus
      return () => {
        // setSetReelPageActive(false);
        // Any cleanup logic if needed
      };
    }, [])
  );
  return (
      <View style={{
        marginTop:0,
        width: windoWidth,
        height: windowHeight,
        backgroundColor: 'black'
    }}>
     {/* <View style={{ flex: 1 }}> */}
      <StatusBar style="light" />
      {/* Reels Header */}

      {/* <View style={{
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        padding: 10,
      }}>
        <Text>dcmn</Text>
      </View> */}


      <ReelsComponent isReelPage={SetReelPageActive} />


    </View>
  )
}

export default Reels

const styles = StyleSheet.create({})