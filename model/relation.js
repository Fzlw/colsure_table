const {
  sequelize,
  Sequelize
} = require('../db/sequelize');

module.exports = sequelize.define('relation', {
  id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  ancestor: {
    type: Sequelize.STRING(36),
    allowNull: false,
  },
  descendant: {
    type: Sequelize.STRING(36),
    allowNull: false,
  },
  distance: {
    type: Sequelize.INTEGER(5).UNSIGNED,
    allowNull: false,
  },
  valid: {
    type: Sequelize.INTEGER(1),
    allowNull: true,
    defaultValue: '1'
  },
  create_time: {
    type: Sequelize.DATE,
    allowNull: false,
  }
}, {
  freezeTableName: true
});
