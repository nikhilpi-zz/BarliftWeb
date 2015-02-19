'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealCard
 * @description
 * # dealCard
 */
angular.module('barliftApp')
  .directive('dealCard', function ($modal) {
    return {
      templateUrl: 'views/dealcard.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.openDeal = function(deal) {
          var modalInstance = $modal.open({
            templateUrl: 'views/dealform.html',
            scope: scope
          });
        };

      }
    };
  });
