import React, { useEffect, useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

// import ReelSingle from './ReelSingle'
import { useDispatch, useSelector } from 'react-redux'

import { Text, View } from 'react-native'
import { GetVideoByLocationAPI, HomeAPI } from '../../../ApiCalls'
import ReelSingle from './ReelSingle'
import * as Location from 'expo-location';
import { useToast } from 'react-native-toast-notifications'
import { setPlayIndex } from '../../../redux/actions/loginAction'
const ReelsComponent = ({ isReelPage }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playVideo, setPlayVideo] = useState(0);
    const [page, setpage] = useState(1)
    const [videoData, setvideoData] = useState([])
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null);

    const [message,setMessage]=useState("Loading ......")
    const videoRefs = useRef([]);
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


            const res = await GetVideoByLocationAPI(currentLocation?.coords?.latitude, currentLocation?.coords?.longitude, page, videosCount = 7, tokenn)
            if (res.data) {
                console.log("debgcbd", res.data)
                var Data = res.data.nearByVideos
                setvideoData((prevItems) => [...prevItems, ...Data]);
                setSpinnerbool(false)
                setMessage("No Video found in this location ")
            }

        }
        catch (error) {
            setMessage("No Video found in this location ")
            console.log("dsjhcv", error.response.data.message)
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


    const dispatch = useDispatch();

    // const handleChangeIndexValue = ({ index }) => {
    //     setCurrentIndex(index)
    // }



    const handleChangeIndexValue = ({ index }) => {
        // Pause the previous video
        if (videoRefs.current[currentIndex]) {
            videoRefs.current[currentIndex].pauseAsync();
        }

        // Update the current index
        setCurrentIndex(index);

        // Play the new video
        if (videoRefs.current[index]) {
            videoRefs.current[index].playAsync();
        }
    };

    const handleEndReached = () => {
        setpage(a => a + 1)
        GetVideos()
    };
    return (
        <>
            {videoData && videoData.length > 0 ? <SwiperFlatList
                vertical={true}
                data={videoData}
                onChangeIndex={handleChangeIndexValue}
                // onMomentumScrollEnd={handleEndReached()}
                onEndReached={() => { handleEndReached() }}
                onEndReachedThreshold={0.1}
                // loadMinimal
                loadMinimalSize={10}
         
                renderItem={({ item, index }) => (
                    <ReelSingle 
                    ref={(ref) => (videoRefs.current[index] = ref)}
                    item={item} index={index} currentIndex={currentIndex} play={isReelPage} />
                )}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled={true}
                loop={true}
                // decelerationRate={0.1}
                decelerationRate="fast"
                nestedScrollEnabled={true}
            /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 700 }}>{message}</Text>
            </View>}
        </>
    )
}

export default ReelsComponent