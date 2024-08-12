import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Alert3Buttons = () => {


    const createThreeButtonAlert = () =>
        Alert.alert('Alert Title', 'My Alert Msg', [
            {
                text: 'Ask me later',
                onPress: () => console.log('Ask me later pressed'),
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
  return (
    <View>
      <Text>Alert3Buttons</Text>
      <Button title={'3-Button Alert'} onPress={createThreeButtonAlert} />

    </View>
  )
}

export default Alert3Buttons

const styles = StyleSheet.create({})