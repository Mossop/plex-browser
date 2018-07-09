import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { ipcRenderer } from "electron";

import store from "./state/store";
import { setSettings } from "./state/actions";
import App from "./ui/app";

ipcRenderer.on("settings", (event, settings) => {
  store.dispatch(setSettings(settings));
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);

addEventListener("unload", () => {
  let state = store.getState();
  let settings = {
    username: state.getIn(["ui", "username"]),
    password: state.getIn(["ui", "password"]),
    clientType: state.getIn(["ui", "clientType"]),
  };

  ipcRenderer.send("settings", settings);
});