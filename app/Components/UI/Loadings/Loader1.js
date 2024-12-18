import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

const Loader1 = ({visible}) => {
    
  return (
    <Spinner
        visible={visible}
        color={"rgba(255, 103, 87, 1)"}
        animation={'fade'}
      />
  )
}

export default Loader1

const styles = StyleSheet.create({})