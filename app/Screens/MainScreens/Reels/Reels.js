import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const Reels = () => {
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
  return (
    <View>
      <Text>Reels</Text>
      <Text>Reels {tokenn}</Text>
    </View>
  )
}

export default Reels

const styles = StyleSheet.create({})