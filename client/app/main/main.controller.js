'use strict';

angular.module('nodeBounceApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });


    $scope.restart = function() {
    alert('DETATCH!');
  };


  });
