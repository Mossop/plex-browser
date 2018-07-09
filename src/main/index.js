import path from "path";
import fs from "fs";

import { app, BrowserWindow, ipcMain } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

const binroot = path.dirname(path.resolve(__dirname));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow(settings) {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadFile(path.join(binroot, "browser", "index.html"));
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("settings", settings);
  });

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

function loadSettings() {
  try {
    let filename = path.join(app.getPath("userData"), "settings.json");
    return JSON.parse(fs.readFileSync(filename, { encoding: "utf8" }));
  } catch (e) {
    return {};
  }
}

function saveSettings(settings) {
  let filename = path.join(app.getPath("userData"), "settings.json");
  fs.writeFileSync(filename, JSON.stringify(settings), { encoding: "utf8" });
}

app.on("ready", async () => {
  await installExtension(REACT_DEVELOPER_TOOLS);
  let settings = loadSettings();
  createWindow(settings);

  ipcMain.on("settings", (event, settings) => {
    saveSettings(settings);
  });
});

// Quit when all windows are closed, except on OSX.
app.on("window-all-closed", function() {
  app.quit();
});
