import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function RestaurantCard(props) {

    const {
        ID,
        name,
        address,
        category,
        avgPoint,
        commentCount,
        picture
    } = props;

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate("ScannerAndOrderParent", {
                    screen: "Order",
                    params: {
                        rID: ID
                    }
                });
            }}>
            {
                (picture != "") ?
                    <Image
                        source={{
                            uri: picture,
                        }}
                        resizeMode={"cover"}
                        style={styles.posterStyle}
                    />
                    :
                    null
            }
            <View style={(picture == "") ? {height: 100, display: "flex", flexDirection: "column", justifyContent: "space-evenly"} : {}}>
                <View style={styles.nameAndRating}>
                    <Text style={styles.titleText}>{name}</Text>
                    <View style={styles.rowAndCenter}>
                        <FontAwesome name="star" size={20} color={Colors.DEFAULT_RED} />
                        <Text style={styles.ratingText}>{avgPoint}</Text>
                        <Text style={styles.reviewsText}>({commentCount})</Text>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.tagText}>{category}</Text>
                    <Text style={styles.addressText}>{address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const Colors = {
    DEFAULT_BLACK: '#0E122B',
    DEFAULT_GREEN: '#0A8791',
    DEFAULT_YELLOW: '#FBA83C',
    DEFAULT_GREY: '#C2C2CB',
    DEFAULT_WHITE: '#FFFFFF',
    DEFAULT_RED: '#F53920',
    SECONDARY_RED: '#FF6F59',
    SECONDARY_WHITE: '#F8F8F8',
    SECONDARY_GREEN: '#24C869',
    SECONDARY_BLACK: '#191d35',
    LIGHT_GREEN: '#CEE8E7',
    LIGHT_GREY: '#F8F7F7',
    LIGHT_GREY2: '#EAEAEA',
    LIGHT_YELLOW: '#FCE6CD',
    LIGHT_RED: '#FFC8BF',
    FABEBOOK_BLUE: '#4A61A8',
    GOOGLE_BLUE: '#53A0F4',
    INACTIVE_GREY: '#A3A3A3',
    DARK_ONE: '#121212',
    DARK_TWO: '#181818',
    DARK_THREE: '#404040',
    DARK_FOUR: '#282828',
    DARK_FIVE: '#B3B3B3',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 3,
        marginBottom: 5,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    posterStyle: {
        flex: 1,
        height: 150,
        borderRadius: 10,
        margin: 5,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tagText: {
        fontSize: 11,
        color: '#C2C2CB',
    },
    addressText: {
        fontSize: 10,
        color: '#C2C2CB',
        marginBottom: 5,
    },
    footerContainer: {
        marginLeft: 9,
        flexDirection: 'column',
        alignItems: 'flex-start',
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
    ratingText: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: 'bold',
        paddingRight: 2,
    },
    reviewsText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 2,
        color: '#C2C2CB',
    },
    nameAndRating: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 5,
        marginLeft: 8,
    }
});

export default RestaurantCard;