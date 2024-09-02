import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import StatusBarComponent from '../../Components/StatusBar/StatusBarComponent'
import LoaderComponents from '../../Components/Loaders/LoaderComponents'
import CustomToolKitHeader from '../../Components/UI/CustomToolKitHeader'
import UserProfile from './useAbles/UserProfile'
import Redeem from '../../assets/Redeem'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'
import GiftIcon from '../../assets/GiftIcon'
import { GetWalletAmountAPI } from '../../ApiCalls'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import CommonCss from '../../Components/UI/CommonCss'
import LoadingImage from '../../Components/UI/ImageConatiners/LoadingImage'
import BottomTabProfile from './useAbles/CustomBottomTabProfile'

const Wallet = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [apiData, setApiData] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [walletAmount, setWalletAmount] = useState(0)
  const [profilepic, setProfilepic] = useState(null)

  let tokenn = useSelector((state) => state.login.token);

  let profileData = useSelector((state) => state.ProfileData.profileData);

  // console.log(profileData, "tokenn")





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

  const WalletAmountFunction = async () => {
    setSpinnerbool(true)
    try {
      const res = await GetWalletAmountAPI(tokenn)
      console.log("scas", res.data)
      setApiData(res.data)
      setWalletAmount(res.data.Amount)
    }
    catch (error) {
      if (error.response) {
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
        console.log("Error in Setting up the Request.")
      }
    }
    finally {
      setSpinnerbool(false)
    }

  }


  // useEffect(() => {
  //   WalletAmountFunction()
  // }, [])


  useFocusEffect(
    useCallback(() => {
      WalletAmountFunction()

      if (profileData.profile_pic == "") {

      } else {
        setProfilepic(`https://ads-reels-pictures.s3.ap-south-1.amazonaws.com/${profileData.profile_pic}`)
      }
      return () => {
      };
    }, [])
  )



  return (
    <StatusBarComponent barStyle='dark-content' barBackgroundColor='white'>
      <LoaderComponents
        visible={spinnerBool}
        color={"#4A3AFF"}
        animation={'fade'}
      />

      <CustomToolKitHeader componentName={"Wallet"} />
      <View style={styles.container}>
        <View style={styles.ContentBox}>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2, }}>


            <UserProfile/>
            <ImageBackground source={require('../../assets/RewardsBg2.png')} resizeMode="cover" style={{
              borderRadius: 20, marginTop: 20
              , overflow: 'hidden', width: '100%', height: 200,
              // backgroundColor: 'red'
            }} >
              {/* <Redeem /> */}
              <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>

                  <Text style={{ color: 'white', fontSize: 30, fontWeight: 700 }}>Rewards</Text>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}> <Text style={{ fontSize: 50, fontWeight: 900 }}>{walletAmount}</Text> Points </Text>
                </View>
              </View>
            </ImageBackground>
            {/* </View> */}
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomButton1
              boxWidth={'95%'}
              // onPress={()=>{navigation.navigate("EmailVerification")}}
              // onPress={handleSubmit}
              RightIcon={<View style={{ marginLeft: 10 }}>
                <GiftIcon />
              </View>}
              // leftIcon={<Entypo
              //   // style={styles.icon}
              //   name={'login'} size={18} color={'white'} />}
              //  bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
              bgColor={'#03C4CB'}
              style={{ marginTop: 100 }}>

              Redeem


            </CustomButton1>


           
          </View>
        </View>

      </View>
    </StatusBarComponent>
  )
}

export default Wallet
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor:'red'
    marginLeft: 10,
    paddingHorizontal: 2,
    marginRight: 10


  },
  UpperBox: {
    flex: 0.6
  },
  ContentBox: {
    flex: 0.9,
    overflow: 'hidden',
    // paddingTop: 36,
    // paddingHorizontal: 17,


  },
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