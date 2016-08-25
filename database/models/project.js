var Sequelize = require('sequelize');
var sequelize = require('../config');

var Project = sequelize.define('project', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: Sequelize.CHAR
  },
  enable:{
    type: Sequelize.INTEGER
  }
},
{
  freezeTableName: true,
  tableName: 'project',
  timestamps: false,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});

Project.sync();

module.exports = Project;
