import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Video } from 'expo-av'
import CustomStatusBar from '../Components/UI/StatusBar/CustomStatusBar'

const Testing = () => {
    const VideoData = [
        {
            "videoId": "6767bee204b8465dfc4d56bf",
            "title": "Test",
            "description": "Rohith",
            "reward": 36,
            "addressLink": "ace",
            "latitude": "17.45",
            "longitude": "78.37",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1734861608952.mp4",
            "userLikedOrNot": false,
            "distance": 0.7856
        },
        {
            "videoId": "6767bea204b8465dfc4d56ba",
            "title": "Test 5",
            "description": "Rohith",
            "reward": 26,
            "addressLink": "FB gn",
            "latitude": "17.45",
            "longitude": "78.37",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1734852258541.mp4",
            "userLikedOrNot": true,
            "distance": 0.7856
        },
        {
            "videoId": "6767be8a04b8465dfc4d56b5",
            "title": "Testing ",
            "description": "Rohith",
            "reward": 25,
            "addressLink": "FB gn",
            "latitude": "17.45",
            "longitude": "78.37",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1734852234737.mp4",
            "userLikedOrNot": true,
            "distance": 0.7856
        },
        {
            "videoId": "6767be7604b8465dfc4d56b0",
            "title": "Test 2",
            "description": "Rohith",
            "reward": 89,
            "addressLink": "FB gn",
            "latitude": "17.45",
            "longitude": "78.37",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1734852214237.mp4",
            "userLikedOrNot": true,
            "distance": 0.7856
        },
        {
            "videoId": "676cebda87507a56d8083c37",
            "title": "Testing 2",
            "description": "Test 1 Description",
            "reward": 100,
            "addressLink": "https://maps.app.goo.gl/BzWfcrSVGjADZ9oWA",
            "latitude": "17.4445475",
            "longitude": "78.3818234",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1735191513924.mp4",
            "userLikedOrNot": true,
            "distance": 1.5654
        },
        {
            "videoId": "676ceaa887507a56d8083bfb",
            "title": "Test 1",
            "description": "Test 1 Description",
            "reward": 40,
            "addressLink": "https://maps.app.goo.gl/BzWfcrSVGjADZ9oWA",
            "latitude": "17.4445475",
            "longitude": "78.3818234",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1735191208672.mp4",
            "userLikedOrNot": true,
            "distance": 1.5654
        },
        {
            "videoId": "676cea8c87507a56d8083bf6",
            "title": "Testing 1",
            "description": "Testing 1",
            "reward": 40,
            "addressLink": "https://maps.app.goo.gl/BzWfcrSVGjADZ9oWA",
            "latitude": "17.4445475",
            "longitude": "78.3818234",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1735191180319.mp4",
            "userLikedOrNot": true,
            "distance": 1.5654
        },
        {
            "videoId": "67669b40534cae423a7f3b4d",
            "title": "Testing 2",
            "description": "Test 2 Description",
            "reward": 56,
            "addressLink": "https://maps.app.goo.gl/BzWfcrSVGjADZ9oWA",
            "latitude": "17.4445475",
            "longitude": "78.3818234",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1734777664493.mp4",
            "userLikedOrNot": true,
            "distance": 1.5654
        },
        {
            "videoId": "67669b24534cae423a7f3b45",
            "title": "Testing 1",
            "description": "Test 1 Description",
            "reward": 30,
            "addressLink": "https://maps.app.goo.gl/BzWfcrSVGjADZ9oWA",
            "latitude": "17.4445475",
            "longitude": "78.3818234",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1734777636136.mp4",
            "userLikedOrNot": true,
            "distance": 1.5654
        },
        {
            "videoId": "6767bee204b8465dfc4d56bf",
            "title": "Test",
            "description": "Rohith",
            "reward": 36,
            "addressLink": "ace",
            "latitude": "17.45",
            "longitude": "78.37",
            "videoUrl": "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1734861608952.mp4",
            "userLikedOrNot": false,
            "distance": 0.7856
        }
    ]


    const [currentPosts, setCurrentPosts] = useState()


    const onEndReached = () => {
        setCurrentPosts((currentPosts) => [...currentPosts, dummyPosts])
    }
    return (
        <View style={styles.container}>
            <CustomStatusBar
                style='light'
            //    barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} 
            //    backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} 
            />
            <Video
                style={[StyleSheet.absoluteFill, styles.video]}
                source={{ uri: "https://ads-book-s3.s3.ap-south-1.amazonaws.com/videos/1734852258541.mp4" }}
                resizeMode='cover'
                isLooping
                seNativeControls={false}
            />
        </View>
    )
}

export default Testing

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center", alignItems: 'center'
    },
    video: {
        width: '100%',
        video: '100%'

    }
})

{/* <FlatList
                data={VideoData}

                renderItem={({ item }) => (
                    <View>
                        <Text>Hello {item.title}</Text>
                    </View>
                )}
                //  keyExtractor={({item,index})=>`${item?.videoId}-${index+8}`}
                pagingEnabled
                // viewabilityConfigCallbackPairs={
                //     viewabilityConfigCallbackPairs.current
                // }
                showsVerticalScrollIndicator={false}
                // onEndReached={onEndReached}
                onEndReachedThreshold={3}
            /> */}