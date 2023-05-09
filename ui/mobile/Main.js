import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigation from './navigation/MainTabNavigation';
import AuthStackNavigation from './navigation/AuthStackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralActions, LocationActions } from './actions';
import * as Location from 'expo-location';
import { useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import useInterval from './customHooks/UseInterval';

const Stack = createNativeStackNavigator();

function Main() {

  /* const [onboarded, setOnboarded] = useState(false); */
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.generalState.onboarded);
  const isLoggedIn = useSelector(state => state.generalState.isLoggedIn);
  const { t, i18n } = useTranslation();

  /* const getOnboarded = async () => {
    try {
      return await AsyncStorage.getItem('ONBOARDED');
    } catch(e) {
      console.log("getOnboarded ERROR");
    }

  };

  setAsyncOnboarded = async (value) => {
    try {
      await AsyncStorage.setItem('ONBOARDED', JSON.stringify(value));
    } catch (e) {
      console.log("setAsyncOnboarded ERROR! value: " + value);
    }

    console.log('Done.:' + value);
  }
 */


  /* useEffect(() => {

    const asyncOnboarded = getOnboarded();
    console.log("asynchonboarded:");
    console.log(asyncOnboarded);

    if (asyncOnboarded === "true") {
      setAsyncOnboarded(true);
      dispatch(GeneralActions.setOnboarded(true));
    }
    setAsyncOnboarded(false);

  }, []); */

  useEffect(() => {
    //i18n.changeLanguage(Localization.getLocales()[0].languageCode);
  },[]);

  useEffect(() => {
    getDeviceLocations();
  }, [isLoggedIn]);

  async function getDeviceLocations () {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    /* let {coords} = await Location.getCurrentPositionAsync({accuracy: 5});
    console.log(coords); */

    Location.watchPositionAsync({
      accuracy: Location.Accuracy.High,
      distanceInterval: 999,
    }, (data) => {
      console.log(data.coords);
      dispatch(LocationActions.setDeviceLocation(data.coords));
    });
  }


  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {(!isLoggedIn) ?
          <Stack.Group>
            <Stack.Screen
              name='Auth'
            >
              {() => { return <AuthStackNavigation onboarded={onboarded} /> }}
            </Stack.Screen>
          </Stack.Group>
          :
          <Stack.Group>
            <Stack.Screen
              name='MainTabNavigation'
              component={MainTabNavigation}
            />
          </Stack.Group>
        }
      </Stack.Navigator>
    </>
  );
}

export default Main;