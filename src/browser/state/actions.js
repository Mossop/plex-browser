import { PlexClient, PlexAccount } from "plex-client"; 

export const UI_SET_VALUE = "UI_SET_VALUE";
export const CLIENT_SET = "CLIENT_SET";
export const ACCOUNT_SET = "ACCOUNT_SET";

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

export async function login(client, username, password) {
  try {
    let account = await PlexAccount.login(client, username, password);
    return {
      type: ACCOUNT_SET,
      account,
    };
  } catch (e) {
    console.error(e);
    return setUIValue("loginFailed", true);
  }
}
