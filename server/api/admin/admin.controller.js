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

  console.log("Checking Mongo Status...");

	var child = sudo([ 'service', 'mongod', 'status' ], options);
	child.stdout.on('data', function (data) {
	    console.log(data.toString());

		  res.json(data);
	});
	child.stdout.on('end', function () {
	    console.log("end");
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