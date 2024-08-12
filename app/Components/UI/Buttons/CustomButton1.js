import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../Contants/Colors'
// import { Colors } from '../../../Contants/Colors'

const CustomButton1 = ({ onPress, leftIcon, children, bgColor, styleData, boxWidth, isSubmitting,textStyling,RightIcon }) => {

  return (
    <Pressable disabled={isSubmitting} style={({ pressed }) => [styles.button,
    { backgroundColor: bgColor ? bgColor : Colors.primary900 },
    // { borderColor: '#4A3AFF',borderWidth:2 },
  
      // { backgroundColor: bgColor? bgColor: "" },

      styleData, { width: boxWidth }, pressed && styles.pressed]} onPress={onPress}>
      {/* <Ionicons style={styles.icon} name={icon} size={18} color={Colors.white} /> */}
      <View style={{ marginRight: 10 }}>{leftIcon}</View>
      <Text style={[styles.text,textStyling]}>{children}</Text>
      <View style={{ marginRight: 10 }}>{RightIcon}</View>

    </Pressable>
  )
}

export default CustomButton1

const styles = StyleSheet.create({
  button: {

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
    // borderColor: Colors.primary500,
    // backgroundColor: Colors.primary900,
    // backgroundColor:"pink",
    borderRadius: 60,
    // paddingHorizontal:12,
    paddingVertical: 14,
    margin: 10,
    // width: '78%'
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 6
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400'
  }
})

