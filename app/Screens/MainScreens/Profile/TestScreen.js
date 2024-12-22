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
import { Bank_Details_on_IFSC, UserGetProfileDetails, UserLoginApi, UPDATE_PROFILE_PIC_API, UserProfilePicUploadAPI2 } from '../../../ApiCalls'
import CustomDropdown from '../../../Components/UI/Inputs/CustomDropdown'
import ProfileIcon from '../../../assets/BottomTabsIcons/ProfileIcon'
import CommonCss from '../../../Components/UI/CommonCss'
import LoadingImage from '../../../Components/UI/ImageConatiners/LoadingImage'
import { MaterialIcons } from '@expo/vector-icons'
import { THEME_COLOR } from '../../../Utils/AppConts'
import { openPickerImage } from '../../../Utils/FileHelper'
import { useToast } from 'react-native-toast-notifications'
import { setProfileData } from '../../../redux/actions/ProfileDataAction'
import { ProfileYupSchema } from '../../../FormikYupSchema/ProfileYupSchema'
import CustomDateInput2 from '../../../Components/UI/Inputs/CustomDateInput2'
import CustomStatusBar from '../../../Components/UI/StatusBar/CustomStatusBar'
import GlobalStyles from '../../../Components/UI/GlobalStyles'


const TestScreen = () => {
  const [edit, setEdit] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [IFSC_CODE_REQ, set_IFSC_CODE_REQ] = useState("")
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [UserProfileData, setUserProfileData] = useState("")
  let profileData = useSelector((state) => state.ProfileData.profileData);
  const [profileInformation, setProfileInformation] = useState(profileData)

  let tokenn = useSelector((state) => state.login.token);
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
    initialValues: { firstName: "", lastName: "", email: "", dob: "13/02/2002", age: "", gender: "", occupation: "", otherOccupation: "" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: ProfileYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });

  const ApiCaller = async () => {
    try {
      const res = await UserGetProfileDetails(tokenn)
      if (res.data) {
        console.log("hvnas")
        setUserProfileData(res.data)
        console.log(res.data)

        dispatch(setProfileData(res.data))

        if (res.data.profile_pic == "") {

        } else {

        }
      }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    ApiCaller()
  }, [])



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




  const submitHandler = async (user) => {

    try {
      setSpinnerbool(true)
      const res = await UserProfilePicUploadAPI2(user, tokenn)

      if (res.data) {
        console.log("fds", res.data)
        toast.hideAll()
        toast.show(res.data.message)

        ApiCaller()
      }
    }

    catch (error) {
      if (error.response) {
        console.log(error.response.data.message, "edkjwhghf")
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
          seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
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
      setSpinnerbool(false)
    }
  }



  const UploadProfilePic = async (e) => {
    try {
      const res = await UPDATE_PROFILE_PIC_API(e, tokenn)
      if (res.data) {
        toast.hideAll()
        toast.show(res.data.message)


        ApiCaller()
      }
    }
    catch (error) {
      if (error.response) {
        console.log(error.response.data.message, "edkjwhghf")
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data)
          seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
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
  }




  const handleImageResponse = async response => {
    if (response.canceled == false) {
      UploadProfilePic(response.assets[0])
    } else {
      console.log("profile canceled")
    }
  }


  useEffect(() => {

    if (UserProfileData) {
      console.log(UserProfileData.dob)
      const timer = setTimeout(() => {
        setValues({
          values,
          firstName: `${UserProfileData.firstName}`,
          lastName: `${UserProfileData.lastName}`,
          email: `${UserProfileData.email}`,
          dob: `${UserProfileData.dob}`,
          age: `${UserProfileData.age}`,
          gender: `${UserProfileData.gender}`,
          occupation: `${UserProfileData.occupation}`,

        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [UserProfileData]);



var year=2001
var DAY=24
var MONTH=1


  return (
    <StatusBarComponent barStyle='dark-content' barBackgroundColor='white'>
      <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
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

                {profileData.profilePicture ? <LoadingImage
                  source={{
                    uri: `${profileData.profilePicture}`,
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



                  <CustomDateInput2
                    boxWidth={'95%'}
                    placeholder={'Date of birth'}
                    label={'Date of birth'}
                    date='date'
                    value={values.dob}
                    // value={new Date(year, MONTH, DAY)}
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

                    rightIcon={<Pressable onPress={() => setEdit({ age: !edit?.age })}>
                      {!edit?.age ? (
                        <Text>Change</Text>) : (
                        <Text>Done</Text>)
                      }
                    </Pressable>
                    }
                    editable={edit?.age ? true : false}
                    onBlur={handleBlur("age")}
                    validate={handleBlur("age")}
                    keyboardType="numeric"
                    outlined
                    borderColor={`${(errors.age && touched.age) || (errorFormAPI && errorFormAPI.userAgeForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.age && touched.age) ? `${errors.age}` : (errorFormAPI && errorFormAPI.userAgeForm) ? `${errorFormAPI.userAgeForm}` : ``}`}
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

export default TestScreen

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