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
        deals: '=',
        deal: '=',
        user: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.isNew = true;

        scope.$watch('deal', function(newVal, oldVal){
          if(scope.deal.objectId){
            scope.isNew = false;
          } else {
            scope.isNew = true;
          }
        });

        scope.saveDeal = function(deal){
          Deals.save(deal,function(res){
            deal.objectId = res.objectId;
            scope.deals.push(deal);
            scope.deal = Deals.newDeal(scope.user);
            scope.isNew = true;
            scope.dealForm.$setPristine();
            scope.dealForm.$setUntouched();
          });
        };

        scope.updateDeal = function(deal){
          Deals.update(deal, function(){
            scope.deal = Deals.newDeal(scope.user);
            scope.isNew = true;
            scope.dealForm.$setPristine();
            scope.dealForm.$setUntouched();
          });
        };

        scope.deleteDeal = function(deal){
          Deals.delete(deal, function(res){
            var index = scope.deals.indexOf(deal);
            if (index > -1) {
              scope.deals.splice(index, 1);
            }
            scope.deal = Deals.newDeal(scope.user);
            scope.isNew = true;
            scope.dealForm.$setPristine();
            scope.dealForm.$setUntouched();
          })
        };

        scope.clearDeal = function(){
          scope.deal = Deals.newDeal(scope.user);
          scope.isNew = true;
          scope.dealForm.$setPristine();
          scope.dealForm.$setUntouched();
        };
      }
    };
  }]);
