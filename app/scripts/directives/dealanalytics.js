'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealAnalytics
 * @description
 * # dealAnalytics
 */
angular.module('barliftApp')
  .directive('dealAnalytics', function ($stateParams, $filter, User, Deals, $state) {
    return {
      templateUrl: 'views/dash/directives/deal-analytics.html',
      restrict: 'E',
      scope: {
        user: '=',
        deals: '=',
        deal: '='
      },
      link: function postLink(scope, element, attrs) {

        if(!$stateParams.selectedDeal){
            element.text("Please select a deal");
        } else {
          getData($stateParams.selectedDeal);
        }

        scope.$watch('deals', function(){
          if($stateParams.selectedDeal){
            var dealFound = $filter('filter')(scope.deals, {objectId: $stateParams.selectedDeal})[0];
            if(!dealFound){
              $state.go('deals.builder', {selectedDeal: undefined});
            } else {
              scope.deal = dealFound;
            }
          }
        });



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

        scope.interestedCount=0;
        scope.avgDealsRedeemed=0;

        function getData(dealId){
          User.query({
            where: {
              '$relatedTo': {
                "object":{
                    __type: 'Pointer',
                    className: 'Deal',
                    objectId: dealId
                  },
                key: 'social'
              } 
            }
          }, function(res){
            processData(res);
          });
        }

        function processData(data){
          angular.forEach(data, function(user) {
            if (user.profile.gender == 'female'){
              scope.gender.datasets[0].data[1] += 1;
            } else {
              scope.gender.datasets[0].data[0] += 1;
            }
            scope.interestedCount += 1;
            if (user.num_nights && user.num_nights != 'Choose a number...'){
              scope.nightsOut[parseInt(user.num_nights)].value += 1;
            }
            if (user.deals_redeemed){
              scope.avgDealsRedeemed += parseInt(user.deals_redeemed);
            }
          });
          scope.avgDealsRedeemed = scope.avgDealsRedeemed / scope.interestedCount;
        }

      }
    };
  });
