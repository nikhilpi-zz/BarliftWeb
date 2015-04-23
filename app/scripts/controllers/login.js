'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:LoginctrlCtrl
 * @description
 * # LoginCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $state, User, AuthService, AUTH_EVENTS, Session) {
    $scope.credentials = {
      username: '',
      password: ''
    };

    if (AuthService.isAuthenticated()){
      $state.go('dash.main');
    }

    $scope.register = function(newUser){
      var user = User.newBar();
      user.username = newUser.username;
      user.password = newUser.password;
      user.email = newUser.email;

      User.save(user).$promise.then(
        function(value){
          $state.go('login');
        },
        function(error){
          $scope.error = error.data.error;
        }
      )
    };

    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $state.go('dash.main');
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        $scope.loginFail = true;
      });
    };
  });
