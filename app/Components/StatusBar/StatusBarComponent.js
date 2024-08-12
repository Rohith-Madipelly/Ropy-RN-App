import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const StatusBarComponent = ({ children,barStyle,barBackgroundColor }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: {barBackgroundColor} }}>
            <StatusBar
                barStyle={barStyle}
                animated={true}
                backgroundColor={barBackgroundColor}
            />
            {children}
        
        </SafeAreaView>
    )
}

export default StatusBarComponent

const styles = StyleSheet.create({})