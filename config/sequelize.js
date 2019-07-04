const baseInfo = {
  dialect: 'mysql',
  port: 3306,
  timezone: '+08:00',
  define: {
    timestamps: false,
    freezeTableName: false,
    underscored: true
  }
};
const defaultConfig = {
  host: '120.77.222.224',
  username: 'colsure',
  password: 'colsure@2019',
  database: 'colsure_table'
};

const prodConfig = {
  host: '127.0.0.1',
  username: 'root',
  password: '!qaz@wsx',
  database: 'colsure_table'
};
let sequelizeConfig = Object.assign({}, baseInfo, defaultConfig);
process.env.NODE_ENV === 'prod' && (
  sequelizeConfig = Object.assign({}, baseInfo, prodConfig)
);

exports.sequelizeConfig = sequelizeConfig;