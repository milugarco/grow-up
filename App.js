import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/router/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'white'} barStyle="dark-content"/>
      <Routes />
    </NavigationContainer>
  );
}


