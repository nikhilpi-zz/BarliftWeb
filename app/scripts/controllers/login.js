'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:LoginctrlCtrl
 * @description
 * # LoginCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('LoginCtrl', function ($scope, $location, ParseService, $rootScope) {
    $scope.login = function() {
      ParseService.login($scope.login_username, $scope.login_password, function(user) {
        // When service call is finished, navigate to items page
        $rootScope.loggedInUser = user;
        $location.path('/admin');
      });
    }
  });
