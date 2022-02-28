const testMysqlConn = require('../db/mysql2')
const packageInfo = require('../../package.json')
const { ENV } = require('../utils/env')
const router = require('koa-router')()

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

// 数据库连接测试
router.get('/api/db-check', async (ctx) => {
  const result = await testMysqlConn()
  ctx.body = {
    errno: 0,
    data: {
      name: 'editor server',
      version: packageInfo.version,
      ENV,
      mysqlConn: result
    }
  }
})

module.exports = router
