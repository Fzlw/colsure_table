const path = require('path');
const load = require('../utils/load');
const {
  sequelize,
  Sequelize
} = require('../db/sequelize');
const Module = load(path.resolve(__dirname, '../model/'), [__filename]);

module.exports = {
  ...Module,
  sequelize,
  Sequelize
};