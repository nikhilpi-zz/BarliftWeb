'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealForm
 * @description
 * # dealForm
 */
angular.module('barliftApp')
  .directive('dealForm', ['ParseTypes', function (ParseTypes) {
    return {
      templateUrl: 'views/dealform.html',
      restrict: 'E',
      scope: {
        deal: '=',
        save: '&'
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('deal', function(newVal, oldVal){
          if (scope.deal.deal_start_date){
            scope.deal.deal_start_date = ParseTypes.parseDate(scope.deal.deal_start_date);
          } else {
            scope.deal.deal_start_date = new Date();
          }
        });

        scope.dealSave = function(deal){
          deal.deal_start_date = ParseTypes.date(deal.deal_start_date);
          scope.save({deal: deal})
        }

        scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        scope.format = scope.formats[0];
      }
    };
  }]);
