import React, { useState } from 'react';
import HomeScreen from './pages/HomeScreen';
import MapScreen from './pages/MapScreen';
import ScannerScreen from './pages/ScannerScreen';
import CartScreen from './pages/CartScreen';
import ProfileScreen from './pages/ProfileScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScannerAndOrderParentScreen from './pages/ScannerAndOrderParentScreen';

const Tab = createMaterialBottomTabNavigator();

function Main() {

  const [scannerAndOrderBottomNavLabel, setScannerAndOrderBottomNavLabel] = useState("Scanner");

    return(
      <>
        <Tab.Navigator 
          initialRouteName='Home'
          activeColor="#000000"
          inactiveColor="#000000"
          barStyle={{ backgroundColor: '#FD2400' }}
          >
            <Tab.Screen 
              name='Home' 
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color={color} size={26} />),
              }}/>
            <Tab.Screen 
              name='Map' 
              component={MapScreen}
              options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="map" color={color} size={26} />),
              }}/>
            <Tab.Screen 
              name='ScannerAndOrderParent'
              options={{
                tabBarLabel: scannerAndOrderBottomNavLabel,
                tabBarIcon: ({color}) => (scannerAndOrderBottomNavLabel === "Scanner" ? <MaterialCommunityIcons name="qrcode" color={color} size={26} /> : <MaterialCommunityIcons name="book-open" color={color} size={26} />),
              }}>
                {() => {return <ScannerAndOrderParentScreen setBottomNavLabel={setScannerAndOrderBottomNavLabel}/>}}
            </Tab.Screen>
            <Tab.Screen 
              name='Cart' 
              component={CartScreen}
              options={{
                tabBarLabel: 'Cart',
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="cart-variant" color={color} size={26} />),
              }}/>
            <Tab.Screen 
              name='Profile' 
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account-circle" color={color} size={26} />),
              }}/>
        </Tab.Navigator>
      </>
    );
}

export default Main;