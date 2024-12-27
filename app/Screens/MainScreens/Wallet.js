import { Alert, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import StatusBarComponent from '../../Components/StatusBar/StatusBarComponent'
import LoaderComponents from '../../Components/Loaders/LoaderComponents'
import CustomToolKitHeader from '../../Components/UI/CustomToolKitHeader'
import UserProfile from './useAbles/UserProfile'
import Redeem from '../../assets/Redeem'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'
import GiftIcon from '../../assets/GiftIcon'
import { GET_ALL_WITHDRAWS_API, GetWalletAmountAPI, POST_WITHDRAW_API } from '../../ApiCalls'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import CommonCss from '../../Components/UI/CommonCss'
import LoadingImage from '../../Components/UI/ImageConatiners/LoadingImage'
import BottomTabProfile from './useAbles/CustomBottomTabProfile'
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar'
import GlobalStyles from '../../Components/UI/GlobalStyles'
import { useToast } from 'react-native-toast-notifications'
import { formatTo12HourNO_SEC, formatToReadableDate, formatToReadableOnlyDate } from '../../Utils/TimeConverter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AddWishListModel from './ModelComponents/AddWishListModel'

const Wallet = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [apiData, setApiData] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [walletAmount, setWalletAmount] = useState(0)
  const toast = useToast();

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

  // const REQUEST_WITHDRAW_API = async (amount) => {
  //   console.log("ddd", amount)
  //   setSpinnerbool(true)
  //   try {
  //     const res = await POST_WITHDRAW_API(amount, tokenn)
  //     if (res.data) {
  //       console.log("Hello", res.data)
  //       toast.hideAll()
  //       toast.show(res.data.message)
  //     }
  //   }
  //   catch (error) {
  //     console.log(error)
  //     if (error.response) {
  //       if (error.response.status === 400) {
  //         console.log("Error With 400.")
  //         console.log("d", error.response.data.message)
  //         Alert.alert("", error.response.data.message)
  //         toast.hideAll()
  //         toast.show(error.response.data.message)
  //       }
  //       else if (error.response.status === 500) {
  //         console.log("Internal Server Error", error.message)
  //         toast.hideAll()
  //         toast.show(error.response.data.message)
  //       }
  //       else {
  //         console.log("An error occurred response.")
  //       }
  //     }
  //     else if (error.request) {
  //       console.log("No Response Received From the Server.")
  //     }
  //     else {
  //       console.log("Error in Setting up the Request.")
  //     }
  //   }
  //   finally {
  //     setSpinnerbool(false)
  //   }

  // }





  const get_All_WITHDRAW_API = async () => {

    // setSpinnerbool(true)
    try {
      const res = await GET_ALL_WITHDRAWS_API(tokenn)
      if (res.data) {
        console.log("Hello", res.data)
        setApiData(res.data.allWithDraws)
        // setSpinnerbool(false)
        // toast.hideAll()
        // toast.show(res.data.message)
      }
    }
    catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
          console.log("d", error.response.data.message)
          Alert.alert("", error.response.data.message)
          toast.hideAll()
          toast.show(error.response.data.message)
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
          toast.hideAll()
          toast.show(error.response.data.message)
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


  useFocusEffect(
    useCallback(() => {
      get_All_WITHDRAW_API()
      setWalletAmount(profileData?.wallet)
    }, [profileData])
  )

  const insets = useSafeAreaInsets();

  const [withDrawVisible, setWithDrawVisible] = useState(false);


  const showWithDrawVisible = () => {
    setWithDrawVisible(true);
  };

  const closeWithDrawVisible = () => {
    setWithDrawVisible(false);
  };

  return (
    // <StatusBarComponent barStyle='dark-content' barBackgroundColor='white'>
    <View style={[{ flex: 1, paddingTop: insets.top, }]}>


      <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
      <LoaderComponents
        visible={spinnerBool}
        color={"#4A3AFF"}
        animation={'fade'}
      />

      <CustomToolKitHeader componentName={"Wallet"} />
      <View style={[styles.container]}>

        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2, }}>


          <UserProfile />
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
            onPress={() => {
              // REQUEST_WITHDRAW_API(32)
              showWithDrawVisible()

            }}
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


        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 10 }}>All Translation</Text>
        <FlatList

          data={apiData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ height: 50, flexDirection: 'row', marginVertical: 2, backgroundColor: 'rgba(3, 196, 203, 0.1)', padding: 5, borderRadius: 5 }}>
              <View style={{ flex: 0.5 }}>
                <Text>{formatToReadableOnlyDate(item.createdAt)}</Text>
                <Text>{formatTo12HourNO_SEC(item.createdAt)}</Text>
              </View>
              <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                <Text style={{ textAlign: 'center', fontSize: 20, color: item.status == "Pending" ? "red" : "green", fontWeight: 600, }}>{item.status == "Pending"?"-":"+"}{item.requestingAmont} </Text>
              </View>
            </View>
          )}

        />

        <AddWishListModel
          // visible={withDrawVisible}
          visible={withDrawVisible}
          // title="Alert!"
          message="Something went wrong!"
          onClose={closeWithDrawVisible}
          onSubmit={(e, b) => {
            console.log("sdfjkgsk")
            get_All_WITHDRAW_API()
            // sendFile(e, b)
            // getWishListData()

          }}
        />

      </View>
    </View>
    //  </StatusBarComponent> 
  )
}

// GET_ALL_WITHDRAWS_API

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