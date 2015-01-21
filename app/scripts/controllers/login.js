'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:LoginctrlCtrl
 * @description
 * # LoginCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('LoginCtrl', function ($scope, $location, User) {
    if (User.isLoggedIn()){
      $location.path('/admin');
    }

    $scope.login = function() {
      User.login($scope.login_username, $scope.login_password, function(user) {
        $scope.$apply(function() {
          $location.path('/admin');
        });
      });
    };
  });
