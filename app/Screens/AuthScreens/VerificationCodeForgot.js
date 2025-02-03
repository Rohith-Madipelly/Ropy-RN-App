import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar'
import GlobalStyles from '../../Components/UI/GlobalStyles'
import { RESEND_FORGET_otp_API, UserRegisterApi, Verify_FORGET_otp_API, Verify_Register_otp_API } from '../../ApiCalls'
import { useToast } from 'react-native-toast-notifications'




const VerificationCodeForgot = ({ route }) => {
  const { params } = route;
  const Mobile_Number = params?.Mobile_Number || 'nan';
  const TokenForSetUp = params?.TokenForSetUp || 'nan';

  const emailToken=params?.email || 'nan'
  console.log("Mobile_Number", Mobile_Number)
  console.log("Mobile_Number", TokenForSetUp)

  const [spinnerBool, setSpinnerbool] = useState(false)
  const [errorFormAPI, seterrorFormAPI] = useState("")

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [timer, setTimer] = useState(60); // Initial countdown timer (in seconds)
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend initially




  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // Clear interval when timer reaches 0
            setIsResendDisabled(false); // Enable the resend button
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Update every second
    }
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [isResendDisabled]);

  // const ResendCode = () => {
  //   // Logic for resending OTP
  //   console.log('OTP Resent');

  //   // Reset the timer and disable resend button
  //   setTimer(60);
  //   setIsResendDisabled(true);
  // };


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
  const toast = useToast();

  const submitHandler = async (values) => {


      console.log("values ", values)
      try {
        setSpinnerbool(true)
        const res = await Verify_FORGET_otp_API(values,TokenForSetUp)
        if (res.data) {
          console.log("fds", res.data)
          toast.hideAll()
          toast.show(res.data.message)
          setTimeout(() => {
            { navigation.navigate('SetPassword', { TokenForSetUp: res.data.token, }); }
            // { navigation.navigate('ProfileSetUp', { TokenForSetUp: res.data.token }); }
            setSpinnerbool(false)
          }, 50);
        }
      }

      catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("Error With 400.", error.response.data)
            seterrorFormAPI({ otp: `${error.response.data.message}` })
            // if(error.response.data.message="Email already exists"){
            //   seterrorFormAPI({ otp: `${error.response.data.message}` })
            // }
            // else{
            //   seterrorFormAPI({ otp: `${error.response.data.message}` })
            // }
          }
          else if (error.response.status === 401) {
            seterrorFormAPI({ otp: `${error.response.data.message}` })
          }
          else if (error.response.status === 403) {
            console.log("error.response.status login", error.response.data.message)
          }
          else if (error.response.status === 404) {
            console.log("dhg", error.response.data.message)
            seterrorFormAPI({ otp: `${error.response.data.message}` })

          }
          else if (error.response.status === 406) {
            console.log("dhg", error.response.data.message)
            seterrorFormAPI({ otp: `${error.response.data.message}` })

          }
          else if (error.response.status === 500) {
            console.log("Internal Server Error", error.message)
          }
          else {
            console.log("An error occurred response.>>",error.response.data.message)
            // ErrorResPrinter(`${error.message}`)
          }
        }
        else if (error.code === 'ECONNABORTED') {
          console.log('Request timed out. Please try again later.');
        }
        else if (error.request) {
          console.log("No Response Received From the Server.")
          if (error.request.status === 0) {
            // console.log("error in request ",error.request.status)
            Alert.alert("No Network Found", "Please Check your Internet Connection")
          }
        }

        else {
          console.log("Error in Setting up the Request.")
        }

        setSpinnerbool(false)

        if (error) {

          // message = error.message;
          // seterrorFormAPI(message)
          // "userEmail or Password does not match !"
        }
      }
      finally {
        // setLoading(false);
        setSpinnerbool(false)
      }


  }

  const ResendCode =async () => {
    console.log("Helloooo....",TokenForSetUp)
    try {
      setSpinnerbool(true)
      const res = await RESEND_FORGET_otp_API(TokenForSetUp)
      if (res.data) {
        console.log("fds", res.data)
        toast.hideAll()
        toast.show(res.data.message)


            // Logic for resending OTP
    console.log('OTP Resent');

    // Reset the timer and disable resend button
    setTimer(60);
    setIsResendDisabled(true);
      }
    }

    catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
          if(error.response.data.message="Email already exists"){
            seterrorFormAPI({ otp: `${error.response.data.message}` })
          }
          else{
            seterrorFormAPI({ otp: `${error.response.data.message}` })
          }
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ otp: `${error.response.data.message}` })
        }
        else if (error.response.status === 403) {
          console.log("error.response.status login", error.response.data.message)
        }
        else if (error.response.status === 404) {
          console.log("dhg", error.response.data.message)
          seterrorFormAPI({ otp: `${error.response.data.message}` })

        }
        else if (error.response.status === 406) {
          console.log("dhg", error.response.data.message)
          seterrorFormAPI({ otp: `${error.response.data.message}` })

        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else {
          console.log("An error occurred response.>>",error.response.data.message)
          // ErrorResPrinter(`${error.message}`)
        }
      }
      else if (error.code === 'ECONNABORTED') {
        console.log('Request timed out. Please try again later.');
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")
        if (error.request.status === 0) {
          // console.log("error in request ",error.request.status)
          Alert.alert("No Network Found", "Please Check your Internet Connection")
        }
      }

      else {
        console.log("Error in Setting up the Request.")
      }

      setSpinnerbool(false)

      if (error) {

        // message = error.message;
        // seterrorFormAPI(message)
        // "userEmail or Password does not match !"
      }
    }
    finally {
      // setLoading(false);
      setSpinnerbool(false)
    }
  }


  return (
    <StatusBarComponent barStyle='dark-content' barBackgroundColor='white'>
      <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
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
              <CustomSpan TextLine='We have sent the verification code to your email'></CustomSpan>
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


                      <Text style={[styles.paragraphy, { color: '#B6B6B6', fontWeight: '400' }]}> Time: {timer} sec</Text>

                      <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 10 }}>
                        <TouchableOpacity onPress={ResendCode} disabled={isResendDisabled}>
                          <Text
                            style={[
                              styles.paragraphy,
                              {
                                color: isResendDisabled ? '#B6B6B6' : '#0000FF', // Change color based on disabled state
                                fontWeight: '400',
                              },
                            ]}
                          >
                            Resend code
                          </Text>
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

export default VerificationCodeForgot
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