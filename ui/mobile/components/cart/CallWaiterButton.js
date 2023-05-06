import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { callWaiter } from '../../endpoints/cart/cartEndpoints';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTranslation } from 'react-i18next';

export default function CallWaiterButton(props) {

    const {
        cashOrderIdArray
    } = props;

    const [isCalled, setIsCalled] = useState(false);
    const { t, i18n } = useTranslation();


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
                onPress={() => {
                    handleCallWaiter();
                }}
                style={{display: "flex", justifyContent: "center", alignItems: "center"}}
            >
                <Entypo
                    name="hand"
                    color={(isCalled) ? "#00ff00" : "#000"}
                    size={400}
                  />
                <Text style={styles.text}>{t("CART_SCREEN.CALL_WAITER")}</Text>
            </TouchableOpacity>
        </View>

    )
}


const styles = StyleSheet.create({
    buttonContainerCalled: {
        borderRadius: 200,
        backgroundColor: "#00ff00",
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
        fontSize: 22,
        color: "#000",
    }
});