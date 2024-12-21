import React, { useEffect, useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

// import ReelSingle from './ReelSingle'
import { useSelector } from 'react-redux'

import { Text, View } from 'react-native'
import { GetVideoByLocationAPI, HomeAPI } from '../../../ApiCalls'
import ReelSingle from './ReelSingle'
import * as Location from 'expo-location';
import { useToast } from 'react-native-toast-notifications'
const ReelsComponent = ({ isReelPage }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playVideo, setPlayVideo] = useState(0);
    const [page, setpage] = useState(1)
    const [videoData, setvideoData] = useState([])
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null);

    let tokenn = useSelector((state) => state.login.token);


    const toast = useToast();

    const GetVideos = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        // Get the current location
        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log("location", currentLocation)

        setSpinnerbool(true)
        try {


            const res = await GetVideoByLocationAPI(currentLocation?.coords?.latitude, currentLocation?.coords?.longitude,page,videosCount=3, tokenn)
            if (res.data) {
                console.log("debgcbd",res.data.nearByVideos)
                var Data = res.data.nearByVideos
                setvideoData((prevItems) => [...prevItems, ...Data]);
                // setSpinnerbool(false)
            }

        }
        catch (error) {
            console.log("dsjhcv",error.response.data.message)
            console.log(error)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.")
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else if (error.response.status === 404) {
                    console.log("c ", error.message)
                }
                else {
                    console.log("An error occurred response.")
                }
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
            }
            else {
                console.log("Error in Setting up the Request.")
            }
        }
        finally {
            setSpinnerbool(false)
        }
    }

    useEffect(() => {
        GetVideos()
    }, [])

    const handleEndReached = () => {
        setpage(a => a + 1)
        console.warn(page)
        GetVideos()
    };


    const handleChangeIndexValue = ({ index }) => {
        setCurrentIndex(index)
    }

    return (
        <SwiperFlatList
            vertical={true}
            data={videoData}
            onChangeIndex={handleChangeIndexValue}
            // onMomentumScrollEnd={handleEndReached()}
            onEndReached={() => { handleEndReached() }}
            onEndReachedThreshold={0.1}
            // loadMinimal
            loadMinimalSize={5}
            renderItem={({ item, index }) => (
                <ReelSingle item={item} index={index} currentIndex={currentIndex} play={isReelPage}  />
            )}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={(item, index) => index}
            pagingEnabled={true}
            loop={true}
            // pagingEnabled
            decelerationRate={0.1}
        />


    )
}

export default ReelsComponent