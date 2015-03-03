'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealCard
 * @description
 * # dealCard
 */
angular.module('barliftApp')
  .directive('dealCard', function () {
    return {
      templateUrl: 'views/dealcard.html',
      restrict: 'E',
      scope: {
        select: '&',
        deal: '='
      },
      link: function(scope, element, attrs) {
        
      }
    };
  });
