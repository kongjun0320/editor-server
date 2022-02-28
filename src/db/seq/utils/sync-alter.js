/**
 * @description 同步数据库，以修改数据表的方式，不会清空数据，比较安全
 * @author Aicherish
 */

const path = require('path')
const simpleGit = require('simple-git')
const seq = require('../seq')
const { isDev } = require('../../../utils/env')
// 获取所有 seq model
require('require-all')({
  dirname: path.resolve('src', 'models'),
  filter: /\.js$/,
  excludeDirs: /^.(git|svn)$/,
  recursive: true
})
// 同步数据表
async function syncDb() {
  let needToSyncDb = true
  // 只适用于开发环境
  if (isDev) {
    // 开发环境下，修改频繁，每次重启都同步数据表，消耗太大
    // 所以，开发环境下，判断是否修改了 src/models 中的内容
    // 如果是，则同步数据表，否则，不用同步数据表
    const git = simpleGit()
    // 获取 git status 修改的文件，modified 格式如 ['.gitignore', 'package.json', 'src/models/README.md']
    const {
      modified,
      not_added: nodeAdded,
      created,
      deleted,
      renamed
    } = await git.status()

    const fileChanged = modified
      .concat(nodeAdded)
      .concat(nodeAdded)
      .concat(created)
      .concat(deleted)
      .concat(renamed)
    if (fileChanged.length) {
      // 到此，说明 git status 有改动
      // 是否 改动了 db 相关的文件
      const changeDbFiles = fileChanged.some((f) => {
        // 改动了 src/models，需要同步数据库
        if (f.indexOf('src/modes/') === 0) return true
        // 改动了  src/db.seq，需要同步数据库
        if (f.indexOf('src/db/seq/') === 0) return true
        // 其他情况，不同步
        return false
      })
      if (!changeDbFiles) needToSyncDb = false
    }
    // 如果 git status 没改动。则照常同步数 据库，重要！！！
  }
  if (needToSyncDb) {
    await seq.sync({ alter: true })
  }
}

module.exports = syncDb
