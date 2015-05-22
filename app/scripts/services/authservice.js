'use strict';

/**
 * @ngdoc service
 * @name barliftApp.AuthService
 * @description
 * # AuthService
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('AuthService', function ($http, $state, $cookieStore, Session, User,  $cacheFactory) {
    var authService = {};

    authService.login = function (credentials) {
      return $http({
        url: 'https://api.parse.com/1/login', 
        method: 'GET',
        params: credentials
      }).then(function(res){
        Session.create(res.data.objectId, res.data.username, res.data.sessionToken, '');
        return res.data.Role.objectId;
      }).then(function(roleId){
        return $http({
          url: 'https://api.parse.com/1/roles/'+roleId, 
          method: 'GET'
        });
      }).then(function(role){
        Session.setRole(role.data.name);
        $cookieStore.put('barlift-sesh',Session.sessionToken);
        $cookieStore.put('barlift-userid',Session.userId);
        $cookieStore.put('barlift-username',Session.userName);
        $cookieStore.put('barlift-userrole',Session.userRole);
      });
    };

    authService.logout = function(){
      Session.destroy();
      $cookieStore.remove('barlift-sesh');
      $cookieStore.remove('barlift-sesh');
      $cookieStore.remove('barlift-userid');
      $cookieStore.remove('barlift-username');
      $cookieStore.remove('barlift-userrole');
      $state.go('login');
      var $httpDefaultCache = $cacheFactory.get('$http');
      $httpDefaultCache.removeAll();
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
