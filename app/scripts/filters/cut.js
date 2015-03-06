'use strict';

/**
 * @ngdoc filter
 * @name barliftApp.filter:cut
 * @function
 * @description
 * # cut
 * Filter in the barliftApp.
 */
angular.module('barliftApp')
  .filter('cut', function () {
    return function (input, max) {
      if (!input) return '';

      max = parseInt(max, 10);
      if (!max || input.length <= max) return input;
      input = input.substr(0, max);

      return input + ' …';
    };
  });
