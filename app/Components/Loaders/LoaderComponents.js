import Spinner from 'react-native-loading-spinner-overlay';
// spinnerBool


import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const LoaderComponents = ({visible,color,animation}) => {
  return (
    <Spinner
    visible={visible}
    color={"#4A3AFF"}
    animation={'fade'}
    textContent="Loading ...."
    // textStyle={{color:'red'}}
    // customIndicator={
    //   <View>
    //     <Text>Custom loader</Text>
    //   </View>
    // }
  />
  )
}

export default LoaderComponents

const styles = StyleSheet.create({})