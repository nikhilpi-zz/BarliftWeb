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
        scope.index = scope.deal.approved;

        scope.percent_accepted = scope.deal.num_accepted*100 / scope.deal.deal_qty;

        scope.viewDetails = function() {
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
