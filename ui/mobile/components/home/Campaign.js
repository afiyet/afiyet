import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import getDistanceFromLatLonInKm from './DistanceCalculations';
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';

const Campaign = (props) => {

    const {
        item,
        index
    } = props;

    const navigation = useNavigation();
    const userLocation = useSelector(state => state.locationState);
    let distance = getDistanceFromLatLonInKm(Number(userLocation.latitude), Number(userLocation.longitude), Number(item.Latitude), Number(item.Longitude));

    function goToRestaurantPage(restaurantId) {
        navigation.navigate("ScannerAndOrderParent", {
            screen: "Order",
            params: {
                rID: restaurantId
            }
        });
    }

    return (
        (distance < 4) ?
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.8}
                onPress={() => { goToRestaurantPage(item.ID); }}
            >
                {
                    (item.campaignPicture != "") ?
                        <Image
                            source={{
                                uri: item.campaignPicture,
                            }}
                            resizeMode={"contain"}
                            style={styles.posterStyle}
                        />
                        :
                        null
                }
            </TouchableOpacity>
            :
            null
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
        width: screenDimensions.width - 10,
        alignItems: "center",
        marginHorizontal: 10
    },
    posterStyle: {
        width: screenDimensions.width - 20,
        height: screenDimensions.height * 0.25,
        borderRadius: 10,
        margin: 5,
    },
});

export default Campaign;