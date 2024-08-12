import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader.js';
import ArrowRight from '../../../assets/OtherIcons/ArrowRight.js';
import StatusBarComponent from '../../../Components/StatusBar/StatusBarComponent.js';
import LoaderComponents from '../../../Components/Loaders/LoaderComponents.js';
import ProfileIcon from '../../../assets/BottomTabsIcons/ProfileIcon.js';
import UserProfile from '../useAbles/UserProfile.js';
// import Wapper from '../../ShareScreens/Wapper';





const renderItem1 = ({ item }) => {

  // for logout
  if (item.onPress) {
    return (
      <View style={styles.menuItem}>
        <TouchableOpacity onPress={item.onPress}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          <View style={{ marginTop: 80 }}>
          </View>
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


const Menu = ({ items }) => {

  return (
    // <Wapper>

    <View style={{ flex: 1 }}>
      <CustomToolKitHeader componentName={"Profile"} />
      <View style={styles.container}>

        <UserProfile />

        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem1}
          style={{ marginBottom: 0 }}
        />
      </View>


    </View>


  );
};

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
});

const Profile = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const menuItems = [

    {
      title: 'Your account',
      subItems: [
        { title: 'Edit account', onPress: () => navigation.navigate('Edit_Account') },
        { title: 'Change password', onPress: () => navigation.navigate('VerifiyPassword') },

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
    {
      title: 'Others',
      subItems: [
        { title: 'Above us', onPress: () => navigation.navigate('AboveUs') },
        { title: 'Bank details', onPress: () => navigation.navigate('BankdetailsProfile') },
        { title: 'Privacy policy', onPress: () => console.log('Privacy and Policy pressed') },
        { title: 'Terms and condition', onPress: () => console.log('Terms and condition pressed') },
        { title: 'Share app', onPress: () => navigation.navigate('Share app') },

        { title: 'Contact us', onPress: () => console.log('Contact us') },
        { title: 'Delete Account', onPress: () => console.log('Delete Account') },
      ],
    },
    { title: 'Logout', onPress: () => { console.log('Logout pressed') } },
  ];


  // const menuItems = [

  //   {
  //     title: 'Your account',
  //     subItems: [
  //       { title: 'Edit account', logo: require("../../../assets/Profile/edit.png"), onPress: () => navigation.navigate('Edit_Account') },
  //     ],
  //   },
  //   {
  //     title: 'Security',
  //     subItems: [
  //       { title: 'Bank details', logo: require("../../../assets/Profile/account_balance.png"), onPress: () => navigation.navigate('BankdetailsProfile') },
  //       { title: 'Custom remainder', logo: require("../../../assets/Profile/calendar_heart.png"), onPress: () => console.log('Custom remainder pressed') },
  //       { title: 'App lock', logo: require("../../../assets/Profile/lock_01.png"), onPress: () => console.log('App Lock pressed') },
  //       { title: 'Change password', logo: require("../../../assets/Profile/Password.png"), onPress: () => navigation.navigate('VerifiyPassword') },
  //       { title: 'Delete account', logo: require("../../../assets/Profile/trash_02.png"), onPress: () => console.log('Delete Account pressed') },
  //       // { title: 'Delete account', logo: require("../../../assets/Profile/trash_02.png"), onPress: () => console.log('Delete Account pressed') },
  //     ],
  //   },
  //   {
  //     title: 'Others',
  //     subItems: [
  //       { title: 'Terms and condition', onPress: () => console.log('Terms and condition pressed') },
  //       { title: 'Privacy and policy', onPress: () => console.log('Privacy and Policy pressed') },
  //       { title: 'History', onPress: () => navigation.navigate('History') },
  //       { title: 'Disclaimer', onPress: () => console.log('Disclaimer pressed') },
  //       { title: 'Check our branches', onPress: () => console.log('Check Our Branches pressed') },
  //     ],
  //   },
  //   { title: 'Logout', onPress: () => { LogOutHandle(dispatch); console.log('Logout pressed') } },
  // ];


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
