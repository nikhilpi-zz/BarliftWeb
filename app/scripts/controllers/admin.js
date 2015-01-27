'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('AdminCtrl', function ($scope, $location, User, AuthService) {

    $scope.emails = [];

    $scope.logout = AuthService.logout;
  });
