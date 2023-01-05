import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingOneScreen from './pages/onboarding/OnboardingOneScreen';
import MainTabNavigation from './navigation/MainTabNavigation';

const Stack = createNativeStackNavigator();

function Main(props) {

  const {
    onboarded
  } = props;

    return(
      <>
        <Stack.Navigator
        screenOptions={{
          //BURAYI FALSE YAP
          headerShown: false
        }}
        >
          {(onboarded) ? 
          //BU GRUBA DİĞER ONBOARDING EKRANLARI GELECEK
            <Stack.Group>
              <Stack.Screen
                name='Onboarding'
                component={OnboardingOneScreen}
              />
            </Stack.Group>
          :
            //BURAYA LOGIN, SIGN UP VE LOGIN STATE CONTROL GELECEK
            <Stack.Group>
              <Stack.Screen 
                name='MainTabNavigation'
                component={MainTabNavigation}
              />
            </Stack.Group>
          }
        </Stack.Navigator>
      </>
    );
}

export default Main;