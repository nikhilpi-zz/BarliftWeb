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

        scope.dealDate = function(deal){
          return deal.deal_start_date.valueOf();
        };

        scope.sameDate = function(aDate, bDate){
          return moment(aDate).dayOfYear() === moment(bDate).dayOfYear()
        };
        
        scope.pastDate = function(aDate, bDate){
          return moment(aDate).dayOfYear() < moment(bDate).dayOfYear()
        };

        scope.isLocked = function(dealDate){
          var lockDate = moment().endOf('day').add(3,'day');
          return moment(dealDate).isBetween(moment().startOf('day'), lockDate);
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
