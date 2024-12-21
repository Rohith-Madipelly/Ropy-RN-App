import React from 'react';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { CustomAlerts_Continue } from '../../CustomReuseAlerts';

export const OpenInstagramDirectMessage = async (instagramUsername) => {
  CustomAlerts_Continue(
    `You're leaving our app`,
    `This action is attempting to open Instagram Direct to message ${instagramUsername}. Would you like to continue?`,
    async () => {
      try {
        const url = `instagram://direct?to=${instagramUsername}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', `Cannot open Instagram Direct message for: ${instagramUsername}`);
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred while trying to open Instagram Direct.');
      }
    }
  );
};



export const openInstagramProfile = async (instagramUsername) => {
  CustomAlerts_Continue(
    `You're leaving our app`,
    `This action is attempting to open Instagram profile for ${instagramUsername}. Would you like to continue?`,
    async () => {
      try {
        const url = `https://www.instagram.com/${instagramUsername}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', `Cannot open Instagram profile for: ${instagramUsername}`);
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred while trying to open Instagram profile.');
      }
    }
  );
};
