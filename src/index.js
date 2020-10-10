import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./scenes/App";
import "antd/dist/antd.css";
import "./index.css";
import configureStore from "./store/configureStore";

const store = configureStore();
require("dotenv").config();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
