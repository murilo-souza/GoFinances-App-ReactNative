import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading'

import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins'
import theme from './src/global/styles/theme'
import { StatusBar } from 'expo-status-bar';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';



export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const {userStorageLoading} = useAuth()  

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading/>
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <StatusBar translucent style='light'/>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}


