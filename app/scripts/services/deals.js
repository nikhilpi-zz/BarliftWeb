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
        get: {
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            return ParseTypes.resProcess(data,'Deal');
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
      var date = moment().add(3,'day').toDate();
      var deal = {
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
          },
          {
            key: 'venue',
            __type: 'Pointer',
            className: 'Venue'
          }
        ],
        deal_start_date: date,
        deal_end_date: date
      };

      deal.ACL[Session.userId] = {
          read: true,
          write: true
        };
      deal.user = Session.userId;
      deal.main = false;
      deal.num_accepted = 0;
      deal.add_deals = [];
      return deal;
    };

    return apiRest;

  });
