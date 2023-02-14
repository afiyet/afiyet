import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import MainHeader from '../components/home/MainHeader';
import PromotionList from '../components/home/PromotionList';
import RestaurantsNearYou from '../components/home/RestaurantsNearYou';

export default function HomeScreen() {
    

  return (
    <View style={styles.container}>
      <MainHeader />
      <ScrollView>
        <PromotionList />
        <FeaturedRestaurants />
        <RestaurantsNearYou />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

