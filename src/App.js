import React from "react";

import {BrowserRouter, Route} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Home from './components/Home/Home';
import Todo from './components/Todo/Todo';


import "./App.css";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/todo" exact component={Todo} />
    </BrowserRouter></Provider>
  );
}

export default App;
