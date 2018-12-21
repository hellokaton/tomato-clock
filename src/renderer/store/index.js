import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'

import {
  remote
} from 'electron'

// 获取 electron 应用的用户目录
const STORE_PATH = remote.app.getPath('userData')

console.log('STORE_PATH = ', STORE_PATH)

// 初始化 lowdb 读写的 json 文件名以及存储路径
const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

// lowdb 接管该文件
const db = Lowdb(adapter)

if (!db.has('setting').value()) {
  db.defaults({
    tomatos: [],
    setting: {
      'work_mins': 25,
      'break_mins': 5
    }
  }).write()
}

export default db
