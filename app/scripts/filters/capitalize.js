'use strict';

/**
 * @ngdoc filter
 * @name barliftApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the barliftApp.
 */
angular.module('barliftApp')
  .filter('capitalize', function () {
    return function (input) {
      if (input!=null)
        input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    };
  });
