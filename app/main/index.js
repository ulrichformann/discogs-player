const { format } = require('url')

const { BrowserWindow, app } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const { resolve } = require('app-root-path')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./app/renderer')

  const mainWindow = new BrowserWindow({
    resizable: false,
    width: 640,
    height: 360
  })

  const devPath = 'http://localhost:8000/start'

  const prodPath = format({
    pathname: resolve('renderer/out/start/index.html'),
    protocol: 'file:',
    slashes: true
  })

  const url = isDev ? devPath : prodPath
  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// API
/* 
ipcMain.on('search-msg', async (e, query) => {

  const { results } = await DB.search(query, {type: 'master', per_page: 10 })

  e.reply('search-reply', { results })
})

ipcMain.on('getMaster-msg', async (e, query) => {

  const selectedItem = await DB.getMaster(query)

  e.reply('getMaster-reply', { selectedItem })
}) */
