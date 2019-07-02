const path = require('path');
const load = require('../utils/load');
const Module = load(path.resolve(__dirname, '../middleware/'), [__filename]);

module.exports = Module;