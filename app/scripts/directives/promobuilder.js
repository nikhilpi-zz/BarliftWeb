'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:promoBuilder
 * @description
 * # promoBuilder
 */
angular.module('barliftApp')
  .directive('promoBuilder', function () {
    return {
      templateUrl: 'views/dash/directives/promo-builder.html',
      restrict: 'E',
      scope:{
        user: '=',
        deals: '=',
        venues: '='
      },
      controller: function($scope, CloudCode){
        $scope.events = [];

        $scope.selectedDeals = [];

        $scope.eventSource = [$scope.events];

        $scope.$watch('deals',function(){
          CloudCode.call('takenPushDays')
          angular.forEach($scope.deals, function(deal){
            $scope.events.push({
              title: deal.name,
              editable: false,
              start: deal.deal_start_date,
              deal: deal
            });
          });
        });

        $scope.alertOnEventClick = function(event, allDay, jsEvent, view ){
          if(!event.selected){
            event.selected = true;
            event.className = "selected-event"
            $scope.selectedDeals.push(event.deal);
          } else {
            event.selected = false;
            event.className = ""
            var index = $scope.selectedDeals.indexOf(event.deal);
            $scope.selectedDeals.splice(index,1);
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

        

      },
      link: function postLink(scope, element, attrs) {
        

      }
    };
  });
