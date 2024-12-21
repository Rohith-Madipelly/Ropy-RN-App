import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
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
import { Bank_Details_on_IFSC, UserGetProfileDetails, UPDATE_PROFILE_API } from '../../../ApiCalls'
import { BankYupSchema } from '../../../FormikYupSchema/BankYupSchema'
import { setProfileData } from '../../../redux/actions/ProfileDataAction'
import { useToast } from 'react-native-toast-notifications'
import CustomStatusBar from '../../../Components/UI/StatusBar/CustomStatusBar'
import GlobalStyles from '../../../Components/UI/GlobalStyles'

const BankdetailsProfile = () => {
    const [edit, setEdit] = useState("")
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [IFSC_CODE_REQ, set_IFSC_CODE_REQ] = useState("")

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const toast = useToast();
    const [UserProfileData, setUserProfileData] = useState("")
    let profileData = useSelector((state) => state.ProfileData.profileData);
    const [profileInformation, setProfileInformation] = useState(profileData)

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



    console.log(IFSC_CODE_REQ, "edg")


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
        initialValues: { bankName: "", accountNumber: "", accountType: "", branch: "", ifscCode: "" },
        // initialValues: { bankName: "", accountNumber: "444401500514", accountType: "savings", branch: "", ifscCode: "SBIN002110" },

        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: BankYupSchema,

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



    useEffect(() => {

        if (UserProfileData) {
            const timer = setTimeout(() => {
                setValues({
                    ...values,
                    bankName: `${UserProfileData.bankName}`,
                    accountNumber: `${UserProfileData.accountNumber}`,
                    accountType: `${UserProfileData.accountType}`,
                    branch: `${UserProfileData.branch}`,
                    ifscCode: `${UserProfileData.ifscCode}`,
                });
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [UserProfileData]);


    const submitHandler = async (user) => {
        try {
            setSpinnerbool(true)
            const res = await UPDATE_PROFILE_API(user, tokenn)
            if (res.data) {
                console.log("Hello >>>", res.data)

                toast.hideAll()
                toast.show(res.data.message)
                setTimeout(() => {
                    ApiCaller()
                }, 200);
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
                    <CustomToolKitHeader componentName={"Bank Details"} />
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
                                        placeholder={'Enter account type'}
                                        label={'Account type'}
                                        name='accountType'
                                        value={values.accountType}
                                        onChangeText={(e) => { handleChange("accountType")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("accountType")}

                                        rightIcon={<Pressable onPress={() => setEdit({ accountType: !edit?.accountType })}>

                                            {!edit?.accountType ? (
                                                <Text>Change</Text>) : (

                                                <Text>Done</Text>)
                                            }

                                        </Pressable>
                                        }
                                        editable={edit?.accountType ? true : false}
                                        // editable={false}

                                        validate={handleBlur("accountType")}

                                        outlined
                                        // bgColor={'#F7F7F7'}

                                        borderColor={`${(errors.accountType && touched.accountType) || (errorFormAPI && errorFormAPI.accountTypeForm) ? "red" : "#48484A"}`}

                                        errorMessage={`${(errors.accountType && touched.accountType) ? `${errors.accountType}` : (errorFormAPI && errorFormAPI.accountTypeForm) ? `${errorFormAPI.accountTypeForm}` : ``}`}
                                    // errorColor='magenta'
                                    />



                                    <CustomTextInput2
                                        boxWidth={'95%'}
                                        placeholder={'Enter account number'}
                                        label={'Account number'}
                                        name='accountNumber'
                                        keyboardType={'numeric'}
                                        value={values.accountNumber}
                                        onChangeText={(e) => { const onlyNumbers = e.replace(/[^0-9]/g, ''); handleChange("accountNumber")(onlyNumbers); seterrorFormAPI(); }}
                                        onBlur={handleBlur("accountNumber")}
                                        rightIcon={<Pressable onPress={() => setEdit({ accountNumber: !edit?.accountNumber })}>
                                            {!edit?.accountNumber ? (
                                                <Text>Change</Text>) : (
                                                <Text>Done</Text>)
                                            }
                                        </Pressable>
                                        }
                                        editable={edit?.accountNumber ? true : false}
                                        // editable={false}

                                        validate={handleBlur("accountNumber")}

                                        outlined
                                        // bgColor={'#F7F7F7'}

                                        borderColor={`${(errors.accountNumber && touched.accountNumber) || (errorFormAPI && errorFormAPI.accountNumberForm) ? "red" : "#48484A"}`}

                                        errorMessage={`${(errors.accountNumber && touched.accountNumber) ? `${errors.accountNumber}` : (errorFormAPI && errorFormAPI.accountNumberForm) ? `${errorFormAPI.accountNumberForm}` : ``}`}
                                    // errorColor='magenta'
                                    />



                                    <CustomTextInput2
                                        boxWidth={'95%'}
                                        placeholder={'Enter IFSC CODE'}
                                        label={'IFSC CODE'}
                                        name='ifscCode'
                                        value={values.ifscCode}
                                        rightIcon={<Pressable onPress={() => setEdit({ ifscCode: !edit?.ifscCode })}>

                                            {!edit?.ifscCode ? (
                                                <Text>Change</Text>) : (

                                                <Text>Done</Text>)
                                            }

                                        </Pressable>
                                        }
                                        // maxLength={11}
                                        editable={edit?.ifscCode ? true : false}
                                        onChangeText={(e) => {
                                            const sanitizedText = e.toUpperCase().replace(/[^A-Z0-9]/g, '');
                                            console.log(e)
                                            const eToLowerCaseText = sanitizedText.toUpperCase(); handleChange("ifscCode")(eToLowerCaseText); set_IFSC_CODE_REQ(eToLowerCaseText); seterrorFormAPI();
                                        }}
                                        onBlur={handleBlur("ifscCode")}

                                        // validate={() => {
                                        //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                        //     else { setError({ ...error, first: null }) }
                                        // }}

                                        validate={handleBlur("ifscCode")}

                                        outlined
                                        // bgColor={'#F7F7F7'}

                                        borderColor={`${(errors.ifscCode && touched.ifscCode) || (errorFormAPI && errorFormAPI.IFSC_CODEForm) ? "red" : "#48484A"}`}

                                        errorMessage={`${(errors.ifscCode && touched.ifscCode) ? `${errors.ifscCode}` : (errorFormAPI && errorFormAPI.IFSC_CODEForm) ? `${errorFormAPI.IFSC_CODEForm}` : ``}`}

                                    // errorColor='magenta'
                                    />



                                    <CustomTextInput2
                                        boxWidth={'95%'}
                                        placeholder={'Enter bank name'}
                                        label={'Bank name'}
                                        name='BankName'
                                        value={values.bankName}
                                        onChangeText={(e) => { handleChange("bankName")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("bankName")}

                                        // rightIcon={<Pressable onPress={() => setEdit({ bankName: !edit?.bankName })}>

                                        //     {!edit?.bankName ? (
                                        //         <Text>Change</Text>) : (

                                        //         <Text>Done</Text>)
                                        //     }

                                        // </Pressable>
                                        // }
                                        editable={edit?.bankName ? true : false}
                                        // editable={false}

                                        validate={handleBlur("bankName")}

                                        outlined
                                        // bgColor={'#F7F7F7'}

                                        borderColor={`${(errors.bankName && touched.bankName) || (errorFormAPI && errorFormAPI.bankNameForm) ? "red" : "#48484A"}`}

                                        errorMessage={`${(errors.bankName && touched.bankName) ? `${errors.bankName}` : (errorFormAPI && errorFormAPI.bankNameForm) ? `${errorFormAPI.bankNameForm}` : ``}`}
                                    // errorColor='magenta'
                                    />




                                    <CustomTextInput2
                                        boxWidth={'95%'}
                                        placeholder={'Enter branch'}
                                        label={'Branch'}
                                        name='branch'
                                        value={values.branch}
                                        // rightIcon={<Pressable onPress={() => setEdit({ Branch: !edit?.Branch })}>

                                        //     {!edit?.Branch ? (
                                        //         <Text>Change</Text>) : (

                                        //         <Text>Done</Text>)
                                        //     }

                                        // </Pressable>
                                        // }
                                        editable={edit?.Branch ? true : false}

                                        onChangeText={(e) => { handleChange("branch")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("branch")}

                                        // validate={() => {
                                        //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                        //     else { setError({ ...error, first: null }) }
                                        // }}

                                        validate={handleBlur("branch")}

                                        outlined
                                        // bgColor={'#F7F7F7'}

                                        borderColor={`${(errors.branch && touched.branch) || (errorFormAPI && errorFormAPI.branchForm) ? "red" : "#48484A"}`}

                                        errorMessage={`${(errors.branch && touched.branch) ? `${errors.branch}` : (errorFormAPI && errorFormAPI.branchForm) ? `${errorFormAPI.branchForm}` : ``}`}

                                    // errorColor='magenta'
                                    />



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
})