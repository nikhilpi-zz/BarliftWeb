'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealList
 * @description
 * # dealList
 */
angular.module('barliftApp')
  .directive('dealList', function (User) {
    return {
      templateUrl: 'views/dash/directives/deal-list.html',
      restrict: 'E',
      scope: {
        deals: '=',
        filterKey: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.today = new Date();

        scope.sameDate = function(aDate, bDate){
          return aDate.getFullYear() === bDate.getFullYear() &&
            aDate.getMonth() === bDate.getMonth() &&
            aDate.getDate() === bDate.getDate();
        };

        scope.dealDate = function(deal){
          return deal.deal_start_date.valueOf();
        };

        scope.pastDate = function(aDate, bDate){
          if(aDate.getFullYear() <= bDate.getFullYear()){
            if(aDate.getMonth() < bDate.getMonth()){
              return true;
            } else if (aDate.getDate() < bDate.getDate()) {
              return true;
            } else {
              return false;
            }
          }
        };

        scope.isLocked = function(dealDate){
          var lockDate = new Date();
          lockDate.setDate(scope.today.getDate()+3);
          return dealDate < lockDate && dealDate > scope.today || scope.sameDate(dealDate, scope.today);
        };

        scope.filterDeals = function(value, index){
          if(scope.filterKey === 'all'){
            return true;
          } else if(scope.filterKey === 'future'){
            return value.deal_start_date > scope.today;
          } else if(scope.filterKey === 'today'){
            return scope.sameDate(value.deal_start_date,scope.today)
          } else if(scope.filterKey === 'past'){
            return scope.pastDate(value.deal_start_date,scope.today);
          } else {
            return false;
          }
        };

      }
    };
  });
