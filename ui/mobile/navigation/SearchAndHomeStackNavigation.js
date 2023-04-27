import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from '../pages/SearchScreen';
import HomeScreen from '../pages/HomeScreen';

const NativeStack = createNativeStackNavigator();

export default function SearchAndHomeStackNavigation() {
    return (
        <NativeStack.Navigator>
            <NativeStack.Group
                screenOptions={{
                    presentation: 'modal',
                    headerShown: false
                }}>
                <NativeStack.Screen name="Home">
                    {() => { return <HomeScreen /> }}
                </NativeStack.Screen>
            </NativeStack.Group>
            <NativeStack.Group
                screenOptions={{
                    presentation: 'modal',
                    headerShown: false
                }}>
                <NativeStack.Screen name="Search">
                    {() => { return <SearchScreen /> }}
                </NativeStack.Screen>
            </NativeStack.Group>
        </NativeStack.Navigator>
    )
}