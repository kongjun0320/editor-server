/**
 * @description mysql2 连接测试
 * @author Aicherish
 */

const mysql = require('mysql2/promise')
const { mysqlConf } = require('../config/index')

async function testMysqlConn() {
  try {
    const connection = await mysql.createConnection(mysqlConf)
    const result = await connection.query('SELECT * FROM aic_lego.users')
    return result
  } catch (error) {
    console.log(error)
  }
}
// 测试连接
// ;(async () => {
//   const result = await testMysqlConn()
//   console.log(result)
// })()

module.exports = testMysqlConn
