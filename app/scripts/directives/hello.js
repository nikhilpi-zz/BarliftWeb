'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:hello
 * @description
 * # hello
 */
angular.module('barliftApp')
  .directive('hello', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the hello directive');
      }
    };
  });
