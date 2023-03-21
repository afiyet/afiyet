import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

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

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#d82227' barStyle="light-content" />
            <Onboarding
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                onSkip={() => navigation.replace("Login")}
                onDone={() => navigation.navigate("LoginScreen")}
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
                        subtitle: 'We make it simple for you to find restaurants around you',
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
                        title: 'Share Your Favorites',
                        subtitle: 'Share Your Thoughts With Similar Kind of Peodsadasdasdasdasdasdasple',
                    },
                    {
                        backgroundColor: '#d82227',
                        //image: <Image source={require('../assets/onboarding-img3.png')} />,
                        title: 'Become The Star',
                        subtitle: "Let The Spot Light Capture You",
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