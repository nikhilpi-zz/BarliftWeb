'use strict';

/**
 * @ngdoc service
 * @name barliftApp.parseEmail
 * @description
 * # parseEmail
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('parseEmail', ['$resource',function ($resource) {
    // Service logic
    // ...
    var appID = '5DZi1FrdZcwBKXIxMplWsqYu3cEEumlmFDB1kKnC';
    var restKey= 'pMT9AefpMkJfbcJ5fTA2uOGxwpitMII7hpCt8x4O';

    return $resource('https://'+appID+':javascript-key='+restKey+'@api.parse.com/1/classes/email/:id', 
      { 
        id: '@_id' 
      }, 
      {
        update: {
          method: 'PUT'
        },
        save: {
          method: 'POST',
          headers: {'X-Parse-Application-Id': '5DZi1FrdZcwBKXIxMplWsqYu3cEEumlmFDB1kKnC',
                    'X-Parse-REST-API-Key': 'pMT9AefpMkJfbcJ5fTA2uOGxwpitMII7hpCt8x4O',
                    'Content-Type': 'application/json'}
        }
      });
  }]);
