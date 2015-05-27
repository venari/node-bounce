'use strict';

angular.module('nodeBounceApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.mongoStatus = "";
    $scope.energyManagementDashboardStatus = "";
    $scope.uptime = "";

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

		setInterval(function () {
			console.log("About to check Mongo Status")
			$http.get('/api/admin/mongoStatus').
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
				  $scope.mongoStatus = data;
			  }).
			  error(function(data, status, headers, config) {
				  console.log('problem with request: ' + e.message);
			  });
			$http.get('/api/admin/energyManagementDashboardStatus').
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
				  $scope.energyManagementDashboardStatus = data;
			  }).
			  error(function(data, status, headers, config) {
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
				  console.log('problem with request: ' + e.message);
			  });
  	}, 10000);

    $scope.restartMongo = function() {
	    //alert('DETATCH!');

			$http.post('/api/admin/restartMongo', {action:'restart'}).
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
			  }).
			  error(function(data, status, headers, config) {
				  console.log('problem with request: ' + e.message);
			  });
  	};

    $scope.restart = function() {
	    //alert('DETATCH!');

			$http.post('/api/admin/restart', {action:'restart'}).
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
			  }).
			  error(function(data, status, headers, config) {
				  console.log('problem with request: ' + e.message);
			  });
  	};

    $scope.restart = function() {
	    //alert('DETATCH!');

			$http.post('/api/admin/shutdown', {action:'shutdown'}).
			  success(function(data, status, headers, config) {
				  console.log('status: ' + status);
				  console.log('headers: ' + headers);
				  console.log('data: ' + data);
			  }).
			  error(function(data, status, headers, config) {
				  console.log('problem with request: ' + e.message);
			  });
  	};
  });
