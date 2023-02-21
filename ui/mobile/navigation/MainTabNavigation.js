import React, { useState } from 'react';
import HomeScreen from '../pages/HomeScreen';
import MapScreen from '../pages/MapScreen';
import CartScreen from '../pages/CartScreen';
import ProfileScreen from '../pages/ProfileScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScannerAndOrderStackNavigation from './ScannerAndOrderStackNavigation';
import SearchAndHomeStackNavigation from './SearchAndHomeStackNavigation';

const Tab = createMaterialBottomTabNavigator();

function MainTabNavigation() {

  const [scannerAndOrderBottomNavLabel, setScannerAndOrderBottomNavLabel] = useState("Scanner");

  return (
    <Tab.Navigator
      initialRouteName='HomeParent'
      activeColor="#000000"
      inactiveColor="#000000"
      barStyle={{ backgroundColor: '#d82227' }}
    >
      <Tab.Screen
        name='HomeParent'
        component={SearchAndHomeStackNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />),
        }} />
      <Tab.Screen
        name='Map'
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="map" color={color} size={26} />),
        }} />
      <Tab.Screen
        name='ScannerAndOrderParent'
        options={{
          tabBarLabel: scannerAndOrderBottomNavLabel,
          tabBarIcon: ({ color }) => (scannerAndOrderBottomNavLabel === "Scanner" ? <MaterialCommunityIcons name="qrcode" color={color} size={26} /> : <MaterialCommunityIcons name="book-open" color={color} size={26} />),
        }}>
        {() => { return <ScannerAndOrderStackNavigation setBottomNavLabel={setScannerAndOrderBottomNavLabel} /> }}
      </Tab.Screen>
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="cart-variant" color={color} size={26} />),
        }} />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-circle" color={color} size={26} />),
        }} />
    </Tab.Navigator>
  );
}

export default MainTabNavigation;