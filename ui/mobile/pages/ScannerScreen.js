import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ScannerScreen(props) {
    const {
        setBottomNavLabel,
        setScannedBarcode
    } = props;
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            console.log(status);
        })();
    }, []);

    useEffect(() => {
        setBottomNavLabel("Scanner");
    }, [isFocused]);

    if (hasPermission === null) {
        return <View></View>
    }

    if(hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }

    return(
        <View style={styles.container}>
            {isFocused &&
                <Camera 
                style={styles.camera} 
                type={type}
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
                }}
                onBarCodeScanned={(BarCodeScanningResult) => {
                    console.log(BarCodeScanningResult);
                    console.log(BarCodeScanningResult.type);
                    console.log(BarCodeScanningResult.data);
                    setScannedBarcode(BarCodeScanningResult.data);
                    navigation.navigate("Order");
                }}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <MaterialCommunityIcons name="camera-flip-outline" color={"white"} size={80} />
                    </TouchableOpacity>
                </View>
            </Camera>
            }
        </View>
    );
    
}const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20
    },
    button: {
      flex: 0.25,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });

export default ScannerScreen;