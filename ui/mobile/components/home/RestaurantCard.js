import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';


const RestaurantCard = ({
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
            onPress={() => navigate(id)}>
            
            <Image
                source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" }}
                resizeMode="contain"
                style={styles.posterStyle}
            />
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.tagText}>{tags?.join(' • ')}</Text>
            <View style={styles.footerContainer}>
                <View style={styles.rowAndCenter}>
                    <FontAwesome name="star" size={14} color={'#FBA83C'} />
                    <Text style={styles.ratingText}>4</Text>
                    <Text style={styles.reviewsText}>({10})</Text>
                </View>
                <View style={styles.rowAndCenter}>
                    <View style={styles.timeAndDistanceContainer}>
                        <Ionicons
                            name="location-outline"
                            color={'#FBA83C'}
                            size={15}
                        />
                        <Text style={styles.timeAndDistanceText}>{distance}</Text>
                    </View>
                    <View style={styles.timeAndDistanceContainer}>
                        <Ionicons
                            name="ios-time-outline"
                            color={'#FBA83C'}
                            size={15}
                        />
                        <Text style={styles.timeAndDistanceText}>{time}</Text>
                    </View>
                </View>
            </View>
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
    titleText: {
        marginLeft: 8,
        fontSize: 15,
        lineHeight: 15 * 1.4,

        color: '#0E122B',
    },
    tagText: {
        marginLeft: 8,
        fontSize: 11,
        lineHeight: 11 * 1.4,

        color: '#C2C2CB',
        marginBottom: 5,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 6,
        justifyContent: 'space-between',
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeAndDistanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: '#FCE6CD',
        borderRadius: 12,
        marginHorizontal: 3,
    },
    timeAndDistanceText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,

        color: '#FBA83C',
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 10,
        lineHeight: 10 * 1.4,

        color: '#0E122B',
    },
    reviewsText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,

        color: '#0E122B',
    },
    bookmark: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
    },
});

export default RestaurantCard;