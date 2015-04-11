'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealList
 * @description
 * # dealList
 */
angular.module('barliftApp')
  .directive('dealList', function () {
    return {
      templateUrl: 'views/dash/directives/deal-list.html',
      restrict: 'E',
      scope: {
        deals: '='
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
