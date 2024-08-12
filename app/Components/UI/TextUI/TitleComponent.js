import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TitleComponent = ({ TitleName, style }) => {
  return (
    <Text style={[styles.TitleStyle, style]}>{TitleName}</Text>
  )
}

export default TitleComponent

const styles = StyleSheet.create({
    TitleStyle: {
        // fontFamily: 'Inter-Bold',
        fontFamily: 'DMSans-Regular',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 33.89,
        letterSpacing: 0.0036,
        textAlign: 'left',
        color: '#03C4CB',
    }
})