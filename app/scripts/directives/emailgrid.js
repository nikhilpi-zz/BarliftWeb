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
      template: '<div ng-repeat="email in emails">{{email}}</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
