import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CommentItem from '../components/comment/CommentItem'

export default function CommentsPage() {
  return (
    <ScrollView>
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </ScrollView>
  )
}