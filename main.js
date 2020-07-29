const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.removeMenu();

  // load the index.html of the app.
  // TODO: Move to ENV file and setup local and firebase URLs
  win.loadURL('https://erp-rpg.web.app/');
}

app.whenReady().then(createWindow);
