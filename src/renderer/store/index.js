import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'

import {
  remote
} from 'electron'

const userDataPath = remote.app.getPath('userData')
const adapter = new FileSync(path.join(userDataPath, '/db.json'))
const db = Lowdb(adapter)

// init database
if (!db.has('setting').value()) {
  db.defaults({
    tomatos: [],
    setting: {
      'work_mins': 25,
      'sleep_mins': 5
    }
  }).write()
}

export default db
