import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarComponent from '../../Components/StatusBar/StatusBarComponent'
import LoaderComponent from '../../Components/Loaders/LoaderComponents'
import { useDispatch, useSelector } from 'react-redux'
import TitleComponent from '../../Components/UI/TextUI/TitleComponent'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'
import { InterestsFormYupSchema } from '../../FormikYupSchema/InterestsFormYupSchema'
import CustomCheckBox from '../../Components/UI/Inputs/CustomCheckBox'
import { ADDINTERESTS_API, GetAllInterests_API } from '../../ApiCalls'
import { useToast } from 'react-native-toast-notifications'



const InterestsForm = ({ route }) => {

  const { params } = route;
  const TokenForSetUp = params?.TokenForSetUp || '';

  // console.log(TokenForSetUp,"TokenForSetUp")

  // console.log(ParamData, "ParamData")
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [categories, setCategoriesData] = useState("")

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();


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

  const handleSubmit2 = async () => {
    if (selectedInterests) {

      const interestsIds = selectedInterests.map(interest => interest.intrestId);

      console.log("interestsIds: >>", interestsIds);
      try {
        setSpinnerbool(true)
        const res = await ADDINTERESTS_API(interestsIds, TokenForSetUp)

        if (res.data) {
          // console.log(res.data.message)
          toast.hideAll()
          toast.show(res.data.message)


          setTimeout(() => {
            // SuccessfullyScreen
            navigation.navigate("SuccessfullyScreen",{TokenForSetUp:TokenForSetUp})
          }, 500);
        }
      }

      catch (error) {
        console.log("jhrgsjdf",error)
        if (error.response) {
          if (error.response.status === 400) {
            console.log("Error With 400.", error.response.data)
            seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
          }
          else if (error.response.status === 401) {
            console.log(`${error.response.data.message}`)
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

    }



  }
  const [InterestsData, setInterestsData] = useState([])
  const InterestsData2 = [
    "Art & Design",
    "Automotive",
    "Book & Literature",
    "Diy & Crafts",
    "Environment",
    "Fashion & Beauty",
    "Finance",
    "Food & Dining",
    "Gaming",
    "Health & Fitness",
    "Home & Garden",
    "Movies & TV",
    "Music",
    "Parenting",
    "Pets",
    "Photography",
    "Science",
    "Sports",
    "Technology",
    "Travel",
  ]


  useEffect(() => {
    GetAllInterestsData()
  }, [])



  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleCheckBoxChange = (interest) => {
    if (selectedInterests.includes(interest)) {
      // Remove interest if already selected
      setSelectedInterests((prev) =>
        prev.filter((item) => item !== interest)
      );
    } else {
      // Add interest to the selected list
      setSelectedInterests((prev) => [...prev, interest]);
    }
  };



  const GetAllInterestsData = async () => {
    try {
      setSpinnerbool(true)
      const res = await GetAllInterests_API(TokenForSetUp)

      if (res.data) {
        setInterestsData(res.data.allInterests)
      }
    }

    catch (error) {
      console.log("dshgfadcv", error.response.data.message)
      if (error.response) {
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
            <View style={{ marginLeft: 10, marginBottom: 20 }}>
              <TitleComponent TitleName="Interests" style={{ color: '#001F20CC' }}></TitleComponent>
            </View>




            <View style={{ alignItems: 'start', flex: 0.5, marginLeft: 10 }}>



              {InterestsData.map((data, index) => (
                <View style={{}} key={index}>
                  <CustomCheckBox
                    value={selectedInterests.includes(data)}
                    boxWidth={"95%"}
                    content={<Text>{data.interestName}</Text>}
                    onValueChange={() => handleCheckBoxChange(data)}
                  />
                </View>
              ))}




              <CustomButton1
                boxWidth={'95%'}
                // onPress={()=>{navigation.navigate("EmailVerification")}}
                // onPress={handleSubmit}
                onPress={handleSubmit2}

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

export default InterestsForm
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