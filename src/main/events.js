import {
  ipcMain,
  dialog
} from 'electron'

import fs from 'fs-extra'

export default () => {
  // show save file dialog
  ipcMain.on('show-file-dialog', (event, options) => {
    dialog.showSaveDialog(options, function (filename) {
      event.sender.send('show-file-dialog-ok', filename)
    })
  })

  // save file to disk
  ipcMain.on('save-file', (event, path, buffer) => {
    fs.outputFile(path, buffer, err => {
      if (err) {
        event.sender.send('save-file-error', err.message)
      } else {
        event.sender.send('save-file-ok', path)
      }
    })
  })
}
