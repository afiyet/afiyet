import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen';
import OnboardingOneScreen from '../pages/onboarding/OnboardingOneScreen';

const NativeStack = createNativeStackNavigator();

export default function AuthStackNavigation(props) {

    const {
        onboarded
    } = props;

    return (
        <NativeStack.Navigator>
            {(!onboarded) ?
                <NativeStack.Group>
                    <NativeStack.Screen
                        name='Onboarding'
                        component={OnboardingOneScreen}
                    />
                </NativeStack.Group>
                :
                <NativeStack.Group
                    screenOptions={{
                        presentation: 'modal',
                        headerShown: false
                    }}>
                    <NativeStack.Screen name="LoginScreen">
                        {() => { return <LoginScreen /> }}
                    </NativeStack.Screen>
                    <NativeStack.Screen name="SignUpScreen">
                        {() => { return <SignUpScreen /> }}
                    </NativeStack.Screen>
                </NativeStack.Group>
            }
        </NativeStack.Navigator>
    )
}