'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Feedback
 * @description
 * # Feedback
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Feedback', function ($resource, ParseTypes, Session) {

    var apiRest = $resource('https://api.parse.com/1/classes/Feedback/:objectId',
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
            var results = data.results;
            return ParseTypes.resProcess(results,'Feedback');
          }
        },
        query: {
          isArray: true,
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            var results = data.results;
            var processed = results.map(function(x){
              return ParseTypes.resProcess(x,'Feedback');
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

    apiRest.newFeedback = function(){
      var today = new Date();
      var date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      var feedback = {
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
        deal_start_date: date,
        deal_end_date: date
      };

      feedback.ACL[Session.userId] = {
        read: true,
        write: true
      };
      return feedback;
    };

    return apiRest;

  });
