var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('lodash');

var connectToDatabase = require('./database');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res){
  res.sendfile('./index.html');
});

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.post('/api/getNav', function(req, res) {
	var projects, modules;
	var params = req.body;
	connectToDatabase(queryProject(params), outputProject)
	function queryProject(params) {
		return function() {
			return 'SELECT * FROM project where enable = 1';
		}
	}
	function queryModule(params) {
		return function() {
			return 'SELECT * FROM module where enable = 1';
		}
	}
	function outputProject(json) {
		projects = json;
		connectToDatabase(queryModule(params), outputModule)
	}
	function outputModule(json) {
		modules = json;

		var rescache = [];
		projects.forEach(function(prj){
			var p = {};
			p.project_id = prj.id;
			p.name = prj.name;
			p.children = [];
			modules.forEach(function(mod){
				if(mod.project_id === prj.id){
					p.children.push({
						module_id: mod.id,
						name: mod.name
					})
				}
			});
			rescache.push(p);
		})
		res.send(rescache);
	}
});

app.post('/api/editproject', function(req, res){
	var params = req.body;
	connectToDatabase(query(params), sendResult);
	function query(params) {
		return function() {
			if(!params.name){
				return false;
			}
			if(params.project_id){
				return 'update project set name = \"' + params.name +  '\" where id = ' + params.project_id;
			}else{
				return 'insert into project (name, enable) values (\"' + params.name + '\", 1)';
			}
		}
	}
	function sendResult(json) {
		if(json){
			params.project_id ? res.send({success: true, message:'修改成功'}) : res.send({success: true, message:'添加成功'})
		}else{
			res.send({success: false, message:'失败'})
		}
	}
});

app.post('/api/editmodule', function(req, res){
	var params = req.body;
	connectToDatabase(query(params), sendResult);
	function query(params) {
		return function() {
			if(!params.name){
				return false;
			}
			if(params.module_id){
				return 'update module set name = \"' + params.name + '\" where id = ' + params.module_id;
			}else{
				return 'insert into module (name, enable, project_id) values (\"' + params.name + '\", 1,' + params.project_id + ')';
			}
		}
	}
	function sendResult(json) {
		if(json){
			params.module_id ? res.send({success: true, message:'修改成功'}) : res.send({success: true, message:'添加成功'})
		}else{
			res.send({success: false, message:'失败'})
		}
	}
})

app.post('/api/deleteproject', function(req, res){
	var params = req.body;
	connectToDatabase(query(params), sendResult);
	function query(params) {
		return function() {
			return 'update project set enable = 0 where id = ' + params.project_id;
		}
	}
	function sendResult(json) {
		if(json){
			res.send({success: true, message:'删除成功'})
		}else{
			res.send({success: false, message:'失败'})
		}
	}
});

app.post('/api/deletemodule', function(req, res){
	var params = req.body;
	connectToDatabase(query(params), sendResult);
	function query(params) {
		return function() {
			return 'update module set enable = 0 where id = ' + params.module_id;
		}
	}
	function sendResult(json) {
		if(json){
			res.send({success: true, message:'删除成功'})
		}else{
			res.send({success: false, message:'失败'})
		}
	}
});


app.post('/api/getList', function(req, res) {
	var params = req.body;
	connectToDatabase(query(params), sendResult)

	function query(params) {
		return function() {
			return 'SELECT * FROM detail WHERE enable = 1 and module_id = ' + params.module_id;
		}
	} 

	function sendResult(json) {
		res.send(json)
	}
})

app.post('/api/getApi', function(req, res) {
	var params = req.body;
	connectToDatabase(query(params), sendResult)

	function query(params) {
		return function() {
			return 'SELECT * FROM detail WHERE enable = 1 and id = ' + params.id;
		}
	}

	function sendResult(json) {
		res.send(json)
	}
})

app.post('/api/deleteApi', function(req, res){
	var params = req.body;

	connectToDatabase(query(params), sendResult);

	function query(params) {
		return function() {
			return 'update detail set enable = 0 where id = ' + params.id;
		}
	} 
	function sendResult(json) {
		res.send(json)
	}
});

app.post('/api/savedetail', function(req, res) {
	var params = req.body;
	for(var key in params){
		if(typeof params[key] == 'string'){
			params[key] = params[key].replace(/(['"+])/ig, "\\$1");
		}
	}
	connectToDatabase(query(params), sendResult)
	function query(params) {
		if(params.id){
			//update
			return function() {
				var sql = 'update detail set enable = 1,'+
					'title = \"' + (params.title || '') + '\",'+
					'description = \"' + (params.description || '') + '\",'+
					'url = \"' + (params.url || '') + '\",'+
					'method = ' + (params.method || 1) + ','+
					'params = \"' + (params.params || '') + '\",'+
					'result = \"' + (params.result || '') + '\",'+
					'remark = \"' + (params.remark || '') + '\",'+
					'module_id = ' + (params.module_id || 0) +
					' where id = '+ params.id;
				return sql;
			}
		}else{
			//create
			return function() {
				var sql = 'insert into detail (enable, title, description, url, method, params, result, remark, module_id) values (1, '+
						'\"' + (params.title || '') + '\",' +
						'\"' + (params.description || '') + '\",' +
						'\"' + (params.url || '') + '\",' +
						(params.method || 1) + ',' +
						'\"' + (params.params || '') + '\",' +
						'\"' + (params.result || '') + '\",' +
						'\"' + (params.remark || '') + '\",' +
						(params.module_id || 1) +
				')';
				return sql;
			}
		}
	}

	function sendResult(json) {
		if(json){
			params.id ? res.send({success: true, message:'修改成功'}) : res.send({success: true, message:'添加成功'})
		}else{
			res.send({success: false, message:'失败'})
		}
	}
})

app.listen(process.env.PORT || 5050);
