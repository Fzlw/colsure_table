const Sequelize = require('sequelize');
const {
  sequelizeConfig: {
    database,
    username,
    password,
    ...options
  }
} = require('../config/sequelize');

const sequelize = new Sequelize(database, username, password, options);

// 数据库测试
sequelize.authenticate().then(() => {
  console.log('数据库连接成功');
}).catch(err => {
  console.log('数据库连接异常: %s', err);
  throw err;
});

exports.sequelize = sequelize;
exports.Sequelize = Sequelize;