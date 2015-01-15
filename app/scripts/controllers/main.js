'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('MainCtrl', function ($scope, ParseService) {
    $scope.user={email: 'test1'};
    console.log(ParseService);
    $scope.addEmail = function(user) { //create a new movie. Issues a POST to /api/movies
      ParseService.addEmail(user.email,function(res) {
        console.log(res);
      });
    };

  });
