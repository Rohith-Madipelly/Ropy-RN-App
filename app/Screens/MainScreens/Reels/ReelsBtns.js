import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, Dimensions,
  ImageSourcePropType,
  TextInput,
  Button,
  Platform,
} from "react-native";

// import { BottomSheet } from 'react-native-sheet';

import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons, FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import { typographyStyles } from "../constants";
import { formatNumber } from "../../../Utils/FormatNumber";
import ShareExample from "../../../Utils/ShareBtn";
import onShare from "../../../Utils/ShareBtn";
// import { DownloadSimple } from "@phosphor-icons/react";
// import Download from "../utils/Download";

import { ADD_SAVED_LOCATION, PutLikeAPI, REPORT_VIDEO_API } from "../../../ApiCalls";
import { useSelector } from "react-redux";
import { BottomSheet } from "react-native-sheet";
import Metrics from "../../../Utils/ResposivesUtils/Metrics";
import FontStyles from "../../../Components/UI/FontStyles";
import { THEME_COLOR, WHITE_COLOR } from "../../../Utils/AppConts";
import { ToasterSender } from "../../../Utils/Toaster";
import { useToast } from "react-native-toast-notifications";
import LottieView from "lottie-react-native";
import GiftIcon from "../../../assets/GiftIcon";
import FloatingButton from "./FloatingButton";
// import { ToasterSender } from "../utils/Toaster";

const windoWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


