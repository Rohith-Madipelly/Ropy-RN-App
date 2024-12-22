// import AsyncStorage from '@react-native-async-storage/async-storage';

const token = ""
// try {
//   token = AsyncStorage.getItem('BuyKeys:' + 'Token');
//   // console.log("reducer >> token", token);
// } catch (error) {
//   // console.log(error)
// }

const initialState = {
  playIndex:"",
};



const PlayerIndex = (state = initialState, action) => {

  switch (action.type) {
    case "SET_INDEX":

      return {
        ...state,
        playIndex: action.index,
      };
    default:
      return state;
  }
};

export default PlayerIndex;








