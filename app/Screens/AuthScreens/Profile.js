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
import CustomDropdown from '../../Components/UI/Inputs/CustomDropdown'
import { ProfileYupSchema } from '../../FormikYupSchema/ProfileYupSchema'




const Profile = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [categories, setCategoriesData] = useState("")

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
    initialValues: {firstName:"",lastName:"",email:"",dateOfBirth:"",userAge:"",gender:"", occupation:"",otherOccupation:""},

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: ProfileYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });


  const submitHandler = async (values) => {
    console.log("values ", values)
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
            <View style={{ marginLeft: 10,marginBottom:20 }}>
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

              <CustomTextInput2
                boxWidth={'95%'}
                placeholder={'Date of birth'}
                label={'Date of birth'}
                name='area'
                value={values.dateOfBirth}
                // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                // bgColor='#e1f3f8'
                // bgColor="#B1B1B0"

                onChangeText={(e) => { handleChange("dateOfBirth")(e); seterrorFormAPI(); }}
                onBlur={handleBlur("dateOfBirth")}


                validate={handleBlur("dateOfBirth")}

                outlined

                borderColor={`${(errors.dateOfBirth && touched.dateOfBirth) || (errorFormAPI && errorFormAPI.dateOfBirthForm) ? "red" : "#48484A"}`}

                errorMessage={`${(errors.dateOfBirth && touched.dateOfBirth) ? `${errors.dateOfBirth}` : (errorFormAPI && errorFormAPI.dateOfBirthForm) ? `${errorFormAPI.areaForm}` : ``}`}

              // errorColor='magenta'
              />

              <CustomTextInput2
                boxWidth={'95%'}
                placeholder={'Enter age'}
                label={'Age'}
                name='userAge'
                value={values.userAge}
                // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                // bgColor='#e1f3f8'
                // bgColor="#B1B1B0"

                onChangeText={(e) => {
                  // Remove any non-numeric characters
                  const numericValue = e.replace(/[^0-9]/g, '');
                  // Update the state with the numeric value
                  handleChange("userAge")(numericValue);
                  seterrorFormAPI();
                }}
                onBlur={handleBlur("userAge")}
                validate={handleBlur("userAge")}
                keyboardType="numeric"
                outlined
                borderColor={`${(errors.userAge && touched.userAge) || (errorFormAPI && errorFormAPI.userAgeForm) ? "red" : "#48484A"}`}
                errorMessage={`${(errors.userAge && touched.userAge) ? `${errors.userAge}` : (errorFormAPI && errorFormAPI.userAgeForm) ? `${errorFormAPI.userAgeForm}` : ``}`}
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
             
             {values.occupation=='Other (custom entry)'?
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
              />:""}
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

export default Profile
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