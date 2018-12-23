'use strict'

import {
  app,
  Tray,
  Menu,
  BrowserWindow,
  systemPreferences
} from 'electron'

import path from 'path'
import ipcEvent from './events'

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

let tray = null
let mainWin = null

function readyMainProcess () {
  ipcEvent()
  if (tray == null) {
    tray = new Tray(path.join(__static, '/images/icon_normal/icon.png'))
    tray.on('click', () => {
      mainWin.isVisible() ? mainWin.hide() : mainWin.show()
    })

    const bounds = tray.getBounds()
    mainWin = new BrowserWindow({
      width: 400,
      height: 300,
      frame: false,
      x: bounds.x - 200,
      y: bounds.y + 20,
      show: process.env.NODE_ENV === 'development'
    })
    mainWin.loadURL(menuURL)
  }

  const setOSTheme = () => {
    if (systemPreferences.isDarkMode()) {
      tray.setImage(path.join(__static, '/images/icon_dark/icon.png'))
    } else {
      tray.setImage(path.join(__static, '/images/icon_normal/icon.png'))
    }
  }
  systemPreferences.subscribeNotification(
    'AppleInterfaceThemeChangedNotification',
    () => {
      if (systemPreferences.isDarkMode()) {
        tray.setImage(path.join(__static, '/images/icon_dark/icon.png'))
      } else {
        tray.setImage(path.join(__static, '/images/icon_normal/icon.png'))
      }
    }
  )
  setOSTheme()

  // empty menu
  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu)
}

app.dock.hide()
app.on('ready', readyMainProcess)

app.on('quit', () => {
  mainWin = null
  tray = null
})
