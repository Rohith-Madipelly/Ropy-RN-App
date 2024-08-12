import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
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
import { PasswordYupSchema } from '../../FormikYupSchema/PasswordYupSchema'
import CustomCheckBox from '../../Components/UI/Inputs/CustomCheckBox'




const CreatePassword = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [isChecked, setChecked] = useState(false);
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
    initialValues: { password: "Rohith@7", retypePassword: "Rohith@7" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: PasswordYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });




  const submitHandler = (values) => {
    if (isChecked) {
      console.log("values ", values)
   
    } else {
      Alert.alert("Please Select the Terms and Conditions")
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
              <TitleComponent TitleName="Create new password"></TitleComponent>
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
                    leftIcon={<Entypo name="lock" size={20} color="black" />}
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

            <View style={{ marginLeft: 5 }}>

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

export default CreatePassword
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