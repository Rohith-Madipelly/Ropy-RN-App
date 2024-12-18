import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import GlobalStyles from '../../Components/UI/GlobalStyles'
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar'
import { Image } from 'expo-image';
import { useSelector } from 'react-redux';


const SplashScreen = ({navigation}) => {
    const loginSelector = useSelector((state) => state.login.isLogin);


    useEffect(() => {
        console.log(loginSelector)
        setTimeout(() => {
            if (!loginSelector) {
                navigation.navigate("Login")
            } else {
                navigation.navigate("BottomTabScreen")
            }
        }, 1300);

    }, [loginSelector])

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar2.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar2.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar2.color} />
            <View style={[{ backgroundColor: GlobalStyles.AuthScreenStatusBar2.color }, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                <Image
                    source={require("../../assets/LogoG.gif")}
                    style={{ width: '100%', height: '100%' }}
                    // placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={100}
                />
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})