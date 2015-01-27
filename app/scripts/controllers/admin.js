'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('AdminCtrl', function ($scope, User, AuthService) {
    $scope.user = {};
    User.getCurrent(function(res){
      $scope.user = res;
    });

    $scope.logout = AuthService.logout;
  });
