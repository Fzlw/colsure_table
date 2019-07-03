const path = require('path');
const load = require('../utils/load');
const Module = load(path.resolve(__dirname, '../enums/'), [__filename], true);

module.exports = Module;