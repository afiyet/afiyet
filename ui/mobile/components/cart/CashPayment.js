import { View, Text } from 'react-native'
import React from 'react'
import CallWaiterButton from './CallWaiterButton'

export default function CashPayment(props) {

    const {
        cashOrderIdArray
    } = props;

    return (
        <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
            <CallWaiterButton
                cashOrderIdArray={cashOrderIdArray}
            />
        </View>
    )
}