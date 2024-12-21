import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarComponent from '../../../Components/StatusBar/StatusBarComponent'
import LoaderComponents from '../../../Components/Loaders/LoaderComponents'
import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader'

import Metrics from '../../../Utils/ResposivesUtils/Metrics'
import Saved from '../../../assets/Saved'
import { ADD_SAVED_LOCATION, GET_SAVED_LOCATION, GET_SETTINGS_API, REMOVE_SAVED_LOCATION } from '../../../ApiCalls'
import { useSelector } from 'react-redux'
import { FlashList } from '@shopify/flash-list'
import { OpenMaps } from '../../../Utils/DeviceHelpers/Linking/OpenMaps'
import { useToast } from 'react-native-toast-notifications'
import CustomStatusBar from '../../../Components/UI/StatusBar/CustomStatusBar'
import GlobalStyles from '../../../Components/UI/GlobalStyles'


const SavedLocation = () => {
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [savedData, setSavedData] = useState([])
    let tokenn = useSelector((state) => state.login.token);
    const toast = useToast();



    const ApiCaller = async () => {
        try {
            const res = await GET_SAVED_LOCATION(tokenn)
            if (res.data) {
                console.log("Hgcfdadsa", res.data.savedVideos)
                setSavedData(res.data.savedVideos)
            }
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message, "edkjwhghf")
        }
    }

    useEffect(() => {
        ApiCaller()
    }, [])


    const RemoveLocation=async(id)=>{

        try {
            const res = await REMOVE_SAVED_LOCATION(id,tokenn)
            if (res.data) {
                toast.hideAll()
                toast.show(res.data.message)
                setTimeout(() => {
                    ApiCaller()
                }, 1000);
    
            }
        }    catch (error) {
            if (error.response) {
              console.log(error.response.data.message, "edkjwhghf")
              if (error.response.status === 400) {
                console.log("Error With 400.", error.response.data)

              }
              else if (error.response.status === 401) {
     
              }
              else if (error.response.status === 403) {
                console.log("error.response.status login", error.response.data.message)
              }
              else if (error.response.status === 404) {
                console.log("dhg", error.response.data.message)
    
      
              }
              else if (error.response.status === 500) {
                console.log("Internal Server Error", error.message)
              }
              else {
                console.log("An error occurred response.>>")

              }
            }
            else if (error.code === 'ECONNABORTED') {
              console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
              console.log("No Response Received From the Server.")
              if (error.request.status === 0) {
                // console.log("error in request ",error.request.status)
                Alert.alert("No Network Found", "Please Check your Internet Connection")
              }
            }
      
            else {
              console.log("Error in Setting up the Request.")
            }
      
            setSpinnerbool(false)
      
            if (error) {
      
              // message = error.message;
              // seterrorFormAPI(message)
              // "userEmail or Password does not match !"
            }
          }
          finally {
            // setLoading(false);
            setSpinnerbool(false)
          }
    }


    return (
        <StatusBarComponent barStyle='dark-content' barBackgroundColor='white'>
                   <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
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
                    <FlashList
                        data={savedData}
                        renderItem={({ item, index }) => (
                            <View style={styles.ContentBox} key={index}>
                                <View style={{ borderRadius: 7, backgroundColor: '#F7F7F7', alignItems: 'center', marginTop: 20, height: Metrics.rfv(95), flexDirection: 'row' }}>

                                    <View style={{ padding: 15, width: '90%' }}>
                                        <Text style={{ color: '#001F2099', fontSize: Metrics.rfv(18), width: '90%' }} numberOfLines={1}>{item.title || 'Reel Name'}</Text>
                                        <TouchableOpacity style={{ marginTop: 5 }}
                                            onPress={() => { OpenMaps(item.latitude,item.longitude) }}
                                        ><Text style={{ color: '#03C4CB', fontSize: Metrics.rfv(18), textDecorationLine: 'underline', }}>View Location</Text></TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={{ width: '10%' }} onPress={()=>{RemoveLocation(item.locationId)}}>
                                        <Saved />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )}
                        ListEmptyComponent={(
                            <View
                                style={{
                                    flexGrow: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%', // Ensures it covers the screen
                                    height: 200
                                }}
                            >
                                <Text style={[{ fontSize: 16, fontWeight: 'bold', color: '#333', }]}>
                                    No Saved Locations
                                </Text>
                            </View>
                        )}
                        estimatedItemSize={200}
                    />

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