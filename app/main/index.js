const { format } = require('url')

const { BrowserWindow, app } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const { resolve } = require('app-root-path')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    resizable: false,
    width: 640,
    height: isDev ? 1180 : 360,
  })

  const devPath = 'http://localhost:8000/start'

  const prodPath = format({
    pathname: resolve('renderer/out/start/index.html'),
    protocol: 'file:',
    slashes: true
  })

  const url = isDev ? devPath : prodPath
  mainWindow.loadURL(url)
  mainWindow.webContents.openDevTools()
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)