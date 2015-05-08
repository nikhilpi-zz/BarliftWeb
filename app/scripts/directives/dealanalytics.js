'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealAnalytics
 * @description
 * # dealAnalytics
 */
angular.module('barliftApp')
  .directive('dealAnalytics', function ($stateParams, $filter, User, Deals, $state, CloudCode) {
    return {
      templateUrl: 'views/dash/directives/deal-analytics.html',
      restrict: 'E',
      scope: {
        user: '=',
        deals: '=',
        selectedDeal: '=',
        selectDeal: '&'
      },
      link: function postLink(scope, element, attrs) {
        scope.dealFound = null;

        if($stateParams.selectedDeal){
          Deals.get({objectId: $stateParams.selectedDeal}, function(res){
            scope.selectDeal({deal: res});
          });
        }

        scope.$watch('selectedDeal', function(){
          if (scope.selectedDeal.name != 'Please select a deal'){
            CloudCode.call('dealAnalytics', {dealId: scope.selectedDeal.objectId})
              .then(function(res) {
                  scope.interestedCount = res.result.interestedCount;
                  scope.avgDealsRedeemed = res.result.avgDealsRedeemed;
                  scope.gender.datasets[0].data[0] = res.result.gender.male;
                  scope.gender.datasets[0].data[1] = res.result.gender.female;
            });
          }
        });

        scope.interestedCount=0;
        scope.avgDealsRedeemed=0;

        scope.gender = {
          labels: ['Male', 'Female'],
          datasets:[
            {
              data: [0,0]
            }
          ]};

        scope.nightsOut = [
          {
            value: 0,
            color:"#37464A",
            highlight: "#FF5A5E",
            label: "0 night"
          },
          {
            value: 0,
            color:"#37464A",
            highlight: "#FF5A5E",
            label: "1 night"
          },
          {
            value: 0,
            color:"#F7484B",
            highlight: "#FF5A5E",
            label: "2 nights"
          },
          {
            value: 0,
            color:"#F74A6C",
            highlight: "#FF5A5E",
            label: "3 nights"
          },
          {
            value: 0,
            color:"#AB7464D",
            highlight: "#FF5A5E",
            label: "4 nights"
          },
          {
            value: 0,
            color:"#F5464E",
            highlight: "#FF5A5E",
            label: "5 nights"
          },
          {
            value: 0,
            color:"#F7F24F",
            highlight: "#FF5A5E",
            label: "6 nights"
          },
          {
            value: 0,
            color:"#F74C41",
            highlight: "#FF5A5E",
            label: "7 nights"
          },
        ];

        scope.doughnutOptions = {
          segmentShowStroke : true,
          segmentStrokeColor : "#fff",
          segmentStrokeWidth : 2,
          percentageInnerCutout : 45, // This is 0 for Pie charts
          animationSteps : 100,
          animationEasing : "easeOutBounce",
          animateRotate : true,
          animateScale : false
      };

        scope.barOptions = {
          scaleBeginAtZero : true,
          scaleShowGridLines : true,
          scaleGridLineColor : "rgba(0,0,0,.05)",
          scaleGridLineWidth : 1,
          barShowStroke : true,
          barStrokeWidth : 2,
          barValueSpacing : 5,
          barDatasetSpacing : 1
        };
      }
    };
  });
