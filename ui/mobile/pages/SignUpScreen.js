import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signUp } from '../endpoints';
import SnackbarTemplate from '../components/snackbar/SnackbarTemplate';
import { useTranslation } from 'react-i18next';

const SignUpScreen = () => {

    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarVariant, setSnackbarVariant] = useState("");
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const [data, setData] = React.useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirm_password: '',
        check_textInputNameChange: false,
        check_textInputSurnameChange: false,
        check_textInputEmailChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputNameChange = (val) => {
        if (val.trim().length !== 0) {
            setData({
                ...data,
                name: val.trim(),
                check_textInputNameChange: true
            });
        } else {
            setData({
                ...data,
                name: val.trim(),
                check_textInputNameChange: false
            });
        }
    }

    const textInputSurnameChange = (val) => {
        if (val.trim().length !== 0) {
            setData({
                ...data,
                surname: val.trim(),
                check_textInputSurnameChange: true
            });
        } else {
            setData({
                ...data,
                surname: val.trim(),
                check_textInputSurnameChange: false
            });
        }
    }

    const textInputEmailChange = (val) => {
        if (val.trim().length !== 0 && /\S+@\S+\.\S+/.test(val)) {
            setData({
                ...data,
                email: val.trim(),
                check_textInputEmailChange: true
            });
        } else {
            setData({
                ...data,
                email: val.trim(),
                check_textInputEmailChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const handleSignUp = () => {
        if (data.check_textInputNameChange &&
            data.check_textInputSurnameChange &&
            data.check_textInputEmailChange &&
            (data.confirm_password === data.password)
        ) {
            if ((data.password.length >= 6 && data.password.length <= 14)) {
                let payload = {
                    "name": data.name,
                    "surname": data.surname,
                    "mail": data.email,
                    "password": data.password
                };

                signUp(payload)
                    .then((res) => {
                        setSnackbarVariant("success");
                        setSnackbarText(t("SIGNUP_SUCCESS"));
                        setSnackbarVisible(true);
                    })
                    .catch((err) => {
                        setSnackbarVariant("error");
                        setSnackbarVisible(true);
                        if (err.response.data.includes("idx_users_mail")) {
                            setSnackbarText(t("SIGNUP_ERROR_EMAIL"));
                        } else {
                            setSnackbarText(t("SIGNUP_ERROR"));
                        }
                    })
            } else {
                setSnackbarVariant("error");
                setSnackbarText(t("PASSWORD_LENGTH"));
                setSnackbarVisible(true);
            }
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
                <Text style={styles.text_header}>{t("SIGNUP_TITLE")}</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={[styles.text_footer, {
                        marginTop: 0
                    }]}>{t("NAME")}</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#202533"
                            size={20}
                        />
                        <TextInput
                            placeholder={t("YOUR_NAME")}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputNameChange(val)}
                        />
                        {data.check_textInputNameChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            :
                            <Feather
                                name="x-circle"
                                color="red"
                                size={20}
                            />}
                    </View>

                    <Text style={styles.text_footer}>{t("SURNAME")}</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#202533"
                            size={20}
                        />
                        <TextInput
                            placeholder={t("YOUR_SURNAME")}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputSurnameChange(val)}
                        />
                        {data.check_textInputSurnameChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            :
                            <Feather
                                name="x-circle"
                                color="red"
                                size={20}
                            />}
                    </View>

                    <Text style={styles.text_footer}>{t("EMAIL")}</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="at"
                            color="#202533"
                            size={20}
                        />
                        <TextInput
                            placeholder={t("YOUR_EMAIL")}
                            style={styles.textInput}
                            autoCapitalize="none"
                            keyboardType='email-address'
                            onChangeText={(val) => textInputEmailChange(val)}
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
                            :
                            <Feather
                                name="x-circle"
                                color="red"
                                size={20}
                            />}
                    </View>

                    <Text style={styles.text_footer}>{t("PASSWORD")}</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#202533"
                            size={20}
                        />
                        <TextInput
                            placeholder={t("YOUR_PASSWORD")}
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
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

                    <Text style={styles.text_footer}>{t("CONFIRM_PASSWORD")}</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#202533"
                            size={20}
                        />
                        <TextInput
                            placeholder={t("CONFIRM_PASSWORD")}
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
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
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { handleSignUp() }}
                        >
                            <LinearGradient
                                colors={['#FF0000', '#d82227']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>{t("SIGNUP")}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#d82227',
                                borderWidth: 1,
                                marginTop: 15,
                                marginBottom: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#d82227'
                            }]}>{t("LOGIN")}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
            <SnackbarTemplate
                snackbarText={snackbarText}
                snackbarVisible={snackbarVisible}
                setSnackbarVisible={setSnackbarVisible}
                snackbarVariant={snackbarVariant}
                snackbarDuration={4000}
            />
        </View>
    );
};

export default SignUpScreen;

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
        flex: Platform.OS === 'ios' ? 3 : 5,
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
        fontSize: 18,
        marginTop: 35
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -4,
        paddingLeft: 10,
        color: '#202533',
    },
    button: {
        alignItems: 'center',
        marginTop: 20
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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});