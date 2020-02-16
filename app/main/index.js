const { format } = require('url')
const path = require('path')

const { BrowserWindow, app, ipcMain, IpcMainEvent } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const FileType = require('file-type')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    resizable: false,
    width: 640,
    height: isDev ? 1180 : 360,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(url)
  mainWindow.webContents.openDevTools()
})

app.on('window-all-closed', app.quit)

ipcMain.on('files', async (event, message) => {
  const files = await Promise.all(
    message.map(async e => ({
      path: e,
      name: path.parse(e).base,
      ...await FileType.fromFile(e)
    })
  ))

  const acceptedFileTypes = ['audio/mpeg', 'audio/x-flac', 'audio/vnd.wave', 'audio/aiff', 'audio/ogg']
  const acceptedFiles = files.filter(e => acceptedFileTypes.indexOf(e.mime) !== -1)

  console.log(acceptedFiles)
})
