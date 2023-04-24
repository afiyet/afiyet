import React, { useState } from 'react';
import HomeScreen from '../pages/HomeScreen';
import MapScreen from '../pages/MapScreen';
import CartScreen from '../pages/CartScreen';
import ProfileScreen from '../pages/ProfileScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScannerAndOrderStackNavigation from './ScannerAndOrderStackNavigation';
import SearchAndHomeStackNavigation from './SearchAndHomeStackNavigation';
import { Badge } from 'react-native-paper';
import { View } from 'react-native';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const Tab = createMaterialBottomTabNavigator();

function MainTabNavigation() {

  const [scannerAndOrderBottomNavLabel, setScannerAndOrderBottomNavLabel] = useState("Scanner");
  const orderState = useSelector(state => state.orderState);
  const {t, i18n} = useTranslation();

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
          tabBarLabel: t("TAB_NAV.HOME_TAB"),
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />),
        }} />
      <Tab.Screen
        name='Map'
        component={MapScreen}
        options={{
          tabBarLabel: t("TAB_NAV.MAP_TAB"),
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="map" color={color} size={26} />),
        }} />
      <Tab.Screen
        name='ScannerAndOrderParent'
        options={{
          tabBarLabel: t("TAB_NAV." + scannerAndOrderBottomNavLabel),
          tabBarIcon: ({ color }) => (scannerAndOrderBottomNavLabel === "Scanner" ? <MaterialCommunityIcons name="qrcode" color={color} size={26} /> : <MaterialCommunityIcons name="book-open" color={color} size={26} />),
        }}>
        {() => { return <ScannerAndOrderStackNavigation setBottomNavLabel={setScannerAndOrderBottomNavLabel} /> }}
      </Tab.Screen>
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarLabel: t("TAB_NAV.CART_TAB"),
          tabBarIcon: ({ color }) => {
            return (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <MaterialCommunityIcons name="cart-variant" color={color} size={26} />
                {
                  (orderState.orderedItems.length > 0) ?
                    <Badge style={{ position: "absolute", top: 2, right: -17, backgroundColor: "#0fdb8a", color: "black", fontWeight: "bold" }}>{orderState.orderedItems.length}</Badge>
                    :
                    null
                }
              </View>
            );
          },
        }} />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: t("TAB_NAV.PROFILE_TAB"),
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-circle" color={color} size={26} />),
        }} />
    </Tab.Navigator>
  );
}

export default MainTabNavigation;