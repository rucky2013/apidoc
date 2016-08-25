var Sequelize = require('sequelize');

var sequelize = new Sequelize(
  'app_' + process.env.APPNAME,
  process.env.ACCESSKEY,
  process.env.SECRETKEY,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
  }
);

module.exports = sequelize;
