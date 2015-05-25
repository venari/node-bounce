'use strict';

angular.module('nodeBounceApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });


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
  });
