'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:promoBuilder
 * @description
 * # promoBuilder
 */
angular.module('barliftApp')
  .directive('promoBuilder', function (ParseTypes, $q) {
    return {
      templateUrl: 'views/dash/directives/promo-builder.html',
      restrict: 'E',
      scope:{
        deals: '='
      },
      controller: function($scope, CloudCode){
        $scope.events = [];

        $scope.selectedDeals = [];

        $scope.eventSource = [$scope.events];

        $scope.total = 0;

        $scope.$watch('deals',function(){
          loadDeals()
        });

        function loadDeals(){
          angular.forEach($scope.deals, function(deal){
            var found = false;
            angular.forEach($scope.events, function(calEvent){
              if(calEvent.title === deal.name && angular.equals(calEvent.deal, deal)){
                found = true;
              }
            });

            if(!found){
              $scope.events.push({
                title: deal.name,
                editable: false,
                start: deal.deal_start_date,
                deal: deal
              });
            }
          });
        }

        function selectDeal(deal){
          CloudCode.call('pushCount', {community: deal.community_name}).then(
          function(res){
            deal.main_price = res.result * 0.02;
            $scope.total += res.result * 0.02;
            $scope.selectedDeals.push(deal);
          });
          
        };

        $scope.alertOnEventClick = function(event, allDay, jsEvent, view ){
          if(!event.selected){
            event.selected = true;
            event.className = "selected-event"
            selectDeal(event.deal);
          } else {
            event.selected = false;
            event.className = ""
            var index = $scope.selectedDeals.indexOf(event.deal);
            $scope.selectedDeals.splice(index,1);
            $scope.total -= event.deal.main_price;
          }
        };

        $scope.buyDeals = function(){
          function sucess(res){
            console.log(res);
          }

          var buys = [];
          angular.forEach($scope.selectedDeals, function(deal){
            buys.push(
              CloudCode.call('buyPush',{
                amount: deal.main_price,
                description: deal.name,
                deal: deal.objectId
              }).then(sucess));
          });
          $q.all(buys).then(function(){
              console.log("ALL PROMISES RESOLVED")
          });
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


        

      },
      link: function postLink(scope, element, attrs) {
        

      }
    };
  });
