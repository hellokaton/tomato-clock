'use strict'

import {
  app,
  Tray,
  BrowserWindow
} from 'electron'

import path from 'path'

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
let win = null

function readyMainProcess () {
  if (tray == null) {
    tray = new Tray(path.join(__static, '/icons/16x16.png'))
    tray.on('click', () => {
      win.isVisible() ? win.hide() : win.show()
    })
    const bounds = tray.getBounds()

    if (win == null) {
      win = new BrowserWindow({
        width: 400,
        height: 310,
        frame: false,
        x: bounds.x - 200,
        y: bounds.y + 20,
        center: false,
        show: process.env.NODE_ENV === 'development'
      })
      win.loadURL(menuURL)
    }
  }
}

app.dock.hide()

app.on('ready', readyMainProcess)

app.on('quit', () => {
  console.log('quit evetn')
  tray = null
  win = null
})
