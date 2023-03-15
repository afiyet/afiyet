import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import * as SplashScreen from "expo-splash-screen"
import Store from './Store';
import { Provider } from 'react-redux';

function App() {

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
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;