import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useDispatch } from 'react-redux';
import { GeneralActions } from '../../actions';
import { useTranslation } from 'react-i18next';

const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({ ...props }) => {
    const { t, i18n } = useTranslation();

    return (
        <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            {...props}
        >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{t("ONBOARDING_SKIP")}</Text>
        </TouchableOpacity>
    );
}


const Next = ({ ...props }) => {
    const { t, i18n } = useTranslation();

    return (
        <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            {...props}
        >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{t("ONBOARDING_NEXT")}</Text>
        </TouchableOpacity>
    );
}


const Done = ({ ...props }) => {
    const { t, i18n } = useTranslation();

    return (
        <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            {...props}
        >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{t("ONBOARDING_DONE")}</Text>
        </TouchableOpacity>
    );
}


const OnboardingScreen = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#d82227' barStyle="light-content" />
            <Onboarding
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                onSkip={() => { dispatch(GeneralActions.setOnboarded(true)); }}
                onDone={() => { dispatch(GeneralActions.setOnboarded(true)); }}
                titleStyles={{ fontWeight: "bold" }}
                subTitleStyles={{ width: 300, fontWeight: "bold" }}
                pages={[
                    {
                        backgroundColor: '#d82227',
                        image: <Image
                            style={{
                                resizeMode: 'contain',
                                height: 300,
                                width: 400,
                                marginTop: -50,
                            }}
                            source={require("../../assets/onboarding/undraw_map.png")} />,
                        title: t("ONBOARDING_1_TITLE"),
                        subtitle: t("ONBOARDING_1_TEXT"),
                    },
                    {
                        backgroundColor: '#d82227',
                        image: <Image
                            style={{
                                resizeMode: 'contain',
                                height: 300,
                                width: 400,
                                marginTop: -50,
                            }}
                            source={require("../../assets/onboarding/undraw_review.png")} />,
                        title: t("ONBOARDING_2_TITLE"),
                        subtitle: t("ONBOARDING_2_TEXT"),
                    },
                    {
                        backgroundColor: '#d82227',
                        image: <Image
                            style={{
                                resizeMode: 'contain',
                                height: 300,
                                width: 400,
                                marginTop: -50,
                            }}
                            source={require("../../assets/onboarding/undraw_online_groceries.png")} />,
                        title: t("ONBOARDING_3_TITLE"),
                        subtitle: t("ONBOARDING_3_TEXT"),
                    },
                    {
                        backgroundColor: '#d82227',
                        image: <Image
                            style={{
                                resizeMode: 'contain',
                                height: 300,
                                width: 400,
                                marginTop: -50,
                            }}
                            source={require("../../assets/onboarding/undraw_Mobile_pay.png")} />,
                        title: t("ONBOARDING_4_TITLE"),
                        subtitle: t("ONBOARDING_4_TEXT"),
                    },
                    {
                        backgroundColor: '#d82227',
                        image: <Image
                            style={{
                                resizeMode: 'contain',
                                height: 300,
                                width: 400,
                                marginTop: -50,
                            }}
                            source={require("../../assets/onboarding/undraw_Eating_together.png")} />,
                        title: t("ONBOARDING_5_TITLE"),
                        subtitle: t("ONBOARDING_5_TEXT"),
                    },
                ]}
            />
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});