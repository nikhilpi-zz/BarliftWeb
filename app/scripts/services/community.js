'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Community
 * @description
 * # Community
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Community', function ($resource, ParseTypes, Session) {
     var apiRest = $resource('https://api.parse.com/1/classes/Community/:objectId',
      {
        objectId: '@objectId'
      },
      {
        save: {
          method: 'POST',
          transformRequest: function(data, headersGetter){
            var req = ParseTypes.reqProcess(data);
            req = angular.toJson(req);
            return req;
          }
        },
        get: {
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            return ParseTypes.resProcess(data,'Community');
          }
        },
        query: {
          isArray: true,
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            var results = data.results;
            var processed = results.map(function(x){
              return ParseTypes.resProcess(x,'Community');
            });
            return processed;
          }
        },
        update: {
          method: 'PUT',
          transformRequest: function(data, headersGetter){
            var req = ParseTypes.reqProcess(data);
            req = angular.toJson(req);
            return req;
          }
        },
        'delete': {
          method: 'DELETE'
        }
    });

    apiRest.newInvoice = function(user){
      var community = {
        ACL: {
          '*': {
          },
          'role:Admin': {
            read: true,
            write: true
          },
          'role:Bar': {
            read: true
          }
        },
        schema: [
        ],
      };

      community.ACL[Session.userId] = {
          read: true,
          write: true
        };
      return community;
    };

    return apiRest;
  });
