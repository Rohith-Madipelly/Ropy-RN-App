import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import StatusBarComponent from '../../Components/StatusBar/StatusBarComponent'
import LoaderComponent from '../../Components/Loaders/LoaderComponents'
import { useDispatch } from 'react-redux'
import TitleComponent from '../../Components/UI/TextUI/TitleComponent'
import CustomTextInput2 from '../../Components/UI/Inputs/CustomTextInput2'

import { Entypo, FontAwesome } from "@expo/vector-icons";

import { LoginYupSchema } from '../../FormikYupSchema/LoginYupSchema'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'




const Login = () => {
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
    initialValues: {Mobile_Number:"9951072005", email: "madipellyrohith@gmail.com", password: "Rohith@7" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: LoginYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });


  const submitHandler = async (values) => {
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
              <TitleComponent TitleName="Log In"></TitleComponent>
            </View>


            <View style={{ alignItems: 'center', flex: 0.3, flexDirection: 'column', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  // behavior={Platform.OS === "ios" ? 100:0}
                  // keyboardVerticalOffset={5000}
                  style={{ width: '100%', alignItems: 'center' }}
                >


                  {/* <CustomTextInput2
                    boxWidth={'95%'}
                    label={'Email address'}
                    placeholder={'Enter email address'}
                    name='email'
                    value={values.email}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"

                    onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("email")(eToLowerCaseText); seterrorFormAPI(); }}
                    onBlur={handleBlur("email")}
                    // validate={handleBlur("email")}

                    outlined
                    bgColor={'#F6F8FE'}
                    borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.emailForm) ? `${errorFormAPI.emailForm}` : ``}`}
                  // errorColor='magenta'
                  /> */}

                  <CustomTextInput2
                    boxWidth={'95%'}
                    placeholder={'Mobile Number'}
                    label={'Mobile Number'}
                    name='Mobile_Number'
                    keyboardType={'phone-pad'}
                    value={values.Mobile_Number}
                    onChangeText={(e) => {
                      // Remove any non-numeric characters
                      const numericValue = e.replace(/[^0-9]/g, '');
                      // Update the state with the numeric value
                      const Only10digits = numericValue.slice(0, 10);
                      // handleChange("Mobile_Number")(Only10digits);

                      // seterrorFormAPI({ Mobile_Number: "" })
                      // if (Only10digits[0] < 6) {
                      //   seterrorFormAPI({ Mobile_Number: "Mobile number must start with 6, 7, 8, or 9" })
                      // }
                      handleChange("Mobile_Number")(Only10digits);


                    }}
                    onBlur={handleBlur("Mobile_Number")}
                    // validate={handleBlur("Mobile_Number")}

                    eyboardType="numeric"
                    borderColor={`${(errors.Mobile_Number) || (errorFormAPI && errorFormAPI.Mobile_NumberForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.Mobile_Number) ? `${errors.Mobile_Number}` : (errorFormAPI && errorFormAPI.Mobile_Number) ? `${errorFormAPI.Mobile_Number}` : ``}`}
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

                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
              <TouchableOpacity onPress={() => { navigation.navigate("EmailVerificationForget") }}>
                <Text style={[styles.paragraphy, { color: '#03C4CB', fontWeight: '500' }]}>Forgot password?</Text>
              </TouchableOpacity>
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
                style={{ marginTop: 50 }}>Login</CustomButton1>


              <View style={{ marginTop: 20, flex: 1, flexDirection: 'row' }}>
                <Text style={[styles.paragraphy, { color: 'black', fontWeight: '400' }]}>Don't have an account yet? </Text><TouchableOpacity onPress={() => { navigation.navigate("SignUp") }} style={{}}><Text style={[styles.paragraphy, { color: '#03C4CB', fontWeight: '500' }]}> Create an account</Text></TouchableOpacity>
              </View>

            </View>
          </View>

        </View>

      </ScrollView>
    </StatusBarComponent>
  )
}

export default Login
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