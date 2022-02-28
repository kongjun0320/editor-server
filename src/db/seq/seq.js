/**
 * @description 配置 sequelize，连接 mysql
 * @author Aicherish
 */

const Sequelize = require('sequelize')
const { mysqlConf } = require('../../config/index')
const { isPrd, isTest } = require('../../utils/env')

//  连接配置
const { database, user, password, host, port } = mysqlConf
const conf = {
  host,
  port,
  dialect: 'mysql'
}

// 测试环境打印日志
if (isTest) {
  conf.logging = () => {}
}

// 线上环境用连接池
if (isPrd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
