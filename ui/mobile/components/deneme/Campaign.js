import React from 'react';
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
}) => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" }}
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