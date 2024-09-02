import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarComponent from '../../../Components/StatusBar/StatusBarComponent'
import LoaderComponents from '../../../Components/Loaders/LoaderComponents'
import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader'

import Metrics from '../../../Utils/ResposivesUtils/Metrics'
import Saved from '../../../assets/Saved'


const SavedLocation = () => {
    const [spinnerBool, setSpinnerbool] = useState(false)

    useEffect(() => {


    }, [])

    const submitHandler = async (values) => {
        console.log("values ", values)
    }
    return (
        <StatusBarComponent barStyle='dark-content' barBackgroundColor='white'>
            <LoaderComponents
                visible={spinnerBool}
                color={"#4A3AFF"}
                animation={'fade'}
            />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={[styles.container,
                    // {backgroundColor:'#F7F7F7'}
                ]}>
                    <CustomToolKitHeader componentName={"Saved Location"} />
                    <View style={styles.ContentBox}>
                        <View style={{borderRadius: 7, backgroundColor: '#F7F7F7', alignItems: 'center', marginTop: 20,  height: Metrics.rfv(95), flexDirection: 'row'}}>

                            <View style={{ padding: 15 ,width:'90%'}}>
                                <Text style={{ color: '#001F2099', fontSize: Metrics.rfv(18) }}>Reel Name</Text>
                                <TouchableOpacity style={{ marginTop:5 }}><Text style={{ color: '#03C4CB', fontSize: Metrics.rfv(18), textDecorationLine: 'underline',}}>View Location</Text></TouchableOpacity>
                            </View>

                            <TouchableOpacity style={{width:'10%'}}>
                                <Saved />
                            </TouchableOpacity>
                        </View>
                        {/* <CustomButton1
                            boxWidth={'95%'}
                            onPress={submitHandler}
                            bgColor={'#03C4CB'}
                            style={{ marginTop: 50 }}>Save</CustomButton1> */}
                    </View>
                </View>
            </ScrollView>
        </StatusBarComponent>
    )
}

export default SavedLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // backgroundColor:'red'

    },
    UpperBox: {
        flex: 0.6
    },
    ContentBox: {
        flex: 0.4,
        overflow: 'hidden',
        // paddingTop: 36,
        paddingHorizontal: 17,
        barBackgroundColor: 'pink'
    }
})