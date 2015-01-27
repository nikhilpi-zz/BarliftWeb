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
        return res.data.objectId;
      }).then(function(user){
        return $http({
          url: 'https://api.parse.com/1/roles', 
          method: 'GET',
          params: {
            where: {
              users:{
                '$in': [{
                  __type: 'Pointer',
                  className: '_User',
                  objectId: user
                }]
              }
            }
          }
        });
      }).then(function(role){
        Session.setRole(role.data.results[0].name);
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
