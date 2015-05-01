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

        $scope.alertOnEventClick = function(event, allDay, jsEvent, view ){
          if(!event.selected){
            event.selected = true;
            event.className = "selected-event"
            $scope.deal = event.deal;
          } else {
            event.selected = false;
            event.className = ""
            $scope.deal = null;
          }
        };

        $scope.uiConfig = {
          calendar:{
            height: 450,
            editable: true,
            header: {
              left: '',
              center: 'title',
              right: ''
            },
            eventClick: $scope.alertOnEventClick
          }
        };

      }
    };
  });
