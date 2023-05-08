import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Modal,
    Pressable,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login, sendChangePasswordMail } from '../endpoints';
import { GeneralActions, UserActions } from '../actions';
import SnackbarTemplate from '../components/snackbar/SnackbarTemplate';
import { useTranslation } from 'react-i18next';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const LoginScreen = () => {

    const { colors } = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarVariant, setSnackbarVariant] = useState("");
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputEmailChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });


    const textInputEmailChange = (val) => {
        if (val.trim().length !== 0 && /\S+@\S+\.\S+/.test(val)) {
            setData({
                ...data,
                email: val,
                check_textInputEmailChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputEmailChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length !== 0 && /\S+@\S+\.\S+/.test(val)) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const handleLogin = () => {
        if (data.isValidUser && data.isValidPassword && (data.email.trim().length > 0 && data.password.trim().length > 0)) {

            let payload = {
                "mail": data.email,
                "password": data.password
            }

            login(payload)
                .then((res) => {
                    console.log(res);
                    dispatch(UserActions.setUser(res.data));
                    dispatch(GeneralActions.setIsLoggedIn(true));
                })
                .catch((err) => {
                    console.log(err);
                    setSnackbarVariant("error");
                    setSnackbarText(t("WRONG_CREDS"));
                    setSnackbarVisible(true);
                })
        } else {
            setSnackbarVariant("error");
            setSnackbarText(t("WRONG_INPUT"));
            setSnackbarVisible(true);
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#d82227' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>{t("LOGIN_TITLE")}</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>{t("EMAIL")}</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="at"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder={t("YOUR_EMAIL")}
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        keyboardType='email-address'
                        onChangeText={(val) => textInputEmailChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputEmailChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{t("INVALID_EMAIL")}</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>{t("PASSWORD")}</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder={t("YOUR_PASSWORD")}
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{t("BLANK_PASSWORD")}</Text>
                    </Animatable.View>
                }


                <TouchableOpacity
                    onPress={() => {
                        if (data.isValidUser && data.email.length > 0) {
                            sendChangePasswordMail(data.email)
                            .then((res) => {
                                setModalVisible(true);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                        } else {
                            setModalVisible(true);
                        }
                    }}
                >
                    <Text style={{ color: '#202533', marginTop: 15, fontWeight: "bold" }}>{t("FORGOT_PASSWORD")}</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { handleLogin() }}
                    >
                        <LinearGradient
                            colors={['#FF0000', '#d82227']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>{t("LOGIN")}</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#d82227',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#d82227'
                        }]}>{t("SIGNUP")}</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            <SnackbarTemplate
                snackbarText={snackbarText}
                snackbarVisible={snackbarVisible}
                setSnackbarVisible={setSnackbarVisible}
                snackbarVariant={snackbarVariant}
                snackbarDuration={4000}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{(data.isValidUser && data.email.length > 0) ? t("PASSWORD_CHANGE.TEXT") : t("PASSWORD_CHANGE.NOT_VALID_EMAIL")}</Text>
                        <Pressable
                            style={[styles.p_button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                            <Text style={styles.textStyle}>{t("PASSWORD_CHANGE.CLOSE_BTN")}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d82227'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#202533',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -4,
        paddingLeft: 10,
        color: '#202533',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
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
    p_button: {
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