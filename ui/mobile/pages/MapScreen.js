import React, { useState, useEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMarkers } from '../endpoints';
import Ionicons from "react-native-vector-icons/Ionicons"

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markerList, setMarkerList] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});


      /***
       * 
       * TODO: LOCATION ALMA İŞİNİ MAINE TAŞI, REDUX İLE BURAYA GÖNDER.
       * 
       * map initialRegion için lat ve long'un undefined gelmemesi gerek!!!
       * 
       * 
       */

      console.log({
        longitude: location.longitude,
        latitude: location.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setLocation({
        longitude: location.longitude,
        latitude: location.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setHasPermission(true);
    })();

    (() => {
      getMarkers()
        .then((res) => {
          let markers = [];
          res.data.forEach(element => {
            let elementLocation = JSON.parse(element.location);
            markers.push({
              name: element.name,
              coordinates: {
                latitude: parseFloat(elementLocation.latitude),
                longitude: parseFloat(elementLocation.altitude),
              }
            });
          });
          setMarkerList(markers);
        })
        .catch((err) => {
          console.log(err);
        })
    })();
  }, []);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markerList.length) {
        index = markerList.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinates } = markerList[index];
          _map.current.animateToRegion(
            {
              ...coordinates,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            350
          );
        }
      }, 10);
    });
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

  const _map = useRef(null);
  const _scrollView = useRef(null);

  return (
    <View style={styles.container}>
      {hasPermission ?
        <View style={styles.container}>
          <MapView
            ref={_map}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 39.88753599844434,
              longitude: 32.65432358225025,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={location}
            showsUserLocation={true}
            minZoomLevel={10}
            rotateEnabled={false}
            pitchEnabled={false}
          >
            {markerList.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={{ latitude: marker.coordinates.latitude, longitude: marker.coordinates.longitude }}
                onPress={(e) => onMarkerPress(e)}
              >
                <Ionicons name="location-sharp" color={"#FF0000"} size={48} />
              </Marker >
            );
          })}
          </MapView>
          <Animated.ScrollView
            ref={_scrollView}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 37}
            snapToAlignment="center"
            disableIntervalMomentum={ true } 
            style={styles.scrollView}
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET
            }}
            contentContainerStyle={{
              paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    }
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          >
            {markerList && markerList.map((marker, index) => (
              <View style={styles.card} key={index}>
              
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                
                <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={[styles.signIn, {
                      borderColor: '#FF6347',
                      borderWidth: 1
                    }]}
                  >
                    <Text style={[styles.textSign, {
                      color: '#FF6347'
                    }]}>Order Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            ))}
          </Animated.ScrollView>
        </View>


        : <Text>REQUEST PERMISSION</Text>}
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    maxWidth: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});
