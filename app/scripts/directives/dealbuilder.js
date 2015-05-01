'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealBuilder
 * @description
 * # dealBuilder
 */
angular.module('barliftApp')
  .directive('dealBuilder', function (Deals, $http, $stateParams, $filter, $state, $rootScope) {
    return {
      templateUrl: 'views/dash/directives/deal-builder.html',
      restrict: 'E',
      scope:{
        user: '=',
        deals: '=',
        venues: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('deals', function(){
          if(!$stateParams.selectedDeal){
            scope.deal = Deals.newDeal(scope.user);
          } else {
            var dealFound = $filter('filter')(scope.deals, {objectId: $stateParams.selectedDeal})[0];
            if(!dealFound){
              $state.go('deals.builder', {selectedDeal: undefined});
            } else {
              scope.deal = dealFound;
              scope.deal.venue = $filter('filter')(scope.venues, {objectId: dealFound.venue})[0];
            }
          }
        });

        scope.$watch('deal.deal_start_date', function(){
          if(scope.deal){
            scope.deal.deal_end_date = new Date(scope.deal.deal_start_date);
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