const ReelsBtns = ({
  gift=false,
  isLiked,
  likes,
  shares,
  comments,
  UploaderthumbnailUrl,
  index,
  dateVideoId, urlLink,
  Data,
  CallBackTOLike
}) => {

  const [liked, setLiked] = useState(isLiked);

  const [spinnerBool, setSpinnerbool] = useState(false)
  const HomeIcon = useRef(null);
  const bottomSheet2 = useRef(null);
  const bottomSheet1 = useRef(null);
  // let tokenn = useSelector((state) => state.login.isLogin);
  const [ReportMessage, setReportMessage] = useState("")
  let tokenn = useSelector((state) => state.login.token);

  const [shouldLike, setShouldLike] = useState(false)
  const toast = useToast();


  const SaveLocation = async () => {
    console.log("Save Location .......", dateVideoId)
    setSpinnerbool(true)
    try {
      const res = await ADD_SAVED_LOCATION(dateVideoId, tokenn)
      if (res.data) {
        console.log("res >>>", res.data.message)
        toast.hideAll()
        toast.show(res.data.message)

        setTimeout(() => {
          bottomSheet1.current.hide();
        }, 500)

      }
    }
    catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 401) {
          console.log("Internal Server Error", error.response.data)
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else if (error.response.status === 404) {
          console.log("c ", error.message)
        }
        else {
          console.log("An error occurred response.")
        }
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")
      }
      else {
        console.log("Error in Setting up the Request.")
      }
    }
    finally {

      setSpinnerbool(false)
    }
  }

  const ReportBtn = async () => {

    setSpinnerbool(true)
    try {

      const res = await REPORT_VIDEO_API(dateVideoId, ReportMessage, tokenn)
      console.log(res)
      ToasterSender({ Message: `${res.data.message}` })
      setTimeout(() => {
        bottomSheet2.current.hide();
      }, 200)
      setReportMessage("")
    }
    catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 401) {
          console.log("Internal Server Error", error.response.data)
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else if (error.response.status === 404) {
          console.log("c ", error.message)
        }
        else {
          console.log("An error occurred response.")
        }
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")
      }
      else {
        console.log("Error in Setting up the Request.")
      }
    }
    finally {

      setSpinnerbool(false)
    }
  }

  const LikesFuncationly = async () => {
    setSpinnerbool(true)
    try {
      const res = await PutLikeAPI(dateVideoId, tokenn)
      if (res.data) {
        // setLiked((prevState) => !prevState)
        if (res.data.message === "Video liked") {
          toast.hideAll()
          toast.show(res.data.message)
          setLiked(true)
          setShouldLike(true)

          setTimeout(() => {
            setShouldLike(false)
          }, 1000);

        } else if (res.data.message === "Like removed") {
          toast.hideAll()
          setLiked(false)
          toast.show(res.data.message)
        }
      }
    }
    catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else if (error.response.status === 404) {
          console.log("c ", error.message)
        }
        else {
          console.log("An error occurred response.")
        }
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")
      }
      else {
        console.log("Error in Setting up the Request.")
      }
    }
    finally {
      setSpinnerbool(false)
    }

  }



  return (
    <View style={{
      position: 'absolute',
      width: windoWidth, height: windowHeight * 0.94,
      justifyContent: 'center', alignItems: "center"

    }}>




      {shouldLike && <LottieView
        autoPlay loop
        style={{
          width: '50%',
          height: '50%',
          alignSelf: 'center'
        }}
        source={require('../../../assets/LikeH.json')}
      />}
      <View style={[styles.container, { marginBottom: 50, width: '95%', alignSelf: 'center' }]}>

      {gift &&<View style={{ width: "80%" }}>
          {/* <TouchableOpacity style={{ maxWidth: Metrics.rfv(40), backgroundColor: '#03C4CB', borderRadius: 15, padding: 10, flexDirection: 'row' }}>
            <GiftIcon />
          </TouchableOpacity> */}
          {/* <Text style={{textAlignVertical:'center',backgroundColor: '#03C4CB',width:'auto'}}>{Data?.description}</Text> */}
          {Data?.description&&<FloatingButton Data={Data?.description}/>}
        </View>}

      </View>


      <View style={[styles.container, { marginBottom: 10, right: 10 }]}>



        <TouchableOpacity
          style={styles.btn}
          onPress={() => {

            LikesFuncationly()
          }}
        >
          {liked ? (
            <Entypo name="heart" size={30} color="red" />
          ) : (
            <Entypo name="heart-outlined" size={30} color="white" />
          )}

        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => {
          onShare(
            `Check out this video on Ropy: ${urlLink} \n Video ID ${dateVideoId}`
          )
        }}>
          <Ionicons name="paper-plane-outline" size={30} color={"white"} style={styles.btnbtn} />
          <Text style={[styles.text,
            //  typographyStyles.md
          ]}>
            {/* {formatNumber(shares)}  */}
            Share
          </Text>

        </TouchableOpacity>





        <TouchableOpacity style={styles.btn} onPress={() => { bottomSheet1.current.show() }}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={25}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          {/* <Image source={{ uri: UploaderthumbnailUrl }} style={styles.image} /> */}

        </TouchableOpacity>



        <BottomSheet height={Metrics.rfv(150)} ref={bottomSheet1}>
          <View style={{
            marginHorizontal: Metrics.rfv(15),
            marginVertical: Metrics.rfv(15)
          }}>
            <Text style={[FontStyles.A1, { marginHorizontal: Metrics.rfv(15) }]}>Options</Text>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>


              <TouchableOpacity onPress={() => { bottomSheet1.current.hide(); bottomSheet2.current.show(); }} style={{
                flex: 0.4, justifyContent: 'center', alignItems: 'center',
                borderRadius: 10, borderColor: THEME_COLOR, borderWidth: 2,
                padding: Metrics.rfv(15), marginTop: Metrics.rfv(10), borderRadius: 10,
              }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <MaterialIcons name="report" size={24} color={THEME_COLOR} />
                  <Text style={[FontStyles.A1, {
                    paddingTop: 2, paddingLeft: 10,
                    color: THEME_COLOR,
                    fontWeight: '500'
                  }]}>Report</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { SaveLocation() }}
                style={{
                  flex: 0.4, justifyContent: 'center', alignItems: 'center',
                  borderRadius: 10, borderColor: THEME_COLOR, borderWidth: 2,
                  padding: Metrics.rfv(15), marginTop: Metrics.rfv(10), borderRadius: 10, backgroundColor: THEME_COLOR
                }}>
                <View style={{ display: 'flex', flexDirection: 'row', }}>
                  {/* <MaterialIcons name="save" size={24} color="black" /> */}
                  {/* <AntDesign name="download" size={24} color={"black"} style={styles.btnbtn} /> */}
                  {/* <View>
                <Entypo name="location-pin" size={20} color="white" />
                </View> */}

                  <Text style={[FontStyles.A1, {
                    // paddingTop: 2, paddingLeft: 10,
                    color: WHITE_COLOR,
                    fontWeight: '500'
                  }]}>
                    Save Location</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>

        <BottomSheet height={Metrics.rfv(270)} ref={bottomSheet2}>
          <View style={{
            marginHorizontal: Metrics.rfv(15),
            marginVertical: Metrics.rfv(15)
          }}>
            <Text style={[FontStyles.A1, { marginHorizontal: Metrics.rfv(15) }]}>Help us understand the problem</Text>
            <View style={[styles.inputContainer,]}>
              <View
                style={[
                  styles.input,
                  { borderColor: "#ccc", height: 100 },
                ]}
              >
                <TextInput
                  placeholderTextColor={"#444"}
                  placeholder="Report Message"
                  onChangeText={(e) => { setReportMessage(e) }}
                  value={ReportMessage}
                  multiline={true}
                  numberOfLines={4}
                  keyboardType="default"
                  autoCapitalize="none"
                  style={{ color: "black" }}
                />
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity onPress={() => { ReportBtn() }}
                style={{
                  flex: 0.4, justifyContent: 'center', alignItems: 'center',
                  borderRadius: 10, borderColor: THEME_COLOR, borderWidth: 2,
                  padding: 15, backgroundColor: THEME_COLOR
                }}>
                <View style={{ display: 'flex', flexDirection: 'row', }}>
                  {/* <MaterialIcons name="save" size={24} color="black" /> */}
                  {/* <AntDesign name="download" size={24} color={"black"} style={styles.btnbtn} /> */}

                  <Text style={[FontStyles.A1, {
                    // paddingTop: 2, paddingLeft: 10,
                    color: WHITE_COLOR,
                    fontWeight: '500'
                  }]}>Send Report</Text>


                </View>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    // backgroundColor: 'red',
    // bottom: -330,
    // bottom: -(windowHeight - 15),
    // top:(windowHeight-(windowHeight/3.10)),

    // bottom: Platform.select({
    //   ios: -(windowHeight - windowHeight * 0.07), // width for iOS
    //   android: -(windowHeight - windowHeight * 0.07), // width for Android
    //   // web: 300, // width for Web
    //   // default: 100, // default width
    // }),


    //     bottom: Platform.select({
    //   ios: -(windowHeight - windowHeight * 0.07), // width for iOS
    //   android: -(windowHeight - windowHeight * 0.07), // width for Android
    //   // web: 300, // width for Web
    //   // default: 100, // default width
    // }),
    bottom: 10,
    // left: 7,
    right: 7,
    width: 65,
    zIndex: 20,
  },


  // container: {
  //   position: "absolute",
  //   bottom: 25,
  //   right: 7,
  //   width: 65,
  //   zIndex: 20,
  // },
  btn: {
    alignItems: "center",
    marginBottom: 10,
    marginVertical: 15
  },
  ReelsBtn: {
    size: 10,
    color: 'white',
  },
  text: {
    color: "#fff",
    marginTop: 6,
    fontWeight: "500",
    textAlign: "center",
    fontSize: 14,
  },
  image: {
    width: 30,
    height: 30,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 6,
    resizeMode: "cover",
  },


  inputContainer: {
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.rfv(17)
  },

  input: {
    width: 300,
    // backgroundColor: "#121212",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 12,

    borderRadius: 6,
    marginBottom: 6,
    color: "white",
    height: 45,


  },
});

export default ReelsBtns;