'use strict';

angular.module('nodeBounceApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.mongoStatus = "";
    $scope.mongoStatusLabel = "";
    $scope.energyManagementDashboardStatus = "";
    $scope.energyManagementDashboardStatusLabel = "";
    $scope.uptime = "";

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    function checkStatuses()
    {
			console.log("About to check Mongo Status and uptime")
			$http.get('/api/admin/mongoStatus').
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
				  if(data.indexOf("mongodb running")>-1)
				  {
				  	$scope.mongoStatus = "OK";
				  $scope.mongoStatusLabel = "label-success";
				  } else
				  {
				  	$scope.mongoStatus = data;
				  $scope.mongoStatusLabel = "label-danger";
					}
			  }).
			  error(function(data, status, headers, config) {
				  $scope.mongoStatus = "UNKNOWN";
				  $scope.mongoStatusLabel = "label-warning";
				  console.log('problem with request: ' + e.message);
			  });

			$http.get('/api/admin/uptime').
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
				  $scope.uptime = data;
			  }).
			  error(function(data, status, headers, config) {
				  $scope.uptime = "UNKNOWN";
				  console.log('problem with request: ' + e.message);
			  });

			console.log("About to check Dashboard Status")
			$http.get('/api/admin/energyManagementDashboardStatus').
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
				  if(data.indexOf("app.js")>-1)
				  {
					  $scope.energyManagementDashboardStatus = "OK";
				  $scope.energyManagementDashboardStatusLabel = "label-success";
				  } else
				  {
				  	$scope.energyManagementDashboardStatus = data;
				  $scope.energyManagementDashboardStatusLabel = "label-danger";
				  }
			  }).
			  error(function(data, status, headers, config) {
					  $scope.energyManagementDashboardStatus = "UNKNOWN";
				  $scope.energyManagementDashboardStatusLabel = "label-warning";
				  console.log('problem with request: ' + e.message);
			  });

    }

    checkStatuses();
		setInterval(checkStatuses, 30000);

		function updateService(action, service, callback){
			$http.post('/api/admin/updateService', {action:action, service:service}).
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
				  callback(data);
				  setTimeout(function(){checkStatuses();}, 5000);
			  }).
			  error(function(data, status, headers, config) {
				  console.log('problem with request: ' + e.message);
			  });
		}

    $scope.startMongo = function() {
    	updateService('start', 'mongod', function(data){
		  	$scope.mongoStatus = data;
				  $scope.mongoStatusLabel = "label-warning";
    	});
		};
    $scope.stopMongo = function() {
    	updateService('stop', 'mongod', function(data){
		  	$scope.mongoStatus = data;
				  $scope.mongoStatusLabel = "label-warning";
    	});
		};
    $scope.removeMongoLockFile = function() {
			$http.post('/api/admin/removeMongoLockFile').
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
			  }).
			  error(function(data, status, headers, config) {
				  console.log('problem with request: ' + e.message);
			  });

		};
    $scope.startEnergyManagementDashboard = function() {
    	updateService('start', 'EnergyManagementDashboard', function(data){
		  	$scope.energyManagementDashboardStatus = data;
				  $scope.energyManagementDashboardStatusLabel = "label-warning";
    	});
		};
    $scope.stopEnergyManagementDashboard = function() {
    	updateService('stop', 'EnergyManagementDashboard', function(data){
		  	$scope.energyManagementDashboardStatus = data;
				  $scope.energyManagementDashboardStatusLabel = "label-warning";
    	});
		};

    $scope.restart = function() {
	    //alert('DETATCH!');

			$http.post('/api/admin/restart', {action:'restart'}).
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
				  setTimeout(function(){checkStatuses();}, 5000);
			  }).
			  error(function(data, status, headers, config) {
				  console.log('problem with request: ' + e.message);
			  });
  	};

    $scope.shutdown = function() {
	    //alert('DETATCH!');

			$http.post('/api/admin/shutdown', {action:'shutdown'}).
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
				  setTimeout(function(){checkStatuses();}, 5000);
			  }).
			  error(function(data, status, headers, config) {
				  console.log('problem with request: ' + e.message);
			  });
  	};
  });
