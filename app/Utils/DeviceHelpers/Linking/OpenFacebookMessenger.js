import React from 'react';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { CustomAlerts_Continue } from '../../CustomReuseAlerts';

export const OpenFacebookMessenger = async (facebookUsername, message) => {
  CustomAlerts_Continue(
    `You're leaving our app`,
    `This action is attempting to open Facebook Messenger and send a message to ${facebookUsername}. Would you like to continue?`,
    async () => {
      try {
        const encodedMessage = encodeURIComponent(message);  // Encode message to handle special characters
        const url = `fb-messenger://user-thread/${facebookUsername}?message=${encodedMessage}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', `Cannot open Facebook Messenger for: ${facebookUsername}. Please ensure Facebook Messenger is installed on your device.`);
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred while trying to open Facebook Messenger.');
      }
    }
  );
};
