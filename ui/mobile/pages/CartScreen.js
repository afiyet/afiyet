import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import BillingInfo from '../components/cart/BillingInfo';
import OrderItem from '../components/cart/OrderItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StepperMain from '../components/cart/StepperMain';


export default function CartScreen() {

    const insets = useSafeAreaInsets();

    /*return (
        <View style={[styles.container, {marginTop: insets.top}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <BillingInfo />
            </ScrollView>
        </View>
    );*/

    return (
        <StepperMain />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

