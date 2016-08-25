var Sequelize = require('sequelize');
var sequelize = require('../config');

var Module = sequelize.define('module', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: Sequelize.CHAR
  },
  parent_id:{
    type: Sequelize.INTEGER
  },
  project_id:{
    type: Sequelize.INTEGER
  },
  enable:{
    type: Sequelize.INTEGER
  }
},
{
  freezeTableName: true,
  tableName: 'module',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

Module.sync();

module.exports = Module;
