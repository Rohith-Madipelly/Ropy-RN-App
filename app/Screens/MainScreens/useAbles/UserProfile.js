import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CommonCss from '../../../Components/UI/CommonCss'
import { useDispatch, useSelector } from 'react-redux';
import LoadingImage from '../../../Components/UI/ImageConatiners/LoadingImage';
import { UserGetProfileDetails } from '../../../ApiCalls';
import { setProfileData } from '../../../redux/actions/ProfileDataAction';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  let profileData = useSelector((state) => state.ProfileData.profileData);


  const dispatch = useDispatch();

  const [UserProfileData, setUserProfileData] = useState("")
  const [profilepic, setProfilepic] = useState(null)
  let tokenn = useSelector((state) => state.login.token);
  const navigation = useNavigation()

  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
    if (err.response.status === 500) {
      console.log("Internal Server Error", err.message)
    }
  }

  const ApiCaller = async () => {
    try {
      const res = await UserGetProfileDetails(tokenn)
      if (res.status) {
        console.log("hvnas", res.data)
        setUserProfileData(res.data)
        dispatch(setProfileData(res.data))
        console.log("dd",res.data.profilePicture)
        if (res.data.profile_pic == "") {

        } 
        else {
          setProfilepic(`${res.data.profilePicture}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }



  // useEffect(() => {
  //   ApiCaller()
  // }, [])



  useFocusEffect(
    useCallback(() => {
      ApiCaller()
    }, [])
  )


  console.log()

  console.log(profileData, "tokenn")

  return (
    <View style={[{ backgroundColor: "#FFFFFF", height: 100, flexDirection: 'row', borderRadius: 8 }, CommonCss.dropShadow]}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: "space-around", flexDirection: 'row' }}>


        <TouchableOpacity style={[styles.outerCircle,
          // CommonCss.dropShadow

        ]}
          onPress={() => {
            navigation.navigate('Edit_Account')
          }}
        >

          {profilepic ? <LoadingImage
            source={{
              uri: `${profilepic}`,
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
          {profileData ? <Text style={{ color: '#001F2099' }}>{UserProfileData.firstName} {UserProfileData.lastName}</Text> : ""}
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