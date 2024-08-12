import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import StatusBarComponent from '../../Components/StatusBar/StatusBarComponent'
import LoaderComponent from '../../Components/Loaders/LoaderComponents'
import { useDispatch } from 'react-redux'
import TitleComponent from '../../Components/UI/TextUI/TitleComponent'
import CustomTextInput2 from '../../Components/UI/Inputs/CustomTextInput2'

import { Entypo, FontAwesome } from "@expo/vector-icons";

import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'
import CustomSpan from '../../Components/UI/TextUI/CustomSpan'
import { PhoneNumberValidation } from '../../FormikYupSchema/PhoneNumberValidation'
import { otpValidationSchema } from '../../FormikYupSchema/OtpValidationSchema'
import OtpInput from '../../Components/Functionality/OTP/OtpInput 4digits'




const VerificationCode = ({ route }) => {
  const { params } = route;
  const Mobile_Number = params?.Mobile_Number || 'nan';
  console.log("Mobile_Number", Mobile_Number)

  const [spinnerBool, setSpinnerbool] = useState(false)
  const [errorFormAPI, seterrorFormAPI] = useState("")

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
    touched,
    errors,
    isValid,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: { otp: "" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: otpValidationSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });


  const submitHandler = async (values) => {
    console.log("values ", values)
  }

  const ResendCode = () => {
    console.log("ResendCode")
  }

  return (
    <StatusBarComponent barStyle='dark-content' barBackgroundColor='white'>
      <LoaderComponent
        visible={spinnerBool}
        color={"#4A3AFF"}
        animation={'fade'}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>


          <View style={styles.ContentBox}>
            <View style={{ marginLeft: 10 }}>
              <TitleComponent TitleName="Verification code"></TitleComponent>
              <CustomSpan TextLine='We have sent the verification code to your Phone number'></CustomSpan>
            </View>


            <View style={{ flex: 0.9 }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  // behavior={Platform.OS === "ios" ? 100:0}
                  // keyboardVerticalOffset={5000}
                  style={{ width: '100%' }}
                >
                  <View style={{ marginHorizontal: 18 }}>

                    <View style={{ alignItems: 'center', marginTop: 30 }}>

                      <OtpInput
                        value={values.otp}
                        length={4}
                        keyboardType="numeric"
                        onOtpSubmit={(otp) => {
                          // console.log("otp vachinda", otp);
                          seterrorFormAPI() //Clear's All API errors
                          handleChange("otp")(otp)
                        }}
                        onChangeText={(index, value) => {
                          // console.log("index", index, ">value", value)
                        }}
                        // errorMessage={errorFormAPI.otp}
                        errorMessage={`${(errors.otp && touched.otp) ? `${errors.otp}` : (errorFormAPI && errorFormAPI.otp) ? `${errorFormAPI.otp}` : ``}`}

                        errorBoxid={errorFormAPI ? [0, 1, 2, 3,] : ""}
                        onClear={true}
                      />


                      <Text style={[styles.paragraphy, { color: '#B6B6B6', fontWeight: '400' }]}>Time : 52 sec</Text>

                      <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity onPress={ResendCode}>
                          <Text style={[styles.paragraphy, { color: '#B6B6B6', fontWeight: '400' }]}>Resend code</Text>
                        </TouchableOpacity>
                      </View>




                      <CustomButton1
                        boxWidth={'95%'}
                        // onPress={()=>{navigation.navigate("EmailVerification")}}
                        onPress={handleSubmit}

                        // leftIcon={<Entypo
                        //   // style={styles.icon}
                        //   name={'login'} size={18} color={'white'} />}
                        //  bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
                        bgColor={'#03C4CB'}
                        style={{ marginTop: 50 }}>Next</CustomButton1>



                    </View>
                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </View>


          </View>

        </View>

      </ScrollView>
    </StatusBarComponent>
  )
}

export default VerificationCode
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  UpperBox: {
    flex: 0.6
  },
  ContentBox: {
    flex: 0.4,
    overflow: 'hidden',
    paddingTop: 36,
    paddingHorizontal: 17
  }
})