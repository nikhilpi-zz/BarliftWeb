'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealBuilder
 * @description
 * # dealBuilder
 */
angular.module('barliftApp')
  .directive('dealBuilder', function (Deals, $http, $stateParams, $filter, $state) {
    return {
      templateUrl: 'views/dash/directives/deal-builder.html',
      restrict: 'E',
      scope:{
        user: '=',
        deals: '='
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
            }
          }
        });

        $http.get('https://api.parse.com/1/config').
          success(function(data, status, headers, config) {
            scope.communities = data.params.communities;
        });

        scope.deleteDeal = function() {
          Deals.delete(scope.deal,function(res){
            scope.deal = Deals.newDeal(scope.user);
            Deals.query(function(deals) { scope.deals = deals; });
            $state.go('deals.builder', {selectedDeal: undefined});
          });
        };

        scope.saveDeal = function(){
          Deals.save(scope.deal,function(res){
            scope.deal = Deals.newDeal(scope.user);
            Deals.query(function(deals) { scope.deals = deals; });
          });
        };

        scope.updateDeal = function(){
          Deals.update(scope.deal, function(){
            scope.deal = Deals.newDeal(scope.user);
            Deals.query(function(deals) { scope.deals = deals; });
          });
        };


      }
    };
  });
