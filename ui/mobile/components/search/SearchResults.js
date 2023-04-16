import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';

export default function SearchResults(props) {

    const {
        searchedKey,
        searchResults
    } = props;

    const [finalSearchedKey, setFinalSearchedKey] = useState("");
    useEffect(() => {
        setFinalSearchedKey(searchedKey);
    }, [searchResults]);

    return (
        <View style={styles.container}>
            <Text style={styles.SectionTitle}>Found {searchResults.length} results for ' {finalSearchedKey} '</Text>
            <ScrollView>
                {searchResults.map((item, index) => {
                    return (
                        <RestaurantCard 
                            key={index}
                            ID={item.ID}
                            name={item.Name}
                            address={item.Address}
                            category={item.Category}
                            avgPoint={item.AvgPoint}
                            commentCount={item.CommentCount}
                        />
                    );
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    SectionTitle: {
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 15,
        fontSize: 24,
        fontWeight: 'bold'
    },
    searchedItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    innerLeft: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 2
    },
    text: {
        fontSize: 20,
        paddingLeft: 10
    },
    close: {
        paddingLeft: 10,
    }
});