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

import { PostRepostAPI, PutLikeAPI } from "../../../ApiCalls";
import { useSelector } from "react-redux";
import { BottomSheet } from "react-native-sheet";
import Metrics from "../../../Utils/ResposivesUtils/Metrics";
import FontStyles from "../../../Components/UI/FontStyles";
import { THEME_COLOR, WHITE_COLOR } from "../../../Utils/AppConts";
import { ToasterSender } from "../../../Utils/Toaster";
// import { ToasterSender } from "../utils/Toaster";

const windoWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


const ReelsBtns = ({

  isLiked,
  likes,
  shares,
  comments,
  UploaderthumbnailUrl,
  index,
  dateVideoId, urlLink
}) => {
  const [liked, setLiked] = useState(isLiked);
  // setLiked(isLiked)
  const [spinnerBool, setSpinnerbool] = useState(false)
  const bottomSheet = useRef(null);
  const bottomSheet2 = useRef(null);
  // let tokenn = useSelector((state) => state.login.isLogin);
  const [ReportMessage, setReportMessage] = useState("")
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


  const SaveLocation = () => {
    console.log("Save Location ...........")
  }
  const ReportBtn = async () => {

    setSpinnerbool(true)
    try {
      const ReportData = {
        videoId: dateVideoId,
        complaint: ReportMessage,
      };

      const res = await PostRepostAPI(ReportData, tokenn)
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
      ToasterSender({ Message: `${res.data.message}` })


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






  const handleDownload = async () => {
    console.log("implement videro download here", urlLink)
  };










  return (
    <View style={[styles.container, { marginBottom: 10,right:10 }]}>
      <BottomSheet height={Metrics.rfv(150)} ref={bottomSheet}>
        <View style={{
          marginHorizontal: Metrics.rfv(15),
          marginVertical: Metrics.rfv(15)
        }}>
          <Text style={[FontStyles.A1, { marginHorizontal: Metrics.rfv(15) }]}>Options</Text>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>


            <TouchableOpacity onPress={() => { bottomSheet.current.hide(); bottomSheet2.current.show(); }} style={{
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

      <TouchableOpacity
        style={styles.btn}
        onPress={() => { setLiked((prevState) => !prevState), LikesFuncationly() }}
      >
        {liked ? (
          <Entypo name="heart" size={30} color="red" />
        ) : (
          <Entypo name="heart-outlined" size={30} color="white" />
        )}

        <Text style={[styles.text,
          //  typographyStyles.md
        ]}>

          {liked ? formatNumber(likes + 1) : formatNumber(likes)}
          {/* {likes} */}
          {/* {liked ? formatNumber((likes ?? 0) + 1) : formatNumber(likes ?? 0)} */}




        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.btn}> */}
      {/* <Feather name="message-circle" size={35} color="white" /> */}
      {/* <Entypo name="thumbs-up" size={35} color="white" /> */}

      {/* {liked ? (
          <FontAwesome name="thumbs-down" size={30} color="white" />
        ) : (
          <FontAwesome name="thumbs-down" size={30} color="lightblue" />
        )}
        <Text style={[styles.text, typographyStyles.md]}>
          DisLike 
        </Text>
      </TouchableOpacity> */}




      <TouchableOpacity style={styles.btn} onPress={() => { onShare(`This is the refern of video ${dateVideoId}`) }}>
        <Ionicons name="paper-plane-outline" size={30} color={"white"} style={styles.btnbtn} />
        <Text style={[styles.text,
          //  typographyStyles.md
        ]}>
          {/* {formatNumber(shares)}  */}
          Share

          {/* shares of {index} */}
        </Text>

      </TouchableOpacity>





      <TouchableOpacity style={styles.btn} onPress={() => { bottomSheet.current.show() }}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={25}
          color="white"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        {/* <Image source={{ uri: UploaderthumbnailUrl }} style={styles.image} /> */}

      </TouchableOpacity>
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

    bottom: Platform.select({
      ios: -(windowHeight - windowHeight * 0.07), // width for iOS
      android: -(windowHeight - windowHeight * 0.07), // width for Android
      // web: 300, // width for Web
      // default: 100, // default width
    }),
    // left: 7,
    right:7,
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