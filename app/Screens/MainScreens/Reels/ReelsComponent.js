import React, { useEffect, useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

// import ReelSingle from './ReelSingle'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { GetVideoByLocationAPI } from '../../../ApiCalls'
import ReelSingle from './ReelSingle'

const ReelsComponent = ({ isReelPage }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playVideo, setPlayVideo] = useState(0);
    const [page, setpage] = useState(1)
    const [videoData, setvideoData] = useState([])
    const [spinnerBool, setSpinnerbool] = useState(false)
    
    
    let tokenn = useSelector((state) => state.login.token);


    try {
        if (tokenn != null) {
            tokenn = tokenn.replaceAll('"', '');
        }
    }
    catch (err) {
        console.log("Error in token quotes", err)
    }

    const GetVideos = async () => {
        setSpinnerbool(true)
        try {
            const Location = {
                longitude: '78.384433',
                latitude: '17.444594',
            };

            const res = await GetVideoByLocationAPI(Location, page, tokenn)

            var Data = res.data.locationVideos
            console.log("Copyed Data", res.data.locationVideos)
            setvideoData((prevItems) => [...prevItems, ...Data]);
            setSpinnerbool(false)
        }
        catch (error) {
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
                <ReelSingle item={item} index={index} currentIndex={currentIndex} play={isReelPage} tokenn={tokenn} />
            )}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={(item, index) => index}
            loop={true}
            pagingEnabled
            decelerationRate={0.1}
        />


    )
}

export default ReelsComponent