const fs = require('fs');

module.exports = (targetPath, ignore = []) => {
  const Module = {};
  try {
    const files = fs.readdirSync(targetPath);
    for (let i = 0; i < files.length; i++) {
      const file = files[i],
        name = file.split('.')[0];
      const isExist = ignore.some(name => name.indexOf(file) === -1);
      isExist && (
        Module[name] = require(`${targetPath}/${name}`)
      );
    }
  } catch (error) {
    console.error('load file error: %s', error);
    throw error;
  }
  return Module;
}