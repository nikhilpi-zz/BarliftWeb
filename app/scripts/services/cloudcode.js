'use strict';

/**
 * @ngdoc factory
 * @name barliftApp.CloudCode
 * @description
 * # CloudCode
 * Service in the barliftApp.
 */
angular.module('barliftApp')
  .factory('CloudCode', function ($http, $q) {
    // the $http API is based on the deferred/promise APIs exposed by the $q service
    // so it returns a promise for us by default
    return {
      call: function(functionName, params){
        return $http.post('https://api.parse.com/1/functions/'+functionName, params)
          .then(function(res) {
              console.log(res);
              return res.data;
          }, function(res) {
              console.log("wrong");
              // something went wrong
              return $q.reject(res);
          });
      }
    }
  });
