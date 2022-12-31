import { NavigationContainer } from '@react-navigation/native';
import Main from './Main';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
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

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;