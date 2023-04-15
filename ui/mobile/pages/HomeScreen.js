import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';
import Separator from '../components/home/Seperator';
import RestaurantMediumCard from '../components/home/RestaurantMediumCard';
import Campaign from '../components/home/Campaign';


const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : { ...styles.sortListItem, borderBottomColor: "#FFFFFF" };

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {

  const [restaurants, setRestaurants] = useState([
    {
      "ID": 5,
      "Name": "Burger King İvedik",
      "Address": "Karşıyaka, İvedik Cd. No: 402, 06190 Yenimahalle/Ankara",
      "Category": "Hamburger",
      "Latitude": 39.96961212553303,
      "Longitude": 32.792698771097925,
      "AvgPoint": 3.5,
      "CommentCount": 2
    },
    {
      "ID": 7,
      "Name": "Maydonoz Döner",
      "Address": "BAĞLICA MAH. BAĞLICA BLV. N0:55, 06000 Etimesgut/Ankara",
      "Category": "Döner",
      "Latitude": 39.89854002121635,
      "Longitude": 32.640891794317845,
      "AvgPoint": 2,
      "CommentCount": 1
    },
    {
      "ID": 8,
      "Name": "OT NOKTA",
      "Address": "Çayyolu, ÜMİT MAH, 2479 CAD NO:2/34, 06810 Çankaya/Ankara",
      "Category": "Cafe",
      "Latitude": 39.90068869031159,
      "Longitude": 32.692331561361804,
      "AvgPoint": 0,
      "CommentCount": 0
    },
    {
      "ID": 10,
      "Name": "Mado Yaşamkent",
      "Address": "Yaşamkent 3222. Caddesi No:27 D:H, 06810 Çankaya",
      "Category": "Cafe",
      "Latitude": 39.857496020055144,
      "Longitude": 32.64494972002105,
      "AvgPoint": 0,
      "CommentCount": 0
    },
    {
      "ID": 12,
      "Name": "",
      "Address": "",
      "Category": "",
      "Latitude": 0,
      "Longitude": 0,
      "AvgPoint": 0,
      "CommentCount": 0
    },
    {
      "ID": 15,
      "Name": "",
      "Address": "",
      "Category": "",
      "Latitude": 0,
      "Longitude": 0,
      "AvgPoint": 0,
      "CommentCount": 0
    },
    {
      "ID": 16,
      "Name": "",
      "Address": "",
      "Category": "",
      "Latitude": 0,
      "Longitude": 0,
      "AvgPoint": 0,
      "CommentCount": 0
    },
    {
      "ID": 17,
      "Name": "",
      "Address": "",
      "Category": "",
      "Latitude": 0,
      "Longitude": 0,
      "AvgPoint": 0,
      "CommentCount": 0
    },
    {
      "ID": 18,
      "Name": "",
      "Address": "",
      "Category": "",
      "Latitude": 0,
      "Longitude": 0,
      "AvgPoint": 0,
      "CommentCount": 0
    },
    {
      "ID": 20,
      "Name": "",
      "Address": "",
      "Category": "",
      "Latitude": 0,
      "Longitude": 0,
      "AvgPoint": 0,
      "CommentCount": 0
    }
  ]);
  const [activeSortItem, setActiveSortItem] = useState('recent');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        hidden={true}
      />
      <View style={styles.backgroundCurvedContainer} >
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/transparentLogo.png")}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => { navigation.navigate("Search"); }}
          >
            <View style={styles.searchSection}>
              <Feather
                name="search"
                color="black"
                size={25}
              />
              <Text style={styles.searchText}>Search..</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.horizontalListContainer}>
          <FlatList
            data={restaurants}
            keyExtractor={item => item.ID}
            horizontal
            ListHeaderComponent={() => <Separator width={20} />}
            ListFooterComponent={() => <Separator width={20} />}
            ItemSeparatorComponent={() => <Separator width={10} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Campaign
                key={item.ID}
                {...item}

              />
            )}
          />
        </View>
        <View style={styles.sortListContainer}>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'recent')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('recent')}>
            <Text style={styles.sortListItemText}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'featured')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('featured')}>
            <Text style={styles.sortListItemText}>Featured</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'near')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('near')}>
            <Text style={styles.sortListItemText}>Near</Text>
          </TouchableOpacity>
        </View>
        {restaurants.map(item => (
          <RestaurantMediumCard
            ID={item.ID}
            name={item.Name}
            address={item.Address}
            category={item.Category}
            avgPoint={item.AvgPoint}
            commentCount={item.CommentCount}
            key={item.ID} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  backgroundCurvedContainer: {
    backgroundColor: '#d32f2f',
    height: 120,
    width: width,
    elevation: 6,
  },
  headerContainer: {
    justifyContent: 'space-evenly',
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchText: {
    color: '#C2C2CB',
    fontSize: 16,
    lineHeight: 16 * 1.4,
    marginLeft: 10,
  },
  listContainer: {
    paddingVertical: 5,
    zIndex: -5,
  },
  horizontalListContainer: {
    marginTop: 5,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  sortListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#F53920',
    height: 40,
  },
  sortListItemText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  logo: {
    width: 50,
    height: 50
  },
});

export default HomeScreen;