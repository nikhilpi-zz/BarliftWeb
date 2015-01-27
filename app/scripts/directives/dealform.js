'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealForm
 * @description
 * # dealForm
 */
angular.module('barliftApp')
  .directive('dealForm', ['ParseTypes', 'Deals', function (ParseTypes, Deals) {
    return {
      templateUrl: 'views/dealform.html',
      restrict: 'E',
      scope: {
        deal: '=',
        user: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.isNew = true;
        //Convert parse date to js date
        scope.$watch('deal', function(newVal, oldVal){
          if(scope.deal.objectId){
            scope.isNew = false;
          } else {
            scope.isNew = true;
          }
        });

        //convert date back to parse date. Update or save depending on object
        scope.saveDeal = function(deal){
          Deals.save(deal);
          scope.deal = Deals.newDeal(scope.user);
        };
        scope.updateDeal = function(deal){
          Deals.update(deal);
          scope.deal = Deals.newDeal(scope.user);
        };
      }
    };
  }]);
