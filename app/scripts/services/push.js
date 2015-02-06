'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Push
 * @description
 * # Push
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Push', function ($resource, ParseTypes) {
    
    var apiRest = $resource('https://api.parse.com/1/push', null,
      { 
        push: {
          method: 'POST',
          transformRequest: function(data, headersGetter){
            var req = ParseTypes.reqProcess(data);
            req = angular.toJson(req);
            return req;
          }
        }
      }
    );

    return apiRest;
  });
