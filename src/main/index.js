import path from "path";

import { app, BrowserWindow } from "electron";

const binroot = path.dirname(path.resolve(__dirname));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadFile(path.join(binroot, "renderer", "index.html"));

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed, except on OSX.
app.on("window-all-closed", function() {
  app.quit();
});
