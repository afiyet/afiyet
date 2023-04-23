import React from 'react';
import ScannerScreen from '../pages/ScannerScreen';
import OrderScreen from '../pages/OrderScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import TestOrder from '../pages/TestOrder';
import CommentsPage from '../pages/CommentsPage';

export default function ScannerAndOrderStackNavigation(props) {
    const {
        setBottomNavLabel
    } = props;
    const NativeStack = createNativeStackNavigator();
    const [scannedBarcode, setScannedBarcode] = useState("");

    return (
        <NativeStack.Navigator>
            <NativeStack.Group screenOptions={{ presentation: 'modal' }}>
                <NativeStack.Screen name="Scanner"
                    options={{
                        headerBackVisible: false
                    }}
                >
                    {() => { return <ScannerScreen setScannedBarcode={setScannedBarcode} setBottomNavLabel={setBottomNavLabel} /> }}
                </NativeStack.Screen>
                <NativeStack.Screen name="Order"
                    options={({ navigation, route }) => ({
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{
                                    marginRight: 5,
                                    paddingHorizontal: 10,
                                    paddingVertical: 12,
                                }}
                                onPress={() => { navigation.navigate("Scanner") }}
                            >
                                <Feather
                                    name="arrow-left"
                                    color="black"
                                    size={26}
                                />
                            </TouchableOpacity>
                        )
                    })}>
                    {() => { return <TestOrder setBottomNavLabel={setBottomNavLabel} /> }}
                </NativeStack.Screen>
                <NativeStack.Screen name="Comments"
                    options={({ navigation, route }) => ({
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{
                                    marginRight: 5,
                                    paddingHorizontal: 10,
                                    paddingVertical: 12,
                                }}
                                onPress={() => { navigation.goBack(); }}
                            >
                                <Feather
                                    name="arrow-left"
                                    color="black"
                                    size={26}
                                />
                            </TouchableOpacity>
                        )
                    })}
                >
                    {() => { return <CommentsPage /> }}
                </NativeStack.Screen>
            </NativeStack.Group>
        </NativeStack.Navigator>
    );
}