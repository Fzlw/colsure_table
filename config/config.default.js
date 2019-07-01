module.exports = appInfo => {
  const config = {};
  config.keys = appInfo.name + '_1558349740661_8711';

  // 框架默认中间件
  config.security = {
    csrf: {
      enable: false
    }
  };

  // sequelize
  config.sequelize = {
    delegate: 'model',
    baseDir: 'model',
    dialect: 'mysql',
    host: '120.77.222.224',
    port: 3306,
    username: 'colsure',
    password: 'colsure@2019',
    database: 'colsure_table',
    timezone: '+08:00',
    define: {
      timestamps: false,
      freezeTableName: false,
      underscored: true
    }
  };

  return config;
};