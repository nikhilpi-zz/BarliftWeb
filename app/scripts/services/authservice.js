'use strict';

/**
 * @ngdoc service
 * @name barliftApp.AuthService
 * @description
 * # AuthService
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('AuthService', function ($http, $location, $window, Session, User) {
    var authService = {};

    authService.login = function (credentials) {
      return $http({
        url: 'https://api.parse.com/1/login', 
        method: 'GET',
        params: credentials
      }).then(function(res){
        Session.create(res.data.objectId, res.data.username, res.data.sessionToken, '');
        return res.data.Role.objectId;
      }).then(function(roldId){
        return $http({
          url: 'https://api.parse.com/1/roles/'+roldId, 
          method: 'GET'
        });
      }).then(function(role){
        Session.setRole(role.data.name);
        $window.sessionStorage['session'] = JSON.stringify(Session);
      });
    };

    authService.logout = function(){
      Session.destroy();
      delete $window.sessionStorage['session'];
      $location.path('/login')
    };
   
    authService.isAuthenticated = function () {
      return !!Session.userId;
    };
   
    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authorizedRoles.indexOf('*') !== -1  || (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1));
    };
   
    return authService;
  });
