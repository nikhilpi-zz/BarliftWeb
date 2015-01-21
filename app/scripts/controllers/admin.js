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
    if (User.isLoggedIn()){
      // $scope.user = ParseService.getUser();
    } else {
      $location.path('/login');
    }

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
