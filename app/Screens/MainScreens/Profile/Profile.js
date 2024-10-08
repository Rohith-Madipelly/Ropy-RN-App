import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader.js';
import ArrowRight from '../../../assets/OtherIcons/ArrowRight.js';
import StatusBarComponent from '../../../Components/StatusBar/StatusBarComponent.js';
import LoaderComponents from '../../../Components/Loaders/LoaderComponents.js';
import ProfileIcon from '../../../assets/BottomTabsIcons/ProfileIcon.js';
import UserProfile from '../useAbles/UserProfile.js';

import { LogOutHandle } from '../../../Utils/LogOutHandle.js';
import { UserGetProfileDetails } from '../../../ApiCalls.js';
import LoadingImage from '../../../Components/UI/ImageConatiners/LoadingImage.js';
import CommonCss from '../../../Components/UI/CommonCss.js';
import { setProfileData } from '../../../redux/actions/ProfileDataAction.js';
import { SERVICE_PROVIDER_WEBSITE, THEME_COLOR } from '../../../Utils/AppConts.js';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomLinking } from '../../../Utils/CustomLinking.js';
// import Wapper from '../../ShareScreens/Wapper';





const renderItem1 = ({ item }) => {

  // for logout
  if (item.onPress) {
    return (
      <View style={styles.menuItem}>
        <TouchableOpacity onPress={item.onPress}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          {/* <View style={{ marginTop: 80 }}>
          </View> */}
        </TouchableOpacity>
      </View>
    )

  }
  return (
    // ({ item }) => (

    <View style={styles.menuItem}>
      <Text style={styles.menuTitle}>{item.title}</Text>
      {item.subItems && item.subItems.length > 0 && (
        <FlatList
          data={item.subItems}
          keyExtractor={(subItem, subIndex) => subIndex.toString()}
          renderItem={({ item: subItem }) => (

            <TouchableOpacity onPress={subItem.onPress}>

              <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>

                <View style={{ flexDirection: 'row', flex: 1, }}>

                  {subItem.logo ? <View style={{ marginRight: 18 }}>
                    {/* <Image style={{ width: 24, height: 24, marginBottom: 4, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                      source={subItem.logo}
                      resizeMode={"contain"} /> */}
                    {/* <View  style={{ width: 24, height: 24, marginBottom: 4, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      {subItem.logo}
                    </View> */}

                  </View> : ""}

                  {/* <View style={{ flex: subItem.logo ? 0.8 : 0.9 }}> */}
                  <View style={{ flex: 0.9 }}>
                    <Text style={styles.subMenuItem}>{subItem.title}</Text>

                  </View>
                  <View style={{ flex: 0.1 }}>
                    {/* <Image style={{ width: 24, height: 24 }}
                      source={require("../../../assets/Profile/chevron_right.png")}
                      resizeMode={"contain"} /> */}
                    <ArrowRight />
                  </View>
                </View>


              </View>
            </TouchableOpacity>
          )}
        />
      )}

    </View>
    // )}
  )
}


const renderHeader = () => (
  <View style={{ marginRight: 10, }}>
    <UserProfile />
  </View>
);

const renderFooter = () => (
  <View style={{ marginRight: 10, marginVertical: 5 }}>

    <Text style={{ color: '#001F2099', textAlign: 'center' }}>Version 1.0</Text>
    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={()=>{CustomLinking(SERVICE_PROVIDER_WEBSITE)}}>
      <MaterialIcons name="copyright" size={15} color={THEME_COLOR} />
      <Text style={{ color: THEME_COLOR, fontWeight: '600', textAlign: 'center', marginVertical: 10,marginLeft:5,fontSize:15 }}>
        Analogue IT Solutions
      </Text>
    </TouchableOpacity>


  </View>
);

