import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CommentItem(props) {

    const {

    } = props;

    return (
        <View style={styles.container}>
            <View style={styles.nameAndPoints}>
                <Text style={styles.nameText}>Ad soyad</Text>
                <View style={styles.star}>
                    <FontAwesome name="star" size={20} color={'#F53920'} />
                    <Text style={styles.pointText}>4</Text>
                </View>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>4 days ago</Text>
            </View>
            <View style={styles.commentContainer}>
                <Text style={styles.commentText}>Pizza baharatı gönderilmemişti ve pizzalar soğuk gelmişti. Hiç beğenmedim !!!</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        borderRadius: 10,
        borderColor: "#A3A3A3",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: "#fff"
    },
    nameAndPoints: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
    },
    star: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    pointText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold"
    },
    nameText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    timeText: {
        color: "#A3A3A3"
    },
    commentText: {
        color: "#A3A3A3"
    },
    timeContainer: {
        marginBottom: 4
    }
});
