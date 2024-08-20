// import AsyncStorage from '@react-native-async-storage/async-storage';

const token = ""
// try {
//   token = AsyncStorage.getItem('BuyKeys:' + 'Token');
//   // console.log("reducer >> token", token);
// } catch (error) {
//   // console.log(error)
// }

const initialState = {
  profileData:"",
  // profileData: data || "",
  // isLogin: token ? true : false,
};



const ProfileDataReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_ProfileData":

      return {
        ...state,
        profileData: action.data,
        // isLogin: action.token ? true : false,
      };
    default:
      return state;
  }
};

export default ProfileDataReducer;








