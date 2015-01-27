'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Session
 * @description
 * # Session
 * Service in the barliftApp.
 */
angular.module('barliftApp')
  .service('Session', function ($http) {
    this.create = function (userId, userName, sessionToken, userRole) {
      this.userId = userId;
      this.userName = userName;
      this.sessionToken = sessionToken;
      this.userRole = userRole;
      $http.defaults.headers.common['X-Parse-Session-Token'] = sessionToken;
    };
    this.setRole = function(role){
      this.userRole = role;
    };
    this.destroy = function () {
      this.username = null;
      this.sessionToken = null;
      this.userRole = null;
      this.userId = null;
      delete $http.defaults.headers.common['X-Parse-Session-Token'];
    };
    return this;
  });
