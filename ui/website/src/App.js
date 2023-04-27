import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Store from './Store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

function App() {

  return (
    <Provider store={Store}>
      <SnackbarProvider>
        <Router>
          <Main />
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
