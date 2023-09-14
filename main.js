const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 800,
    icon: path.join(__dirname, 'assets/img/logo.png'),
    resizable: false
  })

  window.loadFile('index.html')

  Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
  createWindow()
})
