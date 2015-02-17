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
        deal: '=',
      }
      link: function postLink(scope, element, attrs) {
        element.text('this is the dealCard directive');      }
    };
  });
