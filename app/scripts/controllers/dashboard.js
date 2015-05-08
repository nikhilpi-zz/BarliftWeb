'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
    .controller('DashboardCtrl', function($scope, User, Deals, CloudCode, $http) {

        $scope.user = {};

        User.getCurrent(function(res) {
            $scope.user = res;

            Deals.query({}, function(allDeals) {
                Deals.query({
                        where: {
                            user: $scope.user.getPointer()
                        }
                    },
                    function(barDeals) {
                        $scope.allDeals = allDeals;

                        if (res.username == "Admin") {
                            main(allDeals);
                        } else {
                            main(barDeals);
                        }
                    });
            });

        });

        // get weather
        $http.jsonp('http://api.wunderground.com/api/f2a7d6ad5a260a8a/forecast10day/q/IL/Evanston.json?callback=JSON_CALLBACK').
          success(function(data, status, headers, config) {
              $scope.weather = data.forecast.simpleforecast.forecastday;
          }).
          error(function(data, status, headers, config) {
              console.log("Couldn't get weather", data);
          });

        var nextWeekDeals = function() {
            $scope.upcomingDeals = [];
            $scope.numUpcomingDeals = 0;

            // make past deals obj
            var today = new Date;
            today.setHours(0, 0, 0, 0);
            var myDate = new Date();

            for (var i = 0; i < 7; i++) {
                var nextDay = new Date();
                myDate.setHours(0, 0, 0, 0);

                var dealObj = {
                    date: myDate,
                    deals: []
                };
                $scope.upcomingDeals[i] = dealObj;

                nextDay.setDate(myDate.getDate() + 1);
                myDate = nextDay;
            }

            // add past deals to obj
            angular.forEach($scope.deals, function(deal) {
                var date = deal["deal_start_date"];

                var dateIndex = Math.floor((date - today) / (1000 * 60 * 60 * 24));

                if (dateIndex >= 0 && dateIndex < 7) {
                    $scope.upcomingDeals[dateIndex].deals.push(deal);
                    $scope.numUpcomingDeals += 1;
                };
            });
        }

        var dealsInLastRange = function(deals, start, end) {
            var num_days = end - start + 1;
            var data = new Array(num_days);

            angular.forEach(deals, function(deal) {
                var today = new Date();
                today.setHours(0, 0, 0, 0);
                var date = new Date(deal["deal_start_date"]);
                date.setHours(0, 0, 0, 0);

                var dateDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));

                if (start <= dateDiff && dateDiff <= end) {
                    var dateIndex = end - dateDiff;
                    if (data[dateIndex]) {
                        data[dateIndex].push(deal);
                    } else {
                        data[dateIndex] = [deal];
                    }
                };
            });
            return data;
        }

        var daysLastWeek = function() {
            var d = new Date();
            var day = d.getDay() + 1;
            var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            var lastWeek = [];
            for (var i = 0; i < 7; i++) {
                if (day > 6) day = 0;
                lastWeek.push(weekday[day]);
                day += 1;
            }

            return lastWeek;
        }

        var interestedInRange = function(start, end) {
            var dealList = dealsInLastRange($scope.deals, start, end);
            var data = Array.apply(null, new Array(dealList.length)).map(Number.prototype.valueOf, 0);

            for (var i = 0; i < dealList.length; i++) {
                angular.forEach(dealList[i], function(deal) {
                    data[i] += deal.num_accepted;
                });
            };

            return data;
        }

        var revenueInRange = function(start, end) {
            var dealList = dealsInLastRange($scope.deals, start, end);
            var revenue = 0;

            for (var i = 0; i < dealList.length; i++) {
                angular.forEach(dealList[i], function(deal) {
                    revenue += deal.revenue;
                });
            };

            return revenue;
        }


        var mostPopularDeal = function() {
            var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var dealList = dealsInLastRange($scope.allDeals, 0, 6);
            var dealName, day;
            var maxSeenSoFar = 0;

            for (var i = 0; i < dealList.length; i++) {
                angular.forEach(dealList[i], function(deal) {
                    if (deal.num_accepted > maxSeenSoFar) {
                        dealName = deal.name;
                        day = deal.deal_start_date
                        maxSeenSoFar = deal.num_accepted;
                    }
                });
            };

            return {
                dealName: dealName,
                day: weekday[day.getDay()],
                interested: maxSeenSoFar
            };
        }

        var main = function(deals) {
            $scope.deals = deals;

            // list of deals next week
            nextWeekDeals();

            // list of days last week e.g. Mon, Tues 
            $scope.lastWeekDays = daysLastWeek();

            // list of deals last week
            $scope.dealsLastWeek = dealsInLastRange($scope.deals, 0, 6);

            // list of people interested last week (oldest first)
            $scope.interestedLastWeek = interestedInRange(0, 6);

            // list of people interested 2 weeks back (oldest first)
            $scope.interestedTwoWeeksBack = interestedInRange(7, 13);

            // num interested
            var sum = 0;
            for (var i = 0; i < $scope.interestedLastWeek.length; i++) {
                sum += $scope.interestedLastWeek[i];
            }
            $scope.numInterestedLastWeek = sum;

            var sum = 0;
            for (var i = 0; i < $scope.interestedTwoWeeksBack.length; i++) {
                sum += $scope.interestedTwoWeeksBack[i];
            }
            $scope.numInterestedTwoWeeksBack = sum;

            // % increase in interested
            $scope.interestedIncrease = 100 * ($scope.numInterestedLastWeek - $scope.numInterestedTwoWeeksBack) / $scope.numInterestedTwoWeeksBack;
            $scope.interestedIncreaseAbs = Math.abs($scope.interestedIncrease);


            // most popular deal name and day
            var data = mostPopularDeal();
            $scope.mostPopularDealName = data.dealName;
            $scope.mostPopularDealDay = data.day;

            // revenue last week
            $scope.revenue = revenueInRange(0, 6);

            /**
             * Data for Line chart
             */
            $scope.lineData = {
                labels: $scope.lastWeekDays,
                datasets: [{
                    label: "Two Weeks Back",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: $scope.interestedTwoWeeksBack
                }, {
                    label: "Last Week",
                    fillColor: "rgba(26,179,148,0.5)",
                    strokeColor: "rgba(26,179,148,0.7)",
                    pointColor: "rgba(26,179,148,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: $scope.interestedLastWeek
                }]
            };

            /**
             * Options for Line chart
             */
            $scope.lineOptions = {
                scaleShowGridLines: false,
                scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth: 1,
                bezierCurve: true,
                bezierCurveTension: 0.4,
                pointDot: true,
                pointDotRadius: 4,
                pointDotStrokeWidth: 1,
                pointHitDetectionRadius: 20,
                datasetStroke: true,
                datasetStrokeWidth: 2,
                datasetFill: true
            };
        }
    });
