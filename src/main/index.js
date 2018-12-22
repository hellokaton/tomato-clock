'use strict'

import {
  app,
  Tray,
  ipcMain,
  dialog,
  BrowserWindow
} from 'electron'

import path from 'path'
import fs from 'fs-extra'

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
  ipcMain.on('save-dialog', function (event) {
    const options = {
      title: '保存图片',
      filters: [{
        name: 'Images',
        extensions: ['png']
      }]
    }
    dialog.showSaveDialog(options, function (filename) {
      event.sender.send('saved-dialog-ok', filename)
    })
  })

  ipcMain.on('SAVE_FILE', (event, path, buffer) => {
    console.info('event::', event)
    console.info('path::', path)
    console.info('buffer::', buffer)
    fs.outputFile(path, buffer, err => {
      if (err) {
        console.log('save file error!!!!!!!', err.message)
        event.sender.send('ERROR', err.message)
      } else {
        console.log('save file ok!!!!!!!')
        event.sender.send('SAVED_FILE', path)
      }
    })
  })

  if (tray == null) {
    tray = new Tray(path.join(__static, '/icons/24x24.png'))
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
}

app.dock.hide()
app.on('ready', readyMainProcess)

app.on('quit', () => {
  console.info('app quit')
  mainWin = null
  tray = null
})
