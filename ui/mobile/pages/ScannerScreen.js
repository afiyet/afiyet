import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

function ScannerScreen(props) {
    const {
        setBottomNavLabel
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
                    navigation.navigate("Order");
                }}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
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
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });

export default ScannerScreen;