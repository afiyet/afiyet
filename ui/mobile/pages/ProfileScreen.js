import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Linking, Modal, Pressable, Dimensions } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import * as Location from 'expo-location';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { GeneralActions, LocationActions, OrderActions, SearchActions, UserActions } from '../actions';
import { sendChangePasswordMail } from '../endpoints';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const ProfileScreen = () => {

    const userState = useSelector(state => state.userState);
    const locationState = useSelector(state => state.locationState);
    const [address, setAddress] = useState({});
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

    const changeLang = () => {
        if (i18n.language === "tr") {
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("tr");
        }
    }

    useEffect(() => {
        reverseGeocode();
    }, [locationState]);

    const reverseGeocode = async () => {
        if (locationState.longitude != "" && locationState.latitude != "") {
            const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
                longitude: Number(locationState.longitude),
                latitude: Number(locationState.latitude)
            })
            console.log(reverseGeocodedAddress);
            setAddress(reverseGeocodedAddress[0]);
        }

    };

    function handleLogout() {
        dispatch(LocationActions.setReset());
        dispatch(OrderActions.setReset());
        dispatch(SearchActions.setReset());
        dispatch(UserActions.setReset());
        dispatch(GeneralActions.setReset());
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15, alignItems: "center" }}>
                    <View style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: "#d82227", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 40, color: "#fff" }}>{userState.name.toUpperCase()[0] + userState.surname.toUpperCase()[0]}</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Title style={styles.title}>{userState.name + " " + userState.surname}</Title>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{address.region + ", " + address.country}</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{userState.mail}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>


            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {
                    sendChangePasswordMail(userState.mail)
                    .then((res) => {
                        setModalVisible(true);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }}>
                    <View style={styles.menuItem}>
                        <MaterialCommunityIcons name="onepassword" color="#d82227" size={25} />
                        <Text style={styles.menuItemText}>{t("PROFILE_SCREEN.CHANGE_PASSWORD")}</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { changeLang() }}>
                    <View style={styles.menuItem}>
                        <Entypo name="language" color="#d82227" size={25} />
                        <Text style={styles.menuItemText}>{t("PROFILE_SCREEN.CHANGE_LANGUAGE")}</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => Linking.openURL('mailto:afiyetapp@gmail.com')}>
                    <View style={styles.menuItem}>
                        <MaterialIcons name="support-agent" color="#d82227" size={25} />
                        <Text style={styles.menuItemText}>{t("PROFILE_SCREEN.SUPPORT")}</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { handleLogout(); }}>
                    <View style={styles.menuItem}>
                        <MaterialCommunityIcons name="logout" color="#d82227" size={25} />
                        <Text style={styles.menuItemText}>{t("PROFILE_SCREEN.LOGOUT")}</Text>
                    </View>
                </TouchableRipple>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{t("PASSWORD_CHANGE.TEXT")}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                            <Text style={styles.textStyle}>{t("PASSWORD_CHANGE.CLOSE_BTN")}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 2,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {

        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
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
    button: {
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