import { Map, List } from "immutable";

import { UI_SET_VALUE, CLIENT_SET, ACCOUNT_SET, DEVICES_SET } from "./actions";

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
  case UI_SET_VALUE:
    return state.setIn(["ui", action.id], action.value);
  case CLIENT_SET:
    return state.set("client", action.client);
  case ACCOUNT_SET:
    return state.set("account", action.account);
  case DEVICES_SET:
    return state.set("devices", List(action.devices));
  default:
    return state;
  }
};

export default reducer;
