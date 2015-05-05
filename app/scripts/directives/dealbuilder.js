'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealBuilder
 * @description
 * # dealBuilder
 */
angular.module('barliftApp')
  .directive('dealBuilder', function (Deals, $http, $stateParams, $filter, $rootScope) {
    return {
      templateUrl: 'views/dash/directives/deal-builder.html',
      restrict: 'E',
      scope:{
        user: '=',
        venues: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.alert = {};

        if($stateParams.selectedDeal){
          Deals.get({objectId: $stateParams.selectedDeal}, function(res){
            scope.deal = res;
          });
        } else {
          scope.deal = Deals.newDeal(scope.user);
        }

        scope.$watch('deal.deal_start_date', function(){
          if(scope.deal && !scope.deal.deal_end_date){
            scope.deal.deal_end_date = new Date(scope.deal.deal_start_date);
          }
        });

        scope.$watch('deal.deal_end_date', function(){
          if(scope.deal.deal_end_date < scope.deal.deal_start_date){
            scope.alert.text = "End time must come after start time";
          }
        });

        $http.get('https://api.parse.com/1/config').
          success(function(data, status, headers, config) {
            scope.communities = data.params.communities;
        });

        scope.addSubDeal = function(){
          if(!scope.deal.add_deals){
            scope.deal.add_deals = [];
          }
          scope.deal.add_deals.push('');
          
        };

        scope.removeSubDeal = function(i){
          scope.deal.add_deals.splice(i,1);
        };

        scope.deleteDeal = function() {
          Deals.delete(scope.deal,function(res){
            scope.deal = Deals.newDeal(scope.user);
            $rootScope.$broadcast('deals-update');
            $state.go('deals.builder', {selectedDeal: undefined});
          });
        };

        scope.saveDeal = function(){
          scope.deal.venue = scope.deal.venue.objectId;
          Deals.save(scope.deal,function(res){
            scope.deal = Deals.newDeal(scope.user);
            $rootScope.$broadcast('deals-update');
          });
        };

        scope.updateDeal = function(){
          scope.deal.venue = scope.deal.venue.objectId;
          Deals.update(scope.deal, function(){
            scope.deal = Deals.newDeal(scope.user);
            $rootScope.$broadcast('deals-update');
          });
        };


      }
    };
  });
