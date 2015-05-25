'use strict';

var _ = require('lodash');

// Get list of admins
exports.index = function(req, res) {
  res.json([]);
};

exports.restart = function(req, res) {
  console.log("RESTART!!!");
  console.log(req.body.action);
  res.json({restarting:"OK"});
};