const Menu = ({ items }) => {
  const dispatch = useDispatch();

  const [UserProfileData, setUserProfileData] = useState("")
  const [profilepic, setProfilepic] = useState(null)
  let tokenn = useSelector((state) => state.login.token);


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
      if (res.status === 200) {
        setUserProfileData(res.data)
        dispatch(setProfileData(res.data))

        if (res.data.profile_pic == "") {

        } else {
          setProfilepic(`https://ads-reels-pictures.s3.ap-south-1.amazonaws.com/${res.data.profile_pic}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    // ApiCaller()
  }, [])



  // useFocusEffect(
  //   

  //   React.useCallback(() => {
  //     console.log("Hello Project")

  //     // Cleanup function when the component loses focus
  //     return () => {
  //       console.log("Hello Project clse")
  //         
  //     };
  // }, [])
  // )

  return (
    // <Wapper>

    <View style={{ flex: 1 }}>
      <CustomToolKitHeader componentName={"Profile"} />
      <View style={styles.container}>






        {/* 
        <View style={[{ backgroundColor: "#FFFFFF", height: 100, flexDirection: 'row', marginRight: 10, borderRadius: 8 }, CommonCss.dropShadow]}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: "space-around", flexDirection: 'row' }}>

            <TouchableOpacity style={[styles.outerCircle, CommonCss.dropShadow]}
            // onPress={()=>{navigation.navigate('Edit_Account')}}
            >
              {profilepic ? <LoadingImage
                source={{
                  uri: profilepic,
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
              {UserProfileData ? <Text>{UserProfileData.firstname} {UserProfileData.lastname}</Text> : ""}
            </View>

          </View>

        </View> */}



        {/* <UserProfile data={"dvs"} /> */}

        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem1}
          style={{ marginBottom: 0 }}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </View>


    </View>


  );
};



const Profile = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const menuItems = [

    {
      title: 'Your account',
      subItems: [
        { title: 'Edit account', onPress: () => navigation.navigate('Edit_Account') },
        { title: 'Change password', onPress: () => navigation.navigate('ChangePassword') },
        { title: 'Save Location', onPress: () => navigation.navigate('SavedLocation') },

      ],
    },
    // {
    //   title: 'Other',
    //   subItems: [
    //     { title: 'Bank details', onPress: () => navigation.navigate('BankdetailsProfile') },
    //     // { title: 'Custom remainder', onPress: () => console.log('Custom remainder pressed') },
    //     // { title: 'App lock', onPress: () => console.log('App Lock pressed') },
    //     { title: 'Change password', onPress: () => navigation.navigate('VerifiyPassword') },
    //     { title: 'Delete account', onPress: () => console.log('Delete Account pressed') },
    //     // { title: 'Delete account', logo: require("../../../assets/Profile/trash_02.png"), onPress: () => console.log('Delete Account pressed') },
    //   ],
    // },


    // Termsandcondition
    // Privacypolicy
    // AboutUs
    {
      title: 'Others',
      subItems: [
        { title: 'Above us', onPress: () => navigation.navigate('AboutUs') },
        { title: 'Bank details', onPress: () => navigation.navigate('BankdetailsProfile') },
        { title: 'Privacy policy', onPress: () => navigation.navigate('Privacypolicy') },
        { title: 'Terms and condition', onPress: () => navigation.navigate('Termsandcondition') },

        { title: 'Share app', onPress: () => console.log('Share app') },

        { title: 'Contact us', onPress: () => console.log('Contact us') },
        { title: 'Delete Account', onPress: () => console.log('Delete Account') },
      ],
    },
    { title: 'Logout', onPress: () => { LogOutHandle(dispatch); console.log('Logout pressed') } },
  ];



  const [spinnerBool, setSpinnerbool] = useState(false)
  return (
    <>
      <StatusBarComponent barStyle='dark-content' barBackgroundColor='white'>
        <LoaderComponents
          visible={spinnerBool}
          color={"#4A3AFF"}
          animation={'fade'}
        />
        <Menu items={menuItems} />
      </StatusBarComponent>
    </>
  )
};

export default Profile;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    paddingHorizontal: 2,
    // backgroundColor: 'white'
    // backgroundColor:'red',
    marginLeft: 10,




  },
  menuItem: {
    padding: 10,
    paddingBottom: 2
    // marginBottom: 24,
    // backgroundColor:'black'
  },
  menuTitle: {
    fontSize: 18,
    // fontWeight: 'bold',

    color: '#001F20CC',
    // fontFamily: 'Poppins-Regular',
    fontSize: 18,
    // fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 20,
  },
  subMenuItem: {
    fontSize: 16,
    paddingVertical: 5,
    // fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: '#001F2099'
  },




  // Profile Pic css


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
});