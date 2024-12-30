import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import StatusBarComponent from '../../Components/StatusBar/StatusBarComponent'
import LoaderComponent from '../../Components/Loaders/LoaderComponents'
import { useDispatch } from 'react-redux'
import TitleComponent from '../../Components/UI/TextUI/TitleComponent'
import CustomTextInput2 from '../../Components/UI/Inputs/CustomTextInput2'

import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { LoginYupSchema } from '../../FormikYupSchema/LoginYupSchema'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'
import CustomDropdown from '../../Components/UI/Inputs/CustomDropdown'
import { ProfileYupSchema } from '../../FormikYupSchema/ProfileYupSchema'
import { UserLoginApi, UserProfileSetUpApi } from '../../ApiCalls'
import { useToast } from 'react-native-toast-notifications'
import CustomDateInput2 from '../../Components/UI/Inputs/CustomDateInput2'
import CustomStatusBar from '../../Components/UI/StatusBar/CustomStatusBar'
import GlobalStyles from '../../Components/UI/GlobalStyles'




const ProfileSetUp = ({ route }) => {

  const { params } = route;
  const TokenForSetUp = params?.TokenForSetUp || '';

  console.log(TokenForSetUp, "TokenForSetUp")

  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [categories, setCategoriesData] = useState("")

  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    // initialValues: { firstName: "Rohith", lastName: "madipelly", email: "madipellyrohith@gmail.com", dob: "13/02/2001", age: "23", gender: "", occupation: "", otherOccupation: "" },
    initialValues: { firstName: "", lastName: "", email: "", dob: "", age: "", gender: "", occupation: "", otherOccupation: "" },
    // initialValues: {firstName:"Rohith",lastName:"madipell",email:"",dob:"",age:"",gender:"", occupation:"",otherOccupation:""},

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: ProfileYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });


  const submitHandler = async (user) => {

    console.log("Check Login", user)

    try {
      setSpinnerbool(true)
      const res = await UserProfileSetUpApi(user, TokenForSetUp)

      if (res.data) {
        console.log("fds >>>>", res.data)
        var toScreen = res.data.screenStatus
        toast.hideAll()
        toast.show(res.data.message)

        setTimeout(() => {
          { navigation.navigate('InterestsForm', { TokenForSetUp: TokenForSetUp }); }
          setSpinnerbool(false)
        }, 50);
      }
    }

    catch (error) {
      console.log("dshgfadcv", error.response.data.message,error.response.status)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
          seterrorFormAPI({ emailForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ emailForm: `${error.response.data.message}` })
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

  const genderData = [
    { title: 'Male' },
    { title: 'Female' },
    { title: 'Other' },
    // { title: 'Home appliences', image: require('../../../assets/opitionsImages/Categories/Home appliences.png') },
  ]


  const OccupationData = [
    { title: 'Arts/Entertainment' },
    { title: 'Healthcare' },
    { title: 'Homemaker' },
    { title: 'IT/Technology' },
    { title: 'Student' },
    { title: 'Unemployed' },
    { title: 'Other (custom entry)' },
  ]


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
            <View style={{ marginLeft: 10, marginBottom: 20 }}>
              <TitleComponent TitleName="Profile Setup" style={{ color: '#001F20CC' }}></TitleComponent>
            </View>




            <View style={{ alignItems: 'center', flex: 0.5 }}>


              <CustomTextInput2
                boxWidth={'95%'}
                placeholder={'Enter first name'}
                label={'First name'}
                name='firstName'
                value={values.firstName}
                // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                // bgColor='#e1f3f8'
                // bgColor="#B1B1B0"

                onChangeText={(e) => { handleChange("firstName")(e); seterrorFormAPI(); }}
                onBlur={handleBlur("firstName")}

                // validate={() => {
                //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                //     else { setError({ ...error, first: null }) }
                // }}

                validate={handleBlur("firstName")}

                outlined

                borderColor={`${(errors.firstName && touched.firstName) || (errorFormAPI && errorFormAPI.firstNameForm) ? "red" : "#48484A"}`}

                errorMessage={`${(errors.firstName && touched.firstName) ? `${errors.firstName}` : (errorFormAPI && errorFormAPI.firstNameForm) ? `${errorFormAPI.firstNameForm}` : ``}`}

              // errorColor='magenta'
              />



              <CustomTextInput2
                boxWidth={'95%'}
                placeholder={'Enter last name'}
                label={'Last name'}
                name='lastName'
                value={values.lastName}
                // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                // bgColor='#e1f3f8'
                // bgColor="#B1B1B0"

                onChangeText={(e) => { handleChange("lastName")(e); seterrorFormAPI(); }}
                onBlur={handleBlur("lastName")}

                // validate={() => {
                //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                //     else { setError({ ...error, first: null }) }
                // }}

                validate={handleBlur("lastName")}

                outlined

                borderColor={`${(errors.lastName && touched.lastName) || (errorFormAPI && errorFormAPI.lastNameForm) ? "red" : "#48484A"}`}

                errorMessage={`${(errors.lastName && touched.lastName) ? `${errors.lastName}` : (errorFormAPI && errorFormAPI.lastNameForm) ? `${errorFormAPI.lastNameForm}` : ``}`}

              // errorColor='magenta'
              />

              <CustomTextInput2
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
                // bgColor={'#F6F8FE'}
                borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : "#48484A"}`}
                errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.emailForm) ? `${errorFormAPI.emailForm}` : ``}`}
              // errorColor='magenta'
              />

           

              <CustomDateInput2
                boxWidth={'95%'}
                placeholder={'Date of birth'}
                label={'Date of birth'}
                date='date'
                value={values.dob}
                // value={new Date(2001, 1, 13)}
                containerStyle={{ elevation: 10 }}
                rightIcon={<MaterialIcons name="date-range" size={20} color="black" />}
                onChangeText={(e) => {
                  console.log("oiuhgbn", e)
                  handleChange("dob")(e); seterrorFormAPI();
                }}
                onBlur={handleBlur("dob")}
                validate={handleBlur("dob")}
                outlined
                backgroundColor={'white'}
                labelStyle={{}}
                // minimumDate={new Date}
                maximumDate={new Date(2100, 10, 20)}
                borderColor={`${(errors.dob && touched.dob) || (errorFormAPI && errorFormAPI.dateOfBirthForm) ? "red" : "#48484A"}`}
                errorMessage={`${(errors.dob && touched.dob) ? `${errors.dob}` : (errorFormAPI && errorFormAPI.dateOfBirthForm) ? `${errorFormAPI.areaForm}` : ``}`}
              // errorColor='magenta'
              />

              <CustomTextInput2
                boxWidth={'95%'}
                placeholder={'Enter age'}
                label={'Age'}
                name='age'
                value={values.age}
                // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                // bgColor='#e1f3f8'
                // bgColor="#B1B1B0"

                onChangeText={(e) => {
                  // Remove any non-numeric characters
                  const numericValue = e.replace(/[^0-9]/g, '');
                  // Update the state with the numeric value
                  handleChange("age")(numericValue);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("age")}
                validate={handleBlur("age")}
                keyboardType="numeric"
                outlined
                borderColor={`${(errors.age && touched.age) || (errorFormAPI && errorFormAPI.ageForm) ? "red" : "#48484A"}`}
                errorMessage={`${(errors.age && touched.age) ? `${errors.age}` : (errorFormAPI && errorFormAPI.ageForm) ? `${errorFormAPI.ageForm}` : ``}`}
              // errorColor='magenta'
              />


              <CustomDropdown
                boxWidth={'95%'}
                label={"Gender"}
                placeholder={'Select'}
                name='gender'
                DropDownData={genderData}
                DropDownHeigth={200}
                value={values.gender}
                // bgColor='#e1f3f8'
                // onChange={setCategoriesData}

                onChange={(e) => {
                  handleChange("gender")(e);
                  seterrorFormAPI();
                }}
                outlined
                borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? "red" : "#48484A"}`}
                errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
              // errorColor='magenta'
              />



              <CustomDropdown
                boxWidth={'95%'}
                label={"Occupation"}
                placeholder={'Select'}
                name='Occupation'
                DropDownData={OccupationData}
                DropDownHeigth={200}
                value={values.occupation}
                // bgColor='#e1f3f8'
                // onChange={setCategoriesData}

                onChange={(e) => {
                  handleChange("occupation")(e);
                  seterrorFormAPI();
                }}
                outlined
                borderColor={`${(errors.occupation && touched.occupation) || (errorFormAPI && errorFormAPI.occupationForm) ? "red" : "#48484A"}`}
                errorMessage={`${(errors.occupation && touched.occupation) ? `${errors.occupation}` : (errorFormAPI && errorFormAPI.occupationForm) ? `${errorFormAPI.occupationForm}` : ``}`}
              // errorColor='magenta'
              />

              {values.occupation == 'Other (custom entry)' ?
                <CustomTextInput2
                  boxWidth={'95%'}
                  placeholder={'Enter Occupation'}
                  label={'Other Occupation'}
                  name='area'
                  value={values.otherOccupation}
                  // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                  // bgColor='#e1f3f8'
                  // bgColor="#B1B1B0"

                  onChangeText={(e) => { handleChange("otherOccupation")(e); seterrorFormAPI(); }}
                  onBlur={handleBlur("otherOccupation")}


                  validate={handleBlur("otherOccupation")}

                  outlined

                  borderColor={`${(errors.otherOccupation && touched.otherOccupation) || (errorFormAPI && errorFormAPI.otherOccupationForm) ? "red" : "#48484A"}`}

                  errorMessage={`${(errors.otherOccupation && touched.otherOccupation) ? `${errors.otherOccupation}` : (errorFormAPI && errorFormAPI.otherOccupationForm) ? `${errorFormAPI.otherOccupationForm}` : ``}`}

                // errorColor='magenta'
                /> : ""}
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

        </View>

      </ScrollView>
    </StatusBarComponent>
  )
}

export default ProfileSetUp
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