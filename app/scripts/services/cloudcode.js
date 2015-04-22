'use strict';

/**
 * @ngdoc factory
 * @name barliftApp.CloudCode
 * @description
 * # CloudCode
 * Service in the barliftApp.
 */
angular.module('barliftApp')
  .factory('CloudCode', function ($http) {
    return {
      call: function(functionName, params ,cb){
        $http.post('https://api.parse.com/1/functions/'+functionName, params).
          success(function(data, status, headers, config) {
            cb(data);
          }).
          error(function(data, status, headers, config) {
            cb(data);
          });
      }
    }
  });
