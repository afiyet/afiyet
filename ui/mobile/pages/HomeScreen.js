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
import { getRestaurants } from '../endpoints/order/orderEndpoints';
import { useSelector } from 'react-redux';
import getDistanceFromLatLonInKm from '../components/home/DistanceCalculations';
import { useTranslation } from 'react-i18next';

const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : { ...styles.sortListItem, borderBottomColor: "#FFFFFF" };

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {

  const userLocation = useSelector(state => state.locationState);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    getRestaurants()
      .then((res) => {
        //console.log(res);
        let tempRestaurantList = [];
        res.data.map((item, index) => {
          tempRestaurantList.push({
            ID: item.ID,
            Name: item.Name,
            Address: item.Address,
            Category: item.Category,
            Latitude: item.Latitude,
            Longitude: item.Longitude,
            AvgPoint: item.AvgPoint,
            CommentCount: item.CommentCount
          });
        });
        setRestaurants(tempRestaurantList);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const [restaurants, setRestaurants] = useState([]);
  const [activeSortItem, setActiveSortItem] = useState('featured');
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
              <Text style={styles.searchText}>{t("HOME_SCREEN.SEARCH")}</Text>
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
            renderItem={({ item, index }) => (
              <Campaign
                key={item.ID}
                index={index}
                {...item}

              />
            )}
          />
        </View>
        <View style={styles.sortListContainer}>
          {/* <TouchableOpacity
            style={sortStyle(activeSortItem === 'recent')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('recent')}>
            <Text style={styles.sortListItemText}>Recent</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'featured')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('featured')}>
            <Text style={styles.sortListItemText}>{t("HOME_SCREEN.FEATURED")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'near')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('near')}>
            <Text style={styles.sortListItemText}>{t("HOME_SCREEN.NEAR")}</Text>
          </TouchableOpacity>
        </View>
        {restaurants.map(item => {

          if (activeSortItem === "near") {
            let distance = getDistanceFromLatLonInKm(Number(userLocation.latitude), Number(userLocation.longitude), Number(item.Latitude), Number(item.Longitude));
            if (distance < 4) {
              return (
                <RestaurantMediumCard
                  ID={item.ID}
                  name={item.Name}
                  address={item.Address}
                  category={item.Category}
                  avgPoint={item.AvgPoint}
                  commentCount={item.CommentCount}
                  key={item.ID}
                />
              );
            }
          } else {
            return (
              <RestaurantMediumCard
                ID={item.ID}
                name={item.Name}
                address={item.Address}
                category={item.Category}
                avgPoint={item.AvgPoint}
                commentCount={item.CommentCount}
                key={item.ID}
              />
            );
          }
        })}
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