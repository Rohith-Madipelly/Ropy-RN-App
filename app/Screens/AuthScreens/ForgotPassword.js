import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import StatusBarComponent from "../../Components/StatusBar/StatusBarComponent";
import LoaderComponent from "../../Components/Loaders/LoaderComponents";
import { useDispatch } from "react-redux";
import TitleComponent from "../../Components/UI/TextUI/TitleComponent";
import CustomTextInput2 from "../../Components/UI/Inputs/CustomTextInput2";

import { Entypo, FontAwesome } from "@expo/vector-icons";

import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import CustomButton1 from "../../Components/UI/Buttons/CustomButton1";
import CustomSpan from "../../Components/UI/TextUI/CustomSpan";
import { PhoneNumberValidation } from "../../FormikYupSchema/PhoneNumberValidation";
import CustomStatusBar from "../../Components/UI/StatusBar/CustomStatusBar";
import GlobalStyles from "../../Components/UI/GlobalStyles";
import { useToast } from "react-native-toast-notifications";
import { FORGOT_PASSWORD_API, Verify_Register_otp_API } from "../../ApiCalls";
import { EmailYupSchema } from "../../FormikYupSchema/EmailYupSchema";

const ForgotPassword = () => {
  const [spinnerBool, setSpinnerbool] = useState(false);
  const [show, setShow] = useState();
  const [errorFormAPI, seterrorFormAPI] = useState("");

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
    initialValues: { email: "" },

    onSubmit: (values) => {
      {
        submitHandler(values);
      }
    },

    validationSchema: EmailYupSchema,

    validate: (values) => {
      const errors = {};
      return errors;
    },
  });

  const toast = useToast();
  const submitHandler = async (values) => {
    console.log("fsd ..", values);
    try {
      setSpinnerbool(true);
      const res = await FORGOT_PASSWORD_API(values);
      if (res.data) {
        console.log("fds", res.data);
        toast.hideAll();
        toast.show(res.data.message);
        setTimeout(() => {
          {
            navigation.navigate("VerificationCodeForgot", {
              TokenForSetUp: res.data.token,
              Mobile_Number: values.phoneNumber,
              email: values.email,
            });
          }
          // { navigation.navigate('ProfileSetUp', { TokenForSetUp: res.data.token }); }
          setSpinnerbool(false);
        }, 50);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.", error.response.data);
          seterrorFormAPI({ emailForm: `${error.response.data.message}` });
        } else if (error.response.status === 401) {
          seterrorFormAPI({ emailForm: `${error.response.data.message}` });
        } else if (error.response.status === 403) {
          console.log(
            "error.response.status login",
            error.response.data.message
          );
        } else if (error.response.status === 404) {
          console.log("dhg", error.response.data.message);
          seterrorFormAPI({ emailForm: `${error.response.data.message}` });
        } else if (error.response.status === 406) {
          console.log("dhg", error.response.data.message);
          seterrorFormAPI({ emailForm: `${error.response.data.message}` });
        } else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message);
        } else {
          console.log(
            "An error occurred response.>>",
            error.response.data.message
          );
          // ErrorResPrinter(`${error.message}`)
        }
      } else if (error.code === "ECONNABORTED") {
        console.log("Request timed out. Please try again later.");
      } else if (error.request) {
        console.log("No Response Received From the Server.");
        if (error.request.status === 0) {
          // console.log("error in request ",error.request.status)
          Alert.alert(
            "No Network Found",
            "Please Check your Internet Connection"
          );
        }
      } else {
        console.log("Error in Setting up the Request.", error);
      }

      setSpinnerbool(false);

      if (error) {
        // message = error.message;
        // seterrorFormAPI(message)
        // "userEmail or Password does not match !"
      }
    } finally {
      // setLoading(false);
      setSpinnerbool(false);
    }
  };

  return (
    <StatusBarComponent barStyle="dark-content" barBackgroundColor="white">
      <CustomStatusBar
        barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle}
        backgroundColor={GlobalStyles.AuthScreenStatusBar1.color}
      />
      <LoaderComponent
        visible={spinnerBool}
        color={"#4A3AFF"}
        animation={"fade"}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.UpperBox,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Image
              style={{ width: 77, height: 108 }}
              animation={"bounceIn"}
              source={require("../../assets/Logo/Ropy_Logo.png")}
              contentFit="cover"
              transition={1000}
              alt=""
            />
          </View>
          <View style={styles.ContentBox}>
            <View style={{ marginLeft: 10 }}>
              <TitleComponent TitleName="Forgot password ?"></TitleComponent>
              <CustomSpan TextLine="Enter your email below."></CustomSpan>
              <CustomSpan TextLine="We will send a 4 digit verification code to verify your email."></CustomSpan>
            </View>

            <View
              style={{
                alignItems: "center",
                flex: 0.3,
                flexDirection: "column",
                justifyContent: "flex-end",
                alignContent: "flex-end",
              }}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  // behavior={Platform.OS === "ios" ? 100:0}
                  // keyboardVerticalOffset={5000}
                  style={{ width: "100%", alignItems: "center" }}
                >
                  <CustomTextInput2
                    boxWidth={"95%"}
                    label={"Email address"}
                    placeholder={"Enter email address"}
                    name="email"
                    value={values.email}
                    // bgColor='#e1f3f8'
                    // bgColor="#B1B1B0"

                    onChangeText={(e) => {
                      const eToLowerCaseText = e.toLowerCase();
                      handleChange("email")(eToLowerCaseText);
                      seterrorFormAPI();
                    }}
                    onBlur={handleBlur("email")}
                    // validate={handleBlur("email")}

                    outlined
                    // bgColor={'#F6F8FE'}
                    borderColor={`${
                      (errors.email && touched.email) ||
                      (errorFormAPI && errorFormAPI.emailForm)
                        ? "red"
                        : "#48484A"
                    }`}
                    errorMessage={`${
                      errors.email && touched.email
                        ? `${errors.email}`
                        : errorFormAPI && errorFormAPI.emailForm
                        ? `${errorFormAPI.emailForm}`
                        : ``
                    }`}
                    // errorColor='magenta'
                  />

                  {/* <CustomTextInput2
                    boxWidth={'95%'}
                    placeholder={'Mobile Number'}
                    label={'Mobile Number'}
                    name='Mobile_Number'
                    keyboardType={'phone-pad'}
                    value={values.Mobile_Number}
                    onChangeText={(e) => {
                      // Remove any non-numeric characters
                      const numericValue = e.replace(/[^0-9]/g, '');
                      // Update the state with the numeric value
                      const Only10digits = numericValue.slice(0, 10);
                      handleChange("Mobile_Number")(Only10digits);
                    }}
                    onBlur={handleBlur("Mobile_Number")}
                    // validate={handleBlur("Mobile_Number")}

                    eyboardType="numeric"
                    borderColor={`${(errors.Mobile_Number) || (errorFormAPI && errorFormAPI.Mobile_NumberForm) ? "red" : "#48484A"}`}
                    errorMessage={`${(errors.Mobile_Number) ? `${errors.Mobile_Number}` : (errorFormAPI && errorFormAPI.Mobile_Number) ? `${errorFormAPI.Mobile_Number}` : ``}`}
                    // errorColor='magenta'
                    outlined
                    bgColor={'#F6F8FE'}
                  /> */}
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </View>

            <View style={{ alignItems: "center", flex: 0.5 }}>
              <CustomButton1
                boxWidth={"95%"}
                // onPress={()=>{navigation.navigate("EmailVerification")}}
                onPress={handleSubmit}
                // leftIcon={<Entypo
                //   // style={styles.icon}
                //   name={'login'} size={18} color={'white'} />}
                //  bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
                bgColor={"#03C4CB"}
                style={{ marginTop: 50 }}
              >
                Next
              </CustomButton1>

              <View style={{ marginTop: 20, flex: 1, flexDirection: "row" }}>
                <Text
                  style={[
                    styles.paragraphy,
                    { color: "black", fontWeight: "400" },
                  ]}
                >
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                  style={{}}
                >
                  <Text
                    style={[
                      styles.paragraphy,
                      { color: "#03C4CB", fontWeight: "500" },
                    ]}
                  >
                    {" "}
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </StatusBarComponent>
  );
};

export default ForgotPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  UpperBox: {
    flex: 0.6,
  },
  ContentBox: {
    flex: 0.4,
    overflow: "hidden",
    paddingTop: 36,
    paddingHorizontal: 17,
  },
});
