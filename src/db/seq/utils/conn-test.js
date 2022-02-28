/**
 * @description 数据连接测试
 * @author Aicherish
 */

const seq = require('../seq')

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('ok')
  })
  .catch(() => {
    console.log('fail')
  })
  .finally(() => {
    process.exit()
  })
