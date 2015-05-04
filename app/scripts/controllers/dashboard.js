'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('DashboardCtrl', function ($scope, User, Deals) {
    /**
     * Get deals for current user
     */
    $scope.user = {};

    User.getCurrent(function(res){ 
      $scope.user = res; 

      // get all deals if admin, otherwise only that of the current user
      if (res.username == "Admin") {
        Deals.query({}, function(deals) { main(deals); });
      } else {
        Deals.query({
          where: { 
            user: $scope.user.getPointer()
          }
        },
        function(deals) { main(deals); });
      }
    });

    var main = function(deals) {
      $scope.deals = deals;

      /**
       * Get last week's deals
       */
      $scope.pastDeals = [];
      $scope.numPastDeals = 0;

      // make past deals obj
      var today = new Date;
      var myDate = new Date();

      for (var i=0; i<7; i++) {
        var nextDay = new Date();
        myDate.setHours(0,0,0,0);

        var dealObj = {date: myDate, deals: []};
        $scope.pastDeals[i] = dealObj;

        nextDay.setDate(myDate.getDate()+1);
        myDate = nextDay;
      }
      
      // add past deals to obj
      angular.forEach($scope.deals, function(deal) {
        var date = deal["deal_start_date"];

        var dateIndex = Math.floor((date - today) / (1000*60*60*24)) + 1;

        if (dateIndex >= 0) {
          $scope.pastDeals[dateIndex].deals.push(deal);
          $scope.numPastDeals += 1;
        };
      });

      console.log($scope.pastDeals);

      /**
       * Data for Line chart
       */
      $scope.lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Example dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "Example dataset",
            fillColor: "rgba(26,179,148,0.5)",
            strokeColor: "rgba(26,179,148,0.7)",
            pointColor: "rgba(26,179,148,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(26,179,148,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      };

      /**
       * Options for Line chart
       */
      $scope.lineOptions = {
        scaleShowGridLines : false,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        bezierCurve : true,
        bezierCurveTension : 0.4,
        pointDot : true,
        pointDotRadius : 4,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : true
      };
    }
  });
