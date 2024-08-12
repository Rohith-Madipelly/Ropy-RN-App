import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import StatusBarComponent from '../../Components/StatusBar/StatusBarComponent'
import LoaderComponents from '../../Components/Loaders/LoaderComponents'
import CustomToolKitHeader from '../../Components/UI/CustomToolKitHeader'
import UserProfile from './useAbles/UserProfile'
import Redeem from '../../assets/Redeem'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'
import GiftIcon from '../../assets/GiftIcon'

const Wallet = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")

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
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <UserProfile />

            <View style={{
              borderRadius: 20, marginTop: 20
              , overflow: 'hidden', width: '95%', height: 200,
            }}>
              <Redeem />
              <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>

                  <Text style={{ color: 'white', fontSize: 30, fontWeight: 700 }}>Rewards</Text>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}> <Text style={{ fontSize: 50, fontWeight: 900 }}>1032</Text> Points </Text>
                </View>
              </View>
            </View>
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


  }
})