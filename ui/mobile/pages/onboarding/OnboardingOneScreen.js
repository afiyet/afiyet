import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >

    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = () => {

    const navigation = useNavigation();

    const setOnboarded = async (value) => {
        value = JSON.stringify(value);
        try {
            await AsyncStorage.setItem('ONBOARDED', value)
        } catch (e) {
            console.log("error while setOnboarded");
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#d82227' barStyle="light-content" />
            <Onboarding
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                onSkip={() => { setOnboarded(true) }}
                onDone={() => { setOnboarded(true) }}
                titleStyles={{fontWeight: "bold"}}
                subTitleStyles={{width: 300, fontWeight: "bold" }}
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
                        title: 'Discover places near you',
                        subtitle: 'We make it simple for you to find restaurants around you.',
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
                        title: 'Check what others think',
                        subtitle: 'We provide a way to evaluate restaurants from other\'s point of view.',
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
                        title: 'Order from your phone',
                        subtitle: 'See available offerings and order at your fingertips.',
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
                        title: 'Pay from your phone',
                        subtitle: 'Want to split the check? Just pay from your phone.',
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
                        title: 'Enjoy your food',
                        subtitle: 'Get your food delivered to your table just like that!',
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