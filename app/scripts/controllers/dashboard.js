'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
    .controller('DashboardCtrl', function($scope, User, Deals, CloudCode) {
        /**
         * Get deals for current user
         */
        $scope.user = {};

        User.getCurrent(function(res) {
            $scope.user = res;

            // get all deals if admin, otherwise only that of the current user
            if (res.username == "Admin") {
                Deals.query({}, function(deals) {
                    main(deals);
                });
            } else {
                Deals.query({
                        where: {
                            user: $scope.user.getPointer()
                        }
                    },
                    function(deals) {
                        main(deals);
                    });
            }
        });

        /**
         * Get last week's deals
         */
        var nextWeekDeals = function() {
            $scope.pastDeals = [];
            $scope.numPastDeals = 0;

            // make past deals obj
            var today = new Date;
            var myDate = new Date();

            for (var i = 0; i < 7; i++) {
                var nextDay = new Date();
                myDate.setHours(0, 0, 0, 0);

                var dealObj = {
                    date: myDate,
                    deals: []
                };
                $scope.pastDeals[i] = dealObj;

                nextDay.setDate(myDate.getDate() + 1);
                myDate = nextDay;
            }

            // add past deals to obj
            angular.forEach($scope.deals, function(deal) {
                var date = deal["deal_start_date"];

                var dateIndex = Math.floor((date - today) / (1000 * 60 * 60 * 24)) + 1;

                if (dateIndex >= 0) {
                    $scope.pastDeals[dateIndex].deals.push(deal);
                    $scope.numPastDeals += 1;
                };
            });
        }

        var lastWeekNumInterested = function() {
            var data = [0, 0, 0, 0, 0, 0, 0];

            angular.forEach($scope.deals, function(deal) {
                var today = new Date();
                today.setHours(0, 0, 0, 0);
                var date = deal["deal_start_date"];
                date.setHours(0, 0, 0, 0);

                var dateIndex = 6 - Math.floor((today - date) / (1000 * 60 * 60 * 24));

                if (0 <= dateIndex && dateIndex < 7) {
                  data[dateIndex] += deal.num_accepted;
                };
            });
            $scope.lastNumInterested = data;
        }

        var lastWeekDays = function() {
            var d = new Date();
            var day = d.getDay() + 1;
            var weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

            var lastWeek = [];
            for (var i = 0; i < 7; i++) {
                if (day > 6) day = 0;
                lastWeek.push(weekday[day]);
                day += 1;
            }

            $scope.lastWeek = lastWeek;
        }

        var main = function(deals) {
            $scope.deals = deals;

            nextWeekDeals();
            lastWeekDays();
            lastWeekNumInterested();

            /**
             * Data for Line chart
             */
            $scope.lineData = {
                labels: $scope.lastWeek,
                datasets: [{
                    label: "Example dataset",
                    fillColor: "rgba(26,179,148,0.5)",
                    strokeColor: "rgba(26,179,148,0.7)",
                    pointColor: "rgba(26,179,148,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: $scope.lastNumInterested
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
