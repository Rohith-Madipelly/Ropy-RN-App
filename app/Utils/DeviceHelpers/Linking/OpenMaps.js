import { Linking } from "react-native";

export const OpenMaps = (latitude,longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Unable to open the map.");
        }
      })
      .catch((err) => Alert.alert("Error", err.message));
  };