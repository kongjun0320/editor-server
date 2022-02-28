const testMysqlConn = require('../db/mysql2')
const packageInfo = require('../../package.json')
const { ENV } = require('../utils/env')
const { WorkModel } = require('../models/WorkModel')
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
  let mongodbConn
  let result
  try {
    mongodbConn = true
    result = await WorkModel.findOne()
  } catch (error) {
    mongodbConn = false
  }
  ctx.body = {
    errno: 0,
    data: {
      name: 'server',
      version: packageInfo.version,
      ENV,
      result
    }
  }
})

module.exports = router
