'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the barliftApp
 */
var admin = angular.module('barliftApp');

admin.controller('AdminCtrl', function ($scope, Deals, AuthService) {
  $scope.deals = [];

  Deals.query(function(res){
    $scope.deals = res;
  });

  $scope.logout = AuthService.logout;
});
