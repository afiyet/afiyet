import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import OrderCounter from '../cart/OrderCounter';
import BottomSheetOrderCounter from './BottomSheetOrderCounter';
import { useDispatch, useSelector } from 'react-redux';
import { OrderActions } from '../../actions';
import { useEffect } from 'react';

/*
  ID: item.ID,
  ingredients: item.ingredients,
  picture: item.picture,
  price: item.price,
  name: item.name,
  restaurantId: item.restaurantId
*/

function OrderFood(props) {

  const {
    selectedMenuItem
  } = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View
      style={styles.container}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
          resizeMode: "contain"
        }}
        style={styles.posterStyle}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.nameAndRating}>
          <Text style={styles.titleText}>{selectedMenuItem.name}</Text>
          <View style={styles.pcont}>
            <Text style={styles.text} ellipsizeMode='tail'>{selectedMenuItem.price} TL</Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.ingredientsText}>{selectedMenuItem.ingredients}dkjhaskdjhaskdjaskjhjjdhaskjdhasjkdhasjkdhasjkdhajkdhajksdhakjdhkjasdhjaskdkjashdkjasdjk</Text>
        </View>

        <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 15,
        }}>
          <BottomSheetOrderCounter />
          <Button onPress={() => {
            //console.log(selectedMenuItem);
            dispatch(OrderActions.addToCart({
              ID: selectedMenuItem.ID,
              ingredients: selectedMenuItem.ingredients,
              picture: selectedMenuItem.picture,
              price: selectedMenuItem.price,
              name: selectedMenuItem.name,
              restaurantId: selectedMenuItem.restaurantId,
              category: selectedMenuItem.category
            }));
          }}
            style={{ flex: 1 }} title="Add to Cart"></Button>
        </View>


      </View>

    </View>
  );
};

const Colors = {
  DEFAULT_BLACK: '#0E122B',
  DEFAULT_GREEN: '#0A8791',
  DEFAULT_YELLOW: '#FBA83C',
  DEFAULT_GREY: '#C2C2CB',
  DEFAULT_WHITE: '#FFFFFF',
  DEFAULT_RED: '#F53920',
  SECONDARY_RED: '#FF6F59',
  SECONDARY_WHITE: '#F8F8F8',
  SECONDARY_GREEN: '#24C869',
  SECONDARY_BLACK: '#191d35',
  LIGHT_GREEN: '#CEE8E7',
  LIGHT_GREY: '#F8F7F7',
  LIGHT_GREY2: '#EAEAEA',
  LIGHT_YELLOW: '#FCE6CD',
  LIGHT_RED: '#FFC8BF',
  FABEBOOK_BLUE: '#4A61A8',
  GOOGLE_BLUE: '#53A0F4',
  INACTIVE_GREY: '#A3A3A3',
  DARK_ONE: '#121212',
  DARK_TWO: '#181818',
  DARK_THREE: '#404040',
  DARK_FOUR: '#282828',
  DARK_FIVE: '#B3B3B3',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    width: "100%",
  },
  posterStyle: {
    width: "97%",
    height: "35%",
    borderRadius: 10,
    margin: 5,
  },
  titleText: {
    fontSize: 19,
    fontWeight: 'bold',
    maxWidth: "80%"
  },
  ingredientsText: {
    fontSize: 12,
    color: '#C2C2CB',
  },
  priceTag: {
    fontSize: 20,
    color: '#000',
    paddingRight: 5
  },
  footerContainer: {
    marginTop: 6,
    marginLeft: 9,
    marginRight: 9,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    paddingRight: 2,
  },
  reviewsText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 2,
    color: '#C2C2CB',
  },
  nameAndRating: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 5,
    paddingLeft: 10,
    alignItems: "center",
  },
  pcont: {
    elevation: 3,
    backgroundColor: "#d82227",
    borderRadius: 10,
    padding: 6,
    marginRight: 3,
    marginTop: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default OrderFood;