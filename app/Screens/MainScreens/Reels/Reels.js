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



  // useFocusEffect(
  //   useCallback(() => {
  //     // WalletAmountFunction()
  //     <StatusBar style="light" />
  //     return () => {
  //       <StatusBar style="light" />
  //     };
  //   }, [])
  // )



  // try {
  //   if (tokenn != null) {
  //     tokenn = tokenn.replaceAll('"', '');
  //   }
  // }
  // catch (err) {
  //   console.log("Error in token quotes", err)
  //   if (err.response.status === 500) {
  //     console.log("Internal Server Error", err.message)
  //   }
  // }


  // Use useFocusEffect to set SetReelPageActive when the screen is focused
  useFocusEffect(
    useCallback(() => {
     
      console.log("nv")
      setSetReelPageActive(true);

      // Cleanup function when the component loses focus
      return () => {
        setSetReelPageActive(false);
        // Any cleanup logic if needed
      };
    }, [])
  );
  return (
      <View style={{
        marginTop:0,
        width: windoWidth,
        height: windowHeight*0.939,
        backgroundColor: 'black'
    }}>
      {/* <StatusBar style="light" /> */}
      <ReelsComponent isReelPage={SetReelPageActive} />


    </View>
  )
}

export default Reels

const styles = StyleSheet.create({})