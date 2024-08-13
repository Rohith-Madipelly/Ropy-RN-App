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
import { UserLoginApi } from '../../ApiCalls'
import ASO from '../../Utils/AsyncStorage_Calls'
import { setToken } from '../../redux/actions/loginAction'




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
    initialValues: { phone_number: "9951072005",  password: "Rohith@7" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: LoginYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });


  const submitHandler2 = async (values) => {
    console.log("values ", values)
  }


  const submitHandler = async (user) => {

    try {
      setSpinnerbool(true)
      const res =  await UserLoginApi(user)

      if (res) {
        console.log("fds", res)
        const Message = res.data.message
        const token = res.data.token


        ASO.setTokenJWT("Token", JSON.stringify(res.data.token), function (res, status) {
          if (status) {
            // console.warn(status, " status>>>>>.")
            // ToasterSender({ Message: `${Message}` })
            dispatch(setToken(token));
          }
        })




      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 401) {
          console.log("Password is wrong", error.message)
          // setError("Password is wrong")
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

      ToasterSender("Error in setting up the request.")
      ToasterSender({ Message: error.response.data.message })
      // ToasterSender({ Message: error })

      setSpinnerbool(false)

      let message = "Failed to create user.";

      if (error) {
        console.log(error.response.data.message)
        // message = error.message;
        // setError(message)

      }
    }
    finally {
      // setLoading(false);
      setSpinnerbool(false)
    }
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
                    name='phone_number'
                    keyboardType={'phone-pad'}
                    value={values.phone_number}
                    onChangeText={(e) => {
                      // Remove any non-numeric characters
                      const numericValue = e.replace(/[^0-9]/g, '');
                      // Update the state with the numeric value
                      const Only10digits = numericValue.slice(0, 10);
                      // handleChange("phone_number")(Only10digits);

                      // seterrorFormAPI({ phone_number: "" })
                      // if (Only10digits[0] < 6) {
                      //   seterrorFormAPI({ phone_number: "Mobile number must start with 6, 7, 8, or 9" })
                      // }
                      handleChange("phone_number")(Only10digits);


                    }}
                    onBlur={handleBlur("phone_number")}
                    // validate={handleBlur("phone_number")}

                    eyboardType="numeric"
                    borderColor={`${(errors.phone_number) || (errorFormAPI && errorFormAPI.phone_numberForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.phone_number) ? `${errors.phone_number}` : (errorFormAPI && errorFormAPI.phone_number) ? `${errorFormAPI.phone_number}` : ``}`}
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