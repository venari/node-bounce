'use strict';

var _ = require('lodash');

var sudo = require('sudo');
var options = {
    cachePassword: true,
    prompt: 'Password, yo? ',
    spawnOptions: { /* other options for spawn */ }
};

// Get list of admins
exports.index = function(req, res) {
  res.json([]);
};

function sudoCall(args, callback) {

	console.log(args);
	var response = "";

	var child = sudo(args, options);
	child.stdout.on('data', function (data) {
	    console.log(data.toString());
	    response += data.toString();
	    console.log(response);
	});
	child.stdout.on('end', function () {
	    console.log("end");
	    callback(response);
	});
	child.stdout.on('close', function (code) {
	    console.log("close - code:"  + code);
	});
};

exports.mongoStatus = function(req, res) {
  console.log("Checking Mongo Status...");

	sudoCall([ 'service', 'mongod', 'status' ], function(response){
		res.json(response);
	});
};

exports.energyManagementDashboardStatus = function(req, res) {
  console.log("Checking EnergyManagementDashboard Status...");

	sudoCall([ 'service', 'EnergyManagementDashboard', 'status' ], function(response){
		res.json(response);
	});
};

exports.uptime = function(req, res) {
  console.log("Checking uptime...");

	sudoCall([ 'uptime' ], function(response){
		res.json(response);
	});
};

exports.removeMongoLockFile = function(req, res) {

  console.log("Removing Mongo Lockfile...");

	sudoCall([ 'rm', '/var/lib/mongod/mongod.lock' ], function(response){
		res.json(response);
	});
};

exports.updateService = function(req, res) {

  console.log("updateService...");
	console.log(req.body.action);
	console.log(req.body.service);


	sudoCall([ 'service', req.body.service, req.body.action ], function(response){
		res.json(response);
	});
};


exports.restart = function(req, res) {
  console.log("RESTART!!!");
  console.log(req.body.action);

	var child = sudo([ 'shutdown', '-r', 'now' ], options);
	child.stdout.on('data', function (data) {
	    console.log(data.toString());
	});
  res.json({restarting:"OK"});
};

exports.shutdown = function(req, res) {
  console.log("SHUTDOWN!!!");
  console.log(req.body.action);

	var child = sudo([ 'shutdown', '-h', 'now' ], options);
	child.stdout.on('data', function (data) {
	    console.log(data.toString());
	});
  res.json({"Shutting Down":"OK"});
};