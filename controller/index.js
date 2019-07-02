const fs = require('fs');
const path = require('path');
const Module = {};

const controllers = fs.readdirSync(path.resolve(__dirname, '../controller/'));
for (let i = 0; i < controllers.length; i++) {
  const file = controllers[i],
    name = file.split('.')[0];
  __filename.indexOf(name) === -1 && (
    Module[name] = require(`./${name}`)
  );
}

module.exports = Module;