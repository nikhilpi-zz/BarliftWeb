'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:BarCtrl
 * @description
 * # BarCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('BarCtrl', function ($scope, User, Deals, AuthService) {
  // variables
  $scope.deals = [];
  $scope.user = {};

  User.getCurrent(function(res){ 
    $scope.user = res; 
    Deals.query({
      where: { 
        user: $scope.user.getPointer()
      }
    },
    function(deals) { $scope.deals = deals; });
  });

  // logout
  $scope.logout = AuthService.logout;

  });
