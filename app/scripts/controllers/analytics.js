'use strict';

/**
 * @ngdoc function
 * @name barliftWebApp.controller:AnalyticsCtrl
 * @description
 * # AnalyticsCtrl
 * Controller of the barliftWebApp
 */


angular.module('barliftApp')
    .controller('AnalyticsCtrl', function($scope, $stateParams, Deals, CloudCode, $http) {

        // get deals
        Deals.get({
            objectId: $stateParams.selectedDeal,
            include: "feedback"
        }, function(res) {
            $scope.deal = res;
        });


        /**
         * Get data for charts
         */

        // get gender and create doughnut chart
        CloudCode.call('dealAnalytics', {
            dealId: $stateParams.selectedDeal
        }).then(function(res) {
            $scope.males = res.result.gender.male;
            $scope.females = res.result.gender.female;
            createDoughnut($scope);
        });

        var nudges = [];
        $scope.nudgeData = [];

        // get nudge data by day
        CloudCode.call('getNudgesByHour', {
            dealID: $stateParams.selectedDeal
        }).then(function(res) {
            angular.forEach(res.result, function(nudge) {
                var date = new Date(nudge["createdAt"]);
                var updated = false;

                var obj = {
                    date: date,
                    day: date.getDate(),
                    hour: date.getHours(),
                    utc: date.getTime(),
                    count: 0
                };

                // if date exists, increment count
                for (var i = 0; i < nudges.length; i++) {
                    // nudges[i].day == obj.day && (nudges[i].hour == obj.hour)) {
                    if (nudges[i].day == obj.day) {
                        nudges[i].count += 1;
                        updated = true;
                        break
                    }
                }

                // if date doesn't exists, create new object
                if (updated == false) {
                    obj.count += 1;
                    nudges.push(obj);
                }
            });

            // sort nudges by date
            nudges.sort(function(a,b) { 
                return a.utc - b.utc;
            });

            // convert to formate accepted by flot graph
            angular.forEach(nudges, function(nudge) {
                $scope.nudgeData.push([nudge.utc, nudge.count]);
            });

            createNudgeGraph();
        });

        var data2 = [
            [gd(2012, 1, 1), 800],
            [gd(2012, 1, 2), 500],
            [gd(2012, 1, 3), 600],
            [gd(2012, 1, 4), 700],
            [gd(2012, 1, 5), 500],
            [gd(2012, 1, 6), 456],
            [gd(2012, 1, 7), 800],
            [gd(2012, 1, 8), 589],
            [gd(2012, 1, 9), 467],
            [gd(2012, 1, 10), 876],
            [gd(2012, 1, 11), 689],
            [gd(2012, 1, 12), 700],
            [gd(2012, 1, 13), 500]
        ];

        function gd(year, month, day) {
            return new Date(year, month - 1, day).getTime();
        }

        // {
        //     label: "Deal detail clicks in the app",
        //     grow: {
        //         stepMode: "linear"
        //     },
        //     data: data2,
        //     color: "#1ab394",
        //     bars: {
        //         show: true,
        //         align: "center",
        //         barWidth: 24 * 60 * 60 * 600,
        //         lineWidth: 0
        //     }
        // }, 

        var createNudgeGraph = function() {
            $scope.graphData = [{
                label: "Nudges sent",
                grow: {
                    stepMode: "linear"
                },
                data: $scope.nudgeData,
                yaxis: 1,
                color: "#464f88",
                lines: {
                    lineWidth: 1,
                    show: true,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.2
                        }, {
                            opacity: 0.2
                        }]
                    }
                }
            }];
        };


        /**
         * Create charts
         */

        // create doughnut chart for gender
        var createDoughnut = function() {
            $scope.doughnutData = [{
                value: $scope.females,
                color: "#a3e1d4",
                highlight: "#1ab394",
                label: "Female"
            }, {
                value: $scope.males,
                color: "#b5b8cf",
                highlight: "#9589a6",
                label: "Male"
            }];
        }


        /**
         * Options for chart configurations
         */

        // options for doughnut gender chart
        $scope.doughnutOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 45, // This is 0 for Pie charts
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false
        };

        // options for nudge/deal details graph 
        $scope.graphOptions = {
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#d5d5d5",
                borderWidth: 0,
                color: '#d5d5d5'
            },
            colors: ["#1ab394", "#464f88"],
            tooltip: true,
            xaxis: {
                mode: "time",
                tickSize: [3, "day"],
                tickLength: 0,
                axisLabel: "Date",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 10,
                color: "#d5d5d5"
            },
            yaxes: [{
                position: "left",
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 3
            }, {
                position: "right",
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: ' Arial',
                axisLabelPadding: 67
            }],
            legend: {
                noColumns: 1,
                labelBoxBorderColor: "#d5d5d5",
                position: "nw"
            },
        };

    });
