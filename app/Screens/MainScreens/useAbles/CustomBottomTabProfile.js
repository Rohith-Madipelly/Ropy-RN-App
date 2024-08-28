import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CommonCss from '../../../Components/UI/CommonCss'
import { useSelector } from 'react-redux';
import LoadingImage from '../../../Components/UI/ImageConatiners/LoadingImage';
import Metrics from '../../../Utils/ResposivesUtils/Metrics';

const CustomBottomTabProfile = () => {
    let profileData = useSelector((state) => state.ProfileData.profileData);
    console.log(profileData, "tokenn")
    return (
        <View style={[styles.outerCircle, CommonCss.dropShadow]}
        // onPress={()=>{navigation.navigate('Edit_Account')}}
        >

            {!profileData.profilepic ? <LoadingImage
                source={{
                    uri: `https://ads-reels-pictures.s3.ap-south-1.amazonaws.com/${profileData.profile_pic}`,
                }}
                style={{ width: '100%', height: '100%', borderRadius: 50 }}
                loaderColor="#ff0000"
            // resizeMode="contain"
            /> : <LoadingImage
                source={require("../../../assets/utilsImages/profile2.jpg")}
                style={{ width: '100%', height: '100%', borderRadius: 50 }}
                loaderColor="#ff0000"
                resizeMode="contain"
            />}
        </View>
    )
}

export default CustomBottomTabProfile

const styles = StyleSheet.create({
    outerCircle: {
        width: Metrics.rfv(30),
        height: Metrics.rfv(30),
        overflow: 'hidden',
        // borderRadius:'50%',
        // backgroundColor: 'black'
    },

    innerCircle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})