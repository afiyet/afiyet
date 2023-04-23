import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import CommentItem from '../components/comment/CommentItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { getRestaurantComments } from '../endpoints';

export default function CommentsPage() {

  const orderState = useSelector(state => state.orderState);
  const [comments, setComments] = useState([]);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    setWaiting(true);
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


  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {(!waiting) ?
        <ScrollView>
          {comments.map((comment) => {
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
        :
        <ActivityIndicator animating={waiting} size={"large"} color={"#d82227"} />
      }
    </View>
  )
}