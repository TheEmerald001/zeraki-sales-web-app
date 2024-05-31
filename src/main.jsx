import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import theme from "./styles/theme.js";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import './index.css'

import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    <Provider store={store}>
      {" "}
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
