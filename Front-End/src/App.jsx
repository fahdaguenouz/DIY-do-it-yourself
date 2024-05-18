

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import React from 'react';


import DynamicRouter from './Router/index.jsx';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider.jsx';

function App() {
  const router = DynamicRouter();
  if (!router) {
    return <div>Loading router configuration...</div>;
  }
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
