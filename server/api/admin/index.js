'use strict';

var express = require('express');
var controller = require('./admin.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/restartMongo', controller.restartMongo);
router.post('/restart', controller.restart);

module.exports = router;