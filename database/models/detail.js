var Sequelize = require('sequelize');
var sequelize = require('../config');

var Detail = sequelize.define('detail', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title:{
    type: Sequelize.CHAR
  },
  description:{
    type: Sequelize.TEXT
  },
  url:{
    type: Sequelize.CHAR
  },
  method:{
    type: Sequelize.INTEGER
  },
  result:{
    type: Sequelize.TEXT
  },
  remark:{
    type: Sequelize.TEXT
  },
  state:{
    type: Sequelize.INTEGER
  },
  module_id:{
    type: Sequelize.INTEGER
  },
  params:{
    type: Sequelize.CHAR
  },
  enable:{
    type: Sequelize.INTEGER
  }
},
{
  freezeTableName: true,
  tableName: 'detail',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

Detail.sync();

module.exports = Detail;
