import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { OrderActions } from "../actions";
import { doesHaveRemoteOrderOnTable } from '../endpoints/scanner/scannerEndpoints';
import { useTranslation } from 'react-i18next';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

function ScannerScreen(props) {
    const {
        setBottomNavLabel,
    } = props;
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            console.log(status);
        })();
        dispatch(OrderActions.setBarcodeParams({
            restaurantId: "",
            tableId: ""
        }));
    }, []);

    useEffect(() => {
        setBottomNavLabel("Scanner");
        setModalVisible(false);
    }, [isFocused]);

    if (hasPermission === null) {
        return <View></View>
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function redirectOrShowError(BarCodeScanningResult) {

        let restaurantId = BarCodeScanningResult.data.split(":")[0];
        let tId = BarCodeScanningResult.data.split(":")[1];

        doesHaveRemoteOrderOnTable(tId)
            .then((res) => {
                console.log(res);
                if (res.data === true) {
                    //masa dolu
                    setModalVisible(true);
                } else {
                    //masa boş
                    navigation.push("Order", {
                        rID: restaurantId,
                        tableId: tId,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <View style={styles.container}>
            {isFocused &&
                <Camera
                    style={styles.camera}
                    type={type}
                    barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
                    }}
                    onBarCodeScanned={(BarCodeScanningResult) => {
                        redirectOrShowError(BarCodeScanningResult);
                    }}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <MaterialCommunityIcons name="camera-flip-outline" color={"white"} size={80} />
                        </TouchableOpacity>
                    </View>
                </Camera>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            {t("SCANNER_SCREEN.MODAL_TEXT")}
                        </Text>
                        <Pressable
                            style={[styles.m_button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>{t("CART_SCREEN.MODAL_CLOSE")}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );

} const styles = StyleSheet.create({
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: screenDimensions.width * 0.8,
    },
    m_button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#D82227',
        width: "100%"
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
});

export default ScannerScreen;