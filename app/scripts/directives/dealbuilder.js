'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealBuilder
 * @description
 * # dealBuilder
 */
angular.module('barliftApp')
  .directive('dealBuilder', function () {
    return {
      templateUrl: 'views/dash/directives/deal-builder.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
