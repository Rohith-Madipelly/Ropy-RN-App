import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarComponent from '../../../Components/StatusBar/StatusBarComponent'
import LoaderComponents from '../../../Components/Loaders/LoaderComponents'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import { LoginYupSchema } from '../../../FormikYupSchema/LoginYupSchema'
import CustomTextInput2 from '../../../Components/UI/Inputs/CustomTextInput2'
import CustomToolKitHeader from '../../../Components/UI/CustomToolKitHeader'
import CustomButton1 from '../../../Components/UI/Buttons/CustomButton1'
import { Bank_Details_on_IFSC } from '../../../ApiCalls'

const BankdetailsProfile = () => {
    const [edit, setEdit] = useState("")
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [IFSC_CODE_REQ, set_IFSC_CODE_REQ] = useState("")

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
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: { bankName: "", accountNumber: "444401500514", accountType: "savings", branch: "", IFSC_CODE: "SBIN002110" },

        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: LoginYupSchema,

        validate: values => {
            const errors = {};
            return errors;
        },

    });

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
                                        name='IFSC_CODE'
                                        value={values.IFSC_CODE}
                                        rightIcon={<Pressable onPress={() => setEdit({ IFSC_CODE: !edit?.IFSC_CODE })}>

                                            {!edit?.IFSC_CODE ? (
                                                <Text>Change</Text>) : (

                                                <Text>Done</Text>)
                                            }

                                        </Pressable>
                                        }
                                        maxLength={11}
                                        editable={edit?.IFSC_CODE ? true : false}
                                        onChangeText={(e) => { const sanitizedText = e.toUpperCase().replace(/[^A-Z0-9]/g, ''); const eToLowerCaseText = sanitizedText.toUpperCase(); handleChange("IFSC_CODE")(eToLowerCaseText); set_IFSC_CODE_REQ(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("IFSC_CODE")}

                                        // validate={() => {
                                        //     if (!values?.first) { setError({ ...error, first: 'Please enter your name' }) }
                                        //     else { setError({ ...error, first: null }) }
                                        // }}

                                        validate={handleBlur("IFSC_CODE")}

                                        outlined
                                        // bgColor={'#F7F7F7'}

                                        borderColor={`${(errors.IFSC_CODE && touched.IFSC_CODE) || (errorFormAPI && errorFormAPI.IFSC_CODEForm) ? "red" : "#48484A"}`}

                                        errorMessage={`${(errors.IFSC_CODE && touched.IFSC_CODE) ? `${errors.IFSC_CODE}` : (errorFormAPI && errorFormAPI.IFSC_CODEForm) ? `${errorFormAPI.IFSC_CODEForm}` : ``}`}

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