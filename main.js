const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const iconPath = path.join(__dirname, 'public/logo64.png');

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setIcon(iconPath);

  win.removeMenu();

  // load the index.html of the app.
  // TODO: Move to ENV file and setup local and firebase URLs
  win.loadURL('https://erp-rpg.web.app/');
}

app.whenReady().then(createWindow);
