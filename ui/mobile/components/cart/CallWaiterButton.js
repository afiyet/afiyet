import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { callWaiter } from '../../endpoints/cart/cartEndpoints';

export default function CallWaiterButton(props) {

    const {
        cashOrderIdArray
    } = props;

    const [isCalled, setIsCalled] = useState(false);


    function handleCallWaiter() {
        cashOrderIdArray.map((orderId) => {
            callWaiter({
                ID: orderId
            })
                .then((res) => {
                    setIsCalled(true);
                })
                .catch((err) => {
                    console.log(err);
                })
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={(isCalled) ? styles.buttonContainerCalled : styles.buttonContainerNotCalled}
                onPress={() => {
                    handleCallWaiter();
                }}
            >
                <Text style={styles.text}>Garson Çağır</Text>
            </TouchableOpacity>
        </View>

    )
}


const styles = StyleSheet.create({
    buttonContainerCalled: {
        borderRadius: 200,
        backgroundColor: "green",
        width: "60%",
        height: "60%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainerNotCalled: {
        borderRadius: 200,
        backgroundColor: "red",
        width: "60%",
        height: "60%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    text: {
        fontWeight: "bold",
        fontSize: 29,
        color: "#fff"
    }
});