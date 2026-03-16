const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    backgroundColor: '#0a0a0a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '../../public/icon.png')
  })

  const startUrl = process.env.ELECTRON_START_URL || 
    `file://${path.join(__dirname, '../../build/index.html')}`
  
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL || `http://localhost:3000`
  )

  mainWindow.on('closed', () => { mainWindow = null })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

// PDF file read karne ke liye
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return { success: true, content }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

// File dialog open karne ke liye
ipcMain.handle('open-file-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['txt', 'pdf'] }
    ]
  })
  return result
})

// Window controls
ipcMain.on('minimize-window', () => mainWindow.minimize())
ipcMain.on('maximize-window', () => {
  if (mainWindow.isMaximized()) mainWindow.unmaximize()
  else mainWindow.maximize()
})
ipcMain.on('close-window', () => mainWindow.close())