'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('MainCtrl', function ($scope, parseEmail) {
    
    $scope.addEmail = function(user) { //create a new movie. Issues a POST to /api/movies
      $scope.entry = new parseEmail(); //this object now has a $save() method
      $scope.entry.email= user.email;
      $scope.entry.$save(function(res) {
        console.log(res);
      });
    };

  });
