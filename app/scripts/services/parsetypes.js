'use strict';

/**
 * @ngdoc service
 * @name barliftApp.ParseTypes
 * @description
 * # ParseTypes
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('ParseTypes', function () {
    //Takes in json objects, converts to parse api types
    return {
      user: function (user) {
        return {
          __type: 'Pointer',
          className: '_User',
          objectId: user.id
        };
      },
      date: function(date){
        return {
          __type: 'Date',
          iso: date
        };
      },
      parseDate: function(date){
        return Date.parse(date.iso);
      }
    };
  });
