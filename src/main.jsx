import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import {  RouterProvider } from "react-router-dom";
import { router } from "../src/Routes";
import firebaseConfig from './firebase.config';
import { store } from "./store";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);

