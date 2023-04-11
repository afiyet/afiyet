import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Store from './Store';
import { Provider } from 'react-redux';

function App() {

  return (
    <Provider store={Store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  );
}

export default App;
