import { View, Text, Dimensions, Touchable, TouchableOpacity, } from 'react-native'
import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Video, ResizeMode } from 'expo-av';
import { ActivityIndicator } from 'react-native';
// import ReelDescription from './ReelDescription';
import { useSelector } from 'react-redux';
import { VIDEO_REWARD_API } from '../../../ApiCalls';
import ReelsBtns from './ReelsBtns';
import { useToast } from 'react-native-toast-notifications';
// import { rewardedAPI } from '../utils/API_Calls';
// import { ToasterSender } from '../utils/Toaster';

import LottieView from "lottie-react-native";
import Coin from './Coins/Coin';
import Metrics from '../../../Utils/ResposivesUtils/Metrics';
import GiftIcon from '../../../assets/GiftIcon';
// const ReelSingle = ({ item, index, currentIndex, play }) => {

const ReelSingle = forwardRef(({ item, isPlaying, play, currentIndex, index }, ref) => {

    const windoWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height
    let tokenn = useSelector((state) => state.login.token);

    const [isBuffering, setIsBuffering] = useState(true);
    const toast = useToast();
    const videoRef = useRef(null)
    const [trigger, setTrigger] = useState(false);
    const coins = [
        { imageSource: require('./Coins/Coin (1).png') },
        { imageSource: require('./Coins/Coin (1).png') },
        { imageSource: require('./Coins/Coin (1).png') },
        { imageSource: require('./Coins/Coin (1).png') },
        { imageSource: require('./Coins/Coin (1).png') },
    ];

    useEffect(() => {
        videoRef.current.pauseAsync()
        setTrigger(false)

    }, [index, currentIndex])

    // useImperativeHandle(ref, () => ({
    //     playAsync: () => videoRef.current?.playAsync(),
    //     pauseAsync: () => videoRef.current?.pauseAsync(),
    // }));

    useEffect(() => {

        if (currentIndex != index) {
            PauseVideo()
        }
        else if (currentIndex === index) {
            videoRef.current.replayAsync();

            setTimeout(() => {
                videoRef.current.replayAsync();
                // PlayVideo()
            }, 10);
        }
        else {
            PauseVideo()
        }
    }, [currentIndex])


    useEffect(() => {
        if (play) {

        }
        else {
            PauseVideo()
        }

    }, [play])


    const [gift, setGift] = useState(false);




    const PlayVideo = async () => {
        try {
            console.log("play the index video of ", currentIndex)

            if (videoRef.current !== null) {
                videoRef.current.playAsync()
            }
            else {
                return;
            }
        } catch (error) { console.log("Error in PlayVideo", currentIndex) }
    };

    const PauseVideo = async () => {
        try {
            console.log("Pause the index video of", currentIndex)

            if (videoRef.current !== null) {
                videoRef.current.pauseAsync()
            }
            else {
                return;
            }
        } catch (error) { console.log("Error in PauseVideo", currentIndex) }
    };

    const handlePlaybackStatus = (playbackStatus) => {
        if (!playbackStatus.isLoaded || playbackStatus.isBuffering) {
            setLoading(true);
            return;
        } else {
            setLoading(false);
        }
    }


    const onBuffer = buffer => {
        setIsBuffering(buffer.isBuffering);
        //    videoRef.current.pauseAsync()
    }

    const onError = onError => {
        console.log("error i am buffering", onError);
        // videoRef.current.pauseAsync()

        // setTimeout(() => {
        //     PlayVideo()
        // }, 10);

    }

    const HitAPi = async () => {
        console.log("VIDEO_REWARD_API >>> start ")
        try {
            const res = await VIDEO_REWARD_API(item.videoId, tokenn)
            if (res.data) {
                console.log("VIDEO_REWARD_API res ")
                setGift(true)
                if (res.status === 200) {
                    toast.hideAll()
                    toast.show(res.data.message)
                    setTrigger(true)
                    // setGift(true)

                    setTimeout(() => {
                        setTrigger(false)
                    }, 2000);
                }
                else if (res.status === 201) {
                    toast.hideAll()
                    toast.show(res.data.message)
                    // setTrigger(true)
                }
            }

        } catch (error) {
            console.log("VIDEO_REWARD_API end", error)
            if (error.response) {
                const errorMessage = error.response.data.message;
                // ToasterSender({ Message: `${errorMessage}` })
                if (error.response.status === 400) {
                    console.log("Error With 400.")
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else {
                    console.log("An error occurred response.")
                }
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
            }
            else {
                console.log("Error in Setting up the Request.", error)
            }
        }
        finally {

        }
    }
    const dateVideorewardedAPI = item.videoId;
    const Rewarder = async () => {
        HitAPi()
    }



    // not a complete code look for full buffering data code

    const onPlaybackStatusUpdate = (status) => {
        // console.log(status)
        // console.log(status.isPlaying)
        // videoRef.current.replayAsync();
        // console.log("onPlaybackStatusUpdate",status.durationMillis==status.positionMillis)

        // // Check if the video has just started playing
        if (status.didJustFinish) {
            // videoRef.current.replayAsync();
            HitAPi()
        }

        if (status.isLoaded && !status.isBuffering) {
            setIsBuffering(false);
        }
    };


    // console.log(videoRef.current.props.source.uri)

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPressIn={PauseVideo}
            onPressOut={PlayVideo}

        >
            <View style={{

                width: '100%', height: '100%',
                width: windoWidth, height: windowHeight * 0.94, position: 'relative'
            }}>

                <>


                    <Video
                        ref={videoRef}
                        onBuffer={onBuffer}
                        onError={onError}
                        repeat={true}
                        resizeMode="cover"
                        // resizeMode="contain"
                        paused={false}
                        source={{ uri: `${item.videoUrl}` }}
                        // source={{ uri: `${AWSBaseUrl}/${item.videoUrl}` }}
                        // source={item.video}
                        // source={{
                        //   uri: 'https://ads-book-s3.s3.ap-south-1.amazonaws.com/NTNfMTcwMzY2NDQ3MDIwMl81OQ==.mp4',
                        // }}
                        isLooping
                        seNativeControls={false}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute'
                        }}
                        onPlaybackStatusUpdate={(status) => onPlaybackStatusUpdate(status)}

                    />

                    <View>



                        {/* <ReelDescription description={item.description} /> */}

                        <ReelsBtns
                            gift={gift}
                            isLiked={item.userLikedOrNot}
                            // likes={item.likes}
                            shares={item.shares}
                            comments={item.comments}
                            dateVideoId={item.videoId}
                            // urlLink={`${AWSBaseUrl}/${item.videoUrl}`}
                            urlLink={`${item.videoUrl}`}
                            Data={item}
                        // UploaderthumbnailUrl="https://ezewin-files.s3.ap-south-1.amazonaws.com/MTU1XzE3MDI0NjU2MTExOThfNjgz.jpeg"
                        // index={currentIndex}
                        />


                    </View>

                    {trigger && <View>
                        {coins.map((coin, index) => (
                            <Coin
                                key={index}
                                imageSource={coin.imageSource}
                                delay={index * 100} // Delay each coin's animation by 300ms
                                trigger={trigger}
                                index={index} // Pass the index to adjust the size
                            />
                        ))}
                    </View>}

                </>

                {isBuffering && (
                    <View
                        style={{

                            width: windoWidth, height: windowHeight, position: 'relative',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}


            </View>

        </TouchableOpacity>

    )

});

export default ReelSingle;