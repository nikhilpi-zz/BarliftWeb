'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Session
 * @description
 * # Session
 * Service in the barliftApp.
 */
angular.module('barliftApp')
  .service('Session', function () {
    this.create = function (userId, userName, sessionToken) {
      this.userId = userId;
      this.userName = userName;
      this.sessionToken = sessionToken;
      this.userRole = '';
    };
    this.setRole = function(role){
      this.userRole = role;
    };
    this.destroy = function () {
      this.id = null;
      this.username = null;
      this.sessionToken = null;
      this.userRole = null;
    };
    return this;
  });
