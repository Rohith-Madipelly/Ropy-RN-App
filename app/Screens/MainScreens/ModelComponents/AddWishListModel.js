import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, Alert } from 'react-native';

import { ModelStylesCss } from './ModelStylesCss';



import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import Metrics from '../../../Utils/ResposivesUtils/Metrics';
import CustomButton1 from '../../../Components/UI/Buttons/CustomButton1';
import GiftIcon from '../../../assets/GiftIcon';
import { POST_WITHDRAW_API } from '../../../ApiCalls';
import { useToast } from 'react-native-toast-notifications';

const AddWishListModel = ({ visible, title, message, onClose, onSubmit }) => {
    const toast = useToast();
    const [withDrawAmount, setWithDrawAmount] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
  let tokenn = useSelector((state) => state.login.token);
    const navigation = useNavigation()

    const REQUEST_WITHDRAW_API = async () => {
        console.log("ehvdnsh .... ")
        // if (withDrawAmount == "" || !withDrawAmount) {
        //     console.log("jhvc")
        //     seterrorFormAPI({ withDrawError: `withDrawAmount cannot be empty` })
        //     return 0;
        // }
        // else if (withDrawAmount.trim() === "") {
        //     seterrorFormAPI({ withDrawError: `withDrawAmount cannot start with spaces` })
        //     return 0;
        // }

        // else {
            try {
                const res = await POST_WITHDRAW_API(withDrawAmount,tokenn)
                if (res) {
                    console.log(res.data, "ash")
                    toast.hideAll()
                    toast.show(res.data.message)
                    onSubmit(res.data)
                    onClose()
                    setWithDrawAmount("")
                    // navigation.navigate("WishListItems",{ParamData:res.data._id})
                }
            } catch (error) {
                console.log("Error ", error)
                console.log("Error ..>>>> ", error)
                if (error.response) {
                    if (error.response.status === 400) {
                        // console.log("Error With 400.", error.response.data)
                        seterrorFormAPI({ withDrawError: `${error.response.data.message}` })
                    }
                    else if (error.response.status === 401) {
                        console.log("Error With 401.", error.response.data)
                        // ServerTokenError_Logout(undefined, undefined, dispatch)
                    }
                    else if (error.response.status === 403) {
                        console.log("error.response.status login", error.response.data.message)
                    }
                    else if (error.response.status === 404) {
                        console.log("error.response.status login", error.response)
                    }
                    else if (error.response.status === 409) {
                        console.log(error.response.data.message)
                        // CustomToaster(error.response.data.message,undefined,"error")

                    }
                    else if (error.response.status >= 500) {
                        // console.log("Internal Server Error", error.message)
                        // ServerError(undefined, `${error.message}`)
                    }
                    else {
                        console.log("An error occurred response.>>", error)
                    }
                }
                else if (error.code === 'ECONNABORTED') {
                    console.log('Request timed out. Please try again later.');
                }
                else if (error.request) {
                    console.log("No Response Received From the Server.")
                    if (error.request.status === 0) {
                        Alert.alert("No Network Found", "Please Check your Internet Connection")
                    }
                }
                else {
                    console.log("Error in Setting up the Request.", error)
                }

            }
            finally {
                onClose()
            }
        // }
    }




    return (
        <View style={{}}>

            <Modal
                transparent={true}
                visible={visible}
                animationType="fade"
                onRequestClose={onClose}
            >
                <TouchableOpacity style={ModelStylesCss.modalBackground} onPress={onClose} activeOpacity={1}>

                    <View style={[ModelStylesCss.alertContainer, styles.shadowStyle]} onStartShouldSetResponder={() => true}>
                        <TouchableOpacity onPress={onClose} style={ModelStylesCss.closeButton}>
                            <Text style={ModelStylesCss.closeButtonText}>&times;</Text>
                        </TouchableOpacity>

                        {/* Modal content */}
                        <View style={{ width: '100%' }}>
                            <View>
                                <Text style={[styles.TextHeadingA2, { textAlign: 'center', color: '#140301CC' },]}>{title ? title : "Enter the points to redeem"}</Text>
                            </View>


                            {/* Search box */}
                            <View style={[styles.shadowStyle, { marginTop: Metrics.rfv(20), padding: 3 }]}>
                                <Text style={[styles.TextHeadingA2, { color: '#140301CC', marginBottom: 5 }]}>Points</Text>
                                <View style={[styles.shadowStyle, {
                                    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDFDFD', borderRadius: 5, overflow: 'hidden', borderWidth: 1,
                                    borderColor: `${(errorFormAPI.withDrawError) ? "red" : '#C6C6C6'}`
                                }]}>
                                    <TextInput
                                        placeholder='Enter points'
                                        placeholderTextColor={"#00000091"}
                                        style={[styles.InputStyling, {
                                            marginLeft: 10, marginLeft: 10,
                                            height: 50,
                                            width: 250
                                        }]}
                                        value={withDrawAmount}
                                        onChangeText={(e) => {
                                            setWithDrawAmount(e)
                                            seterrorFormAPI({ withDrawError: "" });
                                        }}
                                    />

                                </View>
                                <Text style={[{ color: `${(errorFormAPI.withDrawError) ? "red" : '#C6C6C6'}`, marginLeft: 3 }]}>{errorFormAPI.withDrawError}</Text>
                            </View>

                            <View style={{  }}>
                                <CustomButton1
                                    boxWidth={'95%'}
                                    // onPress={()=>{navigation.navigate("EmailVerification")}}
                                    // onPress={handleSubmit}
                                    onPress={() => {
                                        REQUEST_WITHDRAW_API()
                                        // showWithDrawVisible()

                                    }}
                                    RightIcon={<View style={{ marginLeft: 10 }}>
                                        <GiftIcon />
                                    </View>}
                                    // leftIcon={<Entypo
                                    //   // style={styles.icon}
                                    //   name={'login'} size={18} color={'white'} />}
                                    //  bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
                                    bgColor={'#03C4CB'}
                                    style={{ marginTop: 100 }}>

                                    Redeem


                                </CustomButton1>
                                {/* <CustomButton1
                                    boxWidth={'100%'}
                                    // onPress={() => { console.log("Button PRess") }}
                                    onPress={addWishList}
                                    textStyling={{ marginBottom: -5 }}
                                    style={{}}>Continue</CustomButton1> */}
                            </View>


                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

        </View>
    );
};

export default AddWishListModel;

const styles = StyleSheet.create({
    TextHeadingA1: {
        fontFamily: 'Manrope',
        fontWeight: 800,
        fontSize: Metrics.rfv(25),
        color: '#140301CC'
    },
    TextHeadingA2: {
        fontFamily: 'Manrope',
        fontWeight: 700,
        fontSize: Metrics.rfv(14),
        color: '#999EA1'
    },
    TextHeadingA3: {
        fontFamily: 'Manrope',
        fontWeight: 700,
        fontSize: Metrics.rfv(12),
        color: '#999EA1'
    },
    TextHeadingA4: {
        fontFamily: 'Manrope',
        fontWeight: 700,
        fontSize: Metrics.rfv(25),
        color: '#999EA1'
    },
    TextHeading7M16: {
        fontFamily: 'Manrope',
        fontWeight: 700,
        fontSize: Metrics.rfv(16),
        color: '#140301CC',

    },

    shadowStyle: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 6,

            },
        }),
    }
    ,
    InputStyling: {
        ...Platform.select({
            ios: {
                paddingVertical: 15
            },
            android: {
                paddingVertical: 10
            },
        }),
    }


})