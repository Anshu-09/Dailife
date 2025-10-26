const { app, BrowserWindow } = require("electron");
const path = require("path");

let Store;

async function createWindow() {
  // dynamically import electron-store
  const module = await import("electron-store");
  Store = module.default;
  const store = new Store();

  const savedBounds = store.get("windowBounds") || { width: 400, height: 500, x: 100, y: 100 };

  const mainWindow = new BrowserWindow({
    width: savedBounds.width,
    height: savedBounds.height,
    x: savedBounds.x,
    y: savedBounds.y,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));

  mainWindow.on("move", () => {
    const position = mainWindow.getBounds();
    store.set("windowBounds", position);
  });

  mainWindow.on("resize", () => {
    const position = mainWindow.getBounds();
    store.set("windowBounds", position);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
