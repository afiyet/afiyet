import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const FoodCard = (props) => {

    const {
        item,
        setSelectedMenuItem,
        setIsBottomSheetOpen
    } = props;

    const orderState = useSelector(state => state.orderState);

    return (
        <TouchableOpacity
            style={[styles.container, (item.IsDisabled) ? {backgroundColor: "#B3B3B3"} : {}]}
            activeOpacity={0.5}
            onPress={() => {
                setSelectedMenuItem(item);
                setIsBottomSheetOpen(true);
            }}
        //disabled={(orderState.tableId === undefined || orderState.tableId === "") || item.IsDisabled ? true : false}
        >
            <View>
                {
                    (item.picture != "") ?
                        <Image
                            source={{
                                uri: item.picture,
                            }}
                            resizeMode={"cover"}
                            style={styles.image}
                        />
                        :
                        null
                }
            </View>
            <View style={ (item.picture != "") ? styles.detailsContainer : {marginHorizontal: 15}}>
                <View>
                    <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.titleText}>
                        {item.name}
                    </Text>
                    <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.descriptionText}>
                        {(item.ingredients !== null) ? item.ingredients.join(", ") : ""}
                    </Text>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.priceText}>{item.price} TL</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 2,
        backgroundColor: '#F8F7F7',
        height: 112,
    },
    image: {
        height: 100,
        width: 100,
        margin: 6,
        borderRadius: 8,
    },
    detailsContainer: {
        marginHorizontal: 5,
    },
    titleText: {
        fontWeight: "bold",
        color: '#0E122B',
        fontSize: 18,
        marginBottom: 2,
        width: 250
    },
    descriptionText: {
        color: 'black',
        fontSize: 10,
        marginBottom: 4,
        width: 250
    },
    priceText: {
        color: '#D82227',
        fontSize: 14,
        fontWeight: "bold"
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
});

export default FoodCard;