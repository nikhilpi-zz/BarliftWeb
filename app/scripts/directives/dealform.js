'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealForm
 * @description
 * # dealForm
 */
angular.module('barliftApp')
  .directive('dealForm', ['ParseTypes', 'Deals', 'Push', function (ParseTypes, Deals, Push) {
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
          deal.start_utc = deal.deal_start_date.valueOf();
          deal.end_utc = deal.deal_end_date.valueOf();
          Deals.save(deal,function(res){
            deal.objectId = res.objectId;
            scope.deals.push(deal);
            scope.deal = Deals.newDeal(scope.user);

            var pushInfo = {
              channels: [
                deal.community_name
              ],
              push_time: deal.deal_start_date,
              data:{
                alert: deal.name
              }
            };

            var pushInfo2 = {
              channels: [
                'Ppp'
              ],
              push_time: new Date(),
              data:{
                alert: 'poop'
              }
            };

            Push.push( pushInfo, function(res){
              scope.isNew = true;
              scope.dealForm.$setPristine();
              scope.dealForm.$setUntouched();
            });
          });
        };

        scope.updateDeal = function(deal){
          deal.start_utc = deal.deal_start_date.valueOf();
          deal.end_utc = deal.deal_end_date.valueOf();
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
