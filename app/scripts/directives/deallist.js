'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealList
 * @description
 * # dealList
 */
angular.module('barliftApp')
  .directive('dealList', function ($window) {
    return {
      templateUrl: 'views/deallist.html',
      restrict: 'E',
      scope: {
        deals: '=',
        select: '='
      },
      link: function postLink(scope, element, attrs) {

        scope.selectDeal = function(deal){
          scope.select = deal;
        };
      }
    };
  });
