import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'

import StatusBarComponent from '../../../Components/StatusBar/StatusBarComponent'

import LoaderComponent from '../../../Components/Loaders/LoaderComponents'
import { useDispatch, useSelector } from 'react-redux'
import TitleComponent from '../../../Components/UI/TextUI/TitleComponent'
import CustomTextInput2 from '../../../Components/UI/Inputs/CustomTextInput2'

import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import CustomButton1 from '../../../Components/UI/Buttons/CustomButton1'
import { ChangePasswordYupSchema } from '../../../FormikYupSchema/ChangePasswordYupSchema'
import CustomCheckBox from '../../../Components/UI/Inputs/CustomCheckBox'
import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader'
import { CHANGE_PASSWORD_API, UserLoginApi } from '../../../ApiCalls'
import { useToast } from 'react-native-toast-notifications'
import CustomStatusBar from '../../../Components/UI/StatusBar/CustomStatusBar'
import GlobalStyles from '../../../Components/UI/GlobalStyles'




const ChangePassword = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();


  let tokenn = useSelector((state) => state.login.token);


  console.log("token", tokenn)


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
    initialValues: { oldPassword: "", newPassword: "", retypePassword: "" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: ChangePasswordYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });

  const submitHandler = async (values) => {


    console.log("API >>ChangePassword", values, "tokenn", tokenn)
    try {
      setSpinnerbool(true)
      const res = await CHANGE_PASSWORD_API(values, tokenn)

      if (res.data) {
        toast.hideAll()
        toast.show(res.data.message)

        setTimeout(() => {
          // navigation.navigate("ForgotPassword")
          navigation.goBack()
        }, 200);
      }
    }

    catch (error) {
      console.log("API ERROR >>ChangePassword", error)
      toast.show(error.response.data.message)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
          seterrorFormAPI({ oldPasswordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ oldPasswordForm: `${error.response.data.message}` })
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
          <CustomToolKitHeader componentName={"Change password"} />

          <View style={styles.ContentBox}>
            {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TitleComponent TitleName="Change password"></TitleComponent>
            </View> */}


            <View style={{ alignItems: 'center', flex: 0.15, flexDirection: 'column', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  // behavior={Platform.OS === "ios" ? 100:0}
                  // keyboardVerticalOffset={5000}
                  style={{ width: '100%', alignItems: 'center' }}
                >
                  <CustomTextInput2
                    boxWidth={'95%'}
                    placeholder={'Old password'}
                    label={'Old password'}
                    name='Old password'
                    value={values.oldPassword}
                    // leftIcon={<Entypo name="lock" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    onChangeText={(e) => {
                      handleChange("oldPassword")(e); seterrorFormAPI();
                      // setShow({ ...setShow, password: false });
                    }}
                    onBlur={handleBlur("oldPassword")}
                    rightIcon={<Pressable onPress={() => setShow({ ...setShow, oldPassword: !show?.oldPassword })}>
                      {!show?.oldPassword ? (
                        <Entypo name="eye-with-line" size={20} color="black" />) : (
                        <Entypo name="eye" size={20} color="black" />)
                      }
                    </Pressable>
                    }
                    secure={!show?.oldPassword} //default to true
                    validate={handleBlur("oldPassword")}
                    borderColor={`${(errors.oldPassword && touched.oldPassword) || (errorFormAPI && errorFormAPI.oldPasswordForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.oldPassword && touched.oldPassword) ? `${errors.oldPassword}` : (errorFormAPI && errorFormAPI.oldPasswordForm) ? `${errorFormAPI.oldPasswordForm}` : ``}`}
                    // errorColor='magenta'
                    outlined
                    bgColor={'#F6F8FE'}
                  />



                  <CustomTextInput2
                    boxWidth={'95%'}
                    placeholder={'Enter New Password'}
                    label={'New Password'}
                    name='Password'
                    value={values.newPassword}
                    // leftIcon={<Entypo name="lock" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    onChangeText={(e) => {
                      handleChange("newPassword")(e); seterrorFormAPI();
                      // setShow({ ...setShow, password: false });
                    }}
                    onBlur={handleBlur("newPassword")}
                    rightIcon={<Pressable onPress={() => setShow({ ...setShow, newPassword: !show?.newPassword })}>
                      {!show?.newPassword ? (
                        <Entypo name="eye-with-line" size={20} color="black" />) : (
                        <Entypo name="eye" size={20} color="black" />)
                      }
                    </Pressable>
                    }
                    secure={!show?.newPassword} //default to true
                    validate={handleBlur("newPassword")}
                    borderColor={`${(errors.newPassword && touched.newPassword) || (errorFormAPI && errorFormAPI.PasswordForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.newPassword && touched.newPassword) ? `${errors.newPassword}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
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
                style={{ marginTop: 50 }}>SignUp</CustomButton1>



            </View>
          </View>

        </View>

      </ScrollView>
    </StatusBarComponent>
  )
}

export default ChangePassword
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  UpperBox: {
    flex: 0.6
  },
  ContentBox: {
    flex: 0.4,
    overflow: 'hidden',
    // paddingTop: 36,
    // backgroundColor:'red',
    paddingHorizontal: 17
  }
})