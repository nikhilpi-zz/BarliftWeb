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
            var found = false;
            angular.forEach($scope.events, function(calEvent, index){
              if(angular.equals(calEvent.deal, deal)){
                found = true;
              } else if(calEvent.deal.objectId === deal.objectId){
                $scope.events.splice(index, 1);
              }
            });

            if(!found){
              var css = '';
              if($scope.pastDate(deal.deal_start_date,$scope.today)){
                css = 'past-event';
              } else if(deal.main){
                css = 'main-event';
              }
              $scope.events.push({
                title: deal.name,
                editable: false,
                start: deal.deal_start_date,
                deal: deal,
                className: css
              });
            }
          });
        }

        $scope.sameDate = function(aDate, bDate){
          return moment(aDate).dayOfYear() === moment(bDate).dayOfYear()
        };
        
        $scope.pastDate = function(aDate, bDate){
          return moment(aDate).dayOfYear() < moment(bDate).dayOfYear()
        };

        $scope.isLocked = function(dealDate){
          var lockDate = moment().endOf('day').add(3,'day');
          return moment(dealDate).isBetween(moment().startOf('day'), lockDate);
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
