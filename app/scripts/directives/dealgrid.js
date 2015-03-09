'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealGrid
 * @description
 * # dealGrid
 */
angular.module('barliftApp')
  .directive('dealGrid', function ($modal, Deals, Push) {
    return {
      templateUrl: 'views/dealgrid.html',
      restrict: 'E',
      scope: {
        deals: '=',
        user: '='
      },
      link: function postLink(scope, element, attrs) {
        var dealFormModal;
        scope.deal = Deals.newDeal(scope.user);

        scope.newDeal = Deals.newDeal(scope.user);

        scope.openForm = function(deal) {
          scope.deal = deal;
          dealFormModal = $modal.open({
            templateUrl: 'views/dealform.html',
            scope: scope
          });
        };

        scope.update = function() {
          dealFormModal.close();
          if (scope.deal.objectId){
            updateDeal(scope.deal);
          } else{
            saveDeal(scope.deal);
          }
        };

        scope.cancel = function() {
          dealFormModal.dismiss();
          scope.deal = Deals.newDeal(scope.user);
        };

        scope.deleteDeal = function() {
          dealFormModal.dismiss();
          Deals.delete(scope.deal,function(res){
            scope.deal = Deals.newDeal(scope.user);
            Deals.query(function(deals) { scope.deals = deals; });
          });
        };

        scope.pushDeal = function (deal) {
          var pushInfo = {
            channels: [
              'Test'
            ],
            push_time: new Date(),
            data:{
              alert: deal.name
            }
          };
          Push.push( pushInfo, function(res){

          });
        }

        function saveDeal(deal){
          deal.start_utc = deal.deal_start_date.valueOf();
          deal.end_utc = deal.deal_end_date.valueOf();
          Deals.save(deal,function(res){
            scope.deal = Deals.newDeal(scope.user);
            Deals.query(function(deals) { scope.deals = deals; });
          });
        };

        function updateDeal(deal){
          deal.start_utc = deal.deal_start_date.valueOf();
          deal.end_utc = deal.deal_end_date.valueOf();
          Deals.update(deal, function(){
            scope.deal = Deals.newDeal(scope.user);
          });
        };
      }
    };
  });
