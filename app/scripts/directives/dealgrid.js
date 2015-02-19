'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealGrid
 * @description
 * # dealGrid
 */
angular.module('barliftApp')
  .directive('dealGrid', function ($modal) {
    return {
      templateUrl: 'views/dealgrid.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.openDeal = function() {
          console.log('opening');
          var modalInstance = $modal.open({
            template: '<h2>Hello</h2>'
          });
        };
      } 
    };
  });
