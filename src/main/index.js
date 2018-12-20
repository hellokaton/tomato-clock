'use strict'

import {
  app
} from 'electron'

import path from 'path'
import TrayBar from 'menubar'
import createMenu from './menu.js'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const menuURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const tray = TrayBar({
  index: menuURL,
  icon: process.env.NODE_ENV === 'development' ? path.join(__dirname, 'assets/clockTemplate.png') : path.join(__dirname, '../app/assets/clockTemplate.png'),
  width: 400,
  height: 300,
  showDockIcon: true
})
// let mainWindow

function createWindow () {
  console.log('启动 app.')

  tray.showWindow()
  createMenu()

  /**
   * Initial window options
   */
  // mainWindow = new BrowserWindow({
  //   height: 563,
  //   useContentSize: true,
  //   width: 1000,
  //   show: true
  // })

  // mainWindow.loadURL(menuURL)

  // mainWindow.on('closed', () => {
  //   mainWindow = null
  // })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('activate', () => {
//   // if (mainWindow === null) {
//   //   createWindow()
//   // }
// })
