import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import CommentItem from '../components/comment/CommentItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { getRestaurantComments } from '../endpoints';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CommentsPage() {

  const orderState = useSelector(state => state.orderState);
  const [comments, setComments] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [filterPoint, setFilterPoint] = useState(["5", "4", "3", "2", "1"]);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    setWaiting(false);
    getRestaurantComments(orderState.restaurantId)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
        setTimeout(() => { setWaiting(false); }, 1000);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


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


  return (
    <View style={{ flex: 1 }}>
      {(!waiting) ?
        <View>
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
          <ScrollView>
            {comments
              .filter((comment) => {
                if (selectedFilter === "") {
                  return true;
                }
                return comment.point.toString() === selectedFilter
              })
              .map((comment) => {
                return (
                  <CommentItem
                    key={comment.ID}
                    commentText={comment.comment}
                    commentPoint={comment.point}
                    time={comment.createdAt}
                    userFullName={comment.user.name + " " + comment.user.surname}
                  />
                );
              })}
          </ScrollView>
        </View>
        :
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} animating={waiting} size={"large"} color={"#d82227"} />
      }
    </View>
  )
}

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
  }
});