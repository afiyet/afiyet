import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';


const Campaign = ({
    id,
    name,
    tags,
    distance,
    time,
    navigate,
    index
}) => {
    const dispatch = useDispatch();


    const bannerList = [
        require("../../assets/banners/subwayBanner.png"),
        require("../../assets/banners/burgermakeBanner.png"),
        require("../../assets/banners/dominosBanner.png"),
        require("../../assets/banners/littleBanner.png")
    ];

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
        >
            <Image
                source={bannerList[index%4]}
                resizeMode="contain"
                style={styles.posterStyle}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 3,
        marginBottom: 5,
    },
    posterStyle: {
        width: 1920 * 0.15,
        height: 1080 * 0.15,
        borderRadius: 10,
        margin: 5,
    },
});

export default Campaign;