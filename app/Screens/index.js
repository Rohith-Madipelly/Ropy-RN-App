import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font';
import { useState, useMemo, useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux';


import AsyncStorage_Calls from '../Utils/AsyncStorage_Calls';
import Login from './AuthScreens/Login';
import SignUp from './AuthScreens/SignUp';
import VerificationCode from './AuthScreens/VerificationCode';
import CreatePassword from './AuthScreens/CreatePassword';
import Profile from './AuthScreens/Profile';
import InterestsForm from './AuthScreens/InterestsForm';
import SuccessfullyScreen from './AuthScreens/SuccessfullyScreen';
import BottomTabScreen from './MainScreens/BottomTabScreen';
import Hello from './Hello';
import BankdetailsProfile from './MainScreens/Profile/BankdetailsProfile';
import Edit_Account from './MainScreens/Profile/Edit_Account';
import { setToken } from '../redux/actions/loginAction';



// global Variables
const Stack = createNativeStackNavigator();


export default function Screens() {
  const [user, setUser] = useState()
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);


  const [fontsLoaded] = useFonts({
    'DMSans-Regular': require('../Components/Fonts/DMSans-Regular.ttf'),
  });


  const loginSelector = useSelector((state) => state.login.isLogin);
  console.log("login State>", loginSelector)


  const verifyToken = async () => {
    AsyncStorage_Calls.getTokenJWT('Token', (error, token) => {
      if (error) {
        console.error('Error getting token:', error);
      } else {
        if (token != null) {
          dispatch(setToken(token));
        }
      }
      setAppIsReady(true);
    });
  }

  useEffect(() => {
    setUser(loginSelector)
  }, [loginSelector])


  useEffect(() => {
    async function prepare() {
      try {
        await verifyToken();
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));

        // setUser(loginSelector)
      
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);



  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.

      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
            {/* <Stack.Screen name="VerificationCode" component={VerificationCode} /> */}
            {/* <Stack.Screen name="CreatePassword" component={CreatePassword} /> */}
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            {/* <Stack.Screen name="InterestsForm" component={InterestsForm} /> */}
            {/* <Stack.Screen name="SuccessfullyScreen" component={SuccessfullyScreen} /> */}

          </>) : (
          <>
             <Stack.Screen name="Home" component={BottomTabScreen} />
            <Stack.Screen name="BankdetailsProfile" component={BankdetailsProfile} /> 
            <Stack.Screen name="Edit_Account" component={Edit_Account} />
            {/* <Stack.Screen name="Demo" component={Hello} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

