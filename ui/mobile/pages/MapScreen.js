import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';
import * as Location from 'expo-location';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markerList, setMarkerList] = useState([]);
    const [data, setData] = useState([]);
    
    
    
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
                enableHighAccuracy: true,
                timeInterval: 5
          });
          setLocation({
            latitude: location.coords.latitude, 
            longitude: location.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          });

          

        })();
        getRestourantLocations();
    }, []);

  
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }

      const getRestourantLocations = async () => {
        try {
            const response = await fetch('http://192.168.1.23:8080/locations');
            const json = await response.json();
            setData(json)
          } catch (error) {
            console.error(error);
          }

          let markerArr = [] 
          data.forEach(x => {
            let temp = JSON.parse(x.location)
            let obj = {name: x.name, latitude: parseFloat(temp.latitude), longitude:parseFloat( temp.altitude)}
            markerArr.push(obj);
          })
          setMarkerList(markerArr)
      }

      const goRegion = (region) => {           
          setLocation({
            latitude: region.latitude, 
            longitude: region.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
          })
      }



  return (<MapView
    style={{flex: 1}}
  initialRegion={{
    latitude:39.88753599844434,
    longitude:32.65432358225025,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  }}
  region={location}
  >
  {markerList && markerList.map((x, index) => (
          <Marker
            key={index}
            coordinate={{ latitude : x.latitude , longitude : x.longitude }}
            title={JSON.stringify(x.name)}
        >
          <MaterialCommunityIcons name="chef-hat" color={"#FF0000"} size={26} />
        </Marker >
        ))}
  </MapView>);
  }
  
  export default MapScreen