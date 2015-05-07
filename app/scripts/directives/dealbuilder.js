'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealBuilder
 * @description
 * # dealBuilder
 */
angular.module('barliftApp')
  .directive('dealBuilder', function (Deals, $http, $stateParams, $state, $rootScope) {
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

        scope.$watch('deal.deal_start_date', function(newValue, oldValue){
          if(moment(scope.deal.deal_start_date).isBefore(moment().add(3,"days"))){
            scope.alert.text = "You must schedule deal 3 days in advance";
          } else {
            scope.alert.text = null;
          }
          if(moment(newValue).dayOfYear() !== moment(oldValue).dayOfYear()){
            scope.deal.deal_end_date = moment(scope.deal.deal_end_date).dayOfYear(moment(newValue).dayOfYear()).toDate();
          }
        });

        scope.$watch('deal.deal_end_date', function(){
          if(scope.deal && moment(scope.deal.deal_end_date).isBefore(scope.deal.deal_start_date)){
            scope.alert.text = "End time must come after start time";
          } else {
            scope.alert.text = null;
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
          Deals.delete(scope.deal).$promise.then(
            function(res){
              scope.deal = Deals.newDeal(scope.user);
              $rootScope.$broadcast('deals-update');
              $state.go('deals.builder', {selectedDeal: undefined});
            },
            function(err){
              scope.alert.text = err.data.error;
            });
        };

        scope.saveDeal = function(){
          scope.deal.venue = scope.deal.venue.objectId;
          Deals.save(scope.deal).$promise.then(
            function(res){
              scope.deal = Deals.newDeal(scope.user);
              $rootScope.$broadcast('deals-update');
              $state.go('deals.list');
            },
            function(err){
              scope.alert.text = err.data.error;
            });
        };

        scope.updateDeal = function(){
          scope.deal.venue = scope.deal.venue.objectId;
          Deals.update(scope.deal).$promise.then(
            function(res){
              scope.deal = Deals.newDeal(scope.user);
              $rootScope.$broadcast('deals-update');
              $state.go('deals.list');
            },
            function(err){
              scope.alert.text = err.data.error;
            });
        };


      }
    };
  });
