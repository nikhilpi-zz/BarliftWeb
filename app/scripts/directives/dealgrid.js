'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealGrid
 * @description
 * # dealGrid
 */
angular.module('barliftApp')
  .directive('dealGrid', function () {
    return {
      templateUrl: 'views/dealgrid.html',
      restrict: 'E',
      scope: {
        deals: '='
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
