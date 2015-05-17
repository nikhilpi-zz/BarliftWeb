'use strict';

/**
 * @ngdoc function
 * @name barliftWebApp.controller:AnalyticsCtrl
 * @description
 * # AnalyticsCtrl
 * Controller of the barliftWebApp
 */


var generateMixpanelURl = function() {
    var expire = (new Date().getTime()) + 100000;
    var interval = 7;
    var api_key = "9f892f20a7ddce5c46c49bccb9af0c9a";
    var api_secret = "82da5c883b1e6cb18800ee74553f8665";
    var sig_param = "api_key=" + api_key + 'event=["Deal Click to Detail"]expire=' + expire + "format=jsoninterval=24type=generalunit=day"
    var sig = $.md5(sig_param + api_secret);
    var url = "http://mixpanel.com/api/2.0/events/?format=json&interval=24&expire=" + expire + "&sig=" + sig 
    + "&api_key=9f892f20a7ddce5c46c49bccb9af0c9a&type=general&event=%5B%22Deal+Click+to+Detail%22%5D&unit=day" 
    + "&callback=JSON_CALLBACK"
    return url
}

angular.module('barliftApp')
    .controller('AnalyticsCtrl', function($scope, $stateParams, Deals, CloudCode, $http) {

        $http.jsonp(generateMixpanelURl()).
        success(function(data, status, headers, config) {
            console.log(JSON.stringify(data, null, 2));
        }).
        error(function(data, status, headers, config) {
            console.log("Couldn't get weather", data, status, config);
        });


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

        var nudges = {};
        $scope.nudgeData = [];

        // get nudge data by day
        CloudCode.call('getNudgesByHour', {
            dealID: $stateParams.selectedDeal
        }).then(function(res) {
            angular.forEach(res.result, function(nudge) {
                var date = new Date(nudge["createdAt"]);
                var temp = new Date(date);
                temp.setHours(0, 0, 0, 0);

                // if date exists increment count, otherwise create new
                if (nudges[temp]) {
                    nudges[temp].count += 1;
                } else {
                    nudges[temp] = {
                        utc: date.getTime(),
                        count: 0
                    }
                }
            });

            // convert to format accepted by flot graph
            angular.forEach(nudges, function(nudge) {
                $scope.nudgeData.push([nudge.utc, nudge.count]);
            });

            // sort nudges by date
            $scope.nudgeData.sort(function(a, b) {
                return a[0] - b[0];
            });

            createNudgeGraph();
        });

        var data2 = [
            [gd(2015, 5, 1), 800],
            [gd(2015, 5, 2), 500],
            [gd(2015, 5, 3), 600],
            [gd(2015, 5, 4), 700],
            [gd(2015, 5, 5), 500],
            [gd(2015, 5, 6), 456],
            [gd(2015, 5, 7), 800],
            [gd(2015, 5, 8), 589],
            [gd(2015, 5, 9), 467],
            [gd(2015, 5, 10), 876],
            [gd(2015, 5, 11), 689],
            [gd(2015, 5, 12), 700],
            [gd(2015, 5, 13), 500]
        ];

        function gd(year, month, day) {
            return new Date(year, month - 1, day).getTime();
        }

        var createNudgeGraph = function() {
            $scope.graphData = [{
                label: "Nudges sent",
                grow: {
                    stepMode: "linear"
                },
                data: $scope.nudgeData,
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
            }, {
                label: "Deal detail clicks in the app",
                grow: {
                    stepMode: "linear"
                },
                data: data2,
                color: "#1ab394",
                yaxis: 2,
                bars: {
                    show: true,
                    align: "center",
                    barWidth: 24 * 60 * 60 * 600,
                    lineWidth: 0
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
