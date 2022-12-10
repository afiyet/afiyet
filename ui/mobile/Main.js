import React from 'react';
import HomeScreen from './pages/HomeScreen';
import MapScreen from './pages/MapScreen';
import ScannerScreen from './pages/ScannerScreen';
import CartScreen from './pages/CartScreen';
import ProfileScreen from './pages/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Main() {
    return(
      <>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='Map' component={MapScreen}/>
            <Stack.Screen name='Scanner' component={ScannerScreen}/>
            <Stack.Screen name='Cart' component={CartScreen}/>
            <Stack.Screen name='Profile' component={ProfileScreen}/>
        </Stack.Navigator>
      </>
    );
}

export default Main;