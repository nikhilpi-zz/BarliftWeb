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
      link: function(scope, element, attrs) {
        var dealDetailsModal;

        scope.viewDetails = function(deal) {
          dealDetailsModal = $modal.open({
            templateUrl: 'views/dealform.html',
            scope: scope
          });
        };

        scope.update = function() {
          dealDetailsModal.close(console.log('susscessgul!'));
        };

        scope.cancel = function() {
          dealDetailsModal.dismiss();
        };
      }
    };
  });
