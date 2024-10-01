import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Screens from './app/Screens';
import { store } from './app/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      {/* Screens */}
      <Screens />
    </Provider>
  ); 
}

