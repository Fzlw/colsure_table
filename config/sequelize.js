const defaultConfig = {
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

exports.sequelizeConfig = defaultConfig;