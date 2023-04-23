import React, { useEffect, useState } from 'react';
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
            style={styles.container}
            activeOpacity={0.5}
            onPress={() => {
                setSelectedMenuItem(item);
                setIsBottomSheetOpen(true);
            }}
            //disabled={(orderState.tableId === undefined || orderState.tableId === "") ? true : false}
        >
            <View>
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
                        resizeMode: "contain"
                    }}
                    style={styles.image}
                />
            </View>
            <View style={styles.detailsContainer}>
                <View>
                    <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.titleText}>
                        {item.name}
                    </Text>
                    <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.descriptionText}>
                        {(item.ingredients !== null) ? item.ingredients.toString() : "salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,salata,"}
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