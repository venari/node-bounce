'use strict';

var express = require('express');
var controller = require('./admin.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/uptime', controller.uptime);
router.get('/mongoStatus', controller.mongoStatus);
router.get('/energyManagementDashboardStatus', controller.energyManagementDashboardStatus);
router.post('/updateService', controller.updateService);
router.post('/removeMongoLockFile', controller.removeMongoLockFile);
router.post('/restart', controller.restart);
router.post('/shutdown', controller.shutdown);

module.exports = router;