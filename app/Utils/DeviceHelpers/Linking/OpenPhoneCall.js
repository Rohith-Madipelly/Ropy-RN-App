import React from 'react';
import { Button, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { CustomAlerts_Continue } from '../../CustomReuseAlerts';

export const OpenPhoneCall = async (phoneNumber) => {
  CustomAlerts_Continue(
    `You're leaving our app`,
    `This action is attempting to open the phone app to call ${phoneNumber}. Would you like to continue?`,
    async () => {
      try {
        const url = `tel:${phoneNumber}`;
        const supported = await Linking.canOpenURL(url);
        // if (supported) {
          await Linking.openURL(url);
        // } else {
        //   Alert.alert('Error', `Cannot open phone dialer for: ${phoneNumber}`);
        // }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred while trying to initiate the phone call.');
      }
    }
  );
};
   