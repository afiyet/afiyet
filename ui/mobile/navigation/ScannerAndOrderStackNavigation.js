import React from 'react';
import ScannerScreen from '../pages/ScannerScreen';
import OrderScreen from '../pages/OrderScreen';
import FoodDetails from '../pages/FoodDetails';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

export default function ScannerAndOrderStackNavigation(props) {
    const {
        setBottomNavLabel
        
    } = props;
    const NativeStack = createNativeStackNavigator();
    const [scannedBarcode, setScannedBarcode] = useState("");

    return(
        <NativeStack.Navigator>
            <NativeStack.Group screenOptions={{ presentation: 'modal' }}>
                <NativeStack.Screen name="Scanner"> 
                    {() => {return <ScannerScreen setScannedBarcode={setScannedBarcode} setBottomNavLabel={setBottomNavLabel}/>}}
                </NativeStack.Screen>
                <NativeStack.Screen name="Order">
                    {() => {return <OrderScreen scannedBarcode={scannedBarcode} setBottomNavLabel={setBottomNavLabel}/>}}
                </NativeStack.Screen>
                <NativeStack.Screen name="Food Details">
                    {() => {return <FoodDetails />}}
                </NativeStack.Screen>
            </NativeStack.Group>
        </NativeStack.Navigator>
    );
}