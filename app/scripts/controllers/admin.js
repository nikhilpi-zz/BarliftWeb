'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('AdminCtrl', function ($scope, $location, User, ParseService) {

    $scope.emails = [];
    ParseService.getEmails(function(data){
      $scope.$apply(function() {
        $scope.emails = data;
      });
    });

    $scope.logout = function(){
      User.logout();
      $location.path('/login');
    };
  });
