var http = require('http');
var fs = require('fs');
var mysql = require('mysql');

function connectToDatabase(query, output){
  // 连接共享型MySQL
  var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME
  });
  connection.query(query(), function(err, rows){
    output(rows);
  })
  connection.end();
}

module.exports = connectToDatabase;
