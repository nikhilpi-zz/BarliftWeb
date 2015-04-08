'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:LoginctrlCtrl
 * @description
 * # LoginCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('LoginCtrl', function ($rootScope, $timeout, $scope, $location, User, AuthService, AUTH_EVENTS, Session) {
    $scope.credentials = {
      username: '',
      password: ''
    };
    if (AuthService.isAuthenticated()){
      $location.path('/'+ Session.userRole.toLowerCase());
    }

    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $location.path('/'+ Session.userRole.toLowerCase());
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  });
