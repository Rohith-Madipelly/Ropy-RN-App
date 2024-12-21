import React from 'react';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { CustomAlerts_Continue } from '../../CustomReuseAlerts';

export const OpenWhatsApp = async (phoneNumber,message="") => {
  CustomAlerts_Continue(
    `You're leaving our app`,
    `This action is attempting to open WhatsApp to chat with ${phoneNumber}. Would you like to continue?`,
    async () => {
      try {
        const encodedMessage = encodeURIComponent(message); 
        // const url = `whatsapp://send?phone=${phoneNumber}`;
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', `Cannot open WhatsApp for: ${phoneNumber}. Please ensure WhatsApp is installed on your device.`);
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred while trying to open WhatsApp.');
      }
    }
  );
};
