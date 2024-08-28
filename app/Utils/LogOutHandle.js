import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { setToken } from "../redux/actions/loginAction";
import { ASYNC_STORAGE_NAME } from './AppConts';
import AsyncStorage_Calls from './AsyncStorage_Calls';

export const LogOutHandle = async (dispatch) => {
  Alert.alert(
    "Confirm Logout",
    "Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            AsyncStorage_Calls.RemoveTokenJWT(ASYNC_STORAGE_NAME, (error, success) => {
              if (error) {
                console.error('Error removing token:', error);
              } else {
                console.log('Token removed successfully:', success);
                dispatch(setToken(null));
                // You can add additional logic here after the token has been successfully removed
              }
            });
          } catch (e) {
            console.log("error", e);
          }
        }
      }
    ],
    { cancelable: false }
  );
}
