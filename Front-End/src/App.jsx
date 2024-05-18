

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider.jsx';
import store from './Redux/Store';
import { Provider } from 'react-redux';
import DynamicRouter from './Router';
function App() {
  
  return (
    <Provider store={store}>
      <DynamicRouter/>
    </Provider>
  );
}

export default App;
