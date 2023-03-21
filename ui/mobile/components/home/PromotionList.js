import React from 'react';
import { FlatList, Text, View, StyleSheet, StatusBar, Image } from 'react-native';

export default function PromotionList() {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    },
  ];

  const PromotionItem = ({ title }) => (
    <View style={styles.item}>
      <Image
        style={styles.promotionImage}
        resizeMode="cover"
        source={{ uri: title }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.SectionTitle}>Promotions 🎉</Text>
      <FlatList
        horizontal
        data={DATA}
        renderItem={({ item }) => <PromotionItem title={item.title} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    flex: 1,
    marginTop: 18,
    backgroundColor: "white",
    paddingBottom: 15
  },
  item: {
    borderRadius: 20,
    marginVertical: 8,
    paddingLeft: 20
  },
  promotionImage: {
    width: 250,
    borderRadius: 20,
    height: 140,
  },
  SectionTitle: {
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 15,
    fontSize: 28,
    fontWeight: 'bold'
  }
});
