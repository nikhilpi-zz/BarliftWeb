'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealCalendar
 * @description
 * # dealCalendar
 */
angular.module('barliftApp')
  .directive('dealCalendar', function () {
    return {
      templateUrl: 'views/dash/directives/deal-calendar.html',
      restrict: 'E',
      scope:{
        deals: '='
      },
      controller: function($scope,$filter){
        $scope.events = [];
        $scope.eventSource = [$scope.events];
        $scope.deal = null;
        $scope.today = new Date();


        $scope.$watch('deals',function(){
          loadDeals();
        });

        function loadDeals(){
          angular.forEach($scope.deals, function(deal){
            $scope.events.push({
              title: deal.name,
              editable: false,
              start: deal.deal_start_date,
              deal: deal
            });
          });
        }

        $scope.sameDate = function(aDate, bDate){
          return aDate.getFullYear() === bDate.getFullYear() &&
            aDate.getMonth() === bDate.getMonth() &&
            aDate.getDate() === bDate.getDate();
        };

        $scope.pastDate = function(aDate, bDate){
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

        $scope.isLocked = function(dealDate){
          var lockDate = new Date();
          lockDate.setDate($scope.today.getDate()-3);
          return dealDate > lockDate && !$scope.pastDate(dealDate, $scope.today);
        };

        $scope.alertOnEventClick = function(event, allDay, jsEvent, view ){
          $scope.deal = event.deal;
        };

        $scope.uiConfig = {
          calendar:{
            height: 450,
            editable: true,
            header: {
              left: '',
              center: 'title',
              right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick
          }
        };

      }
    };
  });
