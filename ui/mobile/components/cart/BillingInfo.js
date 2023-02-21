import { FlatList, Text, View, StyleSheet, StatusBar, Image, Pressable } from 'react-native';
import React from 'react';

export default function BillingInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total: $ 30.00</Text>
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