import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  setting: {
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  // Add other styles here
});
