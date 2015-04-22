'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:LoginctrlCtrl
 * @description
 * # LoginCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('LoginCtrl', function ($rootScope, $timeout, $scope, $state, User, AuthService, AUTH_EVENTS, Session) {
    $scope.credentials = {
      username: '',
      password: ''
    };
    if (AuthService.isAuthenticated()){
      $state.go('dash.main');
    }

    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $state.go('dash.main');
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  });
