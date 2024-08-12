import { StyleSheet, Text, TextInput, View, Platform, Pressable } from 'react-native'
import React from 'react'

// default, number-pad, decimal-pad, numeric, email-address, phone-pad, url

const CustomTextInput2 = ({
    label,
    rightLabelBtn,
    style,
    labelStyle,
    value,
    placeholder, 
    autoComplete,
    keyboardType,
    autoCapitalize,
    outlined,
    onBlur,
    asterisksymbol,
    leftIcon,
    rightIcon,
    numLines,
    boxWidth,
    onChangeText,
    borderColor,
    secure,
    validate,
    editable,
    errorMessage,
    errorColor = 'red',
    bgColor,
    maxLength,

}) => {

    const backgroundColor = bgColor || 'white';
    // const containerBorder = outlined ? styles.outlined : styles.standard;
    const containerBorder = outlined ? styles.outlined : styles.outlined;

    return (
        <View style={[{ padding: 0, width: boxWidth }, style, styles.boxHeight]}>



            <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
                <View>
                    {label ? <Text style={[styles.label, labelStyle]}>{label} {asterisksymbol ? <Text style={{ color: 'red' }}>*</Text> : ""}</Text> : ""}
                </View>
                {rightLabelBtn?<Pressable onPress={()=>{console.log("hello")}}>
                    {label ? <Text style={[styles.label, labelStyle,{fontSize:10,textDecorationLine:'underline'}]}>{rightLabelBtn} </Text> : ""}
                </Pressable>:""}
            </View>





            <View style={[styles.container, containerBorder, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}>
                {leftIcon ? <View style={{ paddingRight: 8 }}>
                    {leftIcon}
                </View> : ""}
                <TextInput
                    placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
                    value={value}
                    // placeholderTextColor={"#444"}
                    secureTextEntry={secure}
                    autoComplete={autoComplete}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}

                    onChangeText={onChangeText}

                    onBlur={onBlur}
                    maxLength={maxLength}
                    onEndEditing={validate}
                    multiline={numLines > 1 ? true : false}
                    numberOfLines={numLines}
                    editable={editable}
                    style={{ flex: 4, height: '130%' }}

                />
                <View style={{ paddingLeft: 5 }}>
                    {rightIcon}

                </View>
            </View>
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>
        </View>
    )
}

export default CustomTextInput2

const styles = StyleSheet.create({

    label: {
        // fontWeight: '500',
        fontWeight: '400',

        textTransform: 'none',
        color: '#474464',
        marginBottom: 5,
        // fontSize:22
    },
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,

        ...Platform.select({
            ios: {
                height: 55
            },
            android: {
                // height:80
            },
        }),
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                // shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),


    },
    boxHeight: {
        ...Platform.select({
            ios: {
                height: 100
            },
            android: {
                // height:80
            },
        })
    },
    outlined: {
        // borderBottomColor: '#48484A',
        borderColor: '#48484A',
        borderWidth: 0.9,
        borderCurve: 50,
    }
})