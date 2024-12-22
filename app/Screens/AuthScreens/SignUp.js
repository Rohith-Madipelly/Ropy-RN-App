import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
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
import CustomCheckBox from '../../Components/UI/Inputs/CustomCheckBox'
import { UserLoginApi, UserRegisterApi } from '../../ApiCalls'
import { useToast } from 'react-native-toast-notifications'
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar'
import GlobalStyles from '../../Components/UI/GlobalStyles'




const SignUp = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const toast = useToast();
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
    initialValues: { phoneNumber: "", password: "", retypePassword: "" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: PhoneNumberValidation,

    validate: values => {
      const errors = {};
      return errors;
    },

  });


  // const submitHandlerw = async (values) => {
  //   console.log("values ", values)
  //   setTimeout(() => {
  //     { navigation.navigate('VerificationCode', { phoneNumber: values.phoneNumber, password: "", retypePassword: "" }); }
  //     setSpinnerbool(false)
  //   }, 50);

  // }



  const submitHandler = async (values) => {
    console.log("uytfvbnm")
    if (isChecked) {
      console.log("values ", values)
      try {
        setSpinnerbool(true)
        const res = await UserRegisterApi(values)
        if (res.data) {
          console.log("fds", res.data)
          toast.hideAll()
          toast.show(res.data.message)
          setTimeout(() => {
            { navigation.navigate('ProfileSetUp', { TokenForSetUp: res.data.token }); }
            setSpinnerbool(false)
          }, 50);
        }
      }

      catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("Error With 400.", error.response.data)
            seterrorFormAPI({ phoneNumberForm: `${error.response.data.message}` })
          }
          else if (error.response.status === 401) {
            seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
          }
          else if (error.response.status === 403) {
            console.log("error.response.status login", error.response.data.message)
          }
          else if (error.response.status === 404) {
            console.log("dhg", error.response.data.message)
            seterrorFormAPI({ phoneNumberForm: `${error.response.data.message}` })

          }
          else if (error.response.status === 500) {
            console.log("Internal Server Error", error.message)
          }
          else {
            console.log("An error occurred response.>>")
            ErrorResPrinter(`${error.message}`)
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


    } else {
      Alert.alert("Please Select the Terms and Conditions")
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

          <View style={[styles.UpperBox, { justifyContent: 'center', alignItems: 'center' }]}>

            <Image
              style={{ width: 77, height: 108 }}
              animation={"bounceIn"}
              source={require("../../assets/Logo/Ropy_Logo.png")}
              contentFit="cover"
              transition={1000}
              alt=''
            />

          </View>
          <View style={styles.ContentBox}>
            <View style={{ marginLeft: 10 }}>
              <TitleComponent TitleName="Phone Number Verification"></TitleComponent>
              <CustomSpan TextLine='Enter your Phone number below.'></CustomSpan>
              <CustomSpan TextLine='We will send a 4 digit verification code to verify your Phone number.'></CustomSpan>
            </View>


            <View style={{ alignItems: 'center', flex: 0.3, flexDirection: 'column', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  // behavior={Platform.OS === "ios" ? 100:0}
                  // keyboardVerticalOffset={5000}
                  style={{ width: '100%', alignItems: 'center' }}
                >




                  <CustomTextInput2
                    boxWidth={'95%'}
                    placeholder={'Mobile Number'}
                    label={'Mobile Number'}
                    name='phoneNumber'
                    keyboardType={'phone-pad'}
                    value={values.phoneNumber}
                    onChangeText={(e) => {
                      // Remove any non-numeric characters
                      const numericValue = e.replace(/[^0-9]/g, '');
                      // Update the state with the numeric value
                      const Only10digits = numericValue.slice(0, 10);
                      // handleChange("phoneNumber")(Only10digits);

                      seterrorFormAPI()
                      // if (Only10digits[0] < 6) {
                      //   seterrorFormAPI({ phoneNumber: "Mobile number must start with 6, 7, 8, or 9" })
                      // }
                      handleChange("phoneNumber")(Only10digits);


                    }}
                    onBlur={handleBlur("phoneNumber")}
                    // validate={handleBlur("phoneNumber")}

                    eyboardType="numeric"
                    borderColor={`${(errors.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.phoneNumber) ? `${errors.phoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                    // errorColor='magenta'
                    outlined
                    bgColor={'#F6F8FE'}
                  />

                  <CustomTextInput2
                    boxWidth={'95%'}
                    placeholder={'Enter password'}
                    label={'Password'}
                    name='Password'
                    value={values.password}
                    // leftIcon={<Entypo name="lock" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    onChangeText={(e) => {
                      handleChange("password")(e); seterrorFormAPI();
                      seterrorFormAPI()
                      // setShow({ ...setShow, password: false });
                    }}
                    onBlur={handleBlur("password")}
                    rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>
                      {!show?.password ? (
                        <Entypo name="eye-with-line" size={20} color="black" />) : (
                        <Entypo name="eye" size={20} color="black" />)
                      }
                    </Pressable>
                    }

                    secure={!show?.password} //default to true
                    validate={handleBlur("password")}
                    borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.PasswordForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
                    // errorColor='magenta'
                    outlined
                    bgColor={'#F6F8FE'}
                  />

                  <CustomTextInput2
                    boxWidth={'95%'}
                    style={{ marginTop: 10 }}
                    placeholder={'Re-enter password'}
                    label={'Re-enter password'}
                    name='Retype Password'
                    value={values.retypePassword}
                    // leftIcon={<Entypo name="lock" size={20} color="black" />}
                    // bgColor='#e1f3f8'


                    onChangeText={(e) => {
                      handleChange("retypePassword")(e); seterrorFormAPI();
                      seterrorFormAPI()
                      //  setShow({ ...setShow, password: false }); 
                    }}
                    onBlur={handleBlur("retypePassword")}

                    rightIcon={<Pressable onPress={() => setShow({ ...setShow, retypePassword: !show?.retypePassword })}>

                      {!show?.retypePassword ? (
                        <Entypo name="eye-with-line" size={20} color="black" />) : (

                        <Entypo name="eye" size={20} color="black" />)
                      }

                    </Pressable>
                    }

                    secure={!show?.retypePassword} //default to true
                    validate={handleBlur("retypePassword")}
                    borderColor={`${(errors.retypePassword && touched.retypePassword) || (errorFormAPI && errorFormAPI.PasswordForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.retypePassword && touched.retypePassword) ? `${errors.retypePassword}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
                    // errorColor='magenta'
                    outlined
                    bgColor={'#F6F8FE'}
                  />

                  <CustomCheckBox
                    // value={values.iAgree}
                    value={isChecked}
                    // onBlur={handleBlur("iAgree")}             
                    boxWidth={'95%'}
                    content={<Text>I agree to the Terms and Conditions or Privacy Policy.</Text>}
                    // asterisksymbol
                    // validate={handleBlur("iAgree")}
                    onValueChange={setChecked}
                  // CheckboxborderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : "#48484A"}`}

                  // CheckboxborderColor={`${(errors.iAgree && touched.iAgree) || (errorFormAPI && errorFormAPI.iAgreeForm) ? "red" : "#4A3AFF"}`}
                  // errorMessage={`${(errors.iAgree && touched.iAgree) ? `${errors.iAgree}` : (errorFormAPI && errorFormAPI.iAgreeForm) ? `${errorFormAPI.iAgreeForm}` : ``}`}

                  // errorColor='magenta'
                  />

                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </View>

            <View style={{ alignItems: 'center', flex: 0.5 }}>


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


              <View style={{ marginTop: 20, flex: 1, flexDirection: 'row' }}>
                <Text style={[styles.paragraphy, { color: 'black', fontWeight: '400' }]}>Already have an account? </Text><TouchableOpacity onPress={() => { navigation.navigate("Login") }} style={{}}><Text style={[styles.paragraphy, { color: '#03C4CB', fontWeight: '500' }]}> Log In</Text></TouchableOpacity>
              </View>

            </View>
          </View>

        </View>

      </ScrollView>
    </StatusBarComponent>
  )
}

export default SignUp
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