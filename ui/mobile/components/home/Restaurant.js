import React from 'react';
import { FlatList, Text, View, StyleSheet, StatusBar, Image } from 'react-native';

export default function Restaurant(props) {

    const {
        restaurantImageURL,
        restaurantName,
        restaurantPricePoint,
        restaurantCategory
    } = props;

  return (
    <View style={styles.item}>
        <Image
            style={styles.restaurantImage}
            resizeMode="cover"
            source={{uri: restaurantImageURL}}
        />
        <View style={styles.textContainer}>
            <Text numberOfLines={10} style={styles.restaurantName}>{restaurantName}</Text>
        </View>
        
        <View style={styles.restaurantInfoContainer}>
            <Text style={styles.restaurantInfo}>{restaurantPricePoint}</Text>
            <Text style={styles.restaurantInfo}> · </Text>
            <Text style={styles.restaurantInfo}>{restaurantCategory}</Text>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    item: {
        marginVertical: 10,
        marginHorizontal: 5,
        marginLeft: 15,
        borderRadius: 10,
    },
    restaurantName: {
        paddingTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    restaurantImage: {
        width: 180,
        height: 180,
        borderRadius: 10
    },
    restaurantInfoContainer: {
        display: "flex",
        flexDirection: "row",
        
    },
    restaurantInfo: {
        color: "gray",
        fontWeight: "bold"
    },
    textContainer: {
        flexDirection:'row', 
        maxWidth: 180, 
        flexWrap: "wrap",
    }
  });

