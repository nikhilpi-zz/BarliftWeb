'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Venue
 * @description
 * # Venue
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Venues', function ($resource, ParseTypes, Session) {
    var apiRest = $resource('https://api.parse.com/1/classes/Venue/:objectId',
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
            return ParseTypes.resProcess(data,'Venue');
          }
        },
        query: {
          isArray: true,
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            var results = data.results;
            var processed = results.map(function(x){
              return ParseTypes.resProcess(x,'Venue');
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

    apiRest.newVenue = function(user){
      var venue = {
        ACL: {
          '*': {
          },
          'role:Admin': {
            read: true,
            write: true
          },
          'role:User': {
            read: true
          }
        },
        schema: [
          {
            key: 'location',
            __type: 'GeoPoint'
          },
          {
            key: 'manager',
            __type: 'Pointer',
            className: '_User'
          }
        ],
      };

      venue.ACL[Session.userId] = {
          read: true,
          write: true
        };
      venue.manager = Session.userId;
      return venue;
    };

    return apiRest;
  });
