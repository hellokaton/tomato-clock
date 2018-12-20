import {
  app,
  Menu
} from 'electron'

// reference by https://electronjs.org/docs/api/menu#examples
export default async () => {
  const template = [{
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click () {
        require('electron').shell.openExternal('https://github.com/hyunmoahn/tiny-timer')
      }
    }]
  }]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [{
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
