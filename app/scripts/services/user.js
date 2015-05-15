'use strict';

/**
 * @ngdoc service
 * @name barliftApp.User
 * @description
 * # User
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('User', function ($resource, ParseTypes, Session, Deals, Venues) {
    var user = $resource('https://api.parse.com/1/users/:objectId',
      {
        objectId: '@objectId'
      },
      { 
        getCurrent: {
          method:'GET',
          cache: true,
          url: 'https://api.parse.com/1/users/me',
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            var res = ParseTypes.resProcess(data,'_User')
            return res;
          }
        },
        get: {
          method:'GET',
          cache: true,
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            return ParseTypes.resProcess(data,'_User');
          }
        },
        save: {
          method: 'POST',
          transformRequest: function(data, headersGetter){
            var req = ParseTypes.reqProcess(data);
            req = angular.toJson(req);
            return req;
          },
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            return ParseTypes.resProcess(data,'_User');
          }
        },
        query: {
          method:'GET',
          isArray: true,
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            var results = data.results;
            var processed = results.map(function(x){
              return ParseTypes.resProcess(x,'_User');
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
          },
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            return ParseTypes.resProcess(data,'_User');
          }
        }
    });

    user.newBar = function(){
      var bar = {
        ACL: {
          '*': {
            read: true
          }
        },
        schema: [
          {
            key: 'Role',
            __type: 'Pointer',
            className: '_Role'
          }
        ],
        Role: 'VyofaLB7t2'
      };

      return bar;
    };


    return user; 
  });
