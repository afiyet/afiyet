import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RestaurantMediumCard = (props) => {

    const {
        ID,
        name,
        address,
        category,
        avgPoint,
        commentCount
    } = props;

    const navigation = useNavigation();

    function goToRestaurantPage(restaurantId) {
        navigation.navigate("ScannerAndOrderParent", {
            screen: "Order",
            params: {
                rID: restaurantId
            }
        });
    }

    return (
        <TouchableOpacity 
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => {goToRestaurantPage(ID)}}
            >
            <View>
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" }}
                    resizeMode="contain"
                    style={styles.posterStyle}
                />
            </View>
            <View style={styles.labelContainer}>
                <View style={styles.nameAndRating}>
                    <Text style={styles.titleText}>{name}</Text>
                    <View style={styles.rowAndCenter}>
                        <FontAwesome name="star" size={20} color={"#F53920"} />
                        <Text style={styles.ratingText}>{avgPoint}</Text>
                        <Text style={styles.reviewsText}>({commentCount})</Text>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.tagsText}>{category}</Text>
                    <Text style={styles.addressText}>{address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        elevation: 1,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginTop: 8,
    },
    posterStyle: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
    },
    labelContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    titleText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontWeight: "bold",
        color: '#0E122B',
        marginBottom: 5,
    },
    tagsText: {
        fontSize: 11,
        lineHeight: 11 * 1.4,
        color: '#C2C2CB',
        marginBottom: 7,
    },

    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
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
    addressText: {
        fontSize: 10,
        color: '#C2C2CB',
        marginBottom: 5,
    },
    nameAndRating: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 5,
        //marginLeft: 8,
    }
});

export default RestaurantMediumCard;