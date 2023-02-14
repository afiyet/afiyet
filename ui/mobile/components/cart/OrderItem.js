import { FlatList, Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import React from 'react';
import OrderCounter from './OrderCounter';

export default function OrderItem() {
  return (
    <View style={styles.container}>
        <View style={styles.leftContainer}>
            <Image 
                source={{uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"}}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.textView}>
                <Text style={styles.text}>Special Pizza</Text>
                <Text style={styles.text}>$30.00</Text>
            </View>
        </View>
        <OrderCounter />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingRight: 20,
    },
    leftContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 100, 
        height: 100,
        borderRadius: 5
    },
    text: {
        fontSize: 16,
    },
    textView: {
        marginLeft: 15
    }
});