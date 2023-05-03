import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigation from './navigation/MainTabNavigation';
import AuthStackNavigation from './navigation/AuthStackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralActions, LocationActions } from './actions';
import * as Location from 'expo-location';
const Stack = createNativeStackNavigator();

function Main() {

  /* const [onboarded, setOnboarded] = useState(false); */
  const dispatch = useDispatch();
  const onboarded = useSelector(state => state.generalState.onboarded);
  const isLoggedIn = useSelector(state => state.generalState.isLoggedIn);


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
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let {coords} = await Location.getCurrentPositionAsync({accuracy: 5});
      dispatch(LocationActions.setDeviceLocation(coords));
    })();
  }, [isLoggedIn]);

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