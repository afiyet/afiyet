import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMarkers } from '../endpoints';
import Ionicons from "react-native-vector-icons/Ionicons"


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

  /*const goRegion = (region) => {
    setLocation({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03
    })
  }*/

  return (
    <View style={styles.container}>
      {hasPermission ?
      <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude:39.88753599844434,
        longitude:32.65432358225025,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={location}
      showsUserLocation={true}
      minZoomLevel={10}
      rotateEnabled={false}
      pitchEnabled={false}
    >
      {markerList && markerList.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: marker.coordinates.latitude, longitude: marker.coordinates.longitude }}
          title={JSON.stringify(marker.name)}
        >
          <Ionicons name="location-sharp" color={"#FF0000"} size={48} />
        </Marker >
      ))}
    </MapView>
     : <Text>REQUEST PERMISSION</Text>}
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});