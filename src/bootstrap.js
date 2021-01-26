import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import reducers from "./reducers";
import './style/fonts/NanumMyeongjo-Regular.ttf';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// import "./App.css";
// for each component make a css file in Style folder and import at each component with ./style/etc

function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);
