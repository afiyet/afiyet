import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScannerScreen from "./ScannerScreen";
import OrderScreen from "./OrderScreen";

function ScannerAndOrderParentScreen(props) {
    const {
        setBottomNavLabel
        
    } = props;
    const NativeStack = createNativeStackNavigator();

    return(
        <NativeStack.Navigator>
            <NativeStack.Group screenOptions={{ presentation: 'modal' }}>
                <NativeStack.Screen name="Scanner"> 
                    {() => {return <ScannerScreen setBottomNavLabel={setBottomNavLabel}/>}}
                </NativeStack.Screen>
                <NativeStack.Screen name="Order">
                    {() => {return <OrderScreen setBottomNavLabel={setBottomNavLabel}/>}}
                </NativeStack.Screen>
            </NativeStack.Group>
        </NativeStack.Navigator>
    );
}

export default ScannerAndOrderParentScreen;