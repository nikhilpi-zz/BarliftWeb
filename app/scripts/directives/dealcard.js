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
        openDeal: '&'
      },
      link: function postLink(scope, element, attrs) {
      
      }
    };
  });
