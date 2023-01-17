import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScannerScreen from "./ScannerScreen";
import OrderScreen from "./OrderScreen";
import FoodDetails from "./FoodDetails";
import { useState } from "react";

function ScannerAndOrderParentScreen(props) {
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

export default ScannerAndOrderParentScreen;