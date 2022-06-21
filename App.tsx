import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading'

import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins'
import theme from './src/global/styles/theme'
import { StatusBar } from 'expo-status-bar';

import {NavigationContainer} from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';



export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading/>
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar translucent style='light'/>
          <AppRoutes/>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}


