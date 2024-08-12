import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomSpan = ({ TextLine,style }) => {
    return (<Text style={[styles.TextLineStyle,style]}>{TextLine}</Text>
    )
}

export default CustomSpan

const styles = StyleSheet.create({
    TextLineStyle: {
        // fontFamily: 'Poppins-Regular',
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        letterSpacing: 0.08,
        textAlign: 'left',
        color: '#474464',
        marginVertical:5
    }
})