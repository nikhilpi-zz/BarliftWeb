'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Invoice
 * @description
 * # Invoice
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Invoice', function ($resource, ParseTypes, Session) {
    var apiRest = $resource('https://api.parse.com/1/classes/Invoice/:objectId',
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
            return ParseTypes.resProcess(data,'Invoice');
          }
        },
        query: {
          isArray: true,
          transformResponse: function(data, headersGetter){
            data = angular.fromJson(data);
            var results = data.results;
            var processed = results.map(function(x){
              return ParseTypes.resProcess(x,'Invoice');
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

    apiRest.newInvoice = function(Invoice){
      var date = moment().toDate();
      var invoice = {
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
            key: 'user',
            __type: 'Pointer',
            className: '_User'
          }
        ],
      };

      invoice.ACL[Session.userId] = {
          read: true,
          write: true
        };
      invoice.user = Session.userId;
      return invoice;
    };

    return apiRest;
  });
