'use strict';

/**
 * @ngdoc service
 * @name barliftApp.User
 * @description
 * # User
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('User', function ($resource, $http, ParseTypes, Session) {
    var apiRest = $resource('https://api.parse.com/1/users/:objectId',
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

    // apiRest.newDeal = function(user){
    //   var deal = {
    //     ACL: {
    //       '*': {
    //         read: true
    //       },
    //       'role:Admin': {
    //         read: true,
    //         write: true
    //       }
    //     },
    //     schema: [
    //       {
    //         key: 'deal_start_date',
    //         __type: 'Date'
    //       },
    //       {
    //         key: 'deal_end_date',
    //         __type: 'Date'
    //       },
    //       {
    //         key: 'user',
    //         __type: 'Pointer',
    //         className: '_User'
    //       }
    //     ],
    //     deal_start_date: new Date(),
    //     deal_end_date: new Date()
    //   };

    //   deal.ACL[user.objectId] = {
    //       read: true,
    //       write: true
    //     };
    //   deal.user = user.objectId;
    //   return deal;
    // };

    return apiRest; 
  });
