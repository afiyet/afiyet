import { FlatList, Text, View, StyleSheet, StatusBar, Image, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function BottomSheetOrderCounter() {
    const [count, setCount] = useState(0);

    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1);
        } else {
            setCount(0);
        }
    }

    const increaseCount = () => {
        setCount(count + 1);
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
                <Text style={styles.text}>{count}</Text>
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
        borderRadius: 15,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    counterView: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    }
});