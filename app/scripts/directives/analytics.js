'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:analytics
 * @description
 * # analytics
 */
angular.module('barliftApp')
  .directive('analytics', function () {
    return {
      templateUrl: 'views/analytics.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
