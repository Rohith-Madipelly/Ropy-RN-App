import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarComponent from '../../../Components/StatusBar/StatusBarComponent'
import LoaderComponents from '../../../Components/Loaders/LoaderComponents'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import { LoginYupSchema } from '../../../FormikYupSchema/LoginYupSchema'
import CustomTextInput2 from '../../../Components/UI/Inputs/CustomTextInput2'
import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader'
import CustomButton1 from '../../../Components/UI/Buttons/CustomButton1'
import { Bank_Details_on_IFSC, UserProfilePicUploadAPI } from '../../../ApiCalls'
import CustomDropdown from '../../../Components/UI/Inputs/CustomDropdown'
import ProfileIcon from '../../../assets/BottomTabsIcons/ProfileIcon'
import CommonCss from '../../../Components/UI/CommonCss'
import LoadingImage from '../../../Components/UI/ImageConatiners/LoadingImage'
import { MaterialIcons } from '@expo/vector-icons'
import { THEME_COLOR } from '../../../Utils/AppConts'
import { openPickerImage } from '../../../Utils/FileHelper'

const BankdetailsProfile = () => {
  const [edit, setEdit] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [IFSC_CODE_REQ, set_IFSC_CODE_REQ] = useState("")

  const dispatch = useDispatch();
  const navigation = useNavigation();
  let tokenn = useSelector((state) => state.login.token);


  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
    if (err.response.status === 500) {
      console.log("Internal Server Error", err.message)
    }
  }

  let profileData = useSelector((state) => state.ProfileData.profileData);

  console.log(profileData, "tokenn")


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
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", dateOfBirth: "", userAge: "", gender: "", occupation: "", otherOccupation: "" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: LoginYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });




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

  // Required API Calls 
  // For Bank Name and Branch from IFSC Code 
  useEffect(() => {
    const GetBankDetails = async () => {
      try {
        const res = await Bank_Details_on_IFSC(IFSC_CODE_REQ)
        if (res) {
          // console.log("wdw", res.data)
          setFieldValue('branch', res.data.BRANCH);
          setFieldValue('bankName', res.data.BANK);
        }
      } catch (error) {
        console.log("Error in IFSC_CODE_REQ", error)
      }
    }

    if (IFSC_CODE_REQ.length >= 11) {
      GetBankDetails()
    }

  }, [IFSC_CODE_REQ])

  const submitHandler = async (values) => {
    console.log("values ", values)
  }
  console.log("profileData.profile_pic", profileData.profile_pic)



  // API Call for profile pic 

  const UploadProfilePic = async (e) => {

    try {

      const res = await UserProfilePicUploadAPI(e,tokenn)
      if(res)
      {
        console.log("Good api call",res)
      }
    } catch (error) {
      console.log("Error in Uploading Profile pic ", error.response)
    }

  }



  const handleImageResponse = async response => {
    console.log('response ====', response);
    if (response.canceled == false) {
      // console.log("response >>>",response.assets[0].uri)
      // setImage(response);
      // UploadProfilePic(response.assets[0].uri)
      UploadProfilePic(response.assets[0].uri)
    } else {
      // setImageData('')
    }
    // setImageData(response);
  }




  return (
    <StatusBarComponent barStyle='dark-content' barBackgroundColor='white'>
      
      <LoaderComponents
        visible={spinnerBool}
        color={"#4A3AFF"}
        animation={'fade'}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <CustomToolKitHeader componentName={"Edit Profile"} />

          <View style={{ height: 114, width: '100%', justifyContent: 'center', alignItems: 'center' }}>




            <View style={{ flex: 1, alignItems: 'center', justifyContent: "space-around", flexDirection: 'row' }}>

              <TouchableOpacity style={[styles.outerCircle,
              // CommonCss.dropShadow,
              { justifyContent: 'center', alignItems: 'center' }]}
              // onPress={()=>{navigation.navigate('Edit_Account')}}
              >

                {profileData.profile_pic ? <LoadingImage
                  source={{
                    uri: `https://ads-reels-pictures.s3.ap-south-1.amazonaws.com/${profileData.profile_pic}`,
                  }}
                  style={{
                    width: '100%', height: '100%',
                    borderRadius: 50
                  }}
                  loaderColor="#ff0000"
                // resizeMode="contain"
                /> : <LoadingImage
                  source={require("../../../assets/utilsImages/profile2.jpg")}
                  style={{
                    width: '100%', height: '100%',
                    borderRadius: 50
                  }}
                  loaderColor="#ff0000"
                  resizeMode="contain"

                />}
              </TouchableOpacity>
              <TouchableOpacity style={{
                flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: -5,
                // backgroundColor:{THEME_COLOR},
                padding: 1.5,
                // backgroundColor:THEME_COLOR,
                // borderRadius: '50%'
              }}

                onPress={() => { openPickerImage(handleImageResponse) }}

              >
                {/* <MaterialIcons name="edit" size={24} color={'#A9A9A9'} /> */}
                <MaterialIcons name="edit" size={24} color={THEME_COLOR} />
              </TouchableOpacity>


              {/* <TouchableOpacity style={{width:10,height:10,backgroundColor:{THEME_COLOR}, flex: 1, justifyContent: 'center', alignItems: 'center',position:'absolute',bottom:0,right:-5 }}>
                <MaterialIcons name="edit" size={24} color={THEME_COLOR} />
              </TouchableOpacity> */}


            </View>




          </View>



          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {profileData ? <Text>{profileData.firstname} {profileData.lastname}</Text> : ""}
          </View>


          <View style={styles.ContentBox}>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  // behavior={Platform.OS === "ios" ? 100:0}
                  // keyboardVerticalOffset={5000}
                  style={{ width: '100%', alignItems: 'center' }}
                >



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


                    rightIcon={<Pressable onPress={() => setEdit({ firstName: !edit?.firstName })}>
                      {!edit?.firstName ? (
                        <Text>Change</Text>) : (
                        <Text>Done</Text>)
                      }
                    </Pressable>
                    }
                    editable={edit?.firstName ? true : false}

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

                    rightIcon={<Pressable onPress={() => setEdit({ lastName: !edit?.lastName })}>
                      {!edit?.lastName ? (
                        <Text>Change</Text>) : (
                        <Text>Done</Text>)
                      }
                    </Pressable>
                    }
                    editable={edit?.lastName ? true : false}

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

                    rightIcon={<Pressable onPress={() => setEdit({ email: !edit?.email })}>
                      {!edit?.email ? (
                        <Text>Change</Text>) : (
                        <Text>Done</Text>)
                      }
                    </Pressable>
                    }
                    editable={edit?.email ? true : false}

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

                    rightIcon={<Pressable onPress={() => setEdit({ dateOfBirth: !edit?.dateOfBirth })}>
                      {!edit?.dateOfBirth ? (
                        <Text>Change</Text>) : (
                        <Text>Done</Text>)
                      }
                    </Pressable>
                    }
                    editable={edit?.dateOfBirth ? true : false}

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

                    rightIcon={<Pressable onPress={() => setEdit({ userAge: !edit?.userAge })}>
                      {!edit?.userAge ? (
                        <Text>Change</Text>) : (
                        <Text>Done</Text>)
                      }
                    </Pressable>
                    }
                    editable={edit?.userAge ? true : false}
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








                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
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
              style={{ marginTop: 50 }}>Save</CustomButton1>
          </View>
        </View>
      </ScrollView>
    </StatusBarComponent>
  )
}

export default BankdetailsProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor:'red'

  },
  UpperBox: {
    flex: 0.6
  },
  ContentBox: {
    flex: 0.4,
    overflow: 'hidden',
    // paddingTop: 36,
    paddingHorizontal: 17,
    barBackgroundColor: 'pink'
  }

  ,

  outerCircle: {
    width: '100%',
    height: '100%',
    width: 89,
    height: 89,
    overflow: 'hidden',
    // borderRadius:'50%',
    // backgroundColor: 'black'
  },

  innerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})