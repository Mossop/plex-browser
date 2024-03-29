import { PlexClient } from "plex-client"; 

export const SETTINGS_SET = "SETTINGS_SET";
export const UI_SET_VALUE = "UI_SET_VALUE";
export const CLIENT_SET = "CLIENT_SET";
export const ACCOUNT_SET = "ACCOUNT_SET";
export const DEVICES_SET = "DEVICES_SET";
export const DEVICE_SET = "DEVICE_SET";
export const ITEM_SELECT = "ITEM_SELECT";
export const CRUMB_SELECT = "CRUMB_SELECT";

export function setSettings(settings) {
  return {
    type: SETTINGS_SET,
    settings,
  };
}

export function setUIValue(id, value) {
  return {
    type: UI_SET_VALUE,
    id,
    value,
  };
}

export function createClient(type) {
  let client;
  switch (type) {
  case "android":
    client = PlexClient.Android();
    break;
  case "web":
    client = PlexClient.WebBrowser();
    break;
  default:
    client = new PlexClient();
  }

  return {
    type: CLIENT_SET,
    client,
  };
}

export async function setAccount(account) {
  return {
    type: ACCOUNT_SET,
    account,
  };
}

export async function setDevices(devices) {
  return {
    type: DEVICES_SET,
    devices,
  };
}

export async function setDevice(device) {
  return {
    type: DEVICE_SET,
    device,
  };
}

export async function selectItem(item) {
  return {
    type: ITEM_SELECT,
    item,
  };
}

export async function selectCrumb(index) {
  return {
    type: CRUMB_SELECT,
    index,
  };
}