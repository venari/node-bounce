'use strict';

var express = require('express');
var controller = require('./admin.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/uptime', controller.uptime);
router.get('/mongoStatus', controller.mongoStatus);
router.get('/energyManagementDashboardStatus', controller.energyManagementDashboardStatus);
//router.post('/mongoStop', controller.mongoStop);
//router.post('/mongoUnlock', controller.mongoUnlock);
//router.post('/mongoStart', controller.mongoStart);
router.post('/restart', controller.restart);
router.post('/shutdown', controller.restart);

module.exports = router;