const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the Next.js app
  const appURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000" // Development server
      : `file://${path.join(__dirname, ".next", "server", "pages", "index.html")}`; // Production build

  mainWindow.loadURL(appURL);

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});