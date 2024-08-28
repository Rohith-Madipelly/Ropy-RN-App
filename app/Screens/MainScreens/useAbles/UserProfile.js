import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CommonCss from '../../../Components/UI/CommonCss'
import { useSelector } from 'react-redux';
import LoadingImage from '../../../Components/UI/ImageConatiners/LoadingImage';

const UserProfile = () => {
  const [profilepic, setProfilepic] = useState(null)



    let profileData = useSelector((state) => state.ProfileData.profileData);

    console.log(profileData, "tokenn")
  
    return (
        <View style={[{ backgroundColor: "#FFFFFF", height: 100, flexDirection: 'row', borderRadius: 8 }, CommonCss.dropShadow]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "space-around", flexDirection: 'row' }}>


          <TouchableOpacity style={[styles.outerCircle, CommonCss.dropShadow]}
          // onPress={()=>{navigation.navigate('Edit_Account')}}
          >
          
            {!profilepic ? <LoadingImage
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
          </TouchableOpacity>

          <View style={{ flex: 0.8 }}>
            {profileData ? <Text style={{ color: '#001F2099' }}>{profileData.firstname} {profileData.lastname}</Text> : ""}
          </View>

  


        </View>

      </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    outerCircle: {
        width: 79,
        height: 79,
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