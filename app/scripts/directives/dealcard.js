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
        // deal quantity bar
        scope.percent_accepted = scope.deal.num_accepted*100 / scope.deal.deal_qty;
        // text input fields
        scope.textInputs = [
          {name: 'Name',      val: scope.deal.name},
          {name: 'Community', val: scope.deal.community_name},
          {name: 'Type',      val: scope.deal.deal_type},
          {name: 'Quantity',  val: scope.deal.deal_qty}
        ];
        // date picker
        scope.today = function() {
          scope.dt = new Date();
        };
        scope.today();

        scope.clear = function () {
          scope.dt = null;
        };

        scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          scope.opened = true;
        };

        scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        scope.format = scope.formats[0];

        // modal functions
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
