import { View, Text, Dimensions, Touchable, TouchableOpacity, } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { Video, ResizeMode } from 'expo-av';
import { ActivityIndicator } from 'react-native';
// import ReelDescription from './ReelDescription';
import { useSelector } from 'react-redux';
import { rewardedAPI } from '../../../ApiCalls';
import ReelsBtns from './ReelsBtns';
// import { rewardedAPI } from '../utils/API_Calls';
// import { ToasterSender } from '../utils/Toaster';


const ReelSingle = ({ item, index, currentIndex, play, tokenn }) => {

    const [isBuffering, setIsBuffering] = useState(true);
    const AWSBaseUrl = "https://ads-book-s3.s3.ap-south-1.amazonaws.com"

    const videoRef = useRef(null)
    useEffect(() => {

        if (currentIndex === index) {
            videoRef.current.replayAsync();
            PlayVideo()
        }
        else if (currentIndex != index) {
            PauseVideo()
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

    const windoWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height



    const onBuffer = buffer => {
        setIsBuffering(buffer.isBuffering);
    }

    const onError = onError => {
        console.log("error i am buffering", onError);
    }

    const HitAPi = async () => {
        try {
            const res = await rewardedAPI(dateVideorewardedAPI, tokenn)
            if (res) {
                const Message = res.data.message

                if (res.status === 201) {
                    console.log(Message)
                }
                else {

                    // ToasterSender({ Message: `${Message}` })

                }
            }

        } catch (error) {
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
    const dateVideorewardedAPI = item._id;
    const Rewarder = async () => {
        HitAPi()
    }



    // not a complete code look for full buffering data code

    const onPlaybackStatusUpdate = (status) => {
        // console.error(status)
        // videoRef.current.replayAsync();


        // Check if the video has just started playing
        if (status.didJustFinish) {
            // Video finished playing, seek to the beginning
            videoRef.current.replayAsync();

            Rewarder()
            // console.log("Reel Single Page : 94 >> Video is replaying now again")
            // const Amount = item.Price
            // console.error("You Have Completed watching this reels.")
            // console.error(" Your have earned ", item.Price)

        }

        if (status.isLoaded && !status.isBuffering) {
            setIsBuffering(false);
        }
    };


    return (
        <TouchableOpacity

            activeOpacity={1}
            onPressIn={PauseVideo}
            onPressOut={PlayVideo}
        >
            <View style={{ width: windoWidth, height: windowHeight * 0.94, position: 'relative' }}>

                <>


                    <Video
                        ref={videoRef}
                        onBuffer={onBuffer}
                        onError={onError}
                        repeat={true}
                        resizeMode='cover'
                        // resizeMode="contain"
                        paused={false}
                        source={{ uri: `${AWSBaseUrl}/${item.videoUrl}` }}
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
                    {/* <Text>{item.videoId}</Text> */}
                    <View>


                        {/* <ReelDescription description={item.description} /> */}

                        <ReelsBtns
                            isLiked={item.liked}
                            likes={item.likes}
                            shares={item.shares}
                            comments={item.comments}
                            dateVideoId={dateVideorewardedAPI}
                            urlLink={`${AWSBaseUrl}/${item.videoUrl}`}
                        // UploaderthumbnailUrl="https://ezewin-files.s3.ap-south-1.amazonaws.com/MTU1XzE3MDI0NjU2MTExOThfNjgz.jpeg"
                        // index={currentIndex}
                        />


                    </View>

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
}

export default ReelSingle