import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import GlobalStyles from '../UI/GlobalStyles'

const StatusBarComponent = ({ children,barStyle,barBackgroundColor }) => {
    return (
        // <SafeAreaView style={{ flex: 1, backgroundColor: {barBackgroundColor} }}>
        <SafeAreaView style={[{ flex: 1, backgroundColor: barBackgroundColor},GlobalStyles.androidSafeArea]}>
            {/* <StatusBar
                barStyle={barStyle}
                animated={true}
                backgroundColor={barBackgroundColor}
            /> */}
            {children}
        
        </SafeAreaView>
    )
}

export default StatusBarComponent

const styles = StyleSheet.create({})