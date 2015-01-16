'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:emailGrid
 * @description
 * # emailGrid
 */
angular.module('barliftApp')
  .directive('emailGrid', function () {
    return {
      templateUrl: 'views/emailgrid.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
