'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Deals
 * @description
 * # Deals
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Deals', function ($resource, ParseTypes, Session) {

    var apiRest = $resource('https://api.parse.com/1/classes/Deal/:objectId',
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
        query: {
          isArray: true,
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            var results = data.results;
            var processed = results.map(function(x){
              return ParseTypes.resProcess(x,'Deal');
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

    apiRest.newDeal = function(user){
      var today = new Date(2015, 0, 1, 18, 0, 0);
      var deal = {
        ACL: {
          '*': {
            read: true
          },
          'role:Admin': {
            read: true,
            write: true
          }
        },
        schema: [
          {
            key: 'deal_start_date',
            __type: 'Date'
          },
          {
            key: 'deal_end_date',
            __type: 'Date'
          },
          {
            key: 'user',
            __type: 'Pointer',
            className: '_User'
          }
        ],
        deal_start_date: today,
        deal_end_date: today
      };

      deal.ACL[Session.userId] = {
          read: true,
          write: true
        };
      deal.user = Session.userId;
      deal.approved = false;
      return deal;
    };

    return apiRest; 

  });
