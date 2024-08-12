import {  ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import StatusBarComponent from '../../Components/StatusBar/StatusBarComponent'
import LoaderComponent from '../../Components/Loaders/LoaderComponents'
import { useDispatch } from 'react-redux'
import TitleComponent from '../../Components/UI/TextUI/TitleComponent'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import CustomButton1 from '../../Components/UI/Buttons/CustomButton1'
import { InterestsFormYupSchema } from '../../FormikYupSchema/InterestsFormYupSchema'



const InterestsForm = () => {
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
    initialValues: { InterestsData: "" },

    onSubmit: values => {
      { submitHandler(values) }
    },

    validationSchema: InterestsFormYupSchema,

    validate: values => {
      const errors = {};
      return errors;
    },

  });


  const submitHandler = async (values) => {
    console.log("values ", values)
    navigation.navigate("SuccessfullyScreen")
  }


  const InterestsData = [
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




            <View style={{ alignItems: 'center', flex: 0.5 }}>



              {InterestsData.map((data, index) => (
                <View style={{}} key={index}>
                  <Text>{data}</Text>
                </View>
              ))}


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