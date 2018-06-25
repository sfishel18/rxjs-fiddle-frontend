import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "./redux/containers/AppContainer";
import createStore from "./redux/create-store";

const store = createStore();

ReactDom.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("app")
);
