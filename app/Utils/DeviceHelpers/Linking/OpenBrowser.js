import React from 'react';
import { Button, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { CustomAlerts_Continue } from '../../CustomReuseAlerts';

 export const openBrowser = async (url) => {

  CustomAlerts_Continue(
    `You're leaving our app`,
    `This action is attempting to open an external app. Would you like to continue ?`,
    // `Applying for ${data.jobTitle}`,
    // data.jobTitle,
    async() => {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', `Cannot open URL: ${url}`);
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred while trying to open the URL.');
      }

    }
  )

  
  };



