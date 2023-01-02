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
          headerShown: true
        }}
        >
          {(onboarded) ? 
            <Stack.Screen
              name='Onboarding'
              component={OnboardingOneScreen}
            />
          :
            <Stack.Screen 
              name='MainTabNavigation'
              component={MainTabNavigation}
            />
          }
        </Stack.Navigator>
      </>
    );
}

export default Main;