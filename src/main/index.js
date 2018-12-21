'use strict'

import {
  app
} from 'electron'

import path from 'path'
import TrayBar from 'menubar'

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
  // icon: process.env.NODE_ENV === 'development' ? path.join(__static, 'avatar.jpeg') : path.join(__dirname, '../app/assets/clockTemplate.png'),
  icon: path.join(__static, '/icons/16x16.png'),
  width: 400,
  height: 300,
  showDockIcon: false
})

function createWindow () {
  console.log('启动 app.')
  tray.showWindow()
}

// app.dock.hide()
app.on('ready', createWindow)
