import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/router/routes';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {


  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <Routes />
    </NavigationContainer>
  );
}


