const {app, BrowserWindow} = require('electron');

const createMainWindow = () => {
    const mainWindowOptions = { width: 800, height: 600 };
    const mainWindow = new BrowserWindow(mainWindowOptions);

    mainWindow.openDevTools();
    mainWindow.loadURL(`file://${__dirname}/index.html`);
};

app.on('ready', createMainWindow);
