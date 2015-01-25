'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Deals
 * @description
 * # Deals
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Deals', function ($resource) {
    var parseAppId = '5DZi1FrdZcwBKXIxMplWsqYu3cEEumlmFDB1kKnC';
    var parseRestKey = 'pMT9AefpMkJfbcJ5fTA2uOGxwpitMII7hpCt8x4O';

    return function(user){
      var header = {
        'X-Parse-Application-Id': parseAppId,
        'X-Parse-REST-API-Key': parseRestKey,
      };
      if (user){
        angular.extend(header, header, {'X-Parse-Session-Token': user._sessionToken});
      }

      return $resource('https://api.parse.com/1/classes/Deal/:objectId',
        {
          objectId: '@objectId'
        },
        { 
          save: {
            method: 'POST',
            headers: header
          },
          query: {
            headers: header
          },
          update: {
            method: 'PUT',
            headers: header
          }
        });
    };
  });
