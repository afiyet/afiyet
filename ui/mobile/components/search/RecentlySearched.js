import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { SearchActions } from '../../actions';

export default function RecentlySearched(props) {

    const {
        recentlySearched,
        setSearch
    } = props;

    const dispatch = useDispatch();

    const removeItem = (index) => {
        dispatch(SearchActions.removeFromRecentlySearched(index));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.SectionTitle}>Recent searches</Text>
            {recentlySearched.map((item, index) => {
                return (
                    <View style={styles.searchedItem} key={index}>
                        <TouchableOpacity
                            style={styles.innerLeft}
                            onPress={() => { setSearch(item) }}
                        >
                            <MaterialCommunityIcons
                                name="history"
                                size={25}
                                color={"#6c757d"}
                            />
                            <Text style={styles.text}>{item}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.close}
                            onPress={() => {removeItem(index)}}
                        >
                            <MaterialCommunityIcons
                                name="close"
                                size={25}
                                color={"#6c757d"}
                            />
                        </TouchableOpacity>
                    </View>
                );
            })}

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