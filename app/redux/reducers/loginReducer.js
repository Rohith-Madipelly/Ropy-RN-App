// import AsyncStorage from '@react-native-async-storage/async-storage';

const token = ""
// try {
//   token = AsyncStorage.getItem('BuyKeys:' + 'Token');
//   // console.log("reducer >> token", token);
// } catch (error) {
//   // console.log(error)
// }

const initialState = {
  token: token || "",
  isLogin: token ? true : false,
};



const loginReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_TOKEN":

      return {
        ...state,
        token: action.token,
        isLogin: action.token ? true : false,
      };
    default:
      return state;
  }
};

export default loginReducer;








