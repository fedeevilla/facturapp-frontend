import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./scenes/App";
import "antd/dist/antd.css";
import "./index.css";
import configureStore from "./store/configureStore";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "./styles/theme";

const store = configureStore();

require("dotenv").config();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
