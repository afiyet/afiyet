import { FlatList, Text, View, StyleSheet, StatusBar, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { OrderActions } from '../../actions';
import {useDispatch} from "react-redux";

export default function OrderCounter(props) {

    const {
        orderedCount,
        orderedFoodId
    } = props;

    const dispatch = useDispatch();

    const decreaseCount = () => {
        if (orderedCount > 0) {
            dispatch(OrderActions.decreaseCountOfOrderedItem(orderedFoodId));
        }
    }

    const increaseCount = () => {
        dispatch(OrderActions.increaseCountOfOrderedItem(orderedFoodId));
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={decreaseCount}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? "#d4989a" : "#D82227",
                    },
                    styles.button,
                ]}
            >
                <Text style={styles.text}>-</Text>
            </Pressable>
            <View style={styles.counterView}>
                <Text style={styles.text}>{orderedCount}</Text>
            </View>

            <Pressable
                onPress={increaseCount}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? "#d4989a" : "#D82227",
                    },
                    styles.button,
                ]}
            >
                <Text style={styles.text}>+</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#202533",
        borderRadius: 8,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    counterView: {
        paddingVertical: 6,
        paddingHorizontal: 10,
    }
});