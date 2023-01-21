import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';
import * as Location from 'expo-location';


function MapScreen (){
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coord, setCoord] = useState(LatLng);

  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCoord({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
      
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  


  console.log(text)


return (<MapView
  provider={PROVIDER_GOOGLE}
  style={{flex: 1}}
  initialRegion={initialRegion}>
  {coord !== undefined && <Marker coordinate={coord} />}
</MapView>);
}

export default MapScreen
