import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { addCommentToRestaurant } from '../../endpoints';

export default function AddComment() {

    const FilterItem = ({ point }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    if (selectedFilter === point.item) {
                        setSelectedFilter("");
                    } else {
                        setSelectedFilter(point.item);
                    }
                }}>
                <View style={(selectedFilter === point.item) ? styles.filterItemContainerSelected : styles.filterItemContainerNotSelected}>
                    <FontAwesome name="star" size={20} color={'#d82227'} />
                    <Text style={styles.pointText}>{point.item}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const userId = useSelector(state => state.userState.userId);
    const restaurantId = useSelector(state => state.orderState.restaurantId);
    const [comment, setComment] = useState("");
    const [filterPoint, setFilterPoint] = useState(["5", "4", "3", "2", "1"]);
    const [selectedFilter, setSelectedFilter] = useState("");

    function handleSendComment() {
        if (selectedFilter !== "" && comment.length > 0) {
            let payload = {
                restaurantId: ""+restaurantId,
                userId: ""+userId,
                comment: comment,
                point: Number(selectedFilter)
            };

            addCommentToRestaurant(restaurantId, userId, payload)
                .then((res) => {
                    //snackbar success
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    //snackbar err
                })
        } else {
            //snackbar
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Deneyiminizi paylaşın!</Text>
            </View>

            <View style={{ height: 60 }}>
                <FlatList
                    contentContainerStyle={styles.flatListContainer}
                    horizontal
                    data={filterPoint}
                    renderItem={(point) => {
                        return (
                            <FilterItem point={point} />
                        );
                    }}
                />
            </View>
            <View style={{ marginTop: 30 }}>
                <TextInput
                    editable
                    multiline
                    textAlignVertical='top'
                    placeholder={"Yorumunuz..."}
                    numberOfLines={4}
                    maxLength={200}
                    onChangeText={text => setComment(text)}
                    value={comment}
                    style={styles.textInput}
                />
            </View>

            <TouchableOpacity
                style={styles.commentBtnContainer}
                onPress={() => { handleSendComment(); }}
            >
                <LinearGradient
                    colors={['#FF0000', '#d82227']}
                    style={styles.addCommentButton}
                >
                    <Text style={[styles.textAddComment, {
                        color: '#fff'
                    }]}>Gönder</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    flatListContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    filterItemContainerNotSelected: {
        margin: 5,
        backgroundColor: '#e39695',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    filterItemContainerSelected: {
        margin: 5,
        backgroundColor: '#a71e34',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    pointText: {
        marginLeft: 5,
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    },
    addCommentButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textAddComment: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    commentBtnContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: "absolute",
        bottom: 8
    },
    contentContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    filterAndScrollView: {
        marginBottom: 120
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 25
    },
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10
    },
    textInput: {
        borderRadius: 10,
        borderColor: "#A3A3A3",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: "#fff"
    }
});
