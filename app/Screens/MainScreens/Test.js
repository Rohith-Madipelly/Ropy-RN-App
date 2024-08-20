import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StatusBarComponent from '../../Components/StatusBar/StatusBarComponent'

const Test = () => {
    return (
        <StatusBarComponent barStyle='dark-content' barBackgroundColor='red'>

            <View style={{ backgroundColor:'pink',height:'100%' }}>
                <Text>Test</Text>
            </View>
        </StatusBarComponent>
    )
}

export default Test

const styles = StyleSheet.create({})