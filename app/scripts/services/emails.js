'use strict';

/**
 * @ngdoc service
 * @name barliftApp.emails
 * @description
 * # Emails
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Emails', function ($resource, ParseTypes) {
    
    var apiRest = $resource('https://api.parse.com/1/classes/email/');

    return apiRest;

  });
