import { Map, List } from "immutable";

import {
  SETTINGS_SET,
  UI_SET_VALUE,
  CLIENT_SET,
  ACCOUNT_SET,
  DEVICES_SET,
  DEVICE_SET,
  ITEM_SELECT,
} from "./actions";

const initialState = Map({
  client: undefined,
  account: undefined,
  devices: List([]),
  breadcrumbs: List([]),
  ui: Map({
    clientType: "default",
    username: "",
    password: "",
    loginFailed: false,
  })
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SETTINGS_SET: {
    let { username = "", password = "", clientType = "default" } = action.settings;
    return state.setIn(["ui", "username"], username)
      .setIn(["ui", "password"], password)
      .setIn(["ui", "clientType"], clientType);
  }
  case UI_SET_VALUE:
    return state.setIn(["ui", action.id], action.value);
  case CLIENT_SET:
    return state.set("client", action.client);
  case ACCOUNT_SET:
    return state.set("account", action.account);
  case DEVICES_SET:
    return state.set("devices", List(action.devices));
  case DEVICE_SET:
    return state.set("breadcrumbs", List([action.device]));
  case ITEM_SELECT:
    return state.set("breadcrumbs", state.get("breadcrumbs").push(action.item));
  default:
    return state;
  }
};

export default reducer;
