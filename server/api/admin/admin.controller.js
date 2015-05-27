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

exports.mongoStatus = function(req, res) {

	var response = "";
  console.log("Checking Mongo Status...");

	var child = sudo([ 'service', 'mongod', 'status' ], options);
	child.stdout.on('data', function (data) {
	    console.log(data.toString());
	    response += data.toString();
	    console.log(response);
	});
	child.stdout.on('end', function () {
	    console.log("end");
		  res.json(response);
	});
	child.stdout.on('close', function (code) {
	    console.log("close - code:"  + code);
	});
};

exports.energyManagementDashboardStatus = function(req, res) {

	var response = "";
  console.log("Checking Energy Managemnt Dashboard Status...");

	var child = sudo([ 'service', 'EnergyManagementDashboard', 'status' ], options);
	child.stdout.on('data', function (data) {
	    console.log(data.toString());
	    response += data.toString();
	    console.log(response);
	});
	child.stdout.on('end', function () {
	    console.log("end");
		  res.json(response);
	});
	child.stdout.on('close', function (code) {
	    console.log("close - code:"  + code);
	});
};

exports.uptime = function(req, res) {

	var response = "";
  console.log("Checking uptime...");

	var child = sudo([ 'uptime' ], options);
	child.stdout.on('data', function (data) {
	    console.log(data.toString());
	    response += data.toString();
	    console.log(response);
	});
	child.stdout.on('end', function () {
	    console.log("end");
		  res.json(response);
	});
	child.stdout.on('close', function (code) {
	    console.log("close - code:"  + code);
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