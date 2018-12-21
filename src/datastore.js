import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'

import {
  app
} from 'electron'

// 获取 electron 应用的用户目录
const STORE_PATH = app.getPath('userData')

// 初始化 lowdb 读写的 json 文件名以及存储路径
const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

// lowdb 接管该文件
export default Lowdb(adapter)
