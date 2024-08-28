// BottomTabScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons, FontAwesome,
  MaterialCommunityIcons,
  FontAwesome6,
  Fontisto,

} from "@expo/vector-icons";


import { useNavigation } from '@react-navigation/native';

import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';

import Reels from './Reels/Reels';
import Wallet from './Wallet';
import Profile from './Profile/Profile';


import ReelIcon from '../../assets/BottomTabsIcons/ReelIcon';
import ReelIconActive from '../../assets/BottomTabsIcons/ReelIconActive';
import WalletIcon from '../../assets/BottomTabsIcons/WalletIcon';
import WalletIconActive from '../../assets/BottomTabsIcons/WalletIconActive';
import ProfileIcon from '../../assets/BottomTabsIcons/ProfileIcon';
import DotIcon from '../../assets/BottomTabsIcons/DotIcon';
import Test from './Test';
import CustomBottomTabProfile from './useAbles/CustomBottomTabProfile';





// import SideBar from '../Screens/Drawer/SideBar';


const Tab = createBottomTabNavigator();

const BottomTabScreen = ({ route }) => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          // height: 55,
          // flex: 0.102,
          flex: Platform.OS === "ios" ? 0.08 : 0.102,
          // backgroundColor: '#006AFF'
          backgroundColor: '#001F20'
        },

        tabBarIcon: ({ focused, size, colour }) => {
          let iconName;
          if (route.name === "Reels") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 10, width: '100%', height: '100%'}}>
                {focused ? <ReelIconActive /> : <ReelIcon />}
                {focused ? <View style={{
                  marginTop: 10
                }}><DotIcon /></View> : ""}
                {/* {focused ? <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#4A3AFF" : "black" }}>0</Text> : <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "#4A3AFF" : "black" }}></Text>} */}
              </View>)
          }
          else if (route.name === "Wallet") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 10, width: '100%', height: '100%', }}>
                {focused ? <WalletIconActive /> : <WalletIcon />}
                {focused ? <View style={{
                  marginTop: 10
                }}><DotIcon /></View> : ""}
                {/* {focused ? <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#4A3AFF" : "black" }}>0</Text> : <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "#4A3AFF" : "black" }}></Text>} */}
              </View>)
          }

          else if (route.name === "Profile") {
            // iconName =  focused ?<Fontisto name="search" size={24} color={colour} />:<Fontisto name="search" size={20} color={colour} />
            size = focused ? size + 8 : size + 2;
            colour = focused ? "Black" : "White";
            return (
              <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 10, width: '100%', height: '100%', }}>
                {/* {focused ? <ProfileIcon /> : <ProfileIcon />}
                 */}
                {/* <ProfileIcon /> */}
                <CustomBottomTabProfile/>
                {focused ? <View style={{
                  marginTop: 10
                }}><DotIcon /></View> : ""}
                {/* {focused ? <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#4A3AFF" : "black" }}>0</Text> : <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "#4A3AFF" : "black" }}></Text>} */}
              </View>)
          }
        }


      })}>


      <Tab.Screen name="Reels" component={Reels} options={{
        headerShown: false, // Show the header
        // headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        // headerLeft: () => (
        // <TouchableOpacity onPress={() => navigation.navigate('Reels')} style={{ marginLeft: 15 }}>
        //   <AntDesign name="arrowleft" size={24} color="black" />
        // </TouchableOpacity>
        // ),
      }} />

      <Tab.Screen name="Wallet" component={Wallet} options={{
        headerShown: false, // Show the header
        // headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        // headerLeft: () => (
        // <TouchableOpacity onPress={() => navigation.navigate('Reels')} style={{ marginLeft: 15 }}>
        //   <AntDesign name="arrowleft" size={24} color="black" />
        // </TouchableOpacity>
        // ),
      }} />


      <Tab.Screen name="Profile" component={Profile} options={{
        headerShown: false, // Show the header
        // headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        // headerLeft: () => (
        // <TouchableOpacity onPress={() => navigation.navigate('Reels')} style={{ marginLeft: 15 }}>
        //   <AntDesign name="arrowleft" size={24} color="black" />
        // </TouchableOpacity>
        // ),
      }} />

   

    </Tab.Navigator>



  );
};

export default BottomTabScreen;



















