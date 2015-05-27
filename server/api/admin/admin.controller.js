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

exports.uptime = function(req, res) {
  res.json([]);
};

exports.mongoStatus = function(req, res) {
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


exports.mongoStop = function(req, res) {

  console.log("Stopping Mongo Service...");

	var child = sudo([ 'service', 'mongod', 'stop' ], options);
	child.stdout.on('data', function (data) {
	    console.log(data.toString());

			console.log("Removing Mongo DB lock if present...");

			child = sudo([ 'rm', '/var/lib/mongod/mongod.lock' ], options);
			child.stdout.on('data', function (data) {
			    console.log(data.toString());

					console.log("Starting Mongo Service...");

					child = sudo([ 'service', 'mongod', 'start' ], options);
					child.stdout.on('data', function (data) {
					    console.log(data.toString());
					});
			});

	});


  res.json({restartedMongo:"OK"});
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