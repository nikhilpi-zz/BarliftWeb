'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Deals
 * @description
 * # Deals
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Deals', function ($resource, ParseTypes) {
    var parseAppId = '5DZi1FrdZcwBKXIxMplWsqYu3cEEumlmFDB1kKnC';
    var parseRestKey = 'pMT9AefpMkJfbcJ5fTA2uOGxwpitMII7hpCt8x4O';

    return function(user){
      var header = {
        'X-Parse-Application-Id': parseAppId,
        'X-Parse-REST-API-Key': parseRestKey,
      };
      if (user){
        header['X-Parse-Session-Token']= user._sessionToken;
      }

      var apiRest = $resource('https://api.parse.com/1/classes/Deal/:objectId',
        {
          objectId: '@objectId'
        },
        { 
          save: {
            method: 'POST',
            headers: header,
            transformRequest: function(data, headersGetter){
              var req = ParseTypes.reqProcess(data);
              req = angular.toJson(req);
              return req;
            }
          },
          query: {
            headers: header,
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
            headers: header,
            transformRequest: function(data, headersGetter){
              var req = ParseTypes.reqProcess(data);
              req = angular.toJson(req);
              return req;
            }
          }
      });

      apiRest.newDeal = function(){
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
          deal_start_date: new Date(),
          deal_end_date: new Date()
        };

        deal.ACL[user.id] = {
            read: true,
            write: true
          };
        deal.user = user.id;
        return deal;
      };

      return apiRest;
    };  

  });
