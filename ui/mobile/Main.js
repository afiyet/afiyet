import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingOneScreen from './pages/onboarding/OnboardingOneScreen';
import MainTabNavigation from './navigation/MainTabNavigation';
import AuthStackNavigation from './navigation/AuthStackNavigation';

const Stack = createNativeStackNavigator();

function Main(props) {

  const {
    onboarded,
  } = props;

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          //BURAYI FALSE YAP
          headerShown: false
        }}
      >
        {(true) ?
          <Stack.Group>
            <Stack.Screen
              name='Auth'
            > 
              {() => {return <AuthStackNavigation onboarded={onboarded} />}}
            </Stack.Screen>
          </Stack.Group>
          :
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