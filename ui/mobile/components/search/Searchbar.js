import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function Searchbar(props) {

    const navigation = useNavigation();

    const {
        search,
        setSearch
    } = props;

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <TouchableOpacity
                    style={styles.arrow}
                    onPress={() => { navigation.goBack(); }}
                >
                    <Feather
                        name="arrow-left"
                        color="black"
                        size={26}
                    />
                </TouchableOpacity>
                <View style={styles.search} pointerEvents="none">
                    <Feather
                        name="search"
                        color="black"
                        size={20}
                    />
                </View>
                <TextInput
                    style={styles.field}
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingRight: 15,
        backgroundColor: "#ffffff",
        elevation: 6
    },
    inner: {
        flexDirection: 'row',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    search: {
        position: 'absolute',
        top: 13,
        left: 60,
        zIndex: 1,

    },
    field: {
        backgroundColor: "#e9ecef",
        paddingLeft: 48,
        borderRadius: 16,
        height: 45,
        flex: 1,
        fontSize: 18,
    },
    arrow: {
        marginRight: 5,
        paddingHorizontal: 5,
        //backgroundColor: "red"
    }
});