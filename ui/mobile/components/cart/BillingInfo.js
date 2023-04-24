import { FlatList, Text, View, StyleSheet, StatusBar, Image, Pressable } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function BillingInfo(props) {

  const {
    totalPrice
  } = props;
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("CART_SCREEN.TOTAL")} {totalPrice} TL</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    backgroundColor: "#d82227",
    borderRadius: 10,
    padding: 8,
    marginRight: 20,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});