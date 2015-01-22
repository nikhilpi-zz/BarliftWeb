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
      User.getUserRole(function(role){
        $scope.$apply(function() {
          $location.path('/'+ role.toLowerCase());
        });
      });
    }

    $scope.login = function() {
      User.login($scope.login_username, $scope.login_password, function(user) {
        User.getUserRole(function(role){
          $scope.$apply(function() {
            $location.path('/'+ role.toLowerCase());
          });
        });
      });
    };
  });
