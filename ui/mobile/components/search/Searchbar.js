import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';

export default function Searchbar(props) {

    const navigation = useNavigation();

    const {
        search,
        setSearch,
        onSearchSubmit,
        waiting,
        clearSearch
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
                    returnKeyType={"search"}
                    onSubmitEditing={() => { onSearchSubmit() }}
                />
                <View style={styles.spinner}>
                    {(waiting) ?
                        <ActivityIndicator animating={waiting} size={"large"} color={"#d82227"} />
                        :
                        <TouchableOpacity
                            style={styles.clearInput}
                            onPress={clearSearch}
                        >
                            <SimpleLineIcons
                                name="close"
                                color="black"
                                size={20}
                            />
                        </TouchableOpacity>
                    }

                </View>
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
        paddingRight: 60,
        borderRadius: 16,
        height: 45,
        flex: 1,
        fontSize: 18,

    },
    arrow: {
        marginRight: 5,
        paddingHorizontal: 5,
        paddingVertical: 6,
        //backgroundColor: "red"
    },
    spinner: {
        position: 'absolute',
        top: 5,
        right: 15,
        zIndex: 1,
    },
    clearInput: {
        position: 'absolute',
        top: -3,
        right: -2,
        zIndex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});