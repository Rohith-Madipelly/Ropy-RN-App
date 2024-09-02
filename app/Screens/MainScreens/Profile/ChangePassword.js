import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'

import StatusBarComponent from '../../../Components/StatusBar/StatusBarComponent'

import LoaderComponent from '../../../Components/Loaders/LoaderComponents'
import { useDispatch } from 'react-redux'
import TitleComponent from '../../../Components/UI/TextUI/TitleComponent'
import CustomTextInput2 from '../../../Components/UI/Inputs/CustomTextInput2'

import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import CustomButton1 from '../../../Components/UI/Buttons/CustomButton1'
import { ChangePasswordYupSchema } from '../../../FormikYupSchema/ChangePasswordYupSchema'
import CustomCheckBox from '../../../Components/UI/Inputs/CustomCheckBox'
import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader'




const ChangePassword = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
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
    initialValues: {oldPassword:"", password: "", retypePassword: "" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: ChangePasswordYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });




  const submitHandler = (values) => {
      console.log("values ", values)
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
                    <CustomToolKitHeader componentName={"Change password"} />

          <View style={styles.ContentBox}>
            {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TitleComponent TitleName="Change password"></TitleComponent>
            </View> */}


            <View style={{ alignItems: 'center' ,flex: 0.15,flexDirection: 'column', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
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
                    placeholder={'Enter password'}
                    label={'Password'}
                    name='Password'
                    value={values.password}
                    // leftIcon={<Entypo name="lock" size={20} color="black" />}
                    // bgColor='#e1f3f8'
                    onChangeText={(e) => {
                      handleChange("password")(e); seterrorFormAPI();
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