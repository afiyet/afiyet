import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {

  const [onboarded, setOnboarded] = useState(false);

  const getOnboarded = async () => {
    const res = await AsyncStorage.getItem("ONBOARDED");
    setOnboarded(JSON.parse(res));
  };

  useEffect(() => {
    //getOnboarded();  STORAGE AYARLANDIĞINDA BURAYI AÇ
  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#3498db",
      secondary: "#f1c40f",
      secondaryContainer: "white",
    },
  };

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 3000);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Main onboarded={onboarded} />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